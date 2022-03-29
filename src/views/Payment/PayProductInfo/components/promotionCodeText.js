import React, { useState } from 'react';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { formatMoney } from '@/utils/utils';
export default function PromotionCodeText({ el, i }) {
  const [promotionsVisible, setPromotionsVisible] = useState(false);
  return (
    <div className="row leading-lines shipping-item green" key={i}>
      <div className="col-7 start-lines">
        <p
          className="order-shipping-cost ui-text-overflow-line2"
          id={`marketingName${i}`}
          onMouseEnter={(e) => {
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
          {el.marketingName}
        </p>
        <ConfirmTooltip
          arrowStyle={{ left: '10%' }}
          display={promotionsVisible}
          containerStyle={{ left: '100%' }}
          cancelBtnVisible={false}
          confirmBtnVisible={false}
          updateChildDisplay={(status) => setPromotionsVisible(status)}
          content={
            <div
              style={{
                maxWidth: 250,
                wordWrap: 'break-word'
              }}
            >
              {el.marketingName}
            </div>
          }
        />
      </div>
      <div className="col-5 end-lines">
        <p className="text-right">
          <span className="shipping-total-cost">
            <strong>-{formatMoney(el.discountPrice)}</strong>
          </span>
        </p>
      </div>
    </div>
  );
}
