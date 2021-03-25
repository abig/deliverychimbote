import { useContext, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, List, UserPlus } from 'react-feather';
import { LanguageContext } from './LanguageSelector';
import Logo from './Logo';

const content = {
  restaurants: {
    'es-PE': {
      label: 'Negocios',
      map: 'Mapa',
      list: 'Listado',
      submit: 'Registra tu negocio'
    }
  },
  about: { 'es-PE': 'Nosotros' },
  dropdown: { 
    'es-PE': {
      soon: 'Próximamente'
    }
  }
};

const Nav = () => {
  const maintenance = (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true');
  const { language } = useContext(LanguageContext);

  return (
    <nav className="px-3 py-6 border-t-4 border-orange">
      <div className="max-w-6xl flex items-center mx-auto">
        <div className="flex-auto flex items-center -mx-3">
          <Link href="/" passHref>
            <a className="inline-flex items-center ml-3 sm:mr-6">
              <Logo className="h-20 stroke-none sm:mr-2" />
              <h2 className="hidden sm:inline-block font-fredoka-one tracking-wider uppercase text-2xl">
                Delivery Chimbote
              </h2>
            </a>
          </Link>
          {!maintenance &&
            <Dropdown
              items={[
                { href: '/map', label: content.restaurants[language].map, icon: MapPin },
                { href: '/list', label: content.restaurants[language].list, icon: List },
                { href: '/submit', label: content.restaurants[language].submit, icon: UserPlus },
              ]}
              label={content.restaurants[language].label}
              soon={content.dropdown[language].soon}
            />
          }
          <NavLink className="hidden sm:inline-block" href="/about" label={content.about[language]} />
        </div>
        <div className="-mx-3 hidden md:block">
          <NavLink className="inline-block" href="/submit" label={content.restaurants[language].submit} />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, label, className }) => (
  <Link href={href} passHref>
    <a className={className ? 'font-medium mx-3 ' + className : 'font-medium mx-3'}>{label}</a>
  </Link>
);

const Dropdown = ({ align, items, label, soon, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
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
                {items.map(({ href, label, icon: Icon, disabled }) => {
                  const handleClick = (event) => {
                    if (!disabled) setShowDropdown(false);
                    else event.preventDefault();
                  };
                  return (
                    <li key={label} className="w-full">
                      <Link href={disabled ? '#' : href} passHref>
                        <a
                          onClick={handleClick}
                          className="group flex items-center font-medium px-3 py-2 my-2 space-x-2"
                          disabled={disabled}
                        >
                          <Icon className="h-5 text-teal group-hover:text-indigo transition-color duration-150 ease-in-out" />
                          <span>{label} {disabled && '(' + soon + ')'}</span>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Nav;
