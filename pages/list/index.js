import { useContext, useState, useEffect } from 'react'
import Promise from 'promise-polyfill'
import { LanguageContext } from '../../components/LanguageSelector'
import Head from '../../components/Head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import LoadingSpinner from '../../components/LoadingSpinner'
import { FiltersList } from '../../components/FiltersList'
import ListItem from '../../components/ListItem'

const pageContent = {
  'es-PE': {
    title: 'Negocios',
    districtLabel: 'Distritos',
    selectDistrict: 'Seleccione un distrito...',
    businessTypeLabel: 'Rubro',
    selectType: 'Seleccione un rubro...',
    zonesLabel: 'Zonas',
    offersLabel: 'Productos',
    delivery: 'Delivery disponible',
  }
}

const FilterLabel = ({ handleChange, isChecked, label }) => (
  <label
    className={
      'inline-block rounded font-medium border-2 border-indigo cursor-pointer px-2 py-1 m-1' +
      (isChecked ? ' text-sand-light bg-indigo' : ' text-indigo')
    }
  >
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      className="sr-only"
    />
    <span className="select-none">{label}</span>
  </label>
)

export default ({ items }) => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterZone, setFilterZone] = useState([])
  const [filterTypes, setFilterTypes] = useState([])
  const [filterOffers, setFilterOffers] = useState([])
  const [filterDelivery, setFilterDelivery] = useState(false)

  if (items)
    return (
      <>
        <Head />
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-auto px-3 pt-8 sm:pt-16 pb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="flex-auto font-extrabold text-2xl sm:text-3xl leading-none mb-4 sm:mb-6">
                {content.title}
              </h2>
              <div className="flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.districtLabel}
                </p>
                {FiltersList.districts.map(district => {
                  const isChecked = filterDistrict === district
                  const handleChange = () => {
                    setFilterZone([])
                    if (isChecked) {
                      setFilterDistrict('')
                    }
                    else setFilterDistrict(district)
                  }
                  return (
                    <FilterLabel
                      key={district}
                      handleChange={handleChange}
                      isChecked={isChecked}
                      label={district}
                    />
                  )
                })}
              </div>
              <div className="flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.zonesLabel}
                </p>
                {filterDistrict
                  ? (
                      FiltersList.zones[filterDistrict].map(zone => {
                        const isChecked = filterZone.includes(zone)
                        const handleChange = () => {
                          if (isChecked) {
                            const newZones = [...filterZone]
                            newZones.splice(newZones.indexOf(zone), 1)
                            setFilterZone(newZones)
                          } else {
                            setFilterZone([...filterZone, zone])
                          }
                        }
                        return (
                          <FilterLabel
                            key={zone}
                            handleChange={handleChange}
                            isChecked={isChecked}
                            label={zone}
                          />
                        )
                      })
                    )
                  : (
                      <p className="w-full md:w-auto font-medium m-1 mr-2">
                        {content.selectDistrict}
                      </p>
                    )
                }
              </div>
              <div className="flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.businessTypeLabel}
                </p>
                {FiltersList.businesses.map(type => {
                  const isChecked = filterTypes.includes(type)
                  const handleChange = () => {
                    if (isChecked) {
                      const newTypes = [...filterTypes]
                      newTypes.splice(newTypes.indexOf(type), 1)
                      setFilterTypes(newTypes)
                      const newOffers = [...filterOffers]
                      filterOffers.forEach(offer => {
                        if (FiltersList.offers[type].indexOf(offer) !== -1) {
                          newOffers.splice(newOffers.indexOf(offer), 1)
                        }
                      })
                      setFilterOffers(newOffers)
                    } else {
                      setFilterTypes([...filterTypes, type])
                    }
                  }
                  return (
                    <FilterLabel 
                      key={type}
                      handleChange={handleChange}
                      isChecked={isChecked}
                      label={type}
                    />
                  )
                })}
              </div>
              <div className="w-full flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.offersLabel}
                </p>
                {filterTypes.length
                  ? (
                      filterTypes.map(type => {
                        return FiltersList.offers[type].map(offer => {
                          const isChecked = filterOffers.includes(offer)
                          const handleChange = () => {
                            if (isChecked) {
                              const newOffers = [...filterOffers]
                              newOffers.splice(newOffers.indexOf(offer), 1)
                              setFilterOffers(newOffers)
                            } else {
                              setFilterOffers([...filterOffers, offer])
                            }
                          }
                          return (
                            <FilterLabel
                              key={offer}
                              handleChange={handleChange}
                              isChecked={isChecked}
                              label={offer}
                            />
                          )
                        })
                      })
                    )
                  : (
                      <p className="w-full md:w-auto font-medium m-1 mr-2">
                        {content.selectType}
                      </p>
                    )
                }
              </div>
              <label className="inline-flex items-center font-medium cursor-pointer mb-6">
                <span className="select-none mr-2">{content.delivery}</span>
                <input
                  type="checkbox"
                  checked={filterDelivery}
                  onChange={() => setFilterDelivery(!filterDelivery)}
                  className="form-checkbox"
                />
              </label>
              <ul className="flex flex-wrap -m-3">
                {items
                  // Filter for necessary content
                  .filter(
                    item =>
                      item.display &&
                      item.name &&
                      item.description &&
                      item.district &&
                      item.address 
                  )
                  // Filter for district
                  .filter(item =>
                    filterDistrict
                      ? item.district.includes(filterDistrict)
                      : true  
                  )
                  // Filter for zones
                  .filter(item =>
                    filterZone && filterZone.length
                      ? filterZone.some(zone =>
                          item.zones.includes(filterDistrict + ": " + zone)
                        )
                      : true
                  )
                  // Filter for business type
                  .filter(item =>
                    filterTypes && filterTypes.length
                      ? filterTypes.some(type =>
                          item.businesstype.includes(type)
                        )
                      : true
                  )
                  // Filter for offers
                  .filter(item =>
                    filterOffers && filterOffers.length
                      ? filterOffers.some(offer =>
                          item.offerings.includes(offer)
                        )
                      : true
                  )
                  // Filter for delivery
                  .filter(item =>
                    filterDelivery ? item.delivery : true
                  )
                  .map((item, index) => (
                    <ListItem
                      key={index}
                      item={item}
                    />
                  ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  return (
    <div className="w-full h-full flex items-center justify-center text-3xl text-orange">
      <LoadingSpinner />
    </div>
  )
}

export async function getStaticProps() {
  const airtableApiKey = process.env.AIRTABLE_API_KEY
  const airtableBaseKey = process.env.AIRTABLE_BASE_KEY

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
  const items = await Promise.all(
    records.sort(() => 0.5 - Math.random()).map(record => record.fields)
  )

  return { props: { items } }
}
