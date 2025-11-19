import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import AuthTitleHeader from "~/components/general/auth-title-header";
import GoBack from "~/components/general/go-back";
import { useDisclosure } from "~/lib/hooks/use-disclosure";
import { resetPasswordSchema, type ResetPasswordDto } from "./validation";
import InputPassword from "~/components/ui/Input/password-input";
import { PasswordChecklist } from "~/components/general/password-checklist";
import { usePasswordValidation } from "~/lib/hooks/use-password-validation";
import Button from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useResetPasswordService } from "./services";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "~/lib/constants/app-routes";
import CheckCircleBroken from "~/assets/svg/icons/check-circle-broken";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS Admin | Reset password" },
    { name: "description", content: "Reset your password" },
  ];
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen } = useDisclosure();
  const { resetpassword } = useResetPasswordService();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordDto>({
    mode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetpassword,
    onSuccess: () => {
      onOpen();
    },
    onError: () => {
      onOpen();
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordDto> = async (data) => {
    mutate({ ...data });
  };

  const password = watch("password_confirmation") || "";

  const validations = usePasswordValidation(password);

  return (
    <div className="mt-14 md:mt-20 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        {isOpen ? (
          <CheckCircleBroken className="text-(--color-icon-success)" />
        ) : (
          <GoBack />
        )}
        <AuthTitleHeader
          title={isOpen ? "Password Successfully Reset" : "Set New Password"}
          desc={
            isOpen
              ? "Your password has been successfully reset. You can now log in with your new password."
              : "Your new password must be different to previously used passwords."
          }
        />
      </div>

      {isOpen ? (
        <Button
          text="Continue"
          onClick={() => {
            navigate(APP_ROUTES.home);
          }}
        />
      ) : (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <InputPassword
            label="Password"
            placeholder="Choose a password"
            {...register("password")}
            error={errors.password?.message}
          />
          <div>
            <InputPassword
              label="Confirm Password"
              placeholder="Confirm password"
              {...register("password_confirmation")}
              error={errors.password_confirmation?.message}
            />
            <PasswordChecklist validations={validations} />
          </div>

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

export default ResetPassword;
