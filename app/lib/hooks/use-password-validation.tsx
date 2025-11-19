import { useEffect, useState } from "react";

export type PasswordValidations = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  specialChar: boolean;
};

export const usePasswordValidation = (password: string) => {
  const [validations, setValidations] = useState<PasswordValidations>({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  useEffect(() => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const specialChar = /[^A-Za-z0-9]/.test(password);

    setValidations({ length, uppercase, lowercase, specialChar });
  }, [password]);

  return validations;
};
