import { useState, useContext } from 'react'
import { LanguageContext } from './LanguageSelector'
import Obfuscate from 'react-obfuscate'
import WhatsAppLogo from './WhatsAppLogo'
import { OutboundLink } from 'react-ga'
import { Event } from './Analytics'
import slugify from 'slugify'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'react-feather'

const pageContent = {
  'es-PE': {
    hours: 'Atención',
    moreZones: 'Ver zonas donde llegamos',
    delivery: 'Delivery disponible',
    whatsappLabel: 'Pedir por',
    webLabel: 'Ir a web',
    seeMap: 'Ver en mapa'
  }
}

export default ({ item, standalone }) => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  const name = item.name || undefined
  const address = item.address || undefined
  const description = item.description || undefined
  const district = item.district || undefined
  const zones = item.zones || undefined
  const offers = item.offerings || undefined
  const delivery = item.delivery || false
  const phone = item.phone
    ? item.phone.includes("+51")
      ? item.phone
      : "+51" + item.phone
    : undefined
  const url = item.url || undefined
  const whatsapp = item.whatsapp || undefined
  const email = item.email
    ? item.email.toLowerCase()
    : undefined
  const addrQuery = item.pluscode
    ? encodeURIComponent(item.pluscode)
    : encodeURIComponent(item.address)
  const hours = item.hours || undefined

  const [zoneCollapse, setZoneCollapse] = useState(false)

  return (
    <li className={!standalone ? 'w-full md:w-1/2 p-3' : 'list-none'} id={slugify(name.toLowerCase())}>
      <div className="rounded box-shadow relative h-full flex flex-col items-start border border-sand overflow-hidden p-4 sm:p-8 lg:px-12">
        <div className="flex-auto">
          {name && <h3 className="uppercase font-bold text-xl sm:text-2xl">{name}</h3>}
          {district && district.length && <p className="text-xs sm:text-sm mb-4">{district.join(", ")}</p>}
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
          <Link href={{ pathname: '/map', hash: slugify(name.toLowerCase()) }}>
            <button className="btn btn-primary flex-1 h-full rounded text-sm flex justify-center items-center space-x-2">
              <span>{content.seeMap}</span>
              <MapPin className="h-5" />
            </button>
          </Link>
        </div>
        {delivery && (
          <div className="sm:absolute rounded-full top-0 right-0 font-medium text-sm sm:bg-sand sm:border-b border-sand sm:px-2 sm:py-1 mt-4 sm:m-2">
            ✓ {content.delivery}
          </div>
        )}
      </div>
    </li>
  )
}
