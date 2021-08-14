import ReactGA from 'react-ga';

interface IGASend {
  category: string
  action: string
  label: string
}

export const gaSend = ({ category, action, label }: IGASend) => {
  if (process.env.REACT_APP_GA_ENABLED) {
    ReactGA.ga('send', 'event', category, action, label)
  }
}

export const gaPageView = (view: string) => {
  if (process.env.REACT_APP_GA_ENABLED) {
    ReactGA.pageview(view)
  }
}