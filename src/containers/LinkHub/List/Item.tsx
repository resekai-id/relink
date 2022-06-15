import {FC} from 'react';
import styled from 'styled-components';

import type {ClientLink} from '../../../store/slices/links/types';

export interface LinkListItemProps {
  link: ClientLink;
}

const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em;
  gap: 1em;

  background-color: var(--color-background-secondary);

  border-bottom: var(--border-primary);
`;

const LinkListItem: FC<LinkListItemProps> = ({link}) => (
  <Container>
    <span>{link.ID}</span>
  </Container>
);

export default LinkListItem;
