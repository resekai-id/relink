import styled from 'styled-components';
import ShortRelinkLogoIcon from '../../assets/icons/ShortRelinkLogo';

import theme from '../../constants/client/theme';
import FooterNavigation from './Navigation';

const FooterIcon = styled(ShortRelinkLogoIcon)`
  width: 1.8125em;
  height: auto;

  fill: var(--color-text-tertiary);
`;

const Container = styled.footer`
  user-select: none;

  box-sizing: border-box;

  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;

  background-color: var(--color-background-tertiary);

  border-top: var(--border-primary);

  max-width: ${theme.breakpoints.desktop};

  @media screen and (min-width: ${theme.breakpoints.largeLaptop}) {
    padding-left: 3em;
    padding-right: 3em;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-left: 5em;
    padding-right: 5em;
  }
`;

const PageFooter = () => (
  <Container>
    <FooterIcon />
    <FooterNavigation />
  </Container>
);

export default PageFooter;
