export const FiltersList = {
  businesses: [
    "Comercios",
    "Restaurantes",
    "Tecnología",
    "Ferreterías",
    "Peluquerías",
    "Servicios",
    "Otros"
  ],
  offers: {
    ['Comercios']: [
      "Frutas y Verduras",
      "Pollo y Huevos",
      "Carnes",
      "Pescados y mariscos",
      "Lacteos",
      "Desayuno",
      "Embutidos y fiambres",
      "Abarrotes",
      "Panes y biscochos",
      "Aguas y bebidas gaseosas",
      "Cerveza, vinos y licores",
      "Limpieza y aseo",
      "Hogar y Bazar",
      "Limpieza de ropa y calzado",
      "Limpieza del hogar",
      "Higiene y cuidado del cabello",
      "Higiene y cuidado personal",
      "Belleza y Maquillaje",
      "Alimento de Mascotas",
      "Juguetes y regalos",
      "Artículos para niños y bebes",
      "Útiles escolares y de oficina",
      "Gas"
    ],
    ['Restaurantes']: [
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
      "Bebidas Gaseosas"
    ],
    ['Tecnología']: [
      "Laptops",
      "Computadoras",
      "Impresoras",
      "Monitores",
      "Accesorios para computadoras",
      "Componentes gamers",
      "Videojuegos",
      "Consolas",
      "Mandos",
      "Routers y conexión inalámbrica",
      "Streaming",
      "Asistentes de voz",
      "Aspiradoras robot",
      "Seguridad inteligente",
      "Equipos de sonido",
      "Audífonos",
      "Parlantes",
      "Accesorios de audio",
      "Cámaras semiprofesionales",
      "Cámaras profesionales",
      "Accesorios para cámaras",
      "Drones",
    ],
    ['Ferreterías']: [
      "Herramientas y accesorios",
      "Artículos de construcción",
      "Ladrillos y arenas",
      "Cementos",
      "Pinturas y acabados",
      "Lamparas y colgantes",
      "Tableros aglomerados",
      "Cables y alambres eléctricos",
      "Interruptores y tomacorrientes",
      "Tubos eléctricos y de gasfitería",
      "Tableros y llaves termomagnéticas",
      "Productos de fijación",
      "Accesorios de seguridad",
      "Accesorios sanitarios y gasfitería",
      "Tanques de agua y accesorios",
      "Accesorios para pintar",
      "Productos químicos y limpiadores",
      "Focos e iluminación interior",
      "Iluminación exterior"
    ],
    ['Peluquerías']: [
      "Corte para caballeros",
      "Corte para damas",
      "Pintado del cabello",
      "Peinados y laseados",
      "Manicure",
      "Pedicure",
      "Barbería",
      "Cortes con diseño",
      "Cortes para niños"
    ],
    ['Servicios']: [
      "Lavanderías",
      "Lavadero de autos",
      "Agentes multibanco",
      "Casas de cambio",
      "Gasfitería",
      "Carpintería",
      "Fabricación de modulares y melamine",
      "Electrónica",
      "Electricista",
      "Mantenimiento y pintura",
      "Albañilería y construcción"
    ],
    ['Otros']: [
      "Farmacias y boticas",
      "Panaderías y pastelerías",
      "Librerías",
      "Confecciones Textiles",
      "Florerías",
      "Vidrierías",
      "Regalos y novedades",
      "Lubricantes",
      "Repuestos para autos",
      "Lavadero de autos"
    ]
  },
  districts: [
    'Chimbote',
    'Nuevo Chimbote'
  ],
  zones: {
    ['Chimbote']: [
      "La Caleta - Bolivar Alto",
      "El Progreso - 2 de Mayo",
      "El Carmen - La Union",
      "Esperanza Alta - San Pedro",
      "Laderas - Los Pinos",
      "Miramar Bajo - Alto Peru",
      "Miraflores Bajo - San Juan",
      "Florida baja - El Trapecio"
    ],
    ['Nuevo Chimbote']: [
      "Villa Maria - 1ro Mayo",
      "PPAO - 3 de Octubre",
      "Buenos Aires - Casuarinas",
      "Mariscal Luzuriaga - Santa Rosa",
      "Santa Cristina - Villa Agraria",
      "Jose Carlos Mariategui - Bruces",
      "Los Alamos - Nicolas Garatea",
      "Las Poncianas - San Luis"
    ]
  }
}

