const BASE_FONT_SIZE = '14px';

export const theme = {
  colors: {
    warning: '#00CEE0',
    danger: '#FD4F53',
    activeLink: '#008000',
    hover: '#008000',
    blue: {
      blend: '#B5C5F1',
      dark: '#252B49',
      main: '#1C50DE',
      hover: '#0638C0',
      active: '#163881',
      brand: '#0000EE'
    },
    green: {
      main: '#008000'
    },
    gray: {
      brand: '#D7D7D7',
      additional: '#767B92',
      active: '#6A6F83',
      disabled: '#C6CAE3',
      lighter: '#F2F4F8',
      lightest: '#EBEEF4'
    },
    brown: {
      brand: 'rgb(139, 69, 19)'
    },
    borderColor: 'rgba(0, 0, 0, 0.125)',
    borderShadow: '0 0 4px rgba(0, 0, 0, 0.25)',
    backgroundLight: '#FAFBFC',
    white: '#FFFFFF',
    black: '#000000'
  },
  transitions: {
    fast: '.2s ease',
    medium: '.4s ease',
    slow: '.8s ease'
  },
  font: {
    size: {
      base: BASE_FONT_SIZE,
      big: '20px',
      subtitle: '18px',
      normal: '16px',
      extra: '12px',
      small: '10px'
    },
    lineHeight: {
      base: 1.34,
      reduced: 1.1,
      increased: 1.5,
      double: 2
    }
  },
  gap: {
    xxs: '4px',
    xs: '8px',
    s: '12px',
    m: '16px',
    l: '20px',
    xl: '24px',
    xxl: '32px',
    sxl: '40px',
    mxl: '48px',
    lxl: '72px'
  }
};

// export default theme;