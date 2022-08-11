import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {useAppSelector} from '../../store';
import {SessionStateStatus} from '../../store/slices/session/types';

import StatusGate, {StatusGateStatus} from '../../components/StatusGate';

import LinkListSearch from './Search';
import LinkListHeader, {SortOption, SORT_OPTIONS} from './Header';
import LinkList from './List';

const Container = styled.section`
  overflow: hidden;

  font-size: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: min(20.4375em, 100%);
  width: 100%;
  height: 37.1875em;

  background: var(--color-background-secondary);

  border: var(--border-primary);
  box-shadow: var(--shadow-primary);
  border-radius: 0.5em;

  flex: none;
  flex-grow: 0;
  align-self: stretch;
`;

const LinkHub = () => {
  const sessionStatus = useAppSelector(state => state.session.status);

  const [isSessionReady, setIsSessionReady] = useState(
    () => sessionStatus === SessionStateStatus.Ready
  );

  const [sortOption, setSortOption] = useState(() => SORT_OPTIONS[0].value);

  useEffect(() => {
    setIsSessionReady(sessionStatus === SessionStateStatus.Ready);
  }, [sessionStatus]);

  const statusGateStatus =
    // eslint-disable-next-line no-nested-ternary
    sessionStatus === SessionStateStatus.Idle || sessionStatus === SessionStateStatus.Pending
      ? StatusGateStatus.Loading
      : sessionStatus === SessionStateStatus.Fail
      ? StatusGateStatus.Error
      : StatusGateStatus.Ready;

  return (
    <Container>
      <LinkListSearch disabled={!isSessionReady} />
      <LinkListHeader
        disabled={!isSessionReady}
        onSortUpdate={newSortOption => setSortOption(newSortOption)}
      />
      <StatusGate status={statusGateStatus}>
        <LinkList sortOption={sortOption} />
      </StatusGate>
    </Container>
  );
};

export default LinkHub;
