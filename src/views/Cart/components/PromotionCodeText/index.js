import React, { useState } from 'react';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { formatMoney } from '@/utils/utils';

export default function PromotionCodeText({ el, i }) {
  const [promotionsVisible, setPromotionsVisible] = useState(false);

  return (
    <div className={`row shipping-item green d-flex`}>
      <div className="col-6 pb-4">
        <p
          id={`marketingName${i}`}
          className="ui-text-overflow-line2 mb-0"
          onMouseEnter={() => {
            if (
              document.getElementById(`marketingName${i}`).scrollHeight > 48
            ) {
              setPromotionsVisible(true);
            }
          }}
          onMouseLeave={() => {
            setPromotionsVisible(false);
          }}
        >
          {/* {this.promotionDesc || (
                            <FormattedMessage id="NoPromotionDesc" />
                          )} */}
          {/* <FormattedMessage id="promotion" /> */}
          {el.marketingName}
        </p>
        <ConfirmTooltip
          arrowStyle={{ left: '10%' }}
          display={promotionsVisible}
          containerStyle={{ left: '120%' }}
          cancelBtnVisible={false}
          confirmBtnVisible={false}
          updateChildDisplay={(status) => setPromotionsVisible(status)}
          content={
            <div style={{ maxWidth: 250, wordWrap: 'break-word' }}>
              {el.marketingName}
            </div>
          }
        />
      </div>
      <div className="col-6">
        <p className="text-right shipping-cost text-nowrap">
          {/* - {formatMoney(this.discountPrice)} */}
          <strong>-{formatMoney(el.discountPrice)}</strong>
        </p>
      </div>
    </div>
  );
}
