import {FC, Fragment} from 'react';
import styled, {keyframes} from 'styled-components';
import Image from 'next/image';

import ThreeText, {ThreeTextType} from './ThreeText';

import ShortRelinkLogo from '../assets/icons/ShortRelinkLogo';
import ErrorDecorationImage from '../assets/images/ErrorDecoration.png';

export enum StatusGateStatus {
  Loading = 'LOADING',
  Error = 'FAIL',
  Ready = 'READY',
}

export interface StatusHeroProps {
  status: StatusGateStatus;
  children: JSX.Element | JSX.Element[];
}

const BreathingAnimation = keyframes`
  from {
    color: var(--color-text-secondary);
  } 

  to {
    color: var(--color-text-tertiary);
  }
`;

const FailDecoration = styled(Image)`
  width: 10em;
  height: auto;
`;

const LoadingIcon = styled(ShortRelinkLogo)`
  width: 3.5em;
  height: auto;

  animation: 2s infinite alternate ease-out ${BreathingAnimation};
`;

const Container = styled.div`
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  flex: none;
  flex-grow: 1;
`;

const resolveComponent = ({status}: StatusHeroProps) => {
  if (status === StatusGateStatus.Loading) return <LoadingIcon />;

  if (status === StatusGateStatus.Error)
    return (
      <Fragment>
        <FailDecoration src={ErrorDecorationImage} layout={'raw'} priority={true} />
        <ThreeText
          type={ThreeTextType.Secondary}
          title="We seem to have ran into an issue."
          body="we couldn’t contact mission control."
          punchline="please refresh this page."
        />
      </Fragment>
    );

  return null;
};

const StatusGate: FC<StatusHeroProps> = props => {
  const resolvedComponent = resolveComponent(props);

  if (resolvedComponent !== null) return <Container>{resolvedComponent}</Container>;

  return <Fragment>{props.children}</Fragment>;
};

export default StatusGate;
