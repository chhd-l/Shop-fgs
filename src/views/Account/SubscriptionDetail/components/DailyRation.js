import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const DailyRation = ({ rations }) => {
  return rations ? (
    <span
      style={{
        background: '#F5F5F5',
        padding: '6px',
        // marginTop: '30px',
        display: 'inline-block'
      }}
    >
      <span style={{ fontSize: '12px' }}>
        <FormattedMessage id="subscription.dailyRation" />
      </span>
      :<strong>{rations}</strong>
    </span>
  ) : null;
};
export default DailyRation;
