import styled from 'styled-components';

const HeaderLink = styled.a`
  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 500;
  line-height: 1.5em;

  text-decoration: none;

  color: var(--color-text-primary);

  transition: color 0.2s ease-in-out;

  user-select: none;

  :hover {
    color: var(--color-text-secondary);
  }
`;

export default HeaderLink;
