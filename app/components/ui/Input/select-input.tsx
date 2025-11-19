import { Select } from "antd";
import classNames from "classnames";
import { MdKeyboardArrowDown } from "react-icons/md";
import Label from "../label";
import type { InputHTMLAttributes } from "react";
import InfoCircle from "~/assets/svg/icons/info-circle";
import { Paragraph } from "../paragraph";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string | boolean | string[];
  label?: string;
  isRequired?: boolean;
  options: Array<{ value: string; label: string }>;
  setValue: (name: string, value: string) => void;
  showSearch?: boolean;
  value?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
}

const InputSelect = ({
  options,
  error,
  label,
  placeholder,
  isRequired,
  setValue,
  name,
  className,
  showSearch,
  value,
  searchValue,
  onSearch,
}: InputProps) => {
  const handleChange = (value: string) => {
    setValue(name, value);
  };

  return (
    <div className="flex flex-col w-full">
      {label && <Label label={label ?? ""} isRequired={isRequired} />}

      <div
        className={classNames(
          "flex items-center border rounded-xl w-full px-3 py-[3px] transition-all",
          className,
          {
            "border-(--color-error-text) !bg-(--color-error-bg)": error,
            "border-(--color-grey-700) bg-(--color-grey-400)": !error,
          },
        )}
      >
        <Select
          className="w-full [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!shadow-none [&_.ant-select-selector]:!py-0"
          placeholder={placeholder}
          onChange={handleChange}
          options={options}
          suffixIcon={<MdKeyboardArrowDown size={20} color="#000000" />}
          showSearch={showSearch}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          value={value}
          searchValue={searchValue}
          onSearch={onSearch}
        />
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
};

export default InputSelect;
