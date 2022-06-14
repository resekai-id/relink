import styled from 'styled-components';

import SearchIcon from '../../assets/icons/Search';

const LinkListSearchInput = styled.input`
  box-sizing: border-box;

  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 500;
  font-size: 0.875em;
  line-height: 1em;

  color: var(--color-text-secondary);

  outline: none;
  border: none;

  flex: none;
  order: 1;
  flex-grow: 1;

  :placeholder-shown {
    font-weight: 400;

    color: var(--color-text-tertiary);
  }
`;

const LinkListSearchIcon = styled(SearchIcon)`
  fill: var(--color-text-secondary);

  width: 1em;
  height: auto;

  flex: none;
  order: 0;
  flex-grow: 0;

  ${LinkListSearchInput}:placeholder-shown + & {
    fill: var(--color-text-tertiary);
  }
`;

const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  gap: 0.5em;

  position: relative;
  width: 100%;
  height: 3em;

  padding: 1em;

  border-bottom: var(--border-primary);
`;

const LinkListSearch = () => (
  <Container>
    <LinkListSearchInput type={'text'} placeholder={'Search by name, alias, or tags'} />
    <LinkListSearchIcon />
  </Container>
);

export default LinkListSearch;
