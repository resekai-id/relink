import {FC, SVGAttributes} from 'react';

const SearchIcon: FC<SVGAttributes<SVGElement>> = props => (
  <svg viewBox="0 0 16 16" fill="inherit" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.435 10.063h-.723l-.256-.247a5.92 5.92 0 0 0 1.437-3.87 5.946 5.946 0 1 0-5.947 5.947 5.92 5.92 0 0 0 3.87-1.437l.247.256v.723L14.637 16 16 14.637l-4.565-4.574Zm-5.489 0A4.111 4.111 0 0 1 1.83 5.946 4.111 4.111 0 0 1 5.946 1.83a4.111 4.111 0 0 1 4.117 4.116 4.111 4.111 0 0 1-4.117 4.117Z" />
  </svg>
);

export default SearchIcon;
