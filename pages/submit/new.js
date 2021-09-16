import Script from 'next/script';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import TermsDialog from '../../components/TermsDialog';
import { NextSeo } from 'next-seo';

const SubmitNew = () => {
  return (
    <>
      <NextSeo title="Registrar Negocio" />
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <TermsDialog />
        <main style={{ marginBottom: '-2px' }} className="flex-auto">
          <iframe
            className="airtable-embed airtable-dynamic-height"
            src="https://airtable.com/embed/shrN2FKC61OYPUK5W?backgroundColor=cyan"
            frameBorder="0"
            width="100%"
            style={{ background: 'transparent', border: '1px solid #ccc' }}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SubmitNew;
