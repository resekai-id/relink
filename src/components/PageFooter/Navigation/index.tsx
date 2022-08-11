import styled from 'styled-components';
import Link from 'next/link';

import {footerPages} from '../../../constants/client/navigation';

import FooterNavigationListItem from './Item';
import FooterNavigationLink from './Link';

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
