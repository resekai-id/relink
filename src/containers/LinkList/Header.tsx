import styled from 'styled-components';

import {ThemeProps} from '../../static/client/theme';

const HeaderContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;

  background: ${({theme}: ThemeProps) => theme.colors.background.secondary};

  border-bottom: 1px solid ${({theme}: ThemeProps) => theme.border.primary.color};

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const Header = () => <HeaderContainer></HeaderContainer>;

export default Header;
