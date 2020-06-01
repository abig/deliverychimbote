import { useContext } from 'react'
import LanguageSelector, { LanguageContext } from './LanguageSelector'
import Link from 'next/link'
import useBreakpoint from '../hooks/useBreakpoint'

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
}

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  const breakpoint = useBreakpoint()
  return (
    <footer className="px-3">
      <div className="max-w-6xl border-t-2 border-sand mx-auto">
        {!breakpoint.sm &&
          <Link href="/about">
            <button className="font-medium underline leading-normal mt-10 mb-4">
              {content.about}
            </button>
          </Link>
        }
        <div className="sm:mt-10 mb-4">
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
