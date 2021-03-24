import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, LoadScriptNext, Marker, OverlayView } from '@react-google-maps/api';
import { X, ArrowRight } from 'react-feather';
import { OutboundLink } from 'react-ga';
import Obfuscate from 'react-obfuscate';
import WhatsAppLogo from './WhatsAppLogo';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';
import slugify from 'slugify';

const getGeocodeJson = record => {
  const field = record && record["Geocode JSON"];
  if (
    field && field.results && !!field.results.length &&
    field.results[0].geometry && field.results[0].geometry.location
  ) return field.results[0].geometry.location;
  return false;
};

const Map = ({ items, content, active }) => {
  const [tooltip, setTooltip] = useState(false);
  const [center, setCenter] = useState({
    lat: -9.1067845,
    lng: -78.5647257,
  });

  useEffect(
    () => {
      const geocode = getGeocodeJson(active);
      if (geocode) {
        setTooltip(active);
        setCenter({
          lat: geocode.lat - (-0.001),
          lng: geocode.lng
        });
      } else {
        setTooltip(false);
        setCenter({
          lat: -9.1067845,
          lng: -78.5647257,
        });
      }
    },
    [active]
  );

  // Reducing number of requests to Maps API
  const restrictedGoogleMapsApiKey =
    process.env.NODE_ENV === 'production'
      ? process.env.RESTRICTED_GOOGLE_MAPS_API_KEY
      : undefined;

  if (items && !!items.length)
    return (
      <LoadScriptNext googleMapsApiKey={restrictedGoogleMapsApiKey}>
        <GoogleMap
          center={center}
          clickableIcons={false}
          mapContainerClassName="border-t border-sand"
          mapContainerStyle={{ height: 'calc( 100vh - 132px)' }}
          zoom={active ? 18 : 13}
        >
          <Tooltip
            tooltip={tooltip}
            content={content}
          />
          {items.map(item => {
            const name = item["Nombre"];
            const position = getGeocodeJson(item);
            if (position)
              return (
                <Marker
                  key={name}
                  position={position}
                  onClick={() => location.hash = slugify(name.toLowerCase())}
                />
              );
            return null;
          })}
        </GoogleMap>
      </LoadScriptNext>
    );
  return (
    <div className="w-full h-full flex items-center justify-center text-3xl text-orange">
      <LoadingSpinner />
    </div>
  );
};

const Tooltip = ({ tooltip, content }) => {
  const name = tooltip["Nombre"] || undefined;
  const description = tooltip["Descripción"]
    ? tooltip["Descripción"].length > 140
      ? tooltip["Descripción"].slice(0, 140) + ' ...'
      : tooltip["Descripción"]
    : undefined;
  const offers = tooltip["Ofertas"] || undefined;
  const delivery = tooltip["Delivery"] || false;
  const phone = tooltip["Teléfono"]
    ? tooltip["Teléfono"].includes("+51")
      ? tooltip["Teléfono"]
      : "+51" + tooltip["Teléfono"]
    : undefined;
  const url = tooltip["URL"] || undefined;
  const whatsapp = tooltip["WhatsApp"] || undefined;
  const position = getGeocodeJson(tooltip);
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
            <div className="absolute bottom-0 w-96 bg-alice-blue rounded shadow-md px-8 py-6">
              <button
                type="button"
                onClick={() => location.hash = ""}
                className="absolute top-0 right-0 text-indigo-light m-2"
              >
                <X className="text-lg" />
              </button>

              {name && <h3 className="uppercase text-base mb-2">{name}</h3>}
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
                    <li className="inline-block font-medium rounded bg-sand px-2 py-1 m-1">{content.more}...</li>
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
                  className="bg-alice-blue p-2 -mb-1"
                />
              </div>
            </div>
          </motion.div>
        </OverlayView>
      )}
    </AnimatePresence>
  );
};

export default Map;
