import React, { forwardRef, type TextareaHTMLAttributes } from "react";
import Label from "../label";
import classNames from "classnames";
import { Paragraph } from "../paragraph";
import InfoCircle from "~/assets/svg/icons/info-circle";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  error?: string | boolean | string[];
  rows?: number;
  label?: string;
  isRequired?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ name, error, rows, label, className, isRequired, ...rest }, ref) => {
    return (
      <div className="w-full">
        <Label label={label ?? ""} isRequired={isRequired} />
        <textarea
          rows={rows}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          name={name}
          {...rest}
          className={classNames(
            `w-full px-4 py-2.5 border ${
              error
                ? "border-(--color-error-text) !bg-(--color-error-bg)"
                : "border-(--color-grey-700) bg-(--color-grey-400)"
            } rounded-xl focus:outline-none text-base font-montserrat placeholder:text-(--color-text-secondary)`,
            className,
          )}
        />
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

export default TextArea;
