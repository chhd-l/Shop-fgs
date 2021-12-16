import React from 'react';
import Header from '@/components/Header';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import UsAndRu from '../Recommendation_US/components/UsAndRu';

const Adoptions = () => {
  return (
    <div>
      <UsAndRu />
    </div>
  );
};
export default injectIntl(Adoptions);
