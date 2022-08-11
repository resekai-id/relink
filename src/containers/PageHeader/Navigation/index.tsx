import {ComponentProps, useState} from 'react';
import styled from 'styled-components';

import theme from '../../../constants/client/theme';

import HamburgerIcon from '../../../assets/icons/Hamburger';

import PageNavigationList from './List';

const PageNavigationIcon = styled(HamburgerIcon)`
  cursor: pointer;

  display: inline-block;

  width: 1.25em;

  transition: fill 0.2s ease-in-out;

  color: ${({isActive}: {isActive: boolean}) =>
    isActive ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'};

  @media screen and (min-width: ${theme.breakpoints.laptop}) {
    display: none;

    content-visibility: hidden;
  }
`;

const Container = styled.div`
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const PageNavigation = () => {
  const [isActive, setIsActive] = useState(false);

  const handleNavigationClick = () => setIsActive(!isActive);

  return (
    <Container>
      <PageNavigationIcon isActive={isActive} onClick={handleNavigationClick} />
      <PageNavigationList isNavigationActive={isActive} onNavigate={handleNavigationClick} />
    </Container>
  );
};

export default PageNavigation;
