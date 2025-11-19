import type { ReactNode } from "react";
import { Paragraph } from "../ui/paragraph";

interface AuthHeaderProps {
  title: string | ReactNode;
  desc: string | ReactNode;
}

const AuthTitleHeader = ({ title, desc }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Paragraph className="font-Inter-SemiBold font-semibold text-[24px] md:text[37px]">
        {title}
      </Paragraph>
      <Paragraph className="!text-(--color-text-secondary) text-base">
        {desc}
      </Paragraph>
    </div>
  );
};

export default AuthTitleHeader;
