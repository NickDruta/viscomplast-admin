interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

const ConfirmIcon = ({
  width = 24,
  height = 24,
  stroke = "#009521",
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 13L6.87868 15.8787C8.05025 17.0503 9.94975 17.0503 11.1213 15.8787L20 7"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ConfirmIcon;
