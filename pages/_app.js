import Head from 'next/head'
import { useEffect } from 'react'
import { DefaultSeo } from 'next-seo'
import { LanguageProvider } from '../components/LanguageSelector'
import { initGA, logPageView } from '../components/Analytics'
import '../css/base.css'

const description = "Encuentra negocios en Chimbote que te pueden llevar lo que necesites a la puerta de tu casa."

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
    [Component]
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
    []
  )

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Delivery Chimbote"
        description={description}
        openGraph={{
          type: 'website',
          url: 'https://deliverychimbote.com',
          title: 'Delivery Chimbote',
          description: description,
          images: [{
            url: 'https://deliverychimbote.com/og-dch.png',
            width: 1200,
            height: 630,
            alt: 'Ayudemos a los negocios locales a sobrellevar la pandemia.'
          }]
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@delivchimbotapp',
          handle: '@delivchimbotapp'
        }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </>
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
