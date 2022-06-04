import styled from 'styled-components';

import RelinkLogoIcon from '../../assets/icons/RelinkLogoIcon';

const Icon = styled(RelinkLogoIcon)`
  flex: none;
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 89px;

  fill: var(--color-text-primary);
`;

const HeaderLogo = () => (
  <a href="">
    <Icon />
  </a>
);

export default HeaderLogo;
