import Link from 'next/link'
import { useContext, useState } from 'react'
import { LanguageContext } from '../../components/LanguageSelector'
import Head from '../../components/Head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Obfuscate from 'react-obfuscate'
import { Event } from '../../components/Analytics'
import ListItem from '../../components/ListItem'

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  return (
    <>
      <Head />
      <div className="min-h-screen flex flex-col">
        <Nav maint={true} />
        <main className="flex-auto px-3 md:pr-0 pt-8 lg:pt-0 pb-16">
          <div className="max-w-6xl flex flex-wrap items-center md:overflow-hidden mx-auto">
            <div className="flex-auto w-128 md:flex-shrink-0 lg:pr-8 mb-4 lg:mb-0">
              <h1 className="max-w-xl font-bold uppercase text-3xl sm:text-5xl leading-none mb-6 mt-8">
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
                  onClick={() => Event("Email", "Click", "registro.dch@abig.pe")}
                />
              </p>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-8">
                {content.more}{' '}
                <Obfuscate
                  email="soporte.dch@abig.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Event("Email", "Click", "soporte.dch@abig.pe")}
                />
              </p>
              <div className="sm:-m-2">
                <Link href="/submit/new">
                  <a className="w-full sm:w-auto rounded h-12 btn btn-primary inline-flex items-center sm:m-2">
                    <span>
                      {content.register}
                    </span>
                    <span className="inline sm:hidden flex-auto text-right">
                      ⟶
                    </span>
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
      name: 'Tu Negocio',
      address: 'Av. Avenida 123 - Urb. Urbanización',
      description: 'Los datos que ingreses de tu negocio entrarían en una tarjeta similar a esta.',
      district: ['Distrito 1', 'Distrito 2'],
      zones: ['Zona 1', 'Zona 2', 'Zona 3'],
      offerings: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4'],
      delivery: true,
      phone: '123456789',
      url: 'https://example.com',
      whatsapp: true,
      email: 'tucorreo@tunegocio.com',
      hours: 'Lunes a Sábado de 00:00am a 00:00pm'
    }
  },
  'en-US': {
    titleBlue: 'Soon your business',
    titleOrange: 'could be here',
    description: [
      `Signing up isn't difficult. We only need some basic data about you so that we can list you on our platform. Once you've sent your submission, we'll be in touch soon to confirm the aproval. You should know that aproved submissions can take up 24 hours to appear on the site.`,
      `If you want us to add a business type, neighbourhood or category, drop us a letter: `
    ],
    more: 'Need help? Write us: ',
    register: 'Add your business',
    demo: {
      name: 'Your Business',
      address: 'Av. Avenue 123',
      description: 'Your business data should show up in a card similar like the one here.',
      district: ['District 1', 'District 2'],
      zones: ['Zone 1', 'Zone 2', 'Zone 3'],
      offerings: ['Product 1', 'Product 2', 'Product 3', 'Product 4'],
      delivery: true,
      phone: '123456789',
      url: 'https://example.com',
      whatsapp: true,
      email: 'yourmail@yourbusiness.com',
      hours: 'Monday - Saturday 00:00am - 00:00pm'
    }
  },
}
