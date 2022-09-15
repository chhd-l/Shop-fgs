import React, { useState } from 'react';
import { Popover } from '@/components/Common';
import { formatMoney } from '@/utils/utils';

export default function PromotionCodeText({ el, i }) {
  const [promotionsVisible, setPromotionsVisible] = useState(false);
  console.log(el);
  return (
    <div className="row leading-lines shipping-item green" key={i}>
      <div className="col-7 start-lines">
        <Popover
          display={promotionsVisible}
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
        >
          <p
            data-testid="promotionCodeText"
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
        </Popover>
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
