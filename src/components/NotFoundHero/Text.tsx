import {FC, Fragment} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

import type {NotFoundHeroProps} from '.';

const Redirect = styled.p`
  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 400;

  margin: 0;
  margin-top: 1.5em;

  line-height: 1.5em;

  a {
    font-weight: 500;

    text-decoration: underline;

    color: var(--color-text-link);

    :hover {
      font-style: italic;
      font-weight: 600;
    }
  }
`;

const Punchline = styled.p`
  margin: 0;

  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  line-height: 1.25em;

  color: var(--color-primary);
`;

const Body = styled.p`
  margin-top: 0.125em;
  margin-bottom: 0.125em;

  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 500;
  line-height: 1.25em;

  color: var(--color-primary);
`;

const Tagline = styled.p`
  margin: 0;

  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 950;
  line-height: 1.25em;

  color: var(--color-primary);
`;

const Container = styled.div`
  margin-top: 1em;
`;

const NotFoundText: FC<NotFoundHeroProps> = ({subject}) => (
  <Container>
    {subject.label && subject.video ? (
      <Fragment>
        <Tagline>Unlike {subject.label},</Tagline>
        <Body>you didn’t break the internet.</Body>
        <Punchline>We just couldn’t find what you were looking for.</Punchline>
      </Fragment>
    ) : (
      <Skeleton count={3} borderRadius={'0.25em'} style={{marginTop: '0.25em'}} />
    )}
    <Redirect>
      {' '}
      head back to{' '}
      <Link href="/" passHref>
        <a>relink.lol</a>
      </Link>
      {subject.video && (
        <Fragment>
          {' '}
          or{' '}
          <Link href={subject.video} passHref>
            <a>watch this</a>
          </Link>
        </Fragment>
      )}
      .
    </Redirect>
  </Container>
);

export default NotFoundText;
