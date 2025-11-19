import { useApi } from "~/lib/useApi";
import type { User } from "~/models/users";
import type { TLogin } from "../validations/login";
import { LocalStorageHelpers } from "~/lib/helpers/local-storage-helpers";
import { LocalStorageKeys } from "~/lib/constants/app";
import { useAppStore } from "~/store/app-store";
import { useUserStore } from "~/store/user-store";

export const useLoginServices = () => {
  const { request } = useApi();
  const { setUser } = useUserStore();
  const { setIsAuthentication, setErrors } = useAppStore();

  const authLogin = async (payload: TLogin): Promise<User> => {
    try {
      const response = await request("POST", {
        url: "/auth/login",
        payload,
      });

      if (response.status === "success") {
        const returnRes = response.data?.data as User;
        LocalStorageHelpers.set(LocalStorageKeys.auth_token, "token");
        setIsAuthentication(true);
        setUser(returnRes);
        LocalStorageHelpers.set(
          LocalStorageKeys.refresh_token,
          "refresh token",
        );
        return returnRes;
      } else {
        if (response.code === 401) {
          setErrors([response.data]);
        }
        throw new Error(response.data);
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    authLogin,
  };
};
