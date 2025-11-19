import axios from "axios";
import type { User } from "~/models/users";
import { LocalStorageHelpers } from "~/lib/helpers/local-storage-helpers";
import { LocalStorageKeys } from "~/lib/constants/app";

export const refreshAccessToken = async (payload: { refreshToken: string }) => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/refresh`, payload, {
      headers: {
        Authorization: `Bearer ${payload.refreshToken}`,
      },
    });
    if (response.status === 200) {
      const dataResponse = response.data?.data as User;
      LocalStorageHelpers.set(
        LocalStorageKeys.auth_token,
        "add access token value here later",
      );
      LocalStorageHelpers.set(
        LocalStorageKeys.refresh_token,
        "add refresh token value here later",
      );
      return dataResponse;
    }
  } catch (error) {
    // window.location.href = "/";
    LocalStorageHelpers.remove(LocalStorageKeys.auth_token);
    throw error;
  }
};
