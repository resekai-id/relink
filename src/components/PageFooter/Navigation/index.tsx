import Link from 'next/link';
import styled from 'styled-components';

import {footerPages} from '../../../constants/client/navigation';

const FooterNavigationLink = styled.a`
  font-family: var(--font-secondary);
  font-style: normal;
  font-weight: 400;
  font-size: 0.9em;

  color: var(--color-text-secondary);

  text-decoration: none;

  &:hover {
    color: var(--color-text-primary);
  }
`;

const FooterNavigationListItem = styled.li`
  display: inline-block;

  padding-left: 0.5em;
  padding-right: 0.5em;

  border-right: var(--border-primary);

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;

    border-right: unset;
  }
`;

const Container = styled.ul`
  list-style: none;

  margin: 0;
  padding: 0;

  @media screen and (max-width: 20.625em) {
    display: none;
  }
`;

const FooterNavigation = () => (
  <Container>
    {footerPages.map(({label, path}) => (
      <FooterNavigationListItem key={label}>
        <Link href={path} passHref>
          <FooterNavigationLink>{label}</FooterNavigationLink>
        </Link>
      </FooterNavigationListItem>
    ))}
  </Container>
);

export default FooterNavigation;
