import Router from 'next/router';
import { LanguageContext } from '../components/LanguageSelector';
import {get, set} from 'local-storage';
import { useEffect, useContext, useState } from 'react';

const TermsDialog = () => {
  const { language } = useContext(LanguageContext);
  const content = pageContent[language];
  const [termsAccepted, setTermsAccepted] = useState(get("terms_accepted"));

  useEffect(
    () => {
      set("terms_accepted", termsAccepted);
    },
    [termsAccepted]
  );

  return (
    <>
      {!termsAccepted &&
        <div id="dialog" className="box-shadow">
          <div className="dialog-overlay" />
          <div className="dialog-content">
            <span className="text-white">
              {content.text}
            </span>
            <button className="rounded box-shadow btn btn-primary mx-4 text-white" onClick={() => Router.push("/terms")}>
              {content.read}
            </button>
            <button className="rounded box-shadow btn btn-secondary text-white" onClick={() => setTermsAccepted(true)}>
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
