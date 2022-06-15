import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import HeaderNavigation from './Navigation';
import HeaderLogo from './Logo';
import HeaderLoginLink from './LoginLink';

const hasScrolledStyling = `
  background-color: var(--color-background-secondary);
  border-bottom: var(--border-primary);
  box-shadow: var(--shadow-primary);
`;

const Container = styled.header`
  z-index: 1;

  box-sizing: border-box;

  position: fixed;
  top: 0;
  width: 100%;

  ${({hasScrolled}: {hasScrolled: boolean}) => hasScrolled && hasScrolledStyling}

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 1.5em;

  font-size: 1rem;

  max-width: ${theme.breakpoints.desktop};

  flex: none;
  order: 0;
  align-self: center;
  flex-grow: 0;

  transition: all 0.2s ease-in-out;

  @media screen and (min-width: ${theme.breakpoints.largeLaptop}) {
    padding-left: 3em;
    padding-right: 3em;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-left: 5em;
    padding-right: 5em;
  }
`;

const PageHeader = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const headerReference = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const headerOffset =
      (headerReference.current === null ? 72 : headerReference.current.clientHeight) / 3;

    if (window.scrollY > headerOffset) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container ref={headerReference} hasScrolled={hasScrolled}>
      <HeaderNavigation />
      <HeaderLogo />
      <HeaderLoginLink />
    </Container>
  );
};

export default PageHeader;
