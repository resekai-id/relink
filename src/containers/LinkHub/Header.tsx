import {useState} from 'react';
import styled from 'styled-components';

import PlusIcon from '../../assets/icons/Plus';

import IconButton from '../../components/IconButton';
import Select from '../../components/Select';

const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;

  padding: 1em;

  width: 100%;

  background: var(--color-background-tertiary);

  border-bottom: var(--border-primary);

  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const options = [
  {value: 'DATE_DECENDING', label: 'Date (Descending)'},
  {value: 'DATE_ASCENDING', label: 'Date (Ascending)'},
  {value: 'VISITOR_COUNT_DECENDING', label: 'Visitor Count (Descending)'},
  {value: 'VISITOR_COUNT_ASCENDING', label: 'Visitor Count (Ascending)'},
];

type OptionType = typeof options[number];

const LinkListHeader = () => {
  const [currentOption, setCurrentOption] = useState(options[0]);

  return (
    <Container>
      <Select
        id={'headerSelect'}
        instanceId={'headerSelect'}
        isSearchable={false}
        options={options}
        defaultValue={currentOption}
        onChange={option => setCurrentOption(option as OptionType)}
      />
      <IconButton icon={PlusIcon} />
    </Container>
  );
};

export default LinkListHeader;
