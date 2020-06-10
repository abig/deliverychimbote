import { useContext } from 'react'
import { Event } from '../components/Analytics'
import { LanguageContext } from '../components/LanguageSelector'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Obfuscate from 'react-obfuscate'
import { OutboundLink } from 'react-ga'

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-auto px-3 pt-8 sm:pt-16 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-extrabold text-2xl sm:text-3xl leading-none mb-6">
              {content.resourcesTitle}
            </h2>
            <p className="max-w-xl text-indigo-light text-lg mb-8">
              {content.resourcesDescription}{' '}
              <a href="mailto:">{content.contact}</a>
              <button onClick={() => Event("Email", "Click", "deliverychimbote@abig.pe")}>
                <Obfuscate email="deliverychimbote@abig.pe" obfuscateChildren={false} target="_blank" rel="noopener noreferrer">
                  {content.contact}
                </Obfuscate>
              </button>.
            </p>
            <ul className="mb-16">
              {resourcesList.map(
                ({ title, description, actionLabel, actionUrl }, index) => (
                  <li key={index} className="flex flex-col rounded items-start border border-sand overflow-hidden p-4 sm:p-8 md:px-12 mb-4 last:mb-0">
                    {title && (
                      <h4 className="text-xl sm:text-2xl mb-2">{title}</h4>
                    )}
                    {description && (
                      <p className="max-w-xl text-sm sm:text-base mb-4">
                        {description}
                      </p>
                    )}
                    {actionLabel && actionUrl && (
                      <OutboundLink
                        eventLabel={actionUrl}
                        to={actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary rounded text-sm sm:text-base"
                      >
                        {actionLabel}&nbsp;&nbsp;&nbsp;⟶
                      </OutboundLink>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const pageContent = {
  'es-PE': {
    resourcesTitle: 'Recursos',
    resourcesDescription:
      'Hemos listado aquí algunos recursos que podrían servirte en estos tiempos. ¿Conoces algunos otros que podrían ayudar?',
    contact: 'Ponte en contacto con nosotros',
    submitTitle: 'Registra tu negocio',
  },
  'en-US': {
    resourcesTitle: 'Resources',
    resourcesDescription:
      "We've added a few resources that might be useful for restaurants at this time. Do you know of others that we should add?",
    contact: 'Get in touch',
    submitTitle: 'Add your business',
  },
}

const resourcesList = [
  {
    title: 'Superb Corona Support Programme',
    description:
      'Superb ofrece a los restaurantes de todo el mundo el uso de su plataforma para vender tarjetas de regalo y comida para llevar en línea, de forma gratuita.',
    actionLabel: 'Más información',
    actionUrl:
      'https://www.superbexperience.com/corona-support-program-for-restaurants',
  },
  {
    title: 'Cloudflare Teams',
    description:
      'Cloudflare está dando acceso libre a su servicio Access/Teams Single Sign On, el cual sirve a las empresas usando la modalidad del tele-trabajo para conectarse remotamente de manera segura, encriptada y sin límite de usuarios. El servicio estará gratuito hasta el 1ero de setiembre, pero podrían expandir el plazo si la crisis se extiende.',
      actionLabel: 'Más información',
      actionUrl:
        'https://www.cloudflare.com/smallbusiness/'
  }
]
