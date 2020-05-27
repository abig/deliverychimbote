import { useContext, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'react-feather'

import useBreakpoint from '../hooks/useBreakpoint'
import { LanguageContext } from './LanguageSelector'
import Logo from './Logo'

const content = {
  restaurants: {
    'es-PE': {
      label: 'Negocios',
      map: 'Mapa',
      list: 'Listado',
    },
    'en-US': {
      label: 'Businesses',
      map: 'Map view',
      list: 'List view',
    },
  },
  about: { 'es-PE': 'Nosotros', 'en-US': 'About' },
  forRestaurants: {
    'es-PE': {
      label: 'Para negocios',
      resources: 'Recursos',
      submit: 'Regístrate',
    },
    'en-US': {
      label: 'For restaurants',
      resources: 'Resources',
      submit: 'Submit',
    },
  },
  submit: {
    'es-PE': 'Regístrate',
    'en-US': 'Submit',
  },
}

export default () => {
  const maintenance = (process.env.MAINTENANCE_MODE === 'true')
  const breakpoint = useBreakpoint()
  const { language } = useContext(LanguageContext)

  return (
    <nav className="px-3 py-6">
      <div className="max-w-6xl flex items-center mx-auto">
        <div className="flex-auto flex items-center -mx-3">
          <Link href="/">
            <a className="inline-flex items-center ml-3 sm:mr-6">
              <Logo className="h-20 stroke-none mr-2" />
              <h2 className="hidden sm:inline-block font-fredoka-one font-spacing-1 uppercase text-2xl">
                Delivery Chimbote
              </h2>
            </a>
          </Link>
          {!maintenance &&
            <Dropdown
              items={[
                { href: '/map', label: content.restaurants[language].map },
                { href: '/list', label: content.restaurants[language].list },
              ]}
              label={content.restaurants[language].label}
            />
          }
          {breakpoint.sm &&
            <NavLink href="/about" label={content.about[language]} />
          }
        </div>
        <div className="-mx-3">
          {breakpoint.sm ? (
            <Dropdown
              align="right-0"
              items={[
                { href: '/resources', label: content.forRestaurants[language].resources },
                { href: '/submit', label: content.forRestaurants[language].submit },
              ]}
              label={content.forRestaurants[language].label}
            />
          ) : (
            <NavLink href="/submit" label={content.submit[language]} />
          )}
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, label }) => (
  <Link href={href}>
    <a className="font-medium mx-3">{label}</a>
  </Link>
)

const Dropdown = ({ align, items, label }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <>
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          className="fixed inset-0 z-10"
        />
      )}
      <div className="flex flex-col mx-3">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center font-medium"
        >
          {label}
          <ChevronDown
            style={{ transform: 'translateY(1px)' }}
            className="text-indigo-light ml-2"
          />
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
                {items.map(({ href, label }) => (
                  <li key={label} className="w-full">
                    <Link href={href}>
                      <a
                        onClick={() => setShowDropdown(false)}
                        className="group flex font-medium px-3 py-2 my-2"
                      >
                        {label}
                        <span className="flex-auto text-right text-sand-light group-hover:text-indigo-light transition-color duration-150 ease-in-out">
                          ⟶
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
