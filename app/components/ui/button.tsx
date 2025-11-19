import classNames from "classnames";
import type { ComponentProps } from "react";
import { Loader } from "lucide-react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?:
    | "filled"
    | "transparent"
    | "primary"
    | "secondary"
    | "light"
    | "danger";
  text: string;
  isLoading?: boolean;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "small";
  padding?: string;
}

const Button = ({
  text,
  variant = "primary",
  className,
  isLoading,
  postIcon,
  preIcon,
  padding = "10px",
  type = "submit",
  ...rest
}: ButtonProps) => {
  const variantClassName = {
    primary: `bg-(--color-primary-500) text-(--color-grey-50)`,
    secondary: ``,
    transparent: `bg-(--color-btn-outline) text-(--color-text-secondary) border border-(--color-border-secondary)`,
    danger: `bg-(--color-error-text) text-(--color-grey-50)`,
  };

  return (
    <button
      type={type}
      className={classNames(
        `rounded-lg px-3 disabled:opacity-45 transition duration-300 flex flex-row items-center justify-center gap-1 cursor-pointer w-full font-semibold text-sm font-Inter-SemiBold`,
        variantClassName[variant as keyof typeof variantClassName],
        className,
      )}
      style={{ paddingTop: padding, paddingBottom: padding }}
      {...rest}
    >
      {preIcon && preIcon}
      {isLoading && (
        <Loader className="absolute h-6 w-6 animate-spin text-white" />
      )}
      <span
        className={`${isLoading ? "invisible" : "visible"} flex items-center gap-2`}
      >
        {text}
      </span>
      {postIcon && postIcon}
    </button>
  );
};

export default Button;
