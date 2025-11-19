const ArrowDown = ({
  width = 20,
  height = 20,
  color,
  className,
  ...props
}: IconType) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M15.8332 7.5L9.99984 12.5L4.1665 7.5"
      stroke={color || "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowDown;
