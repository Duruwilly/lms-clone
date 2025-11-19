import React from "react";
import CheckIcon from "~/assets/svg/icons/check-icon";
import type { PasswordValidations } from "~/lib/hooks/use-password-validation";
import { Paragraph } from "../ui/paragraph";

type PasswordChecklistProps = {
  validations: PasswordValidations;
};

const ChecklistItem: React.FC<{ label: string; isValid: boolean }> = ({
  label,
  isValid,
}) => (
  <div className="flex items-center gap-2">
    <div
      className={`size-5 rounded-full flex items-center justify-center ${
        isValid ? "bg-(--color-sucess-bg)" : "bg-(--color-grey-600)"
      }`}
    >
      <CheckIcon
        className={
          isValid ? "text-(--color-success-text)" : "text-(--color-grey-700)"
        }
      />
    </div>
    <Paragraph className={"!text-(--color-text-secondary) text-sm"}>{label}</Paragraph>
  </div>
);

export const PasswordChecklist: React.FC<PasswordChecklistProps> = ({
  validations,
}) => (
  <div className="mt-5 flex flex-col gap-3 w-full">
    <ChecklistItem
      label="Must be at least 8 characters"
      isValid={validations.length}
    />
    <ChecklistItem
      label="Must contain one upper case letter"
      isValid={validations.uppercase}
    />
    <ChecklistItem
      label="Must contain one lower case letter"
      isValid={validations.lowercase}
    />
    <ChecklistItem
      label="Must contain one special character"
      isValid={validations.specialChar}
    />
  </div>
);
