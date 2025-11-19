import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import CallIcon from "~/assets/svg/icons/call-icon";
import LockedIcon from "~/assets/svg/icons/locked-icon";
import MailBox from "~/assets/svg/icons/mail-box";
import Button from "~/components/ui/button";
import Modal from "~/components/ui/modal";
import { Paragraph } from "~/components/ui/paragraph";

interface AccountLockedArgs {
  isOpen: boolean;
  onClose: () => void;
}

const AccountLocked = ({ isOpen, onClose }: AccountLockedArgs) => {
  return (
    <Modal
      title=""
      isOpen={isOpen}
      showCloseIcon={false}
      styles={{
        content: {
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        body: {
          boxShadow: "none",
        },
      }}
      close={onClose}
    >
      <div
        className={`bg-white rounded-2xl min-[624px]:w-[588px] flex flex-col gap-4 relative px-6 py-4`}
      >
        <div className="">
          <div className="p-2 flex justify-end" onClick={onClose}>
            <IoCloseSharp size={24} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="bg-(--color-warning-bg) size-14 p-4 rounded-full mx-auto">
                <LockedIcon />
              </div>
              <Paragraph className="text-center font-semibold font-Inter-SemiBold text-base">
                Account Locked
              </Paragraph>
              <Paragraph className="text-center w-full max-w-[404px] !text-(--color-text-secondary) text-sm">
                Your account has been locked due to multiple failed login
                attempts for security reasons.
              </Paragraph>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-(--color-grey-250) p-4 rounded-xl flex flex-col gap-4">
                <Paragraph className="!text-(--color-text-secondary) text-sm">
                  To unlock your account, please contact your administrator
                  through one of the following methods:
                </Paragraph>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MailBox />
                    <a
                      href="mailto:support@learnhub.edu"
                      className="!text-(--color-texts-neutral)"
                    >
                      support@learnhub.edu
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <CallIcon />
                    <a
                      href="tel:+1 (234) 567-890"
                      className="!text-(--color-texts-neutral)"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-(--color-Blue-50) p-4 rounded-xl">
                <Paragraph className="font-semibold font-Inter-SemiBold !text-(--color-Blue-500)">
                  Security Tip:{" "}
                  <span className="font-normal font-Inter-Regular">
                    For your protection, we've temporarily locked your account.
                    This helps prevent unauthorized access.
                  </span>
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto pt-8 pb-4">
          <Button text="I Understand" />
        </div>
      </div>
    </Modal>
  );
};

export default AccountLocked;
