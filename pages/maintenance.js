import Link from 'next/link';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageSelector';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Obfuscate from 'react-obfuscate';
import { Event } from '../components/Analytics';
import { NextSeo } from 'next-seo';

const Maintenance = () => {
  const { language } = useContext(LanguageContext);
  const content = pageContent[language];

  return (
    <>
      <NextSeo title="Mantenimiento" />
      <div className="min-h-screen flex flex-col">
        <Nav maint={true} />
        <main className="flex-auto px-3 md:pr-0 pt-8 lg:pt-0 pb-16">
          <div className="max-w-6xl flex items-center md:overflow-hidden mx-auto">
            <div className="flex-auto w-128 md:flex-shrink-0 lg:pr-16">
              <h1 className="max-w-xl font-bold uppercase text-3xl sm:text-5xl leading-none mb-6 mt-8">
                {content.titleBlue}{' '}
                <span className="text-orange">{content.titleOrange}</span>
              </h1>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-2">
                {content.description}
              </p>
              <p className="max-w-xl text-indigo-light text-base sm:text-lg md:text-xl mb-8">
                {content.more}{' '}
                <Obfuscate
                  email="info.dch@abig.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Event("Email", "Click", "info.dch")}
                />
              </p>
              <div className="sm:-m-2">
                <Link href="/submit" passHref>
                  <a className="w-full sm:w-auto rounded h-12 btn btn-primary inline-flex items-center sm:m-2">
                    {content.add}
                    <span className="inline sm:hidden flex-auto text-right">
                      ⟶
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            <img
              src="/assets/main-image.jpeg"
              alt="Main image"
              className="hidden lg:block w-128 h-auto"
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const pageContent = {
  'es-PE': {
    titleBlue: 'Pronto tu negocio podría',
    titleOrange: 'estar aquí',
    description: `Muy pronto estaremos lanzando una nueva plataforma para ayudarte a sobrellevar la pandemia y que puedas llegar a tus clientes fácilmente.`,
    more: '¿Quieres saber más? Escríbenos: ',
    add: 'Registra tu negocio',
  }
};

export default Maintenance;
