const CheckCircleBroken = (props: IconType) => (
  <svg
    width={props.width || 32}
    height={props.height || 32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    {...props}
  >
    <path
      d="M29.3334 14.7808V16.0075C29.3317 18.8827 28.4007 21.6804 26.6791 23.9832C24.9576 26.2861 22.5377 27.9708 19.7805 28.786C17.0233 29.6012 14.0764 29.5033 11.3793 28.5069C8.68226 27.5105 6.37956 25.6689 4.81463 23.2569C3.24971 20.8448 2.50641 17.9916 2.69559 15.1226C2.88477 12.2536 3.9963 9.52257 5.86439 7.3369C7.73249 5.15123 10.2571 3.62798 13.0616 2.99433C15.8661 2.36068 18.8004 2.65058 21.4267 3.8208M29.3334 5.33317L16 18.6798L12 14.6798"
      stroke={props.color || "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CheckCircleBroken;
