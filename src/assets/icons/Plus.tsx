import {FC, memo, SVGAttributes} from 'react';

const PlusIcon: FC<SVGAttributes<SVGElement>> = props => (
  <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.698 0H7.302c-.124 0-.186.06-.186.178v6.978H.186c-.124 0-.186.059-.186.177v1.334c0 .118.062.178.186.178h6.93v6.977c0 .119.062.178.186.178h1.396c.124 0 .186-.06.186-.178V8.845h6.93c.124 0 .186-.06.186-.178V7.333c0-.118-.062-.177-.186-.177h-6.93V.178C8.884.059 8.822 0 8.698 0Z"
      fill="currentColor"
    />
  </svg>
);

export default memo(PlusIcon);
