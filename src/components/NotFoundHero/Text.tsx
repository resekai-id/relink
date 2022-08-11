import {FC, Fragment} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import ThreeText, {ThreeTextType} from '../ThreeText';

import type {NotFoundHeroProps} from '.';

const RedirectText = styled.p`
  margin: 0;
  padding: 0;
  padding-top: 1em;

  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 400;

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

const Container = styled.div`
  padding-top: 1em;
`;

const NotFoundText: FC<NotFoundHeroProps> = ({subject}) => (
  <Container>
    {subject.label && subject.video ? (
      <ThreeText
        type={ThreeTextType.Primary}
        title={`Unlike ${subject.label},`}
        body={'you didn’t break the internet.'}
        punchline={'We just couldn’t find what you were looking for.'}
      />
    ) : (
      <Skeleton count={3} borderRadius={'0.25em'} style={{marginTop: '0.25em'}} />
    )}
    <RedirectText>
      {' '}
      head back to{' '}
      <Link href="/" passHref>
        <a>{process.env.HOST ?? 'relink.lol'}</a>
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
    </RedirectText>
  </Container>
);

export default NotFoundText;
