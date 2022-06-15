import styled from 'styled-components';

import SearchIcon from '../../assets/icons/Search';

const LinkListSearchInput = styled.input`
  box-sizing: border-box;

  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 500;
  font-size: 0.875em;
  line-height: 0;

  color: var(--color-text-secondary);

  outline: none;
  border: none;
  margin: 0;
  padding: 0;

  flex: none;
  order: 1;
  flex-grow: 1;

  @supports (-webkit-touch-callout: none) {
    padding-top: 0.25em;
  }

  :placeholder-shown {
    font-weight: 400;

    color: var(--color-text-tertiary);
  }
`;

const LinkListSearchIcon = styled(SearchIcon)`
  color: var(--color-text-secondary);

  width: 0.875em;
  height: auto;

  flex: none;
  order: 0;
  flex-grow: 0;

  ${LinkListSearchInput}:placeholder-shown + & {
    color: var(--color-text-tertiary);
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

  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const LinkListSearch = () => (
  <Container>
    <LinkListSearchInput type={'text'} placeholder={'Search by name, alias, or tags'} />
    <LinkListSearchIcon />
  </Container>
);

export default LinkListSearch;
