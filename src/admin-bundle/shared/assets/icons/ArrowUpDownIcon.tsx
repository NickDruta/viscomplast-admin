interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const ArrowUpDownIcon = ({
  width = 9,
  height = 11,
  fill = "#242F31",
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 9 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.25 0.5L0.25 4.5H8.25L4.25 0.5ZM4.25 10.5L0.25 6.5H8.25L4.25 10.5Z"
      fill={fill}
    />
  </svg>
);

export default ArrowUpDownIcon;
