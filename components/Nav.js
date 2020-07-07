import { useContext, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'react-feather'
import { LanguageContext } from './LanguageSelector'
import Logo from './Logo'

const content = {
  restaurants: {
    'es-PE': {
      label: 'Negocios',
      map: 'Mapa',
      list: 'Listado',
      submit: 'Registra tu negocio'
    },
    'en-US': {
      label: 'Businesses',
      map: 'Map view',
      list: 'List view',
      submit: 'Submit your business'
    },
  },
  about: { 'es-PE': 'Nosotros', 'en-US': 'About' },
  dropdown: { 
    'es-PE': {
      soon: 'Próximamente'
    },
    'en-US': {
      soon: 'Soon'
    }
  },
  forRestaurants: {
    'es-PE': {
      label: 'Para negocios',
      resources: 'Recursos',
      submit: 'Registra tu negocio',
    },
    'en-US': {
      label: 'For restaurants',
      resources: 'Resources',
      submit: 'Submit your business',
    },
  },
  submit: {
    'es-PE': 'Regístrate',
    'en-US': 'Submit',
  },
}

export default () => {
  const maintenance = (process.env.MAINTENANCE_MODE === 'true')
  const { language } = useContext(LanguageContext)

  return (
    <nav className="px-3 py-6">
      <div className="max-w-6xl flex items-center mx-auto">
        <div className="flex-auto flex items-center -mx-3">
          <Link href="/">
            <a className="inline-flex items-center ml-3 sm:mr-6">
              <Logo className="h-20 stroke-none sm:mr-2" />
              <h2 className="hidden sm:inline-block font-fredoka-one font-spacing-1 uppercase text-2xl">
                Delivery Chimbote
              </h2>
            </a>
          </Link>
          {!maintenance &&
            <Dropdown
              items={[
                { href: '/list', label: content.restaurants[language].list },
                { href: '/submit', label: content.restaurants[language].submit },
                { href: '/map', label: content.restaurants[language].map, disabled: true }
              ]}
              label={content.restaurants[language].label}
              soon={content.dropdown[language].soon}
            />
          }
          <NavLink className="hidden sm:inline-block" href="/about" label={content.about[language]} />
        </div>
        <div className="-mx-3">
          <Dropdown
            className="hidden sm:block"
            align="right-0"
            items={[
              { href: '/submit', label: content.forRestaurants[language].submit },
              { href: '/resources', label: content.forRestaurants[language].resources }
            ]}
            label={content.forRestaurants[language].label}
            soon={content.dropdown[language].soon}
          />
          <NavLink className="inline-block sm:hidden" href="/submit" label={content.submit[language]} />
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, label, className }) => (
  <Link href={href}>
    <a className={className ? 'font-medium mx-3 ' + className : 'font-medium mx-3'}>{label}</a>
  </Link>
)

const Dropdown = ({ align, items, label, soon, className }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <>
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          className="fixed inset-0 z-10"
        />
      )}
      <div className={className ? 'flex flex-col mx-3 ' + className : 'flex flex-col mx-3'}>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center font-medium"
        >
          {label}
          {showDropdown
            ? (
              <ChevronUp
                style={{ transform: 'translateY(1px)' }}
                className="text-indigo-light ml-2"
              />
            )
            : (
              <ChevronDown
                style={{ transform: 'translateY(1px)' }}
                className="text-indigo-light ml-2"
              />
            )
          }
        </button>
        <div className="relative">
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 8 }}
                exit={{ opacity: 0, y: 0 }}
                className={
                  (align ? align + ' ' : 'left-0 ') +
                  'absolute top-0 z-20 w-48 bg-alice-blue border border-sand'
                }
              >
                {items.map(({ href, label, disabled }) => {
                  const handleClick = (event) => {
                    if (!disabled) setShowDropdown(false)
                    else event.preventDefault()
                  }
                  return (
                    <li key={label} className="w-full">
                      <Link href={disabled ? '#' : href}>
                        <a
                          onClick={handleClick}
                          className="group flex font-medium px-3 py-2 my-2"
                          disabled={disabled}
                        >
                          {label} {disabled && '(' + soon + ')'}
                          <span className="flex-auto text-right text-sand-light group-hover:text-indigo-light transition-color duration-150 ease-in-out">
                            ⟶
                          </span>
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
