import {FC} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import type {ClientLink} from '../../../pages/api/link/shorten';

import BarChartIcon from '../../../assets/icons/BarChart';
import {useRouter} from 'next/router';

export interface LinkListItemProps {
  link: ClientLink;
}

const ViewCountIcon = styled(BarChartIcon)`
  width: 0.625em;
  height: auto;

  color: var(--color-text-tertiary);
`;

const ViewCountText = styled.span`
  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 600;
  font-size: 0.75em;
  text-align: right;

  padding-right: 0.25em;

  color: var(--color-text-tertiary);
`;

const LinkText = styled.a`
  user-select: none;

  font-family: var(--font-primary);
  font-style: italic;
  font-weight: 500;
  font-size: 0.875em;

  color: var(--color-text-link);

  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
`;

const NameText = styled.p`
  margin: 0;
  padding: 0;
  padding-top: 0.25em;

  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 500;
  font-size: 0.875em;

  color: var(--color-text-secondary);
`;

const DateText = styled.p`
  margin: 0;
  padding: 0;

  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 400;
  font-size: 0.625em;

  text-transform: uppercase;

  color: var(--color-text-tertiary);
`;

const Container = styled.div`
  user-select: none;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1em;
  gap: 1em;

  background-color: var(--color-background-secondary);

  border-bottom: var(--border-primary);

  cursor: pointer;

  :hover {
    background-color: var(--color-background-tertiary);
  }
`;

const LinkListItem: FC<LinkListItemProps> = ({link}) => (
  <Container>
    <div>
      <DateText>{new Date(link.createdAt).toLocaleDateString()}</DateText>
      <NameText>{link.title || link.alias}</NameText>
    </div>
    <DetailContainer>
      <Link href={link.alias} passHref>
        <LinkText>{`${process.env.HOST ?? 'relink.lol'}/${link.alias}`}</LinkText>
      </Link>

      <div>
        <ViewCountText>{link.clicks}</ViewCountText>
        <ViewCountIcon />
      </div>
    </DetailContainer>
  </Container>
);

export default LinkListItem;
