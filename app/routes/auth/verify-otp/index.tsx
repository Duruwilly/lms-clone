import { useLocation, useNavigate } from "react-router";
import type { Route } from "./+types";
import AuthTitleHeader from "~/components/general/auth-title-header";
import GoBack from "~/components/general/go-back";
import OtpInput from "~/components/ui/Input/otp-input";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailVerificationSchema,
  type EmailVerificationDto,
} from "./validations";
import Button from "~/components/ui/button";
import { Paragraph } from "~/components/ui/paragraph";
import { useVerifyOtpService } from "./services";
import { useMutation } from "@tanstack/react-query";
import { APP_ROUTES } from "~/lib/constants/app-routes";
import { roleMapping } from "~/lib/constants/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS Admin | Verify Otp" },
    { name: "description", content: "Verify your account." },
  ];
}

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, resendVerificationOtp } = useVerifyOtpService();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailVerificationDto>({
    mode: "onBlur",
    resolver: zodResolver(emailVerificationSchema),
    reValidateMode: "onChange",
    defaultValues: { otp: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (res: any) => {
      const roleProfileRoute =
        roleMapping[res.role as keyof typeof roleMapping];
      navigate(APP_ROUTES[roleProfileRoute as keyof RouteGroups].dashboard);
    },

    onError: () => {
      const roleProfileRoute =
        roleMapping["admin" as keyof typeof roleMapping];
      navigate(APP_ROUTES[roleProfileRoute as keyof RouteGroups].dashboard);
    },
  });

  const resendOtp = async () => {
    await resendVerificationOtp();
  };

  const onSubmit: SubmitHandler<EmailVerificationDto> = async (data) => {
    mutate({ ...data });
  };

  return (
    <div className="mt-14 md:mt-20 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <GoBack />

        <AuthTitleHeader
          title="Enter Verification Code"
          desc={`We've sent a 6-digit code to ${state?.email?.slice(0, 2) + "***@gmail.com"}`}
        />
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <OtpInput
                length={6}
                value={field.value}
                onChange={field.onChange}
                error={errors?.otp?.message}
              />
            )}
          />

          <Paragraph className="!text-(--color-text-secondary)">
            Didn't receive the code?{" "}
            <span
              className="!text-(--color-texts-primary) font-semibold font-Inter-SemiBold cursor-pointer"
              onClick={resendOtp}
            >
              Click to resend
            </span>
          </Paragraph>
        </div>

        <Button text="Verify" isLoading={isPending} disabled={isPending} />
      </form>
    </div>
  );
};

export default VerifyOtp;
