import { useContext } from 'react'
import LanguageSelector, { LanguageContext } from './LanguageSelector'
import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'react-feather'

const pageContent = {
  'es-PE': {
    prefix: 'Una iniciativa de',
    built: 'Diseñado originalmente por',
    adapted: 'Adaptado para Chimbote por',
    os: 'Open-source',
    dinePrefix: 'También en',
    about: 'Sobre nosotros'
  },
  'en-US': {
    prefix: 'An initiative by',
    built: 'Originally built by',
    adapted: 'Adapted for Chimbote by',
    os: "It's open-source",
    dinePrefix: 'Also in',
    about: 'About us'
  },
  'social': {
    facebook: 'https://www.facebook.com/deliverychimboteapp/',
    instagram: 'https://www.instagram.com/deliverychimboteapp/',
    twitter: 'https://twitter.com/delivchimbotapp'
  }
}

const Social = ({ size, strokeWidth, ...props }) => (
  <div {...props}>
    <a className="text-facebook" href={pageContent.social.facebook} target="_blank" rel="noopener noreferrer">
      <Facebook className="h-auto" size={size} strokeWidth={strokeWidth} />
    </a>
    <a className="text-instagram mx-4" href={pageContent.social.instagram} target="_blank" rel="noopener noreferrer"> 
      <Instagram className="h-auto" size={size} strokeWidth={strokeWidth} />
    </a>
    <a className="text-twitter" href={pageContent.social.twitter} target="_blank" rel="noopener noreferrer">
      <Twitter className="h-auto" size={size} strokeWidth={strokeWidth} />
    </a>
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
            <LanguageSelector />
        </div>
        <p className="mb-4">
          {content.prefix}{' '}
          <a href="https://abig.pe" target="_blank" rel="noopener">
            AB Investment Group SAC
          </a>{'. '}
          {content.built}{' '}
          <a
            href="https://www.sebastianwinther.com"
            target="_blank"
            rel="noopener"
          >
            Sebastian Winther
          </a>
          {'. '}
          {content.adapted}{' '}
          <a
            href="https://github.com/dalbitresb12"
            target="_blank"
            rel="noopener"
          >
            Diego Albitres
          </a>
        </p>
        <p className="mb-12">
          {content.dinePrefix}{' '}
          <a href="https://dinecph.dk" target="_blank" rel="noopener">
            Copenhagen
          </a>
          {', '}
          <a href="https://dineinberlin.com" target="_blank" rel="noopener">
            Berlin
          </a>
          {', '}
          <a href="https://jantarada.pt" target="_blank" rel="noopener">
            Portugal
          </a>
          {', '}
          <a href="https://llegamosatucasa.com" target="_blank" rel="noopener">
            Lima
          </a>
          {', '}
          <a href="https://vamosatucasa.com/" target="_blank" rel="noopener">
            Honduras
          </a>
        </p>
        <p className="border-t-2 border-sand py-8">
          {content.os}
          {' ⟶ '}
          <a
            className="ml-1"
            href="https://github.com/dalbitresb12/deliverychimbote"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
