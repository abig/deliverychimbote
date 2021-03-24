import { useContext } from 'react';
import { LanguageContext } from './LanguageSelector';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, ArrowRight } from 'react-feather';
import { OutboundLink } from 'react-ga';

const pageContent = {
  'es-PE': {
    prefix: 'Una iniciativa de',
    built: 'Diseñado originalmente por',
    adapted: 'Adaptado para Chimbote por',
    os: 'Open-source',
    dinePrefix: 'También en',
    about: 'Nosotros',
    terms: 'Términos y Condiciones'
  }
};

const socialData = {
  facebook: {
    url: 'https://www.facebook.com/deliverychimboteapp/',
    className: 'text-facebook',
    icon: Facebook,
  },
  instagram: {
    url: 'https://www.instagram.com/deliverychimboteapp/',
    className: 'text-instagram',
    icon: Instagram,
  },
  twitter: {
    url: 'https://twitter.com/delivchimbotapp',
    className: 'text-twitter',
    icon: Twitter,
  },
};

const Social = ({ size, strokeWidth, ...props }) => (
  <div {...props}>
    {Object.keys(socialData).map(social => {
      const { url, className, icon: Icon } = socialData[social];
      return (
        <OutboundLink
          key={social}
          eventLabel={url}
          className={className}
          to={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="h-auto" size={size} strokeWidth={strokeWidth} />
        </OutboundLink>
      );
    })}
  </div>
);

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const content = pageContent[language];
  return (
    <footer className="px-3">
      <div className="max-w-6xl border-t-2 border-sand mx-auto">
        <Social size={32} strokeWidth={1.5} className="mt-10 mb-4 w-32 flex justify-between" />
        <Link href="/about">
          <button className="block sm:hidden font-medium underline leading-normal">
            {content.about}
          </button>
        </Link>
        <div className="mb-4">
          <Link href="/terms">
            <button className="font-medium underline leading-normal">
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
          </OutboundLink>.
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
  );
};

export default Footer;
