import React from "react";
import classNames from "classnames";

type Variant = "h1" | "h2" | "h3" | "body" | "small";

interface TypographyProps {
  children: React.ReactNode;
  variant?: Variant;
  color?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const variantStyles: Record<Variant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  body: "text-base",
  small: "text-sm",
};

export const Paragraph: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  color,
  className,
}) => {
  const Comp = variant.startsWith("h") ? variant : "p";

  return (
    <Comp
      className={classNames(
        variantStyles[variant],
        "transition-colors duration-300",
        className,
      )}
      style={{
        color: color || "var(--color-texts-neutral)",
      }}
    >
      {children}
    </Comp>
  );
};
