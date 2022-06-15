import styled from 'styled-components';

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

export default FooterNavigationLink;
