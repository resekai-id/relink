export const headerPages = [
  {
    label: 'Home',
    path: '/',
    onlyMobileMenu: false,
  },
  {
    label: 'Shorten A Link',
    path: '/shorten',
    onlyMobileMenu: false,
  },
  {
    label: 'Upgrade',
    path: '/upgrade',
    onlyMobileMenu: false,
  },
  {
    label: 'Login',
    path: '/login',
    onlyMobileMenu: true,
  },
] as const;

export const footerPages = [
  {
    label: 'Contact Us',
    path: '/contact',
  },
  {
    label: 'Terms',
    path: '/terms',
  },
  {
    label: 'Privacy Policy',
    path: '/privacy',
  },
] as const;
