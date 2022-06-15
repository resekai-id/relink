import {FC, memo, SVGAttributes} from 'react';

const HamburgerIcon: FC<SVGAttributes<SVGElement>> = props => (
  <svg viewBox="0 0 18 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18 12H0v-2h18v2Zm0-5H0V5h18v2Zm0-5H0V0h18v2Z" fill="currentColor" />
  </svg>
);

export default memo(HamburgerIcon);
