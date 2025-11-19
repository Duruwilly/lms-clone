import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import AuthTitleHeader from "~/components/general/auth-title-header";
import GoBack from "~/components/general/go-back";
import Input from "~/components/ui/Input/text-input";
import { ForgotPasswordSchema, type TForgotpasword } from "./validation";
import { useForgotPasswordService } from "./services";
import Button from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useDisclosure } from "~/lib/hooks/use-disclosure";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "~/lib/constants/app-routes";
import { Paragraph } from "~/components/ui/paragraph";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS Admin | Forgot password" },
    { name: "description", content: "Forgot password" },
  ];
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotpassword, resendResetLink } = useForgotPasswordService();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<TForgotpasword>({
    mode: "onBlur",
    resolver: zodResolver(ForgotPasswordSchema),
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: forgotpassword,
    onSuccess: () => {
      onOpen();
    },
    onError: () => {
      onOpen();
    },
  });

  const onSubmit: SubmitHandler<TForgotpasword> = async (data) => {
    mutate({ ...data });
  };

  const resendOtp = async () => {
    await resendResetLink();
  };

  const emailWatch = watch("email");

  return (
    <div className="mt-14 md:mt-20 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <GoBack goBack={isOpen ? () => onClose() : undefined} />

        <AuthTitleHeader
          title={isOpen ? "Check Your Email" : "Forgot Password?"}
          desc={
            isOpen
              ? `We've sent a reset link to ${emailWatch?.slice(0, 2) + "***@gmail.com"}`
              : "Enter your email to reset your password."
          }
        />
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-5">
          <Button
            text="Continue"
            onClick={() => navigate(APP_ROUTES.reset_password)}
          />
          <Paragraph className="!text-(--color-text-secondary)">
            Didn't receive the email?{" "}
            <span
              className="!text-(--color-texts-primary) font-semibold font-Inter-SemiBold cursor-pointer"
              onClick={resendOtp}
            >
              Click to resend
            </span>
          </Paragraph>
        </div>
      ) : (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            placeholder="Enter email address"
            {...register("email")}
            error={errors.email?.message}
            className="bg-(--color-surface)"
          />

          <Button
            text="Reset Password"
            isLoading={isPending}
            disabled={isPending}
          />
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
