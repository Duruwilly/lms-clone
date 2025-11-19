const SearchIcon = ({
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
    <circle
      cx="9"
      cy="9"
      r="6"
      stroke={color || "currentColor"}
      strokeWidth="1.5"
    />
    <line
      x1="13.5"
      y1="13.5"
      x2="17"
      y2="17"
      stroke={color || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default SearchIcon;
