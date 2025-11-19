import { Select } from "antd";
import type { InputHTMLAttributes } from "react";
import Label from "../label";
import classNames from "classnames";
import { MdKeyboardArrowDown } from "react-icons/md";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string | boolean | string[];
  label?: string;
  options: Array<{ value: string; label: string }>;
  setValue: (name: string, value: string) => void;
  showSearch?: boolean;
  value?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
}

const MultiInputSelect = ({
  options,
  error,
  label,
  placeholder,
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
      {label && <Label label={label ?? ""} />}

      <div
        className={classNames(
          "flex items-center border rounded-xl w-full px-3 py-[5px] transition-all",
          className,
          {
            "border-(--color-error-text) !bg-(--color-error-bg)": error,
            "border-(--color-grey-700) bg-(--color-grey-400)": !error,
          },
        )}
      >
        <Select
          mode="multiple"
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

      {error && <small className="px-3 text-red-500">{error}</small>}
    </div>
  );
};

export default MultiInputSelect;
