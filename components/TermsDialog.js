import { LanguageContext } from '../components/LanguageSelector';
import * as localStorage from 'local-storage';
import { useEffect, useContext, useState } from 'react';
import Link from 'next/link';

const TermsDialog = () => {
  const { language } = useContext(LanguageContext);
  const content = pageContent[language];
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const value = localStorage.get('terms_accepted');
    setTermsAccepted(value);
  }, []);

  useEffect(() => {
    const currentValue = localStorage.get('terms_accepted');
    if (currentValue !== termsAccepted) {
      localStorage.set('terms_accepted', termsAccepted);
    }
  }, [termsAccepted]);

  return (
    <>
      {!termsAccepted &&
        <div id="dialog" className="shadow-lg">
          <div className="dialog-overlay" />
          <div className="dialog-content">
            <span className="text-white">
              {content.text}
            </span>
            <Link href="/terms">
              <button className="rounded shadow-md btn btn-primary mx-4 text-white">
                {content.read}
              </button>
            </Link>
            <button className="rounded shadow-md btn btn-secondary text-white" onClick={() => setTermsAccepted(true)}>
              {content.accept}
            </button>
          </div>
        </div>
      }
    </>
  );
};

const pageContent = {
  'es-PE': {
    text: 'Al registrarte en nuestro sitio web, aceptas nuestros términos y condiciones.',
    read: 'Ver términos',
    accept: 'Aceptar términos'
  }
};

export default TermsDialog;