const SimpleMapToObj = (obj) => {
  const res = {}
  obj.forEach(val => {
    res[val] = val
  })
  return res;
}

const SimpleTransObjFromArr = (obj, values) => {
  const res = {}
  obj.forEach((val, index) => {
    res[val] = values[index]
  })
  return res
}

const ComplexMapToObj = (obj) => {
  const res = {}
  for (let [key, val] of Object.entries(obj)) {
    const gen = {}
    val.forEach(val => {
      gen[val] = val
    })
    res[key] = gen
  }
  return res
}

const ComplexTransObjFromArr = (obj, values) => {
  const res = {}
  for (let [key, val] of Object.entries(obj)) {
    const gen = {}
    val.forEach((val, index) => {
      gen[val] = values[key][index]
    })
    res[key] = gen
  }
  return res
}

export const FiltersTranslation = {
  'es-PE': {
    districts: SimpleMapToObj(FiltersList.districts),
    businessTypes: SimpleMapToObj(FiltersList.businesses),
    offers: ComplexMapToObj(FiltersList.offers)
  },
  'en-US': {
    districts: SimpleMapToObj(FiltersList.districts),
    businessTypes: SimpleTransObjFromArr(FiltersList.businesses, [
      "Shops",
      "Restaurants",
      "Technology",
      "Hardware Stores",
      "Hairdressers",
      "Services",
      "Misc"
    ]),
    offers: ComplexTransObjFromArr(FiltersList.offers, {
      ['Comercios']: [
        "Fruits and vegetables",
        "Chicken and Eggs",
        "Meats",
        "Fish and seafood",
        "Dairy products",
        "Breakfast",
        "Sausages and cold cuts",
        "Groceries",
        "Breads and biscuits",
        "Water and carbonated drinks",
        "Beer, wines and spirits",
        "Cleaning and grooming",
        "Home and Bazaar",
        "Cleaning of clothes and shoes",
        "Home clean",
        "Hygiene and hair care",
        "Hygiene and personal care",
        "Beauty and makeup",
        "Pet Food",
        "Toys and gifts",
        "Articles for children and babies",
        "School and office supplies",
        "Gas"
      ],
      ['Restaurantes']: [
        "Menu",
        "Burgers",
        "Pizza",
        "Grilled chicken",
        "Cebiche",
        "Cakes",
        "A la carte dishes",
        "Desserts",
        "Barbecue",
        "Sandwich",
        "Fizzy Drinks"
      ],
      ['Tecnología']: [
        "Laptops",
        "Computers",
        "Printers",
        "Monitors",
        "Computer Accessories",
        "Gamer components",
        "Video game",
        "Consoles",
        "Controls",
        "Routers and wireless connection",
        "Streaming",
        "Voice assistants",
        "Robot vacuum cleaners",
        "Smart security",
        "Sound equipment",
        "Headphones",
        "Speakers",
        "Audio accessories",
        "Semi-professional chambers",
        "Professional cameras",
        "Camera accessories",
        "Drones",
      ],
      ['Ferreterías']: [
        "Tools and accessories",
        "Construction articles",
        "Bricks and sand",
        "Cements",
        "Paints and finishes",
        "Lamps and pendants",
        "Chipboard",
        "Electric cables and wires",
        "Switches and outlets",
        "Electric and plumbing pipes",
        "Boards and thermo-magnetic keys",
        "Fixing products",
        "Security accessories",
        "Sanitary accessories and plumbing",
        "Water tanks and accessories",
        "Accessories for painting",
        "Chemicals and cleaners",
        "Spotlights and interior lighting",
        "Exterior lighting"
      ],
      ['Peluquerías']: [
        "Haircourts for gentlemen",
        "Haircourts for ladies",
        "Painted hair",
        "Hairstyles",
        "Manicure",
        "Pedicure",
        "Barbershop",
        "Haircourts with design",
        "Haircourts for children"
      ],
      ['Servicios']: [
        "Laundries",
        "Car wash",
        "Multi-bank agents",
        "Exchange houses",
        "Gasfitería",
        "Carpentry",
        "Modular and melamine manufacturing",
        "Electronics",
        "Electrical technician",
        "Maintenance and painting",
        "Masonry and construction"
      ],
      ['Otros']: [
        "Pharmacies",
        "Bakeries",
        "Bookstores",
        "Textile Confections",
        "Florists",
        "Glassworks",
        "Gifts and novelties",
        "Lubricants",
        "Spare parts for cars",
        "Car wash"
      ]
    })
  }
}