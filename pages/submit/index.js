import Link from 'next/link'
import { useContext } from 'react'
import { LanguageContext } from '../../components/LanguageSelector'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Obfuscate from 'react-obfuscate'
import { Event } from '../../components/Analytics'
import ListItem from '../../components/ListItem'
import { ArrowRight } from 'react-feather'
import { NextSeo } from 'next-seo'

const SubmitIndex = () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  return (
    <>
      <NextSeo title="Registra tu negocio" />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-auto px-3 md:pr-0 pt-8 pb-16">
          <div className="max-w-6xl flex flex-wrap items-center mx-auto">
            <div className="flex-auto w-128 md:flex-shrink-0 lg:pr-8 mb-4 lg:mb-0">
              <h1 className="max-w-xl font-bold uppercase text-4xl leading-none mb-6 mt-8">
                {content.titleBlue}{' '}
                <span className="text-orange">{content.titleOrange}</span>
              </h1>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-2">
                {content.description[0]}
              </p>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-2">
                {content.description[1]}{' '}
                <Obfuscate
                  email="registro.dch@abig.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Event("Email", "Click", "registro.dch")}
                />
              </p>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-8">
                {content.more}{' '}
                <Obfuscate
                  email="soporte.dch@abig.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Event("Email", "Click", "soporte.dch")}
                />
              </p>
              <div className="sm:-m-2">
                <Link href="/submit/new">
                  <a className="w-full sm:w-auto rounded h-12 btn btn-primary inline-flex items-center justify-between sm:space-x-2 sm:m-2">
                    <span>{content.register}</span>
                    <ArrowRight className="h-5" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex-auto w-128 md:flex-shrink-0">
              <ListItem item={content.demo} standalone={true} />
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
    titleBlue: 'Pronto tu negocio podría',
    titleOrange: 'estar aquí',
    description: [
      `Registrarse no es difícil. Son algunos datos básicos que necesitamos para registrarte en la plataforma. Enviada tu solicitud, la revisaremos y estaremos en contacto contigo para confirmar su aprobación. Es importante mencionar que las solicitudes aceptadas pueden tardar hasta 24 horas en aparecer en la página web.`,
      `Si quieres que agreguemos algún rubro, zona o categoría, no dudes en escribirnos: `
    ],
    more: '¿Necesitas ayuda? Escríbenos: ',
    register: 'Registra tu negocio',
    demo: {
      ["Nombre"]: 'Tu Negocio',
      ["Dirección"]: 'Av. Avenida 123 - Urb. Urbanización',
      ["Descripción"]: 'Los datos que ingreses de tu negocio entrarían en una tarjeta similar a esta.',
      ["Distritos"]: ['Distrito 1', 'Distrito 2'],
      ["Urbanizaciones"]: ['Zona 1', 'Zona 2', 'Zona 3'],
      ["Ofertas"]: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4'],
      ["Delivery"]: true,
      ["Teléfono"]: '123456789',
      ["URL"]: 'https://example.com',
      ["WhatsApp"]: true,
      ["Email"]: 'tucorreo@tunegocio.com',
      ["Horario de Atención"]: 'Lunes a Sábado de 00:00am a 00:00pm'
    }
  }
}

export default SubmitIndex
