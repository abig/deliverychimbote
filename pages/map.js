import { useContext, useState, useEffect } from 'react'
import Promise from 'promise-polyfill'
import fetch from 'isomorphic-unfetch'
import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Map from '../components/Map'
import slugify from 'slugify'

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
}

export default ({ items }) => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  const [active, setActive] = useState(false);
  let hash = typeof window !== "undefined"
    ? location.hash
    : undefined

  const handleHashChange = () => {
    hash = location.hash
    if (hash) setActive(items.find(item => slugify(item.name.toLowerCase()) === hash.substr(1)))
    else setActive(false)
  }

  useEffect(
    () => {
      if (typeof window !== "undefined") {        
        handleHashChange()
        window.addEventListener("hashchange", handleHashChange)
      }

      return () => window.removeEventListener("hashchange", handleHashChange)
    },
    []
  )

  return (
    <>
      <Head />
      <div className="h-screen flex flex-col">
        <Nav />
        <main className="flex-auto">
          <Map items={items} content={content} active={active} />
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const airtableApiKey = process.env.AIRTABLE_API_KEY
  const airtableBaseKey = process.env.AIRTABLE_BASE_KEY
  // Reducing number of requests to Maps API
  const googleMapsApiKey =
    process.env.NODE_ENV === 'production'
      ? process.env.GOOGLE_MAPS_API_KEY
      : undefined

  const Airtable = require('airtable')
  const airtable = new Airtable({
    apiKey: airtableApiKey,
  }).base(airtableBaseKey)
  const base = await airtable('Negocios')
  const records = await base
    .select({
      fields: [
        "name", "address", "pluscode", "description", "district", "zones", "businesstype",
        "offerings", "delivery", "email", "phone", "whatsapp", "secondaryphone", "secondarywhatsapp",
        "url", "display", "hours"
      ],
      maxRecords: 999999, // don't want to paginate...
      view: 'Grid view', // NOTE: changing the view name will break things
    })
    .all()
  const items = await Promise.all(records.map(record => record.fields))

  let i = -1
  for await (let item of items) {
    i++
    const query = item.pluscode
      ? item.pluscode
      : item.address + " " + item.district
    const res = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        encodeURIComponent(query) + 
        '&key=' +
        googleMapsApiKey
    ).catch(err => {
      console.log(err)
    })
    const positionData = await res.json()
    if (positionData) items[i].positionData = positionData
  }

  return { props: { items } }
}
