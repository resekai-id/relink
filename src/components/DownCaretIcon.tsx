import {FC} from 'react';

export type DownCaretIconProps = React.SVGAttributes<SVGElement>;

const DownCaretIcon: FC<DownCaretIconProps> = props => (
  <svg viewBox="0 0 9 7" fill="inherit" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.171947 0.702509C0.282188 0.572836 0.431623 0.5 0.587429 0.5C0.743236 0.5 0.892671 0.572836 1.00291 0.702509L4.50707 4.8295L8.01124 0.702509C8.12269 0.580195 8.27011 0.513606 8.42242 0.516771C8.57474 0.519936 8.72007 0.592608 8.82779 0.719477C8.93552 0.846346 8.99722 1.0175 8.99991 1.1969C9.0026 1.37629 8.94606 1.5499 8.8422 1.68117L4.92256 6.29749C4.81232 6.42716 4.66288 6.5 4.50707 6.5C4.35127 6.5 4.20183 6.42716 4.09159 6.29749L0.171947 1.68117C0.061844 1.55133 0 1.37534 0 1.19184C0 1.00834 0.061844 0.832344 0.171947 0.702509V0.702509Z"
      fill="inherit"
    />
  </svg>
);

export default DownCaretIcon;
