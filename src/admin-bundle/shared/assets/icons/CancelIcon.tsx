interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

const CancelIcon = ({ width = 24, height = 24, stroke = "#FD4B4B" }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.05029 7.05029L12.0503 12.0503M12.0503 12.0503L17.0503 17.0503M12.0503 12.0503L7.05029 17.0503M12.0503 12.0503L17.0503 7.05029"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CancelIcon;
