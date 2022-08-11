import {FC} from 'react';
import styled from 'styled-components';

export enum ThreeTextType {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
}

export interface ThreeTextProps {
  type: ThreeTextType;
  title: string;
  body: string;
  punchline: string;
}

interface TextProps {
  type: ThreeTextType;
}

const BodyText = styled.p`
  margin: 0;
  padding: 0;

  font-family: var(--font-primary);
  font-style: normal;

  font-weight: ${({type}: TextProps) => (type === ThreeTextType.Primary ? '500' : '400')};

  ${({type}: TextProps) => type === ThreeTextType.Secondary && `font-size: 0.75em;`}

  color: var(--color-text-tertiary);
`;

const PunchlineText = styled(BodyText)`
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;

  ${({type}: TextProps) =>
    type === ThreeTextType.Secondary &&
    `
  width: 100%;
  text-align: right;
  `}
`;

const TitleText = styled.p`
  margin: 0;
  padding: 0;

  font-family: var(--font-primary);
  font-style: normal;

  font-weight: ${({type}: TextProps) => (type === ThreeTextType.Primary ? '950' : '500')};

  ${({type}: TextProps) => type === ThreeTextType.Secondary && `font-size: 0.9em;`}

  color: var(--color-primary);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.125em;
`;

const ThreeText: FC<ThreeTextProps> = ({type, title, body, punchline}) => (
  <Container>
    <TitleText type={type}>{title}</TitleText>
    <BodyText type={type}>{body}</BodyText>
    <PunchlineText type={type}>{punchline}</PunchlineText>
  </Container>
);

export default ThreeText;
