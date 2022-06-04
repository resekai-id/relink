import {createGlobalStyle} from 'styled-components';

import theme from '../../static/client/theme';

const ThemeProvider = createGlobalStyle`
  :root {
    --color-background-primary: ${theme.colors.background.primary};
    --color-background-secondary: ${theme.colors.background.secondary};
    --color-background-tertiary: ${theme.colors.background.tertiary};

    --color-text-primary: ${theme.colors.text.primary};
    --color-text-secondary: ${theme.colors.text.secondary};
    --color-text-tertiary: ${theme.colors.text.tertiary};
    --color-text-link: ${theme.colors.text.link};
    --color-text-error: ${theme.colors.text.error};
    --color-text-success: ${theme.colors.text.success};

    --font-display: ${theme.fonts.display};
    --font-primary: ${theme.fonts.primary};
    --font-secondary: ${theme.fonts.secondary};

    --shadow-primary: ${theme.shadows.primary};

    --border-primary-color: ${theme.borders.primary.color};
    --border-primary-radius: ${theme.borders.primary.radius};

    --border-primary: 1px solid ${theme.borders.primary.color};

    --breakpoint-small-mobile: ${theme.breakpoints.smallMobile};
    --breakpoint-medium-mobile: ${theme.breakpoints.mediumMobile};
    --breakpoint-large-mobile: ${theme.breakpoints.largeMobile};
    --breakpoint-tablet: ${theme.breakpoints.tablet};
    --breakpoint-laptop: ${theme.breakpoints.laptop};
    --breakpoint-large-laptop: ${theme.breakpoints.largeLaptop};
    --breakpoint-desktop: ${theme.breakpoints.desktop};
  }
`;

export default ThemeProvider;
