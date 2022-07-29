import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const DailyRation = ({ rations, type }) => {
  return rations ? (
    <span
      style={{
        background: '#F5F5F5',
        padding: '6px',
        // marginTop: '30px',
        display: 'inline-block'
      }}
    >
      {type === 'mobile' && (
        <>
          <span style={{ fontSize: '12px' }}>
            <FormattedMessage id="subscription.dailyRation" />
          </span>
          <strong>:{rations}</strong>
        </>
      )}
      {type === 'pc' && (
        <>
          <p style={{ fontSize: '12px' }}>
            <FormattedMessage id="subscription.dailyRation" />
          </p>
          <strong className=" inline-block w-full text-center">
            {rations}
          </strong>
        </>
      )}
    </span>
  ) : null;
};
export default DailyRation;
