import type { FC } from "react";

interface SwitchProps {
  onToggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  value: boolean;
}

const Switch: FC<SwitchProps> = ({ onToggle, value }) => {
  return (
    <div
      onClick={(e) => {
        onToggle(e);
      }}
      className={`w-9 h-5 flex items-center bg-(--color-grey-700) rounded-full cursor-pointer transition-colors ${
        value ? "bg-(--color-icon-primary)" : "bg-(--color-grey-700)"
      }`}
    >
      <div
        className={`bg-(--color-grey-50) w-[15px] h-[15px] rounded-full shadow-md transform transition-transform ${
          value ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </div>
  );
};

export default Switch;
