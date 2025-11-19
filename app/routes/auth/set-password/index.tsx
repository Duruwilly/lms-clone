import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import AuthTitleHeader from "~/components/general/auth-title-header";
import { useDisclosure } from "~/lib/hooks/use-disclosure";
import InputPassword from "~/components/ui/Input/password-input";
import { PasswordChecklist } from "~/components/general/password-checklist";
import { usePasswordValidation } from "~/lib/hooks/use-password-validation";
import Button from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "~/lib/constants/app-routes";
import CheckCircleBroken from "~/assets/svg/icons/check-circle-broken";
import {
  resetPasswordSchema,
  type ResetPasswordDto,
} from "../reset-password/validation";
import { useSetPasswordService } from "./services";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS Admin | Set password" },
    { name: "description", content: "Set your password" },
  ];
}

const SetPassword = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen } = useDisclosure();
  const { setpassword } = useSetPasswordService();
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
    mutationFn: setpassword,
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
        {isOpen && (
          <CheckCircleBroken className="text-(--color-icon-success)" />
        )}
        <AuthTitleHeader
          title={isOpen ? "Activation Successful" : "Choose a Password"}
          desc={
            isOpen
              ? "You're all set! Log in to start using the platform."
              : "Create your new password to activate your LMS account."
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
            // label="Password"
            placeholder="Choose a password"
            {...register("password")}
            error={errors.password?.message}
          />
          <div>
            <InputPassword
              //   label="Confirm Password"
              placeholder="Confirm password"
              {...register("password_confirmation")}
              error={errors.password_confirmation?.message}
            />
            <PasswordChecklist validations={validations} />
          </div>

          <Button
            text="Set Password"
            isLoading={isPending}
            disabled={isPending}
          />
        </form>
      )}
    </div>
  );
};

export default SetPassword;
