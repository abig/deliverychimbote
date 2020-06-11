import { useState } from 'react'
import Obfuscate from 'react-obfuscate'
import WhatsAppLogo from './WhatsAppLogo'
import { OutboundLink } from 'react-ga'
import { Event } from './Analytics'

export default ({ restaurant, content }) => {
  const name = restaurant.name || undefined
  const address = restaurant.address || undefined
  const description = restaurant.description || undefined
  const district = restaurant.district || undefined
  const zones = restaurant.zones || undefined
  const offers = restaurant.offerings || undefined
  const delivery = restaurant.delivery || false
  const phone = restaurant.phone
    ? restaurant.phone.includes("+51")
      ? restaurant.phone
      : "+51" + restaurant.phone
    : undefined
  const url = restaurant.url || undefined
  const whatsapp = restaurant.whatsapp || undefined
  const email = restaurant.email
    ? restaurant.email.toLowerCase()
    : undefined
  const addrQuery = restaurant.pluscode
    ? encodeURIComponent(restaurant.pluscode)
    : encodeURIComponent(restaurant.address)
  const hours = restaurant.hours || undefined

  const [zoneCollapse, setZoneCollapse] = useState(false)

  return (
    <li className="w-full md:w-1/2 p-3">
      <div className="rounded relative h-full flex flex-col items-start border border-sand overflow-hidden p-4 sm:p-8 lg:px-12">
        <div className="flex-auto">
          {name && <h3 className="uppercase text-xl sm:text-2xl">{name}</h3>}
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
              <button onClick={() => Event("Business Email", "Click", name)}>
                <Obfuscate
                  className="underline"
                  email={email}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </button>
            </p>
          }
          {phone &&
            <p className="text-sm mb-4">
              <button onClick={() => Event("Business Phone", "Click", name)}>
                <Obfuscate
                  className="underline"
                  tel={phone}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </button>
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
                  className="inline-block rounded font-medium text-xs sm:text-sm bg-sand px-2 py-1 m-1"
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
                  className="inline-block rounded font-medium text-xs sm:text-sm bg-sand px-2 py-1 m-1"
                >
                  {zone}
                </li>
              ))}
            </ul>
          }
        </div>
        <div className="mt-4 items-center">
          {phone && whatsapp && (
            <button onClick={() => Event("WhatsApp", "Click", name)}>
              <Obfuscate
                href={`https://api.whatsapp.com/send?phone=${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary h-full mr-4 rounded text-sm"
                obfuscateChildren={false}
              >
                {content.whatsappLabel}&nbsp;&nbsp;&nbsp;
                  <WhatsAppLogo className="inline flex-auto text-right" />
              </Obfuscate>
            </button>
          )}
          {url && (
            <button className="mt-2">
              <OutboundLink
                eventLabel={name}
                to={url.includes('http') ? url : 'https://' + url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary h-full rounded text-sm"
              >
                {content.orderLabel}&nbsp;&nbsp;&nbsp;⟶
                </OutboundLink>
            </button>
          )}
        </div>
        {delivery && (
          <div className="sm:absolute rounded top-0 right-0 font-medium text-sm sm:bg-sand sm:border-b border-sand sm:px-2 sm:py-1 mt-4 sm:m-2">
            ✓ {content.delivery}
          </div>
        )}
      </div>
    </li>
  )
}
