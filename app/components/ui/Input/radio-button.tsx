import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean | string[];
  label?: string;
}

const CheckRadioInput = ({ label, name, value, checked, onChange }: IProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`w-6 h-6 flex items-center justify-center rounded-full border-[1.5px]
        ${
          checked
            ? "border-(--color-icon-primary) text-white"
            : "bg-transparent border-(--color-icon-secondary)"
        }
      `}
      >
        {checked && (
          // <svg
          //   className="w-3 h-3"
          //   fill="none"
          //   stroke="currentColor"
          //   strokeWidth={3}
          //   viewBox="0 0 24 24"
          // >
          //   <path d="M5 13l4 4L19 7" />
          // </svg>
          <div className="bg-(--color-icon-primary) size-[15px] rounded-full" />
        )}
      </span>
      <span>{label}</span>
    </label>
  );
};

export default CheckRadioInput;
