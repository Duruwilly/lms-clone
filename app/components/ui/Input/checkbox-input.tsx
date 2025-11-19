import type { InputHTMLAttributes } from "react";
import { Paragraph } from "../paragraph";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean | string[];
  label?: string;
}

const Checkbox = ({ id, label, checked, onChange }: IProps) => {
  return (
    <label className="custom-checkbox-container" htmlFor={id}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span className="checkmark"></span>

      <Paragraph className="text-sm !text-(--color-text-secondary) font-Inter-SemiBold">
        {label}
      </Paragraph>
    </label>
  );
};

export default Checkbox;
