import '../css/base.css'
import { LanguageProvider } from '../components/LanguageSelector'
import Maintenance from './maintenance'

const App = ({ Component, pageProps }) => {
  const maintenance = process.env.MAINTENANCE_MODE

  if (maintenance) {
    return (
      <LanguageProvider>
        <Maintenance />
      </LanguageProvider>
    )
  } else {
    return (
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    )
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App
