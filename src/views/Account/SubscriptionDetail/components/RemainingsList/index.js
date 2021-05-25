import React, { useEffect, useState } from 'react';
import { formatMoney } from '@/utils/utils';
const RemainingsList = ({ remainingsList }) => {
  return (
    <div>
      <p className="red">
        By cancelling your subscription, you will have to pay the remaining
        balance of the dispensers market price of 120 euros.
      </p>
      <p>
        If you unsubscribe now, the balance you will pay is &lt;X euros
        calculated automatically depending on the refill &gt;.
      </p>
      <div>Remaining Tab</div>
      <ul className="subdes-modal-ul-wrap">
        <li
          className="d-flex"
          style={{
            background: '#F6F6F6',
            lineHeight: '2rem',
            borderBottom: '1px solid #E4E4E4',
            padding: '0 1rem'
          }}
        >
          <span className="width50">Unsubcribe before</span>
          <span className="width50" style={{ paddingLeft: '0.5rem' }}>
            Remaining price
          </span>
        </li>
        {remainingsList?.map((item) => (
          <li
            key={item.id}
            className="d-flex"
            style={{
              lineHeight: '2rem',
              borderBottom: '1px solid #E4E4E4',
              padding: '0 1rem'
            }}
          >
            <span className="width50">
              {item.deliveryTimes}
              <FormattedMessage id="smartFeederSubscription.times" />
            </span>
            <span className="width50" style={{ paddingLeft: '0.5rem' }}>
              {formatMoney(item.remainingPrice)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RemainingsList;
