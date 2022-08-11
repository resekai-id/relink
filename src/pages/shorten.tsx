import {NextPage, NextPageContext} from 'next';
import {dehydrate, QueryClient} from 'react-query';
import styled from 'styled-components';

import LinkHub from '../containers/LinkHub';
import {fetchLinkList} from '../services/shared/links';
import getAbsoluteHostURL from '../utilities/server/getAbsoluteHostURL';

const Container = styled.main`
  width: 100%;
  height: 100%;

  align-self: stretch;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const ShortenPage: NextPage = () => (
  <Container>
    <LinkHub />
  </Container>
);

export async function getServerSideProps(context: NextPageContext) {
  if (!context.req) return {};

  const {origin} = getAbsoluteHostURL(context.req);

  const queryClient = new QueryClient();

  const headers = new Headers();

  Object.entries(context.req.headers).forEach(
    ([headerName, headerValues]) =>
      headerValues &&
      (typeof headerValues === 'string' ? [headerValues] : headerValues).forEach(headerValue => {
        headers.set(headerName, headerValue);
      })
  );

  await queryClient.prefetchQuery(['links'], () => fetchLinkList(undefined, origin, headers));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ShortenPage;
