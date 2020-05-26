import { useContext, useState } from 'react'
import Promise from 'promise-polyfill'

import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import WhatsAppLogo from '../components/WhatsAppLogo'

const lists = {
  businesses: [
    "Comercios",
    "Restaurantes",
    "Ferreterías",
    "Peluquerías",
    "Otros"
  ],
  zones: [
    "A.H.I.S NUEVA CALETA",
    "LA CALETA",
    "HUANCHAQUITO",
    "MANUEL SEOANE",
    "EL ACERO",
    "VICTOR RAUL",
    "BARRIO FISCAL",
    "RAMON CASTILLA",
    "MANUEL AREVALO",
    "ANTUNEZ DE MAYOLO",
    "LA BALANZA",
    "BOLIVAR BAJO",
    "BOLIVAR ALTO",
    "CASCO URBANO",
    "URB. 21 DE ABRIL",
    "SAN ISIDRO",
    "EL PROGRESO",
    "SAN FRANCISCO DE ASIS",
    "DOS DE MAYO",
    "ESPERANZA BAJA",
    "PRIMAVERA BAJA",
    "PRIMAVERA ALTA",
    "SANTA CRUZ",
    "CESAR VALLEJOS",
    "URB EL CARMEN",
    "AA.HH 16 DE DICIEMBRE",
    "LA UNION",
    "PENSACOLA",
    "ESPERANZA ALTA",
    "SAN PEDRO",
    "LOS JARDINES CONO NORTE ",
    "URB LADERAS",
    "URB. LOS PINOS",
    "MANUEL GONZALES PRADA ",
    "DOS DE JUNIO",
    "AA.HH NUEVA GENERACION",
    "AA.HH AMPLIACION NUEVA GENERACION ",
    "PUEBLO LIBRE",
    "MIRAMAR ALTO",
    "MIRAMAR BAJO",
    "MAGDALENA NUEVA",
    "MIRAFLORES BAJO",
    "LA VICTORIA",
    "ALTO PERU",
    "ANTENOR ORREGO",
    "FRATERNIDAD",
    "SAN MIGUEL",
    "AMPLIACION SAN MIGUEL",
    "SANTA IRENE",
    "AA.HH RAMAL PLAYA",
    "AA.HH  AMPLIACION RAMAL PLAYA",
    "AA.HH 10 DE SETIEMBRE",
    "TRES ESTRELLAS",
    "VILLA ESPAÑA",
    "SAN JUAN",
    "MIRAFLORES ALTO I ZONA",
    "MIRAFLORES ALTO III ZONA",
    "AA.HH MIRAFLORES ZONA DE REUBICACION",
    "MIRAFLORES ALTO II ZONA",
    "CIUDAD DE DIOS",
    "FLORIDA BAJA",
    "FLORIDA ALTA",
    "LA LIBERTAD",
    "SEÑOR DE LOS MILAGROS",
    "EL TRAPECIO I ETAPA",
    "EL TRAPECIO II ETAPA",
    "AA.HH. 15 DE ABRIL",
    "ZONA INDUSTRIAL 27 DE OCTUBRE",
    "CHIMBOTE",
    "NUEVO CHIMBOTE",
    "VILLA MARIA",
    "AA.HH. 7 DE JULIO",
    "AA.HH. COSTA VERDE",
    "LAS BRISAS",
    "AA.HH. VILLA JESUS",
    "VILLA HERMOSA",
    "VILLA MARIA SECTOR A",
    "1RO MAYO",
    "3 DE OCTUBRE",
    "GOLFO PERSICO",
    "LAS LOMAS",
    "DIVINO JESUS",
    "SATELITE",
    "PPAO",
    "DAVID DASSO A",
    "DAVID DASSO B",
    "10 DE FEBRERO",
    "15 DE JUNIO",
    "LADERAS DE PPAO",
    "PASEO DEL MAR - DOMUS",
    "BUENOS AIRES I ETAPA",
    "BUENOS AIRES II ETAPA",
    "MIGUEL GRAU",
    "LAS CASUARINAS",
    "MARISCAL LUZURIAGA",
    "PACIFICO",
    "EL BOSQUE",
    "LOS CIPRESES",
    "SANTA ROSA",
    "LOS PORTALES",
    "SANTA CRISTINA",
    "BANCHERO ROSSI",
    "SAN RAFAEL",
    "LAS GARDENIAS",
    "EL DORADO",
    "SANTO TOMAS",
    "VILLA AGRARIA",
    "JOSE CARLOS MARIATEGUI",
    "LOS OLIVOS",
    "LOS HEROES",
    "CACERES ARAMAYO",
    "BRUCES",
    "LOS ALAMOS",
    "LOS PORTALES",
    "BELLAMAR",
    "LAS FLORES",
    "SAN DIEGO",
    "CALIFORNIA",
    "LUIS FELIPE DE LAS CASAS",
    "BELLAMAR 2DA ETAPA",
    "NICOLAS GARATEA",
    "AA.HH. LAS PONCIANAS",
    "VILLA MERCEDES",
    "ALEJANDRO TOLEDO",
    "LOS JARDINES",
    "VILLA DEL MAR",
    "1RO DE AGOSTO",
    "AA.HH. BELEN",
    "UPIS BELEN",
    "SAN LUIS I ETAPA",
    "SAN LUIS II ETAPA",
    "VILLA DEL SUR PARCELA 10",
    "LOS AMAUTAS",
    "VILLA DEL PERIODISTA",
    "LOS DELFINES",
    "VILLA DEL ABOGADO PARCELA 2",
    "AA.HH. LAS FLORES",
    "VILLA DEL SUR PARCELA 17",
    "AHVR. HAYA DE LA TORRE",
    "VILLA MAGISTERIAL"
  ],
  offers: [
    "Frutas y Verduras",
    "Pollo y Huevos",
    "Carnes",
    "Pescados y mariscos",
    "Lacteos",
    "Desayuno",
    "Embutidos y fiambres",
    "Abarrotes",
    "Panadería y pastelería",
    "Aguas y bebidas gaseosas",
    "Cerveza, vinos y licores",
    "Limpieza y aseo",
    "Art. Higiene, Salud",
    "Hogar y Bazar",
    "Limpieza de ropa y calzado",
    "Limpieza del hogar",
    "Higiene y cuidado del cabello",
    "Higiene y cuidado personal",
    "Alimento de Mascotas",
    "Juguetes y regalos",
    "Artículos para niños y bebes",
    "Útiles escolares y de oficina",
    "Gas",
    "Menú",
    "Hamburguesas",
    "Pizza",
    "Pollo a la Brasa",
    "Cebiche",
    "Tortas",
    "Platos a la Carta",
    "Postres",
    "Anticuchos",
    "Sandwich",
    "Bebidas Gaseosas",
    "Herramientas y accesorios",
    "Artículos de construcción",
    "Ladrillos y arenas",
    "Corte para caballeros",
    "Cementos",
    "Pinturas y acabados",
    "Lamparas y colgantes",
    "Tableros aglomerados",
    "Cables y alambres eléctricos",
    "Interruptores y tomacorrientes",
    "Tubos eléctricos y gasfitería",
    "Tableros y llaves termomagnéticas",
    "Productos de fijación",
    "Accesorios de seguridad",
    "Accesorios sanitarios y gasfitería",
    "Tanques de agua y accesorios",
    "Accesorios para pintar",
    "Productos químicos y limpiadores",
    "Focos e iluminación interior",
    "Iluminación exterior",
    "Accesorios para autos",
    "Limpieza de autos",
    "Corte para damas",
    "Pintado del cabello",
    "Peinados y laseados",
    "Manicure",
    "Pedicure",
    "Barbería",
    "Cortes con diseño",
    "Cortes para niños",
    "Farmacias",
    "Panaderia",
    "Tiendas de Regalos",
    "Dulces y pasteles",
    "Lubricantes"
  ]
}

