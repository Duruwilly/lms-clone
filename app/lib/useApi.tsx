import axios from "axios";
import { useNavigate } from "react-router";
import { useUserStore } from "~/store/user-store";
import { LocalStorageHelpers } from "./helpers/local-storage-helpers";
import { LocalStorageKeys } from "./constants/app";
import { refreshAccessToken } from "~/services/auth/refresh-token";
import type { User } from "~/models/users";
import { useAppStore } from "~/store/app-store";

export interface NetworkRequestReturnType {
  code: number;
  status: "success" | "failed" | "pending";
  data?: any;
  headers?: Record<string, string>;
}

type GetRequestType = {
  url: string;
  payload?: any | never;
  headers?: Record<string, string>;
  useBaseUrl?: boolean;
  ignoreError?: boolean;
};

type PostRequestType = {
  url: string;
  payload: any;
  headers?: Record<string, string>;
  useBaseUrl?: boolean;
  ignoreError?: boolean;
};

export interface NetworkReturnType {
  request: {
    (
      method: "GET" | "DELETE",
      props: GetRequestType,
    ): Promise<NetworkRequestReturnType>;
    (
      method: "POST" | "PUT",
      props: PostRequestType,
    ): Promise<NetworkRequestReturnType>;
  };
}

const source = axios.CancelToken.source();

export const useApi = (): NetworkReturnType => {
  const { clearUser, setUser } = useUserStore();
  const { setIsAuthentication, setErrors, setSuccessMessages } = useAppStore();
  const navigate = useNavigate();
  const apiClient = axios.create({
    // withCredentials: true,
  });

  let isRefreshing = false; // track refresh status
  const refreshSubscribers: any[] = []; // store failed requests that are waiting

  // function to call once the token has been refreshed
  //   function onRefreshed(newToken: string) {
  //     refreshSubscribers.forEach((callback) => callback(newToken));
  //     refreshSubscribers = []; // clear subscribers after they've been called
  //   }

  // add subscriber to wait for token refresh
  function addRefreshSubscriber(callback: (newToken: string) => void) {
    refreshSubscribers.push(callback);
  }

  // on 401 errors use token refresh
  apiClient.interceptors.response.use(
    (response) => {
      // handleSuccessMessage(response);
      return response; // If the response is successful,
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // If refresh token is already being processed, queue this request
        if (isRefreshing) {
          return new Promise((resolve) => {
            addRefreshSubscriber((newToken: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(apiClient(originalRequest)); // Retry the original request with the new token
            });
          });
        }

        isRefreshing = true; // flag to indicate refresh is in progress

        try {
          const refresh_token = await LocalStorageHelpers.get(
            LocalStorageKeys.refresh_token,
          );

          if (refresh_token) {
            const newTokenObj = await refreshAccessToken({
              refreshToken: refresh_token,
            });

            LocalStorageHelpers.set(
              LocalStorageKeys.auth_token,
              "newTokenObj?.token",
            );
            setUser(newTokenObj as User);

            apiClient.defaults.headers.common["Authorization"] =
              "Bearer " + "newTokenObj?.token";

            originalRequest.headers["Authorization"] =
              "Bearer " + "newTokenObj?.token";

            return apiClient(originalRequest);
          } else {
            clearUser(); // log out if refresh doesn't exist
          }
        } catch (refreshError) {
          const props = originalRequest.props;
          handleErrors(refreshError, props);
          clearUser();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      const props = originalRequest.props;
      handleErrors(error, props);
      return Promise.reject(error);
    },
  );

  const handleErrors = async (
    error: any,
    props: GetRequestType | PostRequestType,
  ) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Axios Error....]", JSON.stringify(error, null, 2));
    }

    const statusCode = error?.response?.status;
    let errorMessage: any = [];
    if (error.response && error.response.data) {
      const message = error.response.data.message;

      if (typeof message === "object" && message !== null) {
        errorMessage = Object.values(message).flat();
      } else if (typeof message === "string") {
        errorMessage = [message];
      } else {
        errorMessage = [error.response.data.error ?? "An Error occured!"];
      }

      if (statusCode === 401) {
        LocalStorageHelpers.remove(LocalStorageKeys.auth_token);
        clearUser();
        setIsAuthentication(false);
      } else if (statusCode === 403 && message?.includes("unverified")) {
        setErrors(errorMessage);
        setIsAuthentication(false);
        // navigate(APP_ROUTE.VERIFY_OTP, { state: { type: "verification" } });
      } else if (statusCode === 403 && message?.includes("Unauthorized")) {
        setErrors(errorMessage);
      } else {
        if (!props.ignoreError) setErrors(errorMessage);
      }
    }
  };

  const request = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    props: GetRequestType | PostRequestType,
  ): Promise<NetworkRequestReturnType> => {
    const { url, payload, headers, useBaseUrl } = props;
    const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
    let fullUrl = "";
    const token = await LocalStorageHelpers.get(LocalStorageKeys.auth_token);

    if (!useBaseUrl) {
      fullUrl = `${baseURL}/api${url}`;
    } else {
      fullUrl = url;
    }

    const config = {
      method,
      url: fullUrl,
      data: payload,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cancelToken: source.token,
      props,
    };

    try {
      const response =
        await apiClient.request<NetworkRequestReturnType>(config);
      return {
        code: response.status,
        status: "success",
        data: response.data,
      };
    } catch (error: any) {
      // handleErrors(error, props);
      return {
        code: error.response.status,
        status: "failed",
        data: error?.response?.data?.message,
      };
    }
  };

  return {
    request,
  };
};
