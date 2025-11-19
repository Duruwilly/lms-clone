import { Outlet, useNavigate } from "react-router";
import EduLogo from "~/assets/svg/svgs/edu-logo";
import AuthLayoutBg2 from "~/assets/images/auth-layout-bg.png";
import { Paragraph } from "~/components/ui/paragraph";
import { Year } from "~/lib/constants/app";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto flex lg:flex-row flex-col">
      <div className="w-full lg:max-w-[50%] h-screen bg-white z-20 px[50px] pb-20 pt-10 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="w-[90%] md:max-w-[360px] mx-auto mb-8 lg:mb-24">
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <EduLogo />
            </div>
            <Outlet />
          </div>
        </div>

        <div className="w-[90%] md:max-w-[360px] mx-auto flex max-[767px]:justify-center">
          <div className="py-8 absolute bottom-0">
            <Paragraph className="!text-(--color-text-secondary) text-sm">
              Powered by{" "}
              <span className="text-(--color-texts-primary) text-sm">
                OryonTech AI
              </span>
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="w-full lg:max-w-[50%] pt-8 px-[50px] hscreen relative bg-[linear-gradient(150deg,#006B3C,#00A060,#006B3C)] block max-[767px]:hidden">
        <div className="flex flex-col gap-2 w-full max-w[531px]">
          <Paragraph
            variant="h1"
            className="!text-(--color-texts-active) font-Inter-SemiBold font-semibold text-[37px]"
          >
            One Platform for Every Learner
          </Paragraph>
          <Paragraph className="!text-[#fefefecc] text-base w-full max-w-[531px]">
            A unified platform built to connect students, lecturers, and admins
            in one learning platform.
          </Paragraph>
        </div>

        <img src={AuthLayoutBg2} alt="" className="object-cover" />

        <Paragraph className="mt-auto !text-(--color-texts-active) text-sm absolute bottom-0 py-8">
          © {Year} EduPlatform. All rights reserved.
        </Paragraph>
      </div>
    </div>
  );
};

export default AuthLayout;
