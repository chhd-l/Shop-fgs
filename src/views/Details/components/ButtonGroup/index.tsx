import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import BuyFromRetailerBtn from '../BuyFromRetailerBtn';
import ErrMsgForCheckoutPanel from '../ErrMsgForCheckoutPanel';
import cn from 'classnames';
import { Button } from '@/components/Common';

interface Props {
  addToCartLoading: boolean;
  btnStatus: boolean;
  form: any;
  isShowRetailerBtn: boolean;
  checkOutErrMsg: string;
  barcode: string;
  goodsType: number | string;
  vet: boolean;
  addToCart: Function;
  buyFromRetailer: Function;
  isApi: boolean;
  isUrl: boolean;
  retailerUrl: string;
  versionType?: boolean;
  showAddToCartBtn?: boolean;
}
const ButtonGroup = ({
  addToCartLoading,
  btnStatus,
  form,
  isShowRetailerBtn,
  checkOutErrMsg,
  barcode,
  goodsType,
  vet,
  addToCart,
  buyFromRetailer,
  isApi,
  isUrl,
  retailerUrl,
  versionType,
  showAddToCartBtn = true
}: Props) => {
  const handleAddToCart = () => {
    addToCart();
  };
  const handleBuyFromRetailer = () => {
    buyFromRetailer();
  };
  return (
    <div>
      <div className="rc-md-up">
        <div
          className={cn(`buy-btn-box rc-max-width--xl fullHeight text-right`, {
            'mt-4': !versionType
          })}
        >
          <Button
            style={{ padding: '2px 30px' }}
            type="primary"
            className={cn(
              `add-to-cart-btn js-sticky-cta rc-margin-right--xs--mobile`
            )}
            loading={addToCartLoading}
            disabled={!btnStatus}
            onClick={handleAddToCart}
          >
            <span className="fa rc-icon rc-cart--xs rc-brand3 opacity-100" />
            <span className="default-txt">
              <FormattedMessage
                id={`${
                  form.buyWay === 1 || form.buyWay === 2
                    ? 'subscribe'
                    : 'details.addToCart'
                }`}
              />
            </span>
          </Button>
          {isShowRetailerBtn ? (
            <>
              &nbsp;&nbsp;
              <FormattedMessage id="or" />
              &nbsp;&nbsp;
              <BuyFromRetailerBtn
                barcode={barcode}
                goodsType={goodsType}
                onClick={handleBuyFromRetailer}
                isApi={isApi}
                isUrl={isUrl}
                retailerUrl={retailerUrl}
              />
            </>
          ) : null}
        </div>
        {/* <ErrMsgForCheckoutPanel checkOutErrMsg={checkOutErrMsg} /> */}
      </div>
      <div
        className="sticky-addtocart"
        style={{ transform: 'translateY(-80px)' }}
      >
        <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
          {!vet && showAddToCartBtn ? (
            <Button
              type="primary"
              className={cn(
                `add-to-cart-btn js-sticky-cta rc-margin-right--xs--mobile`
              )}
              loading={addToCartLoading}
              disabled={!btnStatus}
              onClick={handleAddToCart}
            >
              <span className="fa rc-icon rc-cart--xs rc-brand3" />
              <span className="default-txt">
                {versionType ? (
                  <FormattedMessage id="details.addToCart" />
                ) : [1, 2].includes(form.buyWay) ? (
                  <FormattedMessage id="subscribe" />
                ) : (
                  <FormattedMessage id="details.addToCart" />
                )}
              </span>
            </Button>
          ) : null}
          {isShowRetailerBtn ? (
            <BuyFromRetailerBtn
              barcode={barcode}
              goodsType={goodsType}
              onClick={handleBuyFromRetailer}
              isApi={isApi}
              isUrl={isUrl}
              retailerUrl={retailerUrl}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ButtonGroup;
