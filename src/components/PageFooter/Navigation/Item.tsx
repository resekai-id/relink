import styled from 'styled-components';

const FooterNavigationListItem = styled.li`
  display: inline-block;

  padding-left: 0.5em;
  padding-right: 0.5em;

  border-right: var(--border-primary);

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;

    border-right: unset;
  }
`;

export default FooterNavigationListItem;
