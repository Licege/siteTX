import {css} from 'styled-components';

export const BREAKPOINTS = {
  ms: 320,
  mm: 375,
  ml: 412,
  ts: 600,
  tm: 768,
  ds: 1024,
  dm: 1280,
  dl: 1440,
  dxl: 1920
};

export const getCurrentBreakpoint = () => {
  const {innerWidth} = window;
  if (innerWidth >= 0 && innerWidth < BREAKPOINTS['ms']) {
    return 'ms';
  } else if (innerWidth >= BREAKPOINTS['ms'] && innerWidth < BREAKPOINTS['mm']) {
    return 'mm';
  } else if (innerWidth >= BREAKPOINTS['mm'] && innerWidth < BREAKPOINTS['ml']) {
    return 'ml';
  } else if (innerWidth >= BREAKPOINTS['ml'] && innerWidth < BREAKPOINTS['ts']) {
    return 'ts';
  } else if (innerWidth >= BREAKPOINTS['ts'] && innerWidth < BREAKPOINTS['tm']) {
    return 'tm';
  } else if (innerWidth >= BREAKPOINTS['tm'] && innerWidth < BREAKPOINTS['ds']) {
    return 'ds';
  } else if (innerWidth >= BREAKPOINTS['ds'] && innerWidth < BREAKPOINTS['dm']) {
    return 'dm';
  } else if (innerWidth >= BREAKPOINTS['dm'] && innerWidth < BREAKPOINTS['dl']) {
    return 'dl';
  } else if (innerWidth >= BREAKPOINTS['dl'] && innerWidth < BREAKPOINTS['dxl']) {
    return 'dxl';
  }
  return 'dl';
};

export const flexChildMixin = props => {
  let rules = '';
  if (props.order) rules += `order: ${props.order};`;
  if (props.grow) rules += `flex-grow: ${props.grow};`;
  if (props.shrink) rules += `flex-shrink: ${props.shrink};`;
  return rules;
};

const emSize = pixelValue => `${pixelValue / 16}em`;

export const getSizeFromBreakpoint = breakpointValue => {
  if (BREAKPOINTS[breakpointValue]) {
    return emSize(BREAKPOINTS[breakpointValue]);
  } else if (parseInt(breakpointValue, 10)) {
    return emSize(BREAKPOINTS[breakpointValue]);
  }
  console.error('styled-media-query: No valid breakpoint or size specified for media.');
  return '0';
};

export const min = breakpoint => (...args) => css`
  @media (min-width: ${getSizeFromBreakpoint(breakpoint, BREAKPOINTS)}) {
    ${css(...args)};
  }
`;

export const max = breakpoint => (...args) => css`
  @media (max-width: ${getSizeFromBreakpoint(breakpoint, BREAKPOINTS)}) {
    ${css(...args)};
  }
`;

export const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
  @media (min-width: ${getSizeFromBreakpoint(
    firstBreakpoint,
    BREAKPOINTS
  )}) and (max-width: ${getSizeFromBreakpoint(secondBreakpoint, BREAKPOINTS)}) {
    ${css(...args)};
  }
`;

export const media = {min, max, between};
