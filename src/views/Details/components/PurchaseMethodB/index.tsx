import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

type PurchaseMethodType = {
  form: {
    buyWay: number;
    frequencyVal: string;
    frequencyName: string;
    frequencyId: number;
  };
  fromPrice: string;
  isMobile: boolean;
  specAndQuantityDom: () => void;
  isNullGoodsInfos: () => void;
};

const PurchaseMethodB = ({
  form,
  fromPrice,
  isMobile,
  specAndQuantityDom,
  isNullGoodsInfos
}: PurchaseMethodType) => {
  const freeshippingBox = () => {
    return (
      <div className="pb-4">
        {form.buyWay === 0 && (
          <div className="freeshippingBox">
            <FormattedMessage
              id={
                ['tr', 'se'].includes(window.__.env.REACT_APP_COUNTRY)
                  ? 'oneoffFreeShipping'
                  : 'freeShipping'
              }
            />
          </div>
        )}
        {form.buyWay === 1 && (
          <div className="freeshippingBox">
            <FormattedMessage id="freeShipping" />
          </div>
        )}
        {form.buyWay === 2 && (
          <>
            <div className="freeshippingBox">
              <FormattedMessage id="freeShipping" />
            </div>
            <br />
            {window.__.env.REACT_APP_COUNTRY !== 'ru' && (
              <div className="freeshippingBox">
                <FormattedMessage id="detail.subscriptionBuyTip" />
              </div>
            )}
          </>
        )}
      </div>
    );
  };
  return (
    <div
      className={classNames({
        hidden: isNullGoodsInfos
      })}
    >
      {isMobile ? specAndQuantityDom() : null}
      <div>
        <span className="text-3xl font-normal">From {fromPrice} €</span>
        <span className="ml-5">
          * With subscription
          {/* <FormattedMessage id='' /> */}
        </span>
      </div>
      {freeshippingBox()}
    </div>
  );
};

export default PurchaseMethodB;
