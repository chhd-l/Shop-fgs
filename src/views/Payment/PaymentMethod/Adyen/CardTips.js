import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl-phraseapp';
import './CardTips.less';

/**
 * 卡过期提示:
 * 当卡 即将过期、过期时展示, 其它情况不展示
 * 使用地方:
 * src/views/Payment/PaymentMethod/Adyen/list.js
 * src/views/Account/Profile/modules/PaymentList.js
 * src/views/Account/SubscriptionDetail/components/PaymentComp/index.js
 * src/views/Account/SubscriptionDetail/components/UserPaymentInfo/index.js
 */

const CardTips = ({ expirationDate = '', expireStatusEnum = '' }) => {
  if (!expirationDate) {
    return (
      <div className="card-tips-wrapper">
        <span className="iconfont iconinfo color-red">
          00/29 - <FormattedMessage id="cardTips.expired" />
        </span>
      </div>
    );
  }

  const formatExpirationDate = moment(expirationDate).format('MM/YY');

  if (expireStatusEnum === 'EXPIRED') {
    return (
      <div className="card-tips-wrapper">
        <span className="iconfont iconinfo color-red">
          {formatExpirationDate} - <FormattedMessage id="cardTips.expired" />
        </span>
      </div>
    );
  }

  if (expireStatusEnum === 'WILL_EXPIRE') {
    return (
      <div className="card-tips-wrapper">
        <span className="iconfont iconinfo color-yellow">
          {formatExpirationDate} -{' '}
          <FormattedMessage id="cardTips.expiresSoon" />
        </span>
      </div>
    );
  }

  return null;
};

export default CardTips;
