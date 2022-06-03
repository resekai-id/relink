import styled from 'styled-components';

import {ThemeProps} from '../../static/client/theme';

import SearchBar from './SearchBar';
import Header from './Header';

const Container = styled.div`
  width: 327px;
  height: 600px;

  background-color: ${({theme}: ThemeProps) => theme.colors.background.secondary};

  border: 1px solid ${({theme}: ThemeProps) => theme.border.primary.color};
  box-shadow: ${({theme}: ThemeProps) => theme.shadow.primary};
  border-radius: ${({theme}: ThemeProps) => theme.border.primary.radius};

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: clip;
`;

const LinkList = () => (
  <Container>
    <SearchBar />
    <Header />
  </Container>
);

export default LinkList;
