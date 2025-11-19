import classNames from "classnames";

const CheckIcon = (props: IconType) => {
  const fallbackColor = "var(--color-icon-neutral)";

  const fillValue = props.color
    ? props.color
    : props.className
      ? "currentColor"
      : fallbackColor;

  return (
    <svg
      width={props.width || 10}
      height={props.height || 9}
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("transition-colors", props.className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.95534 0.228697L2.98867 5.98703L1.40534 4.29536C1.11367 4.02036 0.655338 4.0037 0.322005 4.23703C-0.00299511 4.4787 -0.094662 4.9037 0.105338 5.24536L1.98034 8.29536C2.16367 8.5787 2.48034 8.7537 2.83867 8.7537C3.18034 8.7537 3.50534 8.5787 3.68867 8.29536C3.98867 7.9037 9.71367 1.0787 9.71367 1.0787C10.4637 0.31203 9.55534 -0.362969 8.95534 0.220364V0.228697Z"
        fill={fillValue}
      />
    </svg>
  );
};

export default CheckIcon;
