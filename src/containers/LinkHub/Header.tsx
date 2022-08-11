import {FC} from 'react';
import styled from 'styled-components';

import PlusIcon from '../../assets/icons/Plus';

import IconButton from '../../components/IconButton';
import Select from '../../components/Select';

export enum SortOption {
  DateDecending = 'DATE_DECENDING',
  DateAscending = 'DATE_ASCENDING',
  VisitorCountDecending = 'VISITOR_COUNT_DECENDING',
  VisitorCountAscending = 'VISITOR_COUNT_ASCENDING',
}
export interface LinkListHeaderProps {
  disabled: boolean;
  onSortUpdate?: (sortOption: SortOption) => void;
}

const Container = styled.div`
  box-sizing: border-box;

  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;

  padding: 1em;

  width: 100%;

  background-color: var(--color-background-tertiary);

  border-bottom: var(--border-primary);

  box-shadow: var(--shadow-primary);

  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

export const SORT_OPTIONS: Readonly<{value: SortOption; label: string}[]> = [
  {value: SortOption.DateDecending, label: 'Date (Descending)'},
  {value: SortOption.DateAscending, label: 'Date (Ascending)'},
  {value: SortOption.VisitorCountDecending, label: 'Visitor Count (Descending)'},
  {value: SortOption.VisitorCountAscending, label: 'Visitor Count (Ascending)'},
] as const;

const LinkListHeader: FC<LinkListHeaderProps> = ({disabled, onSortUpdate}) => (
  <Container>
    <Select
      id={'headerSelect'}
      instanceId={'linkheaderSelect'}
      isDisabled={disabled}
      isSearchable={false}
      options={SORT_OPTIONS}
      defaultValue={SORT_OPTIONS[0]}
      onChange={option => {
        if (onSortUpdate) onSortUpdate((option as typeof SORT_OPTIONS[number]).value);
      }}
    />
    <IconButton icon={PlusIcon} disabled={disabled} />
  </Container>
);

export default LinkListHeader;
