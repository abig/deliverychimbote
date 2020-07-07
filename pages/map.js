import { useContext } from 'react'
import Promise from 'promise-polyfill'
import fetch from 'isomorphic-unfetch'
import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Map from '../components/Map'
import { FiltersTranslation } from '../components/FiltersList'

// start search from google maps: https://www.google.com/maps/place/?q=something (url encoded)

const pageContent = {
  'es-PE': {
    offers: FiltersTranslation["es-PE"].offers,
    orderLabel: 'Ir a web',
    delivery: 'Delivery disponible',
    whatsappLabel: 'Pedir por WhatsApp',
    webLabel: 'Ir a web',
  },
  'en-US': {
    offers: FiltersTranslation["en-US"].offers,
    orderLabel: 'Website',
    delivery: 'Delivery available',
    whatsappLabel: 'Order via WhatsApp',
    webLabel: 'Website',
  },
}

export default ({ items }) => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  return (
    <>
      <Head />
      <div className="h-screen flex flex-col">
        <Nav />
        <main className="flex-auto">
          <Map items={items} content={content} />
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
    // process.env.NODE_ENV === 'production'
    true
      ? process.env.GOOGLE_MAPS_API_KEY
      : undefined

  const Airtable = require('airtable')
  const airtable = new Airtable({
    apiKey: airtableApiKey,
  }).base(airtableBaseKey)
  const base = await airtable('Negocios')
  const records = await base
    .select({
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
      : item.address
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
