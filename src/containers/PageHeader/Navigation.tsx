import Link from 'next/link';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import HamburgerIcon from '../../components/HamburgerIcon';

const Icon = styled(HamburgerIcon)`
  display: inline-block;

  width: 18px;

  fill: var(--color-text-primary);
`;

const Container = styled.div`
  flex: none;
  order: 0;
  flex-grow: 0;

  ul {
    content-visibility: hidden;

    list-style: none;

    padding: 0;
    margin: 0;

    li {
      display: inline-block;

      margin-left: 24px;

      &:first-child {
        margin-left: 0;
      }

      a {
        text-decoration: none;

        color: var(--color-text-primary);
        font-family: var(--font-secondary);
        font-style: normal;
        font-weight: 500;
        font-size: 16px;

        :hover {
          color: var(--color-text-secondary);
        }
      }
    }
  }

  @media screen and (min-width: ${theme.breakpoints.laptop}) {
    ${Icon} {
      position: absolute;

      content-visibility: hidden;
    }

    ul {
      content-visibility: visible;
    }
  }
`;

const HeaderNavigation = () => (
  <Container>
    <Icon />
    <ul>
      <li>
        <Link href={'/'} passHref>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href={'/shorten'} passHref>
          <a>Shorten</a>
        </Link>
      </li>
      <li>
        <Link href={'/upgrade'} passHref>
          <a>Upgrade</a>
        </Link>
      </li>
    </ul>
  </Container>
);

export default HeaderNavigation;
