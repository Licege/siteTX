import styled, {css} from 'styled-components';

export const Button = styled.button`
  background: ${p => p.theme.colors.blue.main};
  color: ${p => p.theme.colors.white};
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  font-size: ${p => p.theme.font.size.base};
  font-weight: 400;
  cursor: pointer;
  will-change: box-shadow;
  border-radius: 0;
  border: none;
  transition: all ${p => p.theme.transitions.fast};
  &:hover {
    background: ${p => p.theme.colors.blue.hover};
  }
  &:disabled {
    border-color: ${p => p.theme.colors.gray.disabled};
    background: ${p => p.theme.colors.gray.disabled};
  }
  ${p =>
    p.unstyled &&
    css`
      background: transparent;
      border: 0;
      margin: 0;
      // eslint-disable-next-line no-shadow
      color: ${p => p.theme.colors.black};
      border-radius: 0;
      padding: 0;
      box-shadow: none;
      &:hover {
        box-shadow: none;
        background: transparent;
      }
    `}
`;

export default Button;
