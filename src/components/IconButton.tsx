import {ButtonHTMLAttributes, FC, SVGAttributes} from 'react';
import styled from 'styled-components';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: FC<SVGAttributes<SVGElement>>;
}

const Container = styled.button`
  ${({disabled}) =>
    !disabled &&
    `
  cursor: pointer;

  :hover {
      box-shadow: var(--shadow-primary);
    }
`}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 0.875em;

  background-color: var(--color-text-link);

  border: none;
  border-radius: 0.25em;

  svg {
    width: 1em;
    height: auto;

    color: var(--color-background-primary);
  }
`;

const IconButton: FC<IconButtonProps> = props => <Container {...props}>{<props.icon />}</Container>;

export default IconButton;
