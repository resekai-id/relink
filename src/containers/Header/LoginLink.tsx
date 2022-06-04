import styled from 'styled-components';

const Link = styled.a`
  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  display: flex;
  align-items: center;

  text-decoration: none;

  color: var(--color-text-primary);

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const HeaderLoginLink = () => <Link href="#">Login</Link>;

export default HeaderLoginLink;
