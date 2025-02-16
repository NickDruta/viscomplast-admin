interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

const KeyboardLeftIcon = ({
  width = 14,
  height = 11,
  stroke = "#161819",
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.465 5.5L1.46497 5.5M1.46497 5.5L6.0483 10M1.46497 5.5L6.0483 1"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default KeyboardLeftIcon;
