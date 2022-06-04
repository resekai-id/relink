import {FC} from 'react';

export type HamburgerIconProps = React.SVGAttributes<SVGElement>;

const HamburgerIcon: FC<HamburgerIconProps> = props => (
  <svg viewBox="0 0 18 12" fill="inherit" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18 12H0v-2h18v2Zm0-5H0V5h18v2Zm0-5H0V0h18v2Z" fill="inherit" />
  </svg>
);

export default HamburgerIcon;
