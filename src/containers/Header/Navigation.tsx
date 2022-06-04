import styled from 'styled-components';

import theme from '../../static/client/theme';

import HamburgerIcon from '../../assets/icons/HamburgerIcon';

const Icon = styled(HamburgerIcon)`
  width: 18px;

  fill: var(--color-text-primary);
`;

const Wrapper = styled.div`
  @media (min-width: ${theme.breakpoints.laptop}) {
    ${Icon} {
      display: block;
      visibility: hidden;
    }
  }
`;

const HeaderNavigation = () => (
  <Wrapper>
    <Icon />
  </Wrapper>
);

export default HeaderNavigation;
