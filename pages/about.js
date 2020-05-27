import { useContext } from 'react'

import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <>
      <Head />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-auto px-3 pt-8 sm:pt-16 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-extrabold text-2xl sm:text-3xl leading-none mb-6">
              {content.title}
            </h2>
            <p className="max-w-xl text-lg mb-4">
              {content.description}
              <a href="https://dinecph.dk/" target="_blank" rel="noopener">
                Dine CPH
              </a>
              {content.and}
              <a href="https://coastapp.com/takeoutcovid/" target="_blank" rel="noopener">
                Takeout Covid
              </a>
            </p>
            <p className="max-w-xl text-lg mb-4">
              {content.contact}
              <a href="mailto:deliverychimbote@abig.pe">deliverychimbote@abig.pe</a>.
            </p>
            <p className="max-w-xl text-lg">
              {content.webmaster}
              <a href="mailto:soporte.dch@abig.pe">
                soporte.dch@abig.pe
              </a>
              .
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-4">
            <p className="text-xs text-indigo-light">
              {content.icons[0]}
              <a href="https://fontawesome.com/" target="_blank" rel="noopener">
                Font Awesome
              </a>
              {content.icons[1]}
              <a href="https://fontawesome.com/license" target="_blank" rel="noopener">
                {content.icons[2]}
              </a>{'.'}
            </p>
            <p className="mt-2 text-xs text-indigo-light">
              {content.icons[3]}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const pageContent = {
  'es-PE': {
    title: 'Nosotros',
    description: `La crisis causada por el Covid-19 ha golpeado duro a los negocios de la localidad. Muchos han empezado a ofrecer sus productos por delivery. Decidimos realizar esta página web para que sea más fácil encontrarlos — inspirado por `,
    and: ' y ',
    contact: 'Contacto: ',
    webmaster: 'Soporte del sitio web: ',
    icons: [
      'Algunos íconos en el sitio web fueron extraídos de la librería ',
      '. Estos íconos están bajo la licencia Creative Commons Attribution 4.0 International. Ningún cambio fue realizado a los íconos. La licencia se puede leer en el siguiente ',
      'enlace',
      'Cada ícono de marca es una marca registrada del propietario respectivo. El uso de esta marca no indica el respaldo del titular de la marca por parte de Delivery Chimbote, ni viceversa.'
    ],
  },
  'en-US': {
    title: 'About',
    description: `The Covid-19 crisis has hit the Chimbote businesses scene hard. Many establishments have started offering delivery for their products. We've made this site to help spread the word — inspired by `,
    and: ' and ',
    contact: 'Most inquiries: ',
    webmaster: 'Site feedback: ',
    icons: [
      'Some icons have been extracted from the icon library ',
      '. This icons are licensed under the Creative Commons Attribution 4.0 International license. No changes were made to the icons. The license can be read in the following ',
      'link',
      'Each brand icon is a trademark of the respective owner. The use of this trademark does not indicate endorsement of the trademark holder by Delivery Chimbote, nor vice versa.'
    ],
  },
}
