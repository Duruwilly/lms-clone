import { useApi } from "~/lib/useApi";
import type { TForgotpasword } from "../validation";

export const useForgotPasswordService = () => {
  const { request } = useApi();

  const forgotpassword = async (payload: TForgotpasword) => {
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

  const resendResetLink = async () => {
    try {
      const response = await request("POST", {
        url: "/auth/email/resend-notification",
        payload: {},
      });

      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    forgotpassword,
    resendResetLink,
  };
};
