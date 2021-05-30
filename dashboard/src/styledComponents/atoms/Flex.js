import styled from 'styled-components';
import { flexChildMixin } from '../helpers';

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  position: ${props => props.position || 'static'};
  flex-grow: ${props => props.flexGrow || '0'};
  ${flexChildMixin}
`;

export default Flex;
