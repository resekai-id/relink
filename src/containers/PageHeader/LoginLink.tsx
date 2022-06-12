import Link from 'next/link';

import styled from 'styled-components';
import HeaderLink from './Link';

import theme from '../../constants/client/theme';
import {useAppSelector} from '../../store';
import {SessionStateStatus} from '../../store/slices/session/types';

const LoginLink = styled(HeaderLink)`
  z-index: -2;

  display: none;

  align-items: center;

  content-visibility: hidden;

  font-weight: 500;

  :hover {
    font-weight: 600;
    font-style: italic;
  }

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    display: unset;

    content-visibility: visible;
  }
`;

const HeaderLoginLink = () => {
  const session = useAppSelector(state => state.session);

  return session.status !== SessionStateStatus.Ready ||
    (session.status === SessionStateStatus.Ready && session.type === 'UNREGISTERED') ? (
    <Link href={'/login'} passHref>
      <LoginLink>Login</LoginLink>
    </Link>
  ) : (
    <></>
  );
};

export default HeaderLoginLink;
