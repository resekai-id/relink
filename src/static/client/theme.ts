export type Theme = typeof theme;

export type ThemeProps = {theme: Theme};

const theme = {
  colors: {
    background: {
      primary: '#FFFCF8',
      secondary: '#FFFFFF',
      tertiary: '#F7F9FA',
    },
    text: {
      primary: '#000000',
      secondary: '#484A4D',
      tertiary: '#BABCBF',
      link: '#409FFF',
      error: '#C1292E',
      success: '#28965A',
    },
  },
  fonts: {
    display:
      '"GT Super Display", -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    primary:
      '"Aktiv Grotesk", -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    secondary:
      '"Fakt Pro", -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
  },
  shadow: {
    primary: '0px 0px 8px rgba(0, 0, 0, 0.08)',
  },
  border: {
    primary: {
      color: '#D4D7D9',
      radius: '8px',
    },
  },
};

export default theme;
