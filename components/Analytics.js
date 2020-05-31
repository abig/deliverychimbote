import ReactGA from 'react-ga'

export const initGA = () => {
    ReactGA.initialize("UA-54078107-7")
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}
