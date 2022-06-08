import React from 'react';
import './index.less';

const ConsentAdditionalText = ({ textPosition, pageType }) => {
  // console.log(textPosition, 'textPosition');
  const topText = {
    nl: (
      <div className="consent-txt">
        <p>
          We houden u en uw huisdier graag op de hoogte van aantrekkelijke
          promoties en nieuwe producten van &nbsp;
          <a href="https://www.mars.com/made-by-mars/petcare" target="_blank">
            Mars Petcare en gelieerde bedrijven
          </a>
          .
        </p>
        <p>Ik ben tenminste 16 jaar en wildezegraagontvangen van:</p>
      </div>
    )
  };
  const bottomText = {
    nl: (
      <div className="explain-txt">
        <p className="mb-2">
          Ik begrijp dat ik deze voorkeuren op elk moment kan wijzigen door mijn
          voorkeuren in mijn account bij te werken of door op de afmeldlink te
          klikken in elke communicatie die ik ontvang. Van tijd tot tijd kunnen
          we uw gegevens gebruiken voor onderzoek om ons product- en
          serviceaanbod te verbeteren. Via de Mars Privacyverklaring kunt u te
          weten komen hoe &nbsp;
          <a href="https://www.mars.com/made-by-mars/petcare" target="_blank">
            Mars Petcare en haar gelieerde
          </a>
          &nbsp; ondernemingen uw gegevens verzamelen en verwerken, door contact
          met ons op te nemen of door uw persoonlijke gegevensrechten te
          bekijken via de &nbsp;
          <a href="https://www.mars.com/privacy" target="_blank">
            Mars Privacyverklaring
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
