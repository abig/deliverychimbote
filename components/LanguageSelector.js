import { useState, createContext, useContext } from 'react'

const languages = {
  'en-US': 'Switch to English',
  'es-PE': 'Cambiar a español',
}

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es-PE')
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext)
  const opposite = Object.keys(languages).filter(i18n => i18n !== language)[0]
  const label = languages[opposite]
  return (
    <LanguageProvider>
      <button
        onClick={() => setLanguage(opposite)}
        className="font-medium leading-normal"
      >
        {label}
      </button>
    </LanguageProvider>
  )
}
