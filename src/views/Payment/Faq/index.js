import React from 'react';
import FR_Faq from './faq';
import US_Faq from './us_faq';
import RU_Faq from './ru_faq';

export default class Faq extends React.Component {
  render() {
    return (
      { fr: <FR_Faq />, en: <US_Faq />, ru: <RU_Faq /> }[
        process.env.REACT_APP_LANG
      ] || null
    );
  }
}
