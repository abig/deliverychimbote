import { useContext, useState } from 'react'
import Promise from 'promise-polyfill'

import { LanguageContext } from '../../components/LanguageSelector'
import Head from '../../components/Head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import LoadingSpinner from '../../components/LoadingSpinner'
import WhatsAppLogo from '../../components/WhatsAppLogo'
import { FiltersList, FiltersTranslation } from '../../components/FiltersList'

const pageContent = {
  'es-PE': {
    title: 'Negocios',
    districtLabel: 'Distritos',
    districts: FiltersTranslation["es-PE"].districts,
    selectDistrict: 'Seleccione un distrito...',
    businessTypeLabel: 'Rubro',
    businessTypes: FiltersTranslation["es-PE"].businessTypes,
    selectType: 'Seleccione un rubro...',
    neighbourhoodLabel: 'Zonas',
    offersLabel: 'Productos',
    offers: FiltersTranslation["es-PE"].offers,
    delivery: 'Delivery disponible',
    whatsappLabel: 'Pedir por WhatsApp',
    orderLabel: 'Ir a web',
  },
  'en-US': {
    title: 'Businesses',
    districtLabel: 'Districts',
    districts: FiltersTranslation["en-US"].districts,
    selectDistrict: 'Select a district...',
    businessTypeLabel: 'Business Type',
    businessTypes: FiltersTranslation["en-US"].businessTypes,
    selectType: 'Select a business type...',
    neighbourhoodLabel: 'Neighbourhood',
    offersLabel: 'Offers',
    offers: FiltersTranslation["en-US"].offers,
    delivery: 'Delivery available',
    whatsappLabel: 'Order via WhatsApp',
    orderLabel: 'Website',
  },
}

const ListItem = ({ restaurant, content }) => {
  const name = restaurant.name || undefined
  const address = restaurant.address || undefined
  const description = restaurant.description || undefined
  const district = restaurant.district || undefined
  const neighbourhood = restaurant.neighbourhood || undefined
  const offers = restaurant.offerings || undefined
  const delivery = restaurant.delivery || false
  const phone = restaurant.phone || undefined
  const url = restaurant.url || undefined
  const whatsapp = restaurant.whatsapp || undefined
  const email = restaurant.email || undefined
  const addrQuery = restaurant.pluscode
    ? encodeURIComponent(restaurant.pluscode)
    : encodeURIComponent(restaurant.address)
  return (
    <li className="w-full md:w-1/2 p-3">
      <div className="rounded relative h-full flex flex-col items-start border border-sand overflow-hidden p-4 sm:p-8 lg:px-12">
        <div className="flex-auto">
          {name && <h3 className="text-xl sm:text-2xl">{name}</h3>}
          {neighbourhood && (
            <p className="text-xs sm:text-sm mb-4">
              {district
                ? (neighbourhood + ', ' + district) 
                : neighbourhood
              }
            </p>
          )}
          {address && <p className="text-xs sm:text-sm mb-2"><a href={`https://www.google.com/maps/place/?q=${addrQuery}`} target="_blank" rel="noopener noreferrer">{address}</a></p>}
          {email && <p className="text-sm mb-2"><a href={`mailto:${email}`}>{email}</a></p>}
          {phone && <p className="text-sm mb-4"><a href={`tel:${phone}`}>{phone}</a></p>}
          {description && (
            <p className="max-w-xl text-sm sm:text-base mb-4">{description}</p>
          )}
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
        </div>
        <div className="mt-4 items-center">
          {phone && whatsapp && (
            <a
              href={`https://api.whatsapp.com/send?phone=${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary h-full mr-4 rounded text-sm"
            >
              {content.whatsappLabel}&nbsp;&nbsp;&nbsp;
              <WhatsAppLogo className="inline flex-auto text-right" />
            </a>
          )}
          {url && (
            <a
              href={url.includes('http') ? url : 'https://' + url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary h-full rounded text-sm"
            >
              {content.orderLabel}&nbsp;&nbsp;&nbsp;⟶
            </a>
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

export default ({ restaurants }) => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  const [filterDelivery, setFilterDelivery] = useState(false)
  const [filterOffers, setFilterOffers] = useState([])
  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterNeighbourhood, setFilterNeighbourhood] = useState('')
  const [filterType, setFilterType] = useState('')

  if (restaurants)
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
                    if (isChecked) setFilterDistrict('')
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
                  {content.neighbourhoodLabel}
                </p>
                {filterDistrict 
                  ? (
                      FiltersList.zones[filterDistrict].map(neighbourhood => {
                        const isChecked = filterNeighbourhood === neighbourhood
                        const handleChange = () => {
                          if (isChecked) setFilterNeighbourhood('')
                          else setFilterNeighbourhood(neighbourhood)
                        }
                        return (
                          <FilterLabel
                            key={neighbourhood}
                            handleChange={handleChange}
                            isChecked={isChecked}
                            label={neighbourhood}
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
                {FiltersList.businesses.map(businessType => {
                  const isChecked = filterType === businessType
                  const handleChange = () => {
                    if (isChecked) setFilterType('')
                    else setFilterType(businessType)
                  }
                  return (
                    <FilterLabel 
                      key={businessType}
                      handleChange={handleChange}
                      isChecked={isChecked}
                      label={content.businessTypes[businessType]}
                    />
                  )
                })}
              </div>
              <div className="w-full flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.offersLabel}
                </p>
                {filterType
                  ? (
                      FiltersList.offers[filterType].map(offer => {
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
                            label={content.offers[filterType][offer]}
                          />
                        )
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
                {restaurants
                  // Filter for necessary content
                  .filter(
                    restaurant =>
                      restaurant.display &&
                      restaurant.name &&
                      restaurant.description &&
                      restaurant.district &&
                      restaurant.address 
                  )
                  // Filter for district
                  .filter(restaurant =>
                    filterDistrict
                      ? restaurant.district === filterDistrict
                      : true  
                  )
                  // Filter for neighbourhood (zone)
                  .filter(restaurant =>
                    filterNeighbourhood
                      ? restaurant.neighbourhood === filterNeighbourhood
                      : true
                  )
                  // Filter for business type
                  .filter(restaurant =>
                    filterType
                      ? restaurant.businesstype === filterType
                      : true
                  )
                  // Filter for offers
                  .filter(restaurant =>
                    filterOffers && filterOffers.length
                      ? filterOffers.every(offer =>
                          restaurant.offerings.includes(offer)
                        )
                      : true
                  )
                  // Filter for delivery
                  .filter(restaurant =>
                    filterDelivery ? restaurant.delivery : true
                  )
                  .map((restaurant, index) => (
                    <ListItem
                      key={index}
                      restaurant={restaurant}
                      content={content}
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
  const base = await airtable('Restaurants')
  const records = await base
    .select({
      maxRecords: 999999, // don't want to paginate...
      view: 'Grid view', // NOTE: changing the view name will break things
    })
    .all()
  const restaurants = await Promise.all(
    records.sort(() => 0.5 - Math.random()).map(record => record.fields)
  )

  return { props: { restaurants } }
}
