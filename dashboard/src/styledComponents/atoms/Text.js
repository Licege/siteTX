import styled, {css} from 'styled-components';
import {flexChildMixin} from '../helpers';

const Text = styled.p`
  font-weight: normal;
  font-size: ${p => p.theme.font.size.base};
  ${props =>
    props.color
      ? css`
          color: ${p => p.color};
        `
      : ''};
  ${props =>
    props.small
      ? css`
          font-size: ${p => p.theme.font.size.small};
        `
      : ''}
  ${props =>
    props.align
      ? css`
          text-align: ${props.align};
        `
      : ''}
  ${props =>
    props.big
      ? css`
          font-size: ${p => p.theme.font.size.big};
        `
      : ''}
  ${props =>
    props.noMargin
      ? css`
          margin: 0;
        `
      : ''}
  ${props =>
    props.bold
      ? css`
          font-weight: bold;
        `
      : ''}
  ${props =>
    props.italic
      ? css`
          font-style: italic;
        `
      : ''}
  ${props =>
    props.weight
      ? css`
          font-weight: ${props.weight};
        `
      : ''}
  ${props =>
    props.subtitle
      ? css`
          font-size: ${p => p.theme.font.size.subtitle};
        `
      : ''}
  ${props =>
    props.transform
      ? css`
          text-transform: ${props.transform};
        `
      : ''}
  ${flexChildMixin}
`;

export default Text;
