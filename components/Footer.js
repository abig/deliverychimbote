import { useContext } from 'react'
import LanguageSelector, { LanguageContext } from './LanguageSelector'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, ArrowRight } from 'react-feather'
import WhatsAppLogo from './WhatsAppLogo'
import { OutboundLink } from 'react-ga'

const pageContent = {
  'es-PE': {
    prefix: 'Una iniciativa de',
    built: 'Diseñado originalmente por',
    adapted: 'Adaptado para Chimbote por',
    os: 'Open-source',
    dinePrefix: 'También en',
    about: 'Sobre nosotros',
    terms: 'Términos y Condiciones'
  }
}

const socialLinks = {
  facebook: 'https://www.facebook.com/deliverychimboteapp/',
  instagram: 'https://www.instagram.com/deliverychimboteapp/',
  twitter: 'https://twitter.com/delivchimbotapp',
  whatsapp: 'https://wa.me/5143489026'
}

const Social = ({ size, strokeWidth, ...props }) => (
  <div {...props}>
    <OutboundLink
      eventLabel={socialLinks.facebook}
      className="text-facebook"
      to={socialLinks.facebook}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Facebook className="h-auto" size={size} strokeWidth={strokeWidth} />
    </OutboundLink>
    <OutboundLink
      eventLabel={socialLinks.instagram}
      className="text-instagram ml-4 mr-2"
      to={socialLinks.instagram}
      target="_blank"
      rel="noopener noreferrer"
    > 
      <Instagram className="h-auto" size={size} strokeWidth={strokeWidth} />
    </OutboundLink>
    <OutboundLink
      eventLabel={socialLinks.whatsapp}
      className="text-whatsapp ml-2 mr-4"
      to={socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppLogo className="h-auto" size={size} strokeWidth={strokeWidth} />
    </OutboundLink>
    <OutboundLink
      eventLabel={socialLinks.twitter}
      className="text-twitter"
      to={socialLinks.twitter}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Twitter className="h-auto" size={size} strokeWidth={strokeWidth} />
    </OutboundLink>
  </div>
)

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <footer className="px-3">
      <div className="max-w-6xl border-t-2 border-sand mx-auto">
        <Social size={32} strokeWidth={1.5} className="mt-10 mb-4" />
        <Link href="/about">
          <button className="block sm:hidden font-medium underline leading-normal mb-4">
            {content.about}
          </button>
        </Link>
        <div className="mb-4">
          <Link href="/terms">
            <button className="font-extrabold underline leading-normal">
              {content.terms}
            </button>
          </Link>
        </div>
        <p className="mb-4">
          {content.prefix}{' '}
          <OutboundLink eventLabel="https://abig.pe" to="https://abig.pe" target="_blank" rel="noopener noreferrer">
            AB Investment Group SAC
          </OutboundLink>{'. '}
          {content.built}{' '}
          <OutboundLink
            eventLabel="https://www.sebastianwinther.com"
            to="https://www.sebastianwinther.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sebastian Winther
          </OutboundLink>
          {'. '}
          {content.adapted}{' '}
          <OutboundLink
            eventLabel="https://github.com/dalbitresb12"
            to="https://github.com/dalbitresb12"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diego Albitres
          </OutboundLink>.
        </p>
        <p className="mb-12">
          {content.dinePrefix}{' '}
          <OutboundLink eventLabel="https://dinecph.dk" to="https://dinecph.dk" target="_blank" rel="noopener noreferrer">
            Copenhagen
          </OutboundLink>
          {', '}
          <OutboundLink eventLabel="https://dineinberlin.com" to="https://dineinberlin.com" target="_blank" rel="noopener noreferrer">
            Berlin
          </OutboundLink>
          {', '}
          <OutboundLink eventLabel="https://dineinberlin.com" to="https://jantarada.pt" target="_blank" rel="noopener noreferrer">
            Portugal
          </OutboundLink>
          {', '}
          <OutboundLink eventLabel="https://llegamosatucasa.com" to="https://llegamosatucasa.com" target="_blank" rel="noopener noreferrer">
            Lima
          </OutboundLink>
          {', '}
          <OutboundLink eventLabel="https://vamosatucasa.com/" to="https://vamosatucasa.com/" target="_blank" rel="noopener noreferrer">
            Honduras
          </OutboundLink>
        </p>
        <p className="border-t-2 border-sand flex justify-start items-center space-x-2 py-8">
          <span>{content.os}</span>
          <ArrowRight className="h-5" />
          <OutboundLink
            eventLabel="https://github.com/dalbitresb12/deliverychimbote"
            className="ml-1"
            to="https://github.com/dalbitresb12/deliverychimbote"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </OutboundLink>
        </p>
      </div>
    </footer>
  )
}
