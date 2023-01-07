export const isMobile = {
  Android() {
    return Boolean(navigator.userAgent.match(/Android/i));
  },
  BlackBerry() {
    return Boolean(navigator.userAgent.match(/BlackBerry/i));
  },
  iOS() {
    return Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));
  },
  Opera() {
    return Boolean(navigator.userAgent.match(/Opera Mini/i));
  },
  Windows() {
    return Boolean(navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i));
  },
  any() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};