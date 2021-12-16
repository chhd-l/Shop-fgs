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
