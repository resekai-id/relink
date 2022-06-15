import styled from 'styled-components';

import LinkListItem from './Item';

const Container = styled.div`
  box-sizing: border-box;

  flex: none;
  align-self: stretch;
  flex-grow: 1;
`;

const links = [
  {
    ID: '1',
    destination: 'https://www.google.com',
    alias: 'google',
  },
  {
    ID: '2',
    destination: 'https://www.facebook.com',
    alias: 'facebook',
  },
  {
    ID: '3',
    destination: 'https://www.youtube.com',
    alias: 'youtube',
  },
  {
    ID: '4',
    destination: 'https://www.twitter.com',
    alias: 'twitter',
  },
];

const LinkList = () => (
  <Container>
    {links.map(currentLink => (
      <LinkListItem key={currentLink.ID} link={currentLink} />
    ))}
  </Container>
);

export default LinkList;
