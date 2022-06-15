import {FC} from 'react';
import styled from 'styled-components';

import {NotFoundSubject} from '../../constants/client/404';
import theme from '../../constants/client/theme';

import NotFoundImage from './Image';
import NotFoundText from './Text';

export type NotFoundHeroProps = {
  subject: NotFoundSubject | Partial<NotFoundSubject>;
};

const Container = styled.div`
  font-size: 1rem;

  width: min(21.37em, 100%);

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
