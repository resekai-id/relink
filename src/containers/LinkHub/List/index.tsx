import {FC, Fragment} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import {useInfiniteQuery} from 'react-query';

import {fetchLinkList} from '../../../services/shared/links';

import StatusGate, {StatusGateStatus} from '../../../components/StatusGate';

import {SortOption} from '../Header';

import LinkListItem from './Item';
import LinkListEmptyHero from './EmptyHero';

export interface LinkListProps {
  sortOption: SortOption;
}

const Container = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;

  box-sizing: border-box;

  align-self: stretch;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LinkList: FC<LinkListProps> = ({sortOption}) => {
  const {status, data, fetchNextPage, hasNextPage} = useInfiniteQuery(
    ['links'],
    ({pageParam}) => fetchLinkList(pageParam as string | undefined),
    {
      refetchInterval: 2000,
      staleTime: 15000,
      cacheTime: 60000,
      getNextPageParam: pageLinks => pageLinks[pageLinks.length - 1]?.ID,
    }
  );

  let linkList = data?.pages.flat() ?? [];

  switch (sortOption) {
    case SortOption.DateDecending:
      linkList = linkList.sort(
        (linkA, linkB) => new Date(linkB.createdAt).getTime() - new Date(linkA.createdAt).getTime()
      );

      break;

    case SortOption.DateAscending:
      linkList = linkList.sort(
        (linkA, linkB) => new Date(linkB.createdAt).getTime() + new Date(linkA.createdAt).getTime()
      );

      break;

    case SortOption.VisitorCountDecending:
      linkList = linkList.sort((linkA, linkB) => linkB.clicks - linkA.clicks);

      break;

    case SortOption.VisitorCountAscending:
      linkList = linkList.sort((linkA, linkB) => linkB.clicks + linkA.clicks);

      break;

    default:
      break;
  }

  // eslint-disable-next-line no-nested-ternary
  const statusGateStatus = ['idle', 'loading'].includes(status)
    ? StatusGateStatus.Loading
    : status === 'success'
    ? StatusGateStatus.Ready
    : StatusGateStatus.Error;

  return (
    <Container>
      <StatusGate status={statusGateStatus}>
        {!linkList || linkList.length <= 0 ? (
          <LinkListEmptyHero />
        ) : (
          <InfiniteScroll
            dataLength={linkList?.length ?? 0}
            hasMore={!!hasNextPage}
            next={fetchNextPage}
            loader={<Fragment />}
          >
            {linkList.map(link => (
              <LinkListItem key={link.ID} link={link} />
            ))}
          </InfiniteScroll>
        )}
      </StatusGate>
    </Container>
  );
};

export default LinkList;
