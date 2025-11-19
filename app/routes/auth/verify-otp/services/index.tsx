import { useApi } from "~/lib/useApi";
import { useAppStore } from "~/store/app-store";

export const useVerifyOtpService = () => {
  const { setSuccessMessages } = useAppStore();
  const { request } = useApi();

  const verifyOtp = async (payload: { otp: string }) => {
    try {
      const response = await request("POST", {
        url: "/auth/email/verify",
        payload,
      });
      if (response.status === "success") {
        setSuccessMessages([response?.data?.message]);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      throw error;
    }
  };

  const resendVerificationOtp = async () => {
    try {
      const response = await request("POST", {
        url: "/auth/email/resend-notification",
        payload: {},
      });

      if (response.status === "success") {
        setSuccessMessages([response?.data?.message]);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    resendVerificationOtp,
    verifyOtp,
  };
};
