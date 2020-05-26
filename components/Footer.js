import { useContext } from 'react'
import LanguageSelector, { LanguageContext } from './LanguageSelector'

const pageContent = {
  'es-PE': {
    prefix: 'Una iniciativa de',
    built: 'Diseñado originalmente por',
    adapted: 'Adaptado para Chimbote por',
    os: 'Open-source',
    dinePrefix: 'También en',
  },
  'en-US': {
    prefix: 'An initiative by',
    built: 'Originally built by',
    adapted: 'Adapted for Chimbote by',
    os: "It's open-source",
    dinePrefix: 'Also in',
  },
}

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <footer className="px-3">
      <div className="max-w-6xl mx-auto">
        <div className="border-t-2 border-sand pt-10 mb-4">
          <LanguageSelector />
        </div>
        <p className="mb-4">
          {content.prefix}{' '}
          <a href="https://abig.pe" target="_blank" rel="noopener">
            AB Investment Group
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
