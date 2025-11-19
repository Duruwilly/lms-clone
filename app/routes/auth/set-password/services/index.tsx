import { useApi } from "~/lib/useApi";
import type { ResetPasswordDto } from "../../reset-password/validation";

export const useSetPasswordService = () => {
  const { request } = useApi();

  const setpassword = async (payload: ResetPasswordDto) => {
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
    setpassword,
  };
};
