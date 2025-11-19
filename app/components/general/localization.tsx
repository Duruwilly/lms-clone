import { useState } from "react";
import { Paragraph } from "../ui/paragraph";
import ArrowDown from "~/assets/svg/icons/arrow-down";
import { LuGlobe } from "react-icons/lu";
import { Dropdown, Space, type MenuProps } from "antd";

const Localization = () => {
  const [language, setLanguage] = useState("English");
  const actions: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => {
            setLanguage("English");
          }}
        >
          <Paragraph>English</Paragraph>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => {
            setLanguage("Français");
          }}
        >
          <Paragraph>Français</Paragraph>
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <Dropdown menu={{ items: actions }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className="bg-(--color-primary) border border-(--color-border-secondary) flex items-center justify-between p-2.5 w-[147px] rounded-lg shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] cursor-pointer">
            <div className="flex items-center gap-2">
              <LuGlobe size={20} />
              <Paragraph className="text-base">{language}</Paragraph>
            </div>
            <ArrowDown className="text-(--color-icon-secondary)" />
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};

export default Localization;
