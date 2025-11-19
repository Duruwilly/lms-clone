import React, { forwardRef, type InputHTMLAttributes } from "react";
import Label from "../label";
import classNames from "classnames";
import { Paragraph } from "../paragraph";
import InfoCircle from "~/assets/svg/icons/info-circle";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string | boolean | string[];
  label?: string;
  isRequired?: boolean;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, isRequired, preIcon, postIcon, className, error, ...rest },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && <Label label={label ?? ""} isRequired={isRequired} />}
        <div
          className={classNames(
            `w-full relative ${preIcon ? "pl-10" : "pl-4"} ${
              postIcon ? "pr-10" : "pr-4"
            }
          py-2.5 border ${
            !error
              ? "border-(--color-grey-700) bg-(--color-grey-400)"
              : "border-(--color-error-text) !bg-(--color-error-bg)"
          } rounded-xl focus:outline-none text-base`,
            className,
          )}
        >
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            {...rest}
            className="w-full border-none bg-transparent placeholder:text-(--color-text-secondary) text-base"
          />

          {preIcon && (
            <div className="absolute top-0 bottom-0 left-3 flex items-center justify-start">
              <div className="mr-1">{preIcon}</div>
            </div>
          )}

          {postIcon && (
            <div className="absolute top-0 bottom-0 right-3 flex items-center justify-start">
              <div className="ml-1">{postIcon}</div>
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1 pt-1">
            <InfoCircle className="text-(--color-error-text)" />
            <Paragraph className="!text-(--color-error-text) text-sm">
              {error}
            </Paragraph>
          </div>
        )}
      </div>
    );
  },
);

export default Input;
