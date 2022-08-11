import {FC, memo, SVGAttributes} from 'react';

const BarChartIcon: FC<SVGAttributes<SVGElement>> = props => (
  <svg viewBox="0 0 10 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M3.333 1.249A1.248 1.248 0 0 1 4.583 0h.834a1.25 1.25 0 0 1 1.25 1.249V10H3.333V1.249ZM2.5 3.896H1.25A1.25 1.25 0 0 0 0 5.144v4.44c0 .23.187.416.417.416H2.5V3.896ZM7.5 10h2.083A.417.417 0 0 0 10 9.584V3.479a1.248 1.248 0 0 0-1.25-1.248H7.5V10Z"
      fill="currentColor"
    />
  </svg>
);

export default memo(BarChartIcon);