const pageContent = {
  'es-PE': {
    title: 'Negocios',
    businessTypeLabel: 'Rubro',
    businessTypes: {
      ["Comercios"]: "Comercios",
      ["Restaurantes"]: "Restaurantes",
      ["Ferreterías"]: "Ferreterías",
      ["Peluquerías"]: "Peluquerías",
      ["Otros"]: "Otros"
    },
    neighbourhoodLabel: 'Zonas',
    neighbourhoods: {},
    offersLabel: 'Productos',
    offers: {},
    delivery: 'Delivery disponible',
    whatsappLabel: 'Pedir por WhatsApp',
    orderLabel: 'Ir a web',
  },
  'en-US': {
    title: 'Businesses',
    businessTypeLabel: 'Business Type',
    businessTypes: {
      ["Comercios"]: "Shops",
      ["Restaurantes"]: "Restaurants",
      ["Ferreterías"]: "Hardware Stores",
      ["Peluquerías"]: "Hairdressers",
      ["Otros"]: "Various"
    },
    neighbourhoodLabel: 'Neighbourhood',
    neighbourhoods: {},
    offersLabel: 'Offers',
    offers: {},
    delivery: 'Delivery available',
    whatsappLabel: 'Order via WhatsApp',
    orderLabel: 'Website',
  },
}

const ListItem = ({ restaurant, content }) => {
  const name = restaurant.name || undefined
  const address = restaurant.address || undefined
  const description = restaurant.description || undefined
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
              {neighbourhood}
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
          {/* TODO: FIX WHATSAPP LOGOOOOO */}
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
  // TODO: Fix filter for zones
  const [filterNeighbourhood, setFilterNeighbourhood] = useState('')
  const [filterType, setFilterType] = useState('')

  if (restaurants && !!restaurants.length)
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
                  {content.businessTypeLabel}
                </p>
                {lists.businesses.map(businessType => {
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
              <div className="flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.neighbourhoodLabel}
                </p>
                {/* TODO: Fix filter for zones (it has to be multiple-select) */}
                {lists.zones.map(neighbourhood => {
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
                })}
              </div>
              <div className="w-full flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.offersLabel}
                </p>
                {lists.offers.map(offer => {
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
                })}
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
                      restaurant.address &&
                      restaurant.url
                  )
                  // Filter for business type
                  .filter(restaurant =>
                    filterType
                      ? restaurant.businesstype === filterType
                      : true
                  )
                  // Filter for neighbourhood (zone) TODO: Fix
                  .filter(restaurant =>
                    filterNeighbourhood
                      ? restaurant.neighbourhood === filterNeighbourhood
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
  console.log(records);
  const restaurants = await Promise.all(
    records.sort(() => 0.5 - Math.random()).map(record => record.fields)
  )

  return { props: { restaurants } }
}
