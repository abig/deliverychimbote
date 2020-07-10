import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleMap, LoadScriptNext, Marker, OverlayView } from '@react-google-maps/api'
import { X } from 'react-feather'
import { OutboundLink } from 'react-ga'
import Obfuscate from 'react-obfuscate'
import WhatsAppLogo from './WhatsAppLogo'
import LoadingSpinner from './LoadingSpinner'

export default ({ items, content }) => {
  const [tooltip, setTooltip] = useState(false)
  const [chimbote] = useState({
    lat: -9.1067845,
    lng: -78.5647257,
  })

  // Reducing number of requests to Maps API
  const restrictedGoogleMapsApiKey =
    // process.env.NODE_ENV === 'production'
    true
      ? process.env.RESTRICTED_GOOGLE_MAPS_API_KEY
      : undefined

  if (items && !!items.length)
    return (
      <LoadScriptNext googleMapsApiKey={restrictedGoogleMapsApiKey}>
        <GoogleMap
          center={chimbote}
          clickableIcons={false}
          mapContainerClassName="border-t border-sand"
          mapContainerStyle={{ height: 'calc( 100vh - 85px)' }}
          zoom={13}
        >
          <Tooltip
            tooltip={tooltip}
            setTooltip={setTooltip}
            content={content}
          />
          {items.map(item => {
            const position =
              item &&
              item.positionData &&
              item.positionData.results &&
              !!item.positionData.results.length &&
              item.positionData.results[0].geometry &&
              item.positionData.results[0].geometry.location
            if (item.display && position)
              return (
                <Marker
                  key={item.name}
                  position={position}
                  onClick={() => setTooltip(item)}
                />
              )
            return null
          })}
        </GoogleMap>
      </LoadScriptNext>
    )
  return (
    <div className="w-full h-full flex items-center justify-center text-3xl text-orange">
      <LoadingSpinner />
    </div>
  )
}

const Tooltip = ({ tooltip, setTooltip, content }) => {
  const name = tooltip.name || undefined
  const description = tooltip.description
    ? tooltip.description.length > 140
      ? tooltip.description.slice(0, 140) + ' ...'
      : tooltip.description
    : undefined
  const offers = tooltip.offerings || undefined
  const delivery = tooltip.delivery || false
  const phone = tooltip.phone
    ? tooltip.phone.includes("+51")
      ? tooltip.phone
      : "+51" + tooltip.phone
    : undefined
  const url = tooltip.url || undefined
  const whatsapp = tooltip.whatsapp || undefined
  const position =
    (tooltip &&
      tooltip.positionData &&
      tooltip.positionData.results &&
      !!tooltip.positionData.results.length &&
      tooltip.positionData.results[0].geometry &&
      tooltip.positionData.results[0].geometry.location) ||
    false
  return (
    <AnimatePresence>
      {tooltip && position && (
        <OverlayView
          key={position}
          position={position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <motion.div
            key={tooltip.name}
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: -36 }}
            exit={{ opacity: 0, y: -32 }}
            className="relative flex justify-center"
          >
            <div className="absolute bottom-0 w-80 bg-sand-light px-8 py-6">
              <button
                type="button"
                onClick={() => setTooltip(false)}
                className="absolute top-0 right-0 text-indigo-light m-2"
              >
                <X className="text-lg" />
              </button>

              {name && <h3 className="text-base mb-2">{name}</h3>}
              {description && <p className="text-xs mb-3">{description}</p>}
              {offers && !!offers.length && (
                <ul className="-m-1 mb-3">
                  {offers.map(offer => (
                    <li
                      key={offer}
                      className="inline-block font-medium bg-sand px-2 py-1 m-1"
                    >
                      {content.offers[offer]}
                    </li>
                  ))}
                </ul>
              )}
              {delivery && <div className="mb-3">✓ {content.delivery}</div>}
              {phone && <div className="mb-3">{phone}</div>}
              {phone && whatsapp &&
                <Obfuscate
                  href={`https://api.whatsapp.com/send?phone=${phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mr-4 py-2 rounded text-xs"
                  obfuscateChildren={false}
                  onClick={() => Event("WhatsApp", "Click", name)}
                >
                  {content.whatsappLabel}&nbsp;&nbsp;&nbsp;
                  <WhatsAppLogo className="inline flex-auto text-right" />
                </Obfuscate>
              }
              {url && (
                <OutboundLink
                  eventLabel={name}
                  to={url.includes('http') ? url : 'https://' + url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary rounded text-xs mt-2 py-2"
                >
                  {content.webLabel}&nbsp;&nbsp;&nbsp;⟶
                </OutboundLink>
              )}

              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <div
                  style={{ transform: 'rotate(45deg)' }}
                  className="bg-sand-light p-2 -mb-1"
                />
              </div>
            </div>
          </motion.div>
        </OverlayView>
      )}
    </AnimatePresence>
  )
}
