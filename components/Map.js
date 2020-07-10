import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleMap, LoadScriptNext, Marker, OverlayView } from '@react-google-maps/api'
import { X, ArrowRight } from 'react-feather'
import { OutboundLink } from 'react-ga'
import Obfuscate from 'react-obfuscate'
import WhatsAppLogo from './WhatsAppLogo'
import LoadingSpinner from './LoadingSpinner'
import Link from 'next/link'
import slugify from 'slugify'

export default ({ items, content, active }) => {
  const [tooltip, setTooltip] = useState(false)
  const [center, setCenter] = useState({
    lat: -9.1067845,
    lng: -78.5647257,
  })

  useEffect(
    () => {
      if (active && active.positionData && active.positionData.results && !!active.positionData.results.length && active.positionData.results[0].geometry && active.positionData.results[0].geometry.location) {
        setTooltip(active)
        setCenter({
          lat: active.positionData.results[0].geometry.location.lat - (-0.001),
          lng: active.positionData.results[0].geometry.location.lng
        })
      }
    },
    [active]
  )

  // Reducing number of requests to Maps API
  const restrictedGoogleMapsApiKey =
    process.env.NODE_ENV === 'production'
      ? process.env.RESTRICTED_GOOGLE_MAPS_API_KEY
      : undefined

  if (items && !!items.length)
    return (
      <LoadScriptNext googleMapsApiKey={restrictedGoogleMapsApiKey}>
        <GoogleMap
          center={center}
          clickableIcons={false}
          mapContainerClassName="border-t border-sand"
          mapContainerStyle={{ height: 'calc( 100vh - 128px)' }}
          zoom={active ? 18 : 13}
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
            <div className="absolute bottom-0 w-96 bg-sand-light px-8 py-6">
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
                  {offers.slice(0, 5).map(offer => (
                    <li
                      key={offer}
                      className="inline-block font-medium rounded bg-sand px-2 py-1 m-1"
                    >
                      {offer}
                    </li>
                  ))}
                  {offers.length > 5 &&
                    <li className="inline-block font-medium bg-sand px-2 py-1 m-1">{content.more}...</li>
                  }
                </ul>
              )}
              {delivery && <div className="mb-3">✓ {content.delivery}</div>}
              <div className="w-full flex items-center">
                <Link href={{ pathname: '/list', hash: slugify(name.toLowerCase()) }}>
                  <button className="btn btn-primary flex-1 h-full flex justify-center items-center rounded text-xs py-2">
                    <span>{content.seeMore} +</span>
                  </button>
                </Link>
              </div>
              <div className="w-full flex items-center mt-2 space-x-2">
                {phone && whatsapp &&
                  <Obfuscate
                    href={`https://api.whatsapp.com/send?phone=${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary rounded flex-1 h-full flex justify-center items-center text-xs py-2 space-x-2"
                    obfuscateChildren={false}
                    onClick={() => Event("WhatsApp", "Click", name)}
                  >
                    <span>{content.whatsappLabel}</span>
                    <WhatsAppLogo className="inline text-right h-5" />
                  </Obfuscate>
                }
                {url && (
                  <OutboundLink
                    eventLabel={name}
                    to={url.includes('http') ? url : 'https://' + url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary rounded flex-1 h-full flex justify-center items-center text-xs py-2 space-x-2"
                  >
                    <span>{content.webLabel}</span>
                    <ArrowRight className="h-5" />
                  </OutboundLink>
                )}
              </div>

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
