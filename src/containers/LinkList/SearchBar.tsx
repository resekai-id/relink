import styled from 'styled-components';

import {ThemeProps} from '../../static/client/theme';

import SearchIcon from '../../components/SearchIcon';

const SearchBarIcon = styled(SearchIcon)`
  width: 16px;
  height: 16px;

  fill: ${({theme}: ThemeProps) => theme.colors.text.tertiary};

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const SearchBarInput = styled.input`
  font-family: ${({theme}: ThemeProps) => theme.fonts.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  display: flex;
  align-items: center;

  color: ${({theme}: ThemeProps) => theme.colors.text.secondary};

  border: none;
  outline: none;

  flex: none;
  order: 1;
  flex-grow: 1;

  ::placeholder {
    font-weight: 400;

    color: ${({theme}: ThemeProps) => theme.colors.text.tertiary};
  }
`;

const SearchBarContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 8px;

  background: ${({theme}: ThemeProps) => theme.colors.background.secondary};

  border-bottom: 1px solid ${({theme}: ThemeProps) => theme.border.primary.color};

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const SearchBar = () => (
  <SearchBarContainer>
    <SearchBarIcon />
    <SearchBarInput placeholder="Search by name, alias, or tags"></SearchBarInput>
  </SearchBarContainer>
);

export default SearchBar;
