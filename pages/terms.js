import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageSelector';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Obfuscate from 'react-obfuscate';
import { Event } from '../components/Analytics';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

const Terms = () => {
  const { language } = useContext(LanguageContext);
  const content = pageContent[language];

  return (
    <>
      <NextSeo title="Términos y Condiciones" />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-auto px-3 pt-8 sm:pt-16 pb-16">
          <div className="max-w-6xl mx-auto" id="terms">
            <h2 className="font-extrabold text-2xl sm:text-3xl leading-none mb-2">
              {content.title}
            </h2>
            <p className="mb-6">
              {content.label}
            </p>
            <p className="sm:text-lg mb-2">
              La plataforma “Delivery Chimbote” (<Link href="/">https://deliverychimbote.com</Link>) es un directorio de comercios que clasifica la oferta de bienes o servicios en función a determinados criterio propio. Busca conectar comercios con consumidores. “Delivery Chimbote” NO es un portal de venta de productos o servicios ni un servicio de entrega o delivery. En tal medida no realiza ventas, presta servicios ni garantiza la entrega o calidad de los bienes o servicios ofertados ni el pago por los mismos.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              1. Cumplimiento de la Ley:
            </h3>
            <p className="sm:text-lg mb-2">
              Los comercios deben en todo momento preocuparse por conocer, entender y cumplir toda la normativa aplicable a los bienes y servicios que ofertan. “Delivery Chimbote” no hace una evaluación de los comercios. Sin embargo, se reserva el derecho a retirar a comercios a su discreción.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              2. Clasificaciones y Comentarios:
            </h3>
            <p className="sm:text-lg mb-2">
              “Delivery Chimbote” podrá difundir la opinión de los visitantes con relación a los comercios y su interacción, el volumen de visitas que reciban y las valoraciones. “Delivery Chimbote” a su sola discreción podrá retirar cualquier tipo de comentarios.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              3. Registro del Comercio en el Directorio
            </h3>
            <p className="sm:text-lg mb-2">
              Para ser incluidos en el Directorio los Comercios deben completar un formulario, el cual podrá ser validado antes o después de su ingreso al Directorio. “Delivery Chimbote” podrá a su discreción modificar la información ingresada, modificar la clasificación o retirar a cualquier comercio del Directorio.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              4. Condiciones Comerciales entre Comercios y Visitantes
            </h3>
            <p className="sm:text-lg mb-2">
              Los precios, características de los servicios, lugar y momento de entrega, medio o momento de pago son acordados entre el comercio y los visitantes sin intervención de “Delivery Chimbote”.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              5. Reclamos
            </h3>
            <p className="sm:text-lg mb-2">
              Los reclamos deberán ser formulados y dirigidos directamente por los visitantes o los comercios a los comercios o visitantes con que interactuaron.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              6. Obligaciones de los Comercios y Visitantes
            </h3>
            <ol className="sm:text-lg my-2">
              <li>
                No usar el Directorio para injuriar, difamar, intimidar, discriminar (incluyendo el uso de estereotipos sociales que originen perjuicios o cualquier tipo de discriminación), violar la propia imagen o acosar a otros visitantes;
              </li>
              <li>
                No utilizar la plataforma para difundir contenidos que puedan calificar como cadenas, spam, virales; obsceno, vulgar, abusivo, amenazante, engañoso, fraudulento, invasivo de la intimidad, etc.; o cualquier otro que no sea adecuado a la naturaleza y finalidad de la plataforma;
              </li>
              <li>
                En el caso específico del Comercio, este no podrá utilizar la plataforma como medio para infringir derechos de propiedad intelectual de terceros, aprovecharse de la reputación afectar el buen nombre o reputación de terceros.
              </li>
            </ol>
            <p className="sm:text-lg mb-2">
              El incumplimiento de estas obligaciones podría desencadenar consecuencias en el ámbito del Derecho Penal. “Delivery Chimbote” se reserva el derecho de proveer información a terceros afectados o denunciar a los responsables ante las autoridades competentes.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              7. Cambios en los Términos y Condiciones
            </h3>
            <p className="sm:text-lg mb-2">
              “Delivery Chimbote” se reserva el derecho de hacer cambios en los términos y condiciones, retirar comercios, modificar el Directorio o los criterios de clasificación de los bienes o servicios ofrecidos.
            </p>
            <p className="sm:text-lg mb-2">
              Las modificaciones serán publicadas o se evidenciará las mismas en el Directorio. Los comercios o visitantes deberán revisar el Directorio de manera regular. El uso continuado del Directorio después de que los Términos y Condiciones hayan sido modificados importará su aceptación.
            </p>
            <p className="sm:text-lg mb-2">
              “Delivery Chimbote” podrá interrumpir (de forma permanente o temporal) el Directorio (o cualquiera de sus funcionalidades) como consecuencia de requisitos operacionales, tales como, aquellos relacionados con la seguridad o las necesidades de mantenimiento.
            </p>
            <h3 className="sm:text-lg font-bold mt-4 mb-2">
              8. Cancelación de cuentas
            </h3>
            <p className="sm:text-lg mb-2">
              Usted podrá cancelar su cuenta en cualquier momento. “Delivery Chimbote” podrá cancelar su cuenta en cualquier momento si:
            </p>
            <ul className="sm:text-lg my-2">
              <li>
                Ud. incumple cualquiera de las disposiciones incluidas en estos Términos y Condiciones, o actúa de forma tal que se pueda inferir que pretende hacerlo o que no será capaz de hacerlo.
              </li>
              <li>
                Por mandato de la autoridad administrativa, policial o judicial competente.
              </li>
              <li>
                Deja de prestar los Servicios, se elimina o se da de baja de la plataforma.
              </li>
              <li>
                El Directorio deja de ser en opinión de “Delivery Chimbote”, comercialmente viable. La cancelación de su cuenta no afecta los derechos y obligaciones legales que hayan asumido durante su uso, o cuya vigencia deba continuar conforme a su naturaleza, condición, características o acuerdos.
              </li>
            </ul>
            <p className="sm:text-lg mb-4">
              {content.contact}
              <Obfuscate
                email="deliverychimbote@abig.pe"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Event("Email", "Click", "deliverychimbote")}
              />.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const pageContent = {
  'es-PE': {
    title: 'Términos y Condiciones',
    label: 'Actualizado: Junio 2020.',
    contact: 'Consultas y comentarios sobre la página web: ',
  }
};

export default Terms;
