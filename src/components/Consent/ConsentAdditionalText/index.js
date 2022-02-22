import React from 'react';
import './index.less';

const ConsentAdditionalText = ({ textPosition }) => {
  console.log(textPosition, 'textPosition');
  const topText = {
    us: (
      <p className="consent-txt">
        We’d like to continue to keep you and your pet up to date with all the
        exciting promotions and new product developments from Royal Canin and
        &nbsp;
        <a href="https://www.mars.com/made-by-mars" target="_blank">
          Mars Petcare and its affiliates
        </a>
        , which we think would interest you. From time to time, we may also use
        your data for research to enhance our product and service offerings to
        our consumers. If you are over the age of 16 years old, please confirm
        your choice by clicking the boxes below.
      </p>
    ),
    fr: (
      <div className="consent-txt">
        <p>
          Je souhaite recevoir par mail des conseils personnalisés et des offres
          sur la nutrition, la santé, le bien-être et l’éducation de mon animal
          de la part de &nbsp;
          <a
            href="https://fra.mars.com/mars-et-ses-marques/petcare"
            target="_blank"
          >
            Mars Petcare et ses filiales
          </a>
          .
        </p>
        <p>
          Je suis âgé(e) de plus de 16 ans et je souhaite recevoir ces
          informations de la part de :{' '}
        </p>
      </div>
    ),
    de: (
      <div className="consent-txt">
        <p>
          Wir möchten Sie und Ihr Haustier auch weiterhin über spannende neue
          Produktentwicklungen, Werbeaktionen oder Umfragen innerhalb von Mars
          Petcare und seinen Tochtergesellschaften &nbsp;
          <a href="https://deu.mars.com/hergestellt-von-mars" target="_blank">
            'Made by Mars'
          </a>{' '}
          &nbsp; auf dem Laufenden halten, von denen wir glauben, dass sie für
          Sie interessant sind, Ihr Einverständnis vorausgesetzt.
        </p>
        <p>
          Ja, ich bin über 16 Jahre alt und möchte folgende Informationen
          erhalten:
        </p>
      </div>
    ),
    se: (
      <div className="consent-txt">
        <p>
          Ja tack, jag vill gärna få nyheter, tävlingar, skräddarsydda kostråd
          och erbjudanden på produkter via e-post, SMS och telefon. Jag är över
          16 år och jag kan när som helst återkalla mitt samtycke.
        </p>
      </div>
    )
  };
  const bottomText = {
    us: (
      <div className="explain-txt">
        <p className="mb-2">
          I understand that I may change these preferences at any time by
          contacting Mars Petcare at 1-844-673-3772 or by clicking &nbsp;
          <a href="https://shop.royalcanin.com/help/contact" target="_blank">
            here
          </a>
          .
        </p>
        <p>
          For more information about how we use your data, please see Mars
          Privacy Statement:
          <a href="https://www.mars.com/privacy" target="_blank">
            https://www.mars.com/privacy
          </a>
          .
        </p>
      </div>
    ),
    fr: (
      <div className="explain-txt">
        <p>
          Je comprends que je peux modifier ces préférences à tout moment en me
          connectant sur
          <a href="https://account.royalcanin.com/fr-fr" target="_blank">
            « Mon Compte »
          </a>
          .
        </p>
        <p>
          De façon ponctuelle, vos données pourront être utilisées à des fins
          d’études statistiques anonymes afin d'améliorer nos offres de produits
          et de services. Vous pouvez en savoir plus sur la manière dont Mars
          Petcare et ses filiales collectent et traitent vos données, nous
          contacter pour toute question relative à la confidentialité et exercer
          vos droits en matière de données à caractère personnel via la &nbsp;
          <a href="https://www.mars.com/privacy-policy-france" target="_blank">
            déclaration de confidentialité de Mars
          </a>
          . Vous avez également le droit d’introduire une réclamation auprès de
          la CNIL.
        </p>
      </div>
    ),
    de: (
      <div className="explain-txt">
        <p className="mb-2">
          Mir ist bewusst, dass ich diese Präferenzen jederzeit ändern kann,
          über den Kundenservice oder online über den entsprechenden Link.
        </p>
        <p>
          Wenn Sie mehr erfahren möchten, wie Mars Petcare und seine
          Tochtergesellschaften Ihre Daten erheben und verarbeiten oder Sie
          Fragen zum Datenschutz haben, kontaktieren Sie uns oder schauen Sie in
          unsere &nbsp;
          <a href="https://www.mars.com/privacy-policy-germany" target="_blank">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
    ),
    se: (
      <div className="explain-txt">
        <p>
          Från tid till annan kan vi använda dina uppgifter till forskning för
          att förbättra vår produkt- och tjänsteerbjudanden. Du kan ta reda på
          hur Mars Petcare och dess dotterbolag samlar in och behandlar dina
          uppgifter, kontakta oss med sekretessfrågor och utöva dina
          personuppgifter via &nbsp;
          <a href="https://www.mars.com/privacy-policy-sweden" target="_blank">
            Mars’ Sekretesspolicy
          </a>
          .
        </p>
      </div>
    )
  };

  return (
    <div className="consent-additional-text-wrap">
      {textPosition === 'top' ? topText[window.__.env.REACT_APP_COUNTRY] : null}
      {textPosition === 'bottom'
        ? bottomText[window.__.env.REACT_APP_COUNTRY]
        : null}
    </div>
  );
};

export default ConsentAdditionalText;
