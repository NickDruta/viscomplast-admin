interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

const BinIcon = ({ width = 24, height = 24, stroke = "#FD4B4B" }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99996 6L8.54411 4.36754C8.81634 3.55086 9.58061 3 10.4415 3H13.5584C14.4193 3 15.1836 3.55086 15.4558 4.36754L16 6M7.99996 6H5.61799C4.87461 6 4.39111 6.78231 4.72356 7.44721L5.21259 8.42527C5.40202 8.80413 5.50907 9.2188 5.52671 9.64201L5.88016 18.1249C5.94711 19.7318 7.26928 21 8.87756 21H15.1224C16.7306 21 18.0528 19.7318 18.1198 18.1249L18.4732 9.64202C18.4908 9.21881 18.5979 8.80413 18.7873 8.42527L19.2763 7.44721C19.6088 6.78231 19.1253 6 18.3819 6H16M7.99996 6H16M14.4399 16.5L14.6899 10.5M9.56001 16.5L9.31001 10.5"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BinIcon;
