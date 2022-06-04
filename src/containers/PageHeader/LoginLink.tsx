import Link from 'next/link';

import styled from 'styled-components';
import HeaderLink from '../../components/HeaderLink';

import theme from '../../constants/client/theme';

const LoginLink = styled(HeaderLink)`
  display: flex;

  flex: none;
  order: 1;
  flex-grow: 0;

  align-items: center;

  content-visibility: hidden;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    content-visibility: visible;
  }
`;

const HeaderLoginLink = () => (
  <Link href={'/login'} passHref>
    <LoginLink>Login</LoginLink>
  </Link>
);

export default HeaderLoginLink;
