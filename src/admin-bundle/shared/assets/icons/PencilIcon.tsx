interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

const PencilIcon = ({ width = 24, height = 24, stroke = "#2C35FF" }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 20.695H18.5M6.50736 19.695H5C4.44772 19.695 4 19.2473 4 18.695V17.1876C4 16.392 4.31607 15.6289 4.87868 15.0663L14.75 5.19499C15.7855 4.15945 17.4645 4.15945 18.5 5.19499C19.5355 6.23052 19.5355 7.90945 18.5 8.94499L8.62868 18.8163C8.06607 19.3789 7.30301 19.695 6.50736 19.695Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PencilIcon;
