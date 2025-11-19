import { useApi } from "~/lib/useApi";
import type { ResetPasswordDto } from "../validation";

export const useResetPasswordService = () => {
  const { request } = useApi();

  const resetpassword = async (payload: ResetPasswordDto) => {
    try {
      const response = await request("POST", {
        url: "/auth/login",
        payload,
      });

      if (response.status === "success") {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    resetpassword,
  };
};
