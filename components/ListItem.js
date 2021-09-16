import { useState, useContext } from 'react';
import { LanguageContext } from './LanguageSelector';
import Obfuscate from 'react-obfuscate';
import WhatsAppLogo from './WhatsAppLogo';
import { OutboundLink } from 'react-ga';
import { Event } from './Analytics';
import slugify from 'slugify';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'react-feather';

const pageContent = {
  'es-PE': {
    hours: 'Atención',
    moreZones: 'Ver zonas donde llegamos',
    delivery: 'Delivery disponible',
    whatsappLabel: 'Pedir por',
    webLabel: 'Ir a web',
    seeMap: 'Ver en mapa'
  }
};

const ListItem = ({ item, standalone }) => {
  const { language } = useContext(LanguageContext);
  const content = pageContent[language];

  const name = item["Nombre"] || undefined;
  const address = item["Dirección"] || undefined;
  const description = item["Descripción"] || undefined;
  const districts = item["Distritos"] || undefined;
  const zones = item["Urbanizaciones"] || undefined;
  const offers = item["Ofertas"] || undefined;
  const delivery = item["Delivery"] || false;
  const phone = item["Teléfono"]
    ? item["Teléfono"].includes("+51")
      ? item["Teléfono"]
      : "+51" + item["Teléfono"]
    : undefined;
  const url = item["URL"] || undefined;
  const whatsapp = item["WhatsApp"] || undefined;
  const email = item["Email"]
    ? item["Email"].toLowerCase()
    : undefined;
  const addrQuery = item["Código Plus"]
    ? encodeURIComponent(item["Código Plus"])
    : encodeURIComponent(item["Dirección"]);
  const hours = item["Horario de Atención"] || undefined;

  const [zoneCollapse, setZoneCollapse] = useState(false);

  return (
    <li className={!standalone ? 'w-full md:w-1/2 p-3' : 'list-none'} id={slugify(name.toLowerCase())}>
      <div className="rounded shadow-lg relative h-full flex flex-col items-start border border-alice-blue overflow-hidden p-4 sm:p-8 lg:px-12">
        <div className="flex-auto">
          {name && <h3 className="uppercase font-bold text-xl sm:text-2xl">{name}</h3>}
          {districts && districts.length && <p className="text-xs sm:text-sm mb-4">{districts.join(", ")}</p>}
          {address &&
            <p className="text-sm mb-2">
              <OutboundLink
                eventLabel={`https://www.google.com/maps/place/?q=${addrQuery}`}
                to={`https://www.google.com/maps/place/?q=${addrQuery}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </OutboundLink>
            </p>
          }
          {email &&
            <p className="text-sm mb-2">
              <Obfuscate
                className="underline"
                email={email}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Event("Business Email", "Click", name)}
              />
            </p>
          }
          {phone &&
            <p className="text-sm mb-4">
              <Obfuscate
                className="underline"
                tel={phone}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Event("Business Phone", "Click", name)}
              />
            </p>
          }
          {description && (
            <p className="max-w-xl text-sm sm:text-base mb-4">{description}</p>
          )}
          {hours && <p className="text-sm mb-4">{content.hours}: {hours}</p>}
          {offers && !!offers.length && (
            <ul className="-m-1 mb-6">
              {offers.map(offer => (
                <li
                  key={offer}
                  className="inline-block rounded-full font-medium text-xs sm:text-sm bg-sand px-2 py-1 m-1"
                >
                  {offer}
                </li>
              ))}
            </ul>
          )}
          {zones && !!zones.length &&
            <button
              className="underline text-xs sm:text-sm mb-4"
              onClick={() => setZoneCollapse(!zoneCollapse)}
            >+ {content.moreZones}</button>
          }
          {zoneCollapse &&
            <ul className="-m-1 mb-6">
              {zones.map(zone => (
                <li
                  key={zone}
                  className="inline-block rounded-full font-medium text-xs sm:text-sm bg-sand px-2 py-1 m-1"
                >
                  {zone}
                </li>
              ))}
            </ul>
          }
        </div>
        <div className="w-full flex flex-wrap items-center space-x-2 mt-4">
          {phone && whatsapp &&
            <Obfuscate
              href={`https://api.whatsapp.com/send?phone=${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 h-full rounded text-sm flex justify-center items-center space-x-2"
              obfuscateChildren={false}
              onClick={() => Event("WhatsApp", "Click", name)}
            >
              <span>{content.whatsappLabel}</span>
              <WhatsAppLogo className="h-5" />
            </Obfuscate>
          }
          {url && (
            <OutboundLink
              eventLabel={name}
              to={url.includes('http') ? url : 'https://' + url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary flex-1 h-full rounded text-sm flex justify-center items-center space-x-2"
            >
              <span>{content.webLabel}</span>
              <ArrowRight className="h-5" />
            </OutboundLink>
          )}
        </div>
        <div className="w-full flex flex-wrap items-center mt-2">
          <Link href={{ pathname: '/map', hash: slugify(name.toLowerCase()) }} passHref>
            <a className="btn btn-primary flex-1 h-full rounded text-sm flex justify-center items-center space-x-2">
              <span>{content.seeMap}</span>
              <MapPin className="h-5" />
            </a>
          </Link>
        </div>
        {delivery && (
          <div className="sm:absolute rounded-full top-0 right-0 font-medium text-sm sm:bg-sand sm:border-b border-sand sm:px-2 sm:py-1 mt-4 sm:m-2">
            ✓ {content.delivery}
          </div>
        )}
      </div>
    </li>
  );
};

export default ListItem;
