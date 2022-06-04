import Link from 'next/link';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import RelinkLogoIcon from '../../components/RelinkLogoIcon';

const Icon = styled(RelinkLogoIcon)`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 89px;

  fill: var(--color-text-primary);
`;

const Test = styled.a`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  font-family: ${theme.fonts.display};
  font-style: normal;
  font-weight: 900;
  font-size: 28px;
  line-height: 32px;
  text-decoration: none;
  color: #000;

  :hover {
    text-decoration: underline;
  }
`;

const HeaderLogo = () => (
  <Link href={'/'} passHref>
    <Test>relink.</Test>
  </Link>
);

export default HeaderLogo;
