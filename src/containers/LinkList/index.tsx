import styled from 'styled-components';
import LinkListSearch from './Search';

const Container = styled.div`
  font-size: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 20.4375em;
  height: 37.1875em;

  background: var(--color-background-secondary);

  overflow: clip;

  border: var(--border-primary);
  box-shadow: var(--shadow-primary);
  border-radius: 0.5em;
`;

const LinkList = () => (
  <Container>
    <LinkListSearch />
  </Container>
);

export default LinkList;
