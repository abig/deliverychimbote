import '../css/base.css'
import { LanguageProvider } from '../components/LanguageSelector'
import { initGA, logPageView } from '../components/Analytics'
import { useEffect } from 'react'

const App = ({ Component, pageProps }) => {

  useEffect(
    () => {
      if (process.env.NODE_ENV === 'production') {
        if (!window.GA_INITIALIZED) {
          initGA()
          window.GA_INITIALIZED = true
        }
        logPageView()
      }
    },
    []
  )

  useEffect(
    () => {
      if (process.env.NODE_ENV === 'production') {
        console.log("¡Hola! ¿Eres un programador chimbotano y tienes sugerencias o quieres ayudar?")
        console.log("El proyecto está desarrollado usando Next.js y hosteado en Vercel (http://vercel.com/).")
        console.log("Nuestro código es open-source, puedes encontrarlo en GitHub: https://github.com/dalbitresb12/deliverychimbote.")
        console.log("Estaremos muy agradecidos si deseas ayudarnos con este proyecto.")
      }
    },
    [Component]
  )

  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  )
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
