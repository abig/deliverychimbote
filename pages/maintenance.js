import Link from 'next/link'
import { useContext, useState } from 'react'
import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

export default () => {
  const { language } = useContext(LanguageContext)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const content = pageContent[language]

  return (
    <>
      <Head />
      <div className="min-h-screen flex flex-col">
        <nav className="px-3 py-6">
        <div className="max-w-6xl flex items-center mx-auto">
            <div className="flex-auto flex items-center -mx-3">
                <Link href="/">
                    <a
                    onMouseOver={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                    className="inline-flex items-center ml-3 sm:mr-6"
                    >
                    <Logo
                        isHovered={isLogoHovered}
                        className="stroke-none text-3xl sm:mr-1"
                    />
                    <h2 className="hidden sm:inline-block font-bold uppercase text-2xl">
                        Delivery Chimbote
                    </h2>
                    </a>
                </Link>
            </div>
        </div>
        </nav>
        <main className="flex-auto px-3 md:pr-0 pt-8 lg:pt-0 pb-16">
          <div className="max-w-6xl flex items-center md:overflow-hidden mx-auto">
            <div className="flex-auto w-128 md:flex-shrink-0 md:pr-16">
              <h1 className="max-w-xl font-bold uppercase text-3xl sm:text-5xl leading-none mb-6 mt-8">
                {content.titleBlue}{' '}
                <span className="text-orange">{content.titleOrange}</span>
              </h1>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-2">
                {content.description}
              </p>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-8">
                {content.more}{' '}
                <a href="mailto:deliverychimbote@abig.pe">deliverychimbote@abig.pe</a>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const pageContent = {
  'es-PE': {
    titleBlue: 'Pronto tu negocio podrá',
    titleOrange: 'estar aquí',
    description: `Muy pronto estaremos lanzando una nueva plataforma para ayudarte a sobrellevar la pandemia.`,
    more: '¿Quieres saber más? Escríbenos: ',
    about: 'Nosotros'
  },
  'en-US': {
    titleBlue: 'Soon your business',
    titleOrange: 'could be here',
    description: `Soon we'll be launching a platform to help you cope with the pandemic.`,
    more: 'Want to know more? Write us: ',
    about: 'About'
  },
}
