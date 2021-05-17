import styled from 'styled-components'

const Plus = styled.span`
  padding: 0 8px;
  position: relative;
  display: inline-block;
  height: 30px;
  width: 30px;
  cursor: pointer;
  opacity: 0.75;

  &:before, &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 15px;
    height: 3px;
    background-color: ${props => props.theme.colors.brown.brand};
    transition: 0.5s;
    content: '';
  }

  &:after {
    transform: rotate(90deg);
  }

  &:hover {
    opacity: 1;
  }
`

export default Plus