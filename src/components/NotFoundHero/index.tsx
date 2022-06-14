import {FC} from 'react';
import styled from 'styled-components';

import {NotFoundSubject} from '../../constants/client/404';
import theme from '../../constants/client/theme';

import NotFoundImage from './Image';
import NotFoundText from './Text';

export type NotFoundHeroProps = {
  subject: NotFoundSubject | Partial<NotFoundSubject>;
};

const Container = styled.main`
  font-size: 1rem;

  max-width: 100%;
  width: 21.37em;

  user-select: none;

  @media screen and (min-width: ${theme.breakpoints.largeLaptop}) {
    font-size: 1.125rem;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 1.25rem;
  }
`;

const NotFoundHero: FC<NotFoundHeroProps> = ({subject}) => (
  <Container>
    <NotFoundImage subject={subject} />
    <NotFoundText subject={subject} />
  </Container>
);

export default NotFoundHero;
