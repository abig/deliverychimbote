import '../css/base.css'
import { LanguageProvider } from '../components/LanguageSelector'

const App = ({ Component, pageProps }) => (
  <LanguageProvider>
    <Component {...pageProps} />
  </LanguageProvider>
)

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
