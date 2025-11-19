import Input from "~/components/ui/Input/text-input";
import type { Route } from "../../required-auth/+types/layout";
import InputPassword from "~/components/ui/Input/password-input";
import Button from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema, type TLogin } from "./validations/login";
import AuthTitleHeader from "~/components/general/auth-title-header";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useLoginServices } from "./services";
import { LocalStorageHelpers } from "~/lib/helpers/local-storage-helpers";
import { LocalStorageKeys, roleMapping } from "~/lib/constants/app";
import { APP_ROUTES } from "~/lib/constants/app-routes";
import { Toast } from "~/config/toast";
import AccountLocked from "./components/account-locked";
import { useDisclosure } from "~/lib/hooks/use-disclosure";
import Checkbox from "~/components/ui/Input/checkbox-input";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LMS Admin | Login" },
    { name: "description", content: "Log in to your Admin account." },
  ];
}

const Login = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const { authLogin } = useLoginServices();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<TLogin>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    mutate(data);
  };

  const emailWatch = watch("email");

  const { mutate, isPending } = useMutation({
    mutationFn: authLogin,
    onSuccess: async (res) => {
      LocalStorageHelpers.set(LocalStorageKeys.auth_token, "token");
      const roleProfileRoute =
        roleMapping[res.role as keyof typeof roleMapping];
      navigate(APP_ROUTES[roleProfileRoute as keyof RouteGroups].dashboard);
    },
    onError: () => {
      // Toast.error("error!");
      Toast.success("Verification code sent to your email.");
      navigate(APP_ROUTES.verify_otp, { state: { email: emailWatch } });
    },
  });

  return (
    <>
      {/* <div className="mt-[140px] flex flex-col gap-12">
       maybe a page header here
       <form className="flex flex-col gap-11" onSubmit={handleSubmit(onSubmit)}>
         <div className="flex flex-col gap-[22px]">
           <Input
             label="Email address"
             placeholder="Enter email address"
             {...register("email")}
             error={errors.email?.message}
             className="bg-transparent"
           />
           <div className="flex flex-col gap-2.5">
             <InputPassword
               label="Password"
               placeholder="Enter password"
               {...register("password")}
               error={errors.password?.message}
               className="bg-transparent"
             />
             <Link
               to={"/forgot-password"}
               className="text-sm font-medium text-right"
             >
               Forgot password
             </Link>
           </div>
         </div>
         <Button text="Login" />
       </form>
     </div> */}
      <div className="mt-14 md:mt-20 flex flex-col gap-8">
        <AuthTitleHeader
          title="Log in"
          desc="Welcome back! Please enter your details."
        />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <Input
              label="Email"
              placeholder="Enter email address"
              {...register("email")}
              error={errors.email?.message}
              className="bg-(--color-surface)"
            />
            <InputPassword
              label="Password"
              placeholder="Enter password"
              {...register("password")}
              error={errors.password?.message}
              className="bg-(--color-surface)"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms-agreement"
                label="Remember me"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
            </div>
            <Link
              to={APP_ROUTES.forgot_password}
              className="text-sm font-semibold font-Inter-SemiBold text-(--color-texts-primary)"
            >
              Forgot password
            </Link>
          </div>
          <Button text="Sign in" isLoading={isPending} disabled={isPending} />
        </form>
      </div>

      <AccountLocked isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Login;
