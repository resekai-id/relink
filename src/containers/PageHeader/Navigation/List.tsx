import {FC} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import theme from '../../../constants/client/theme';
import {headerPages} from '../../../constants/client/navigation';

import HeaderLink from '../Link';

export interface PageNavigationListProps {
  isNavigationActive: boolean;
  onNavigate: () => void;
}

const PageNavigationListItem = styled.li`
  display: ${({onlyMobileMenu}: {onlyMobileMenu: boolean}) =>
    onlyMobileMenu ? 'none' : 'inline-block'};

  margin-left: 1.5em;

  &:first-child {
    margin-left: 0;
  }

  @media screen and (max-width: calc(${theme.breakpoints.laptop} - 1px)) {
    ${({onlyMobileMenu}: {onlyMobileMenu: boolean}) => onlyMobileMenu && 'display: inline-block;'}

    display: block;

    width: 100%;

    border-bottom: var(--border-primary);

    margin-left: 0;
    padding-top: 1em;
    padding-bottom: 1em;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;

      border-bottom: none;
    }
  }
`;

const navigationActiveStyling = `
  display: block;

  box-sizing: border-box;

  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;

  padding: 1.2em;
  padding-top: 4.5em;

  width: 100%;

  border-bottom: var(--border-primary);
  box-shadow: var(--shadow-primary);
  background-color: var(--color-background-secondary);

  font-size: 0.9em;
`;

const Container = styled.ul`
  list-style: none;

  padding: 0;
  margin: 0;

  @media screen and (max-width: calc(${theme.breakpoints.laptop} - 1px)) {
    ${({isNavigationActive}: {isNavigationActive: boolean}) =>
      isNavigationActive ? navigationActiveStyling : 'display: none;'}
  }
`;

const PageNavigationList: FC<PageNavigationListProps> = ({isNavigationActive, onNavigate}) => (
  <Container isNavigationActive={isNavigationActive}>
    {headerPages.map(({label, path, onlyMobileMenu}) => (
      <PageNavigationListItem onlyMobileMenu={onlyMobileMenu} key={path}>
        <Link href={path} passHref>
          <HeaderLink onClick={onNavigate}>{label}</HeaderLink>
        </Link>
      </PageNavigationListItem>
    ))}
  </Container>
);

export default PageNavigationList;
