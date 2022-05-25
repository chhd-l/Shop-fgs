import React, { useEffect, useState, useContext } from 'react';
import {
  FormattedMessage,
  injectIntl,
  FormattedDate
} from 'react-intl-phraseapp';
const ProductDailyRation = ({ rations }) =>
  rations ? (
    <div
      style={{
        textAlign: 'center',
        background: '#f9f9f9',
        color: '#000',
        maxWidth: '400px',
        margin: '0 auto'
      }}
      className="text-center rc-padding--xs mt-4"
    >
      <div style={{ fontSize: '12px' }} className="rc-padding-bottom--xs">
        <FormattedMessage id="subscription.dailyRation" />
      </div>
      <div style={{ fontSize: '1rem' }}>{rations}</div>
    </div>
  ) : null;
export default injectIntl(ProductDailyRation);
