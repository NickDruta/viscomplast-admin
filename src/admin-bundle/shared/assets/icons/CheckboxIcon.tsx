interface Props {
  width?: number;
  height?: number;
  selected?: boolean;
}

const CheckboxIcon = ({ width = 30, height = 30, selected = false }: Props) => (
  <>
    {selected ? (
      <svg
        width={width}
        height={height}
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_1445_932)">
          <rect
            x="0.666748"
            y="0.5"
            width={width - 1}
            height={height - 1}
            rx="5"
            fill="#2C35FF"
          />
          <rect
            x="1.16675"
            y="1"
            width={width - 2}
            height={height - 2}
            rx="4.5"
            stroke="#9B9B9B"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.3963 9.81605C24.774 10.219 24.7536 10.8518 24.3507 11.2295L13.6844 21.2295C13.2998 21.5901 12.7012 21.5902 12.3166 21.2296L6.98284 16.2296C6.57991 15.8518 6.55947 15.219 6.93719 14.8161C7.31491 14.4132 7.94774 14.3927 8.35067 14.7704L13.0004 19.1293L22.9828 9.77048C23.3857 9.39274 24.0185 9.41314 24.3963 9.81605Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_b_1445_932"
            x="-99.3333"
            y="-99.5"
            width="230"
            height="230"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="50" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_1445_932"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_1445_932"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ) : (
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_1445_926)">
          <rect
            x="0.5"
            y="1"
            width={width - 1}
            height={height - 1}
            rx="4.5"
            stroke="#9B9B9B"
          />
        </g>
        <defs>
          <filter
            id="filter0_b_1445_926"
            x="-100"
            y="-99.5"
            width="230"
            height="230"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="50" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_1445_926"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_1445_926"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    )}
  </>
);

export default CheckboxIcon;
