import { useContext, useState, useEffect } from 'react';
import Promise from 'promise-polyfill';
import fetch from 'isomorphic-unfetch';
import { LanguageContext } from '../components/LanguageSelector';
import Nav from '../components/Nav';
import Map from '../components/Map';
import slugify from 'slugify';
import { NextSeo } from 'next-seo';

// start search from google maps: https://www.google.com/maps/place/?q=something (url encoded)

const pageContent = {
  'es-PE': {
    orderLabel: 'Ir a web',
    delivery: 'Delivery disponible',
    whatsappLabel: 'Pedir por',
    webLabel: 'Ir a web',
    more: 'Y más',
    seeMore: 'Ver más'
  }
};

const MapPage = ({ items }) => {
  const { language } = useContext(LanguageContext);
  const content = pageContent[language];
  const [active, setActive] = useState(false);
  let hash = typeof window !== "undefined"
    ? location.hash
    : undefined;

  const handleHashChange = () => {
    hash = location.hash;
    if (hash) setActive(items.find(item => slugify(item["Nombre"].toLowerCase()) === hash.substr(1)));
    else setActive(false);
  };

  useEffect(
    () => {
      if (typeof window !== "undefined") {        
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
      }

      return () => window.removeEventListener("hashchange", handleHashChange);
    },
    []
  );

  return (
    <>
      <NextSeo title="Mapa" />
      <div className="h-screen flex flex-col">
        <Nav />
        <main className="flex-auto">
          <Map items={items} content={content} active={active} />
        </main>
      </div>
    </>
  );
};

export default MapPage;

export async function getStaticProps() {
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableBaseKey = process.env.AIRTABLE_BASE_KEY;
  // Reducing number of requests to Maps API
  const googleMapsApiKey =
    process.env.NODE_ENV === 'production'
      ? process.env.GOOGLE_MAPS_API_KEY
      : undefined;

  const Airtable = require('airtable');

  const airtable = new Airtable({
    apiKey: airtableApiKey,
  }).base(airtableBaseKey);
  const base = airtable('Negocios');
  
  const records = await base
    .select({
      fields: [
        "Nombre", "Dirección", "Código Plus", "Geocode JSON", "Descripción",
        "Distritos", "Ofertas", "Delivery", "Teléfono", "WhatsApp", "URL"
      ],
      filterByFormula: "{Mostrar} = '1'",
      maxRecords: 999999, // don't want to paginate...
      view: 'Grid view', // NOTE: changing the view name will break things
    })
    .all();

  const recordsToUpdate = [];

  const items = await Promise.all(records.map(async ({ id, fields }) => {
    const item = fields;

    if (!item["Geocode JSON"]) {
      const positionData = await fetch(getMapsUrl(item, googleMapsApiKey))
        .then(res => JSON.parse(res))
        .catch(err => console.log(err));

      if (positionData) {
        item["Geocode JSON"] = positionData;

        recordsToUpdate.push({
          id,
          fields: {
            ["Geocode JSON"]: JSON.stringify(positionData)
          }
        });
      }
    } else {
      item["Geocode JSON"] = JSON.parse(item["Geocode JSON"]);
    }

    return item;
  }));

  for (let i = 0; i < recordsToUpdate.length; i += 10) {
    await base.update(recordsToUpdate.slice(i, i + 10))
      .catch(err => console.log(err));
  }

  return { props: { items } };
}

const getMapsUrl = (record, mapsApiKey) => {
  if (!record || !mapsApiKey)
    return "";

  const district = Array.isArray(record["Distritos"])
    ? record["Distritos"][0]
    : record["Distritos"];

  const query = Object.prototype.hasOwnProperty.call(record, "Código Plus")
    ? record["Código Plus"]
    : record["Dirección"] + " " + district;

  const url =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    encodeURIComponent(query) +
    "&key=" +
    mapsApiKey;

  return url;
};
