import React, { useState, forwardRef, type InputHTMLAttributes } from "react";
import Label from "../label";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import classNames from "classnames";
import InfoCircle from "~/assets/svg/icons/info-circle";
import { Paragraph } from "../paragraph";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string | boolean | string[];
  label?: string;
  isRequired?: boolean;
  postIcon?: React.ReactNode;
}

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isRequired, postIcon, className, error, ...rest }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="w-full relative">
        <Label label={label ?? ""} isRequired={isRequired} />
        <div
          className={classNames(
            `relative w-full pl-4 
          py-2.5 border flex items-center justify-start  ${
            !error
              ? "border-(--color-grey-700) bg-(--color-grey-400)"
              : "border-(--color-error-text) !bg-(--color-error-bg)"
          } rounded-xl focus:outline-none`,
            className,
          )}
        >
          <input
            type={show ? "text" : "password"}
            ref={ref as React.Ref<HTMLInputElement>}
            {...rest}
            className={`${
              postIcon ? "pr-10" : "pr-4"
            } border border-none bg-transparent text-base placeholder:text-(--color-text-secondary) w-full`}
          />
          <div className="absolute top[35px] right-3">
            <div className="ml-1 cursor-pointer" onClick={() => setShow(!show)}>
              {!show ? (
                <AiFillEyeInvisible size={24} className="text-gray-500" />
              ) : (
                <AiFillEye size={24} className="text-gray-500" />
              )}
            </div>
          </div>
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

export default InputPassword;
