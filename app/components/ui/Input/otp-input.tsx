import { useRef, useState } from "react";
import InfoCircle from "~/assets/svg/icons/info-circle";
import { Paragraph } from "../paragraph";

type OtpInputProps = {
  length: number;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  width?: string;
  height?: string;
};

const OtpInput = ({
  length,
  value,
  onChange,
  error,
  width = "50px",
  height = "49px",
}: OtpInputProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const otpArray = value
    ?.split("")
    ?.concat(new Array(length - value.length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    if (isNaN(Number(text))) return;

    const newOtp = [...otpArray];
    newOtp[index] = text;
    const joined = newOtp.join("");
    onChange(joined);

    if (text !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && otpArray[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-[12px] items-center">
        {otpArray?.map((char, index) => (
          <input
            placeholder={focusedIndex === index ? "|" : ""}
            key={index}
            className={`rounded-xl text-(--color-texts-neutral) text-center text-[26px]
              border focus:outline-none focus:border-(--color-primary-500) placeholder-(--color-primary-500) placeholder-opacity-100 placeholder:font-bold ${
                !error
                  ? "border-(--color-border-secondary) bg-(--color-surface)"
                  : "border-(--color-error-text) bg-(--color-error-bg)"
              }
            `}
            value={char}
            onChange={(e) => handleChangeText(e.target.value, index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            style={{ width, height }}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
          />
        ))}
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

export default OtpInput;
