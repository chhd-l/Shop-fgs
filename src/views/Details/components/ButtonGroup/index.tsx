import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import BuyFromRetailerBtn from '../BuyFromRetailerBtn';
import ErrMsgForCheckoutPanel from '../ErrMsgForCheckoutPanel/index.tsx';
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
  retailerUrl
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
        <div className="mb-2 mr-2 text-right" style={{ fontSize: '.875rem' }}>
          <FormattedMessage
            id="pricesIncludeVAT"
            values={{
              val: <span className="red">*</span>
            }}
            defaultMessage=" "
          />
        </div>
        <div className="buy-btn-box rc-max-width--xl fullHeight text-right mt-4">
          <button
            style={{ padding: '2px 30px' }}
            className={`add-to-cart-btn rc-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${
              addToCartLoading ? 'ui-btn-loading' : ''
            } ${btnStatus ? '' : 'rc-btn-solid-disabled'}`}
            onClick={handleAddToCart}
          >
            <span className="fa rc-icon rc-cart--xs rc-brand3" />
            <span className="default-txt">
              <FormattedMessage
                id={`${
                  form.buyWay === 1 || form.buyWay === 2
                    ? 'subscribe'
                    : 'details.addToCart'
                }`}
              />
            </span>
          </button>
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
        <ErrMsgForCheckoutPanel checkOutErrMsg={checkOutErrMsg} />
      </div>
      <div
        className="sticky-addtocart"
        style={{ transform: 'translateY(-80px)' }}
      >
        <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
          {!vet ? (
            <button
              className={`rc-btn add-to-cart-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${
                addToCartLoading ? 'ui-btn-loading' : ''
              } ${btnStatus ? '' : 'rc-btn-solid-disabled'}`}
              onClick={handleAddToCart}
            >
              <span className="fa rc-icon rc-cart--xs rc-brand3" />
              <span className="default-txt">
                {form.buyWay === 1 || form.buyWay === 2 ? (
                  <FormattedMessage id="subscribe" />
                ) : (
                  <FormattedMessage id="details.addToCart" />
                )}
              </span>
            </button>
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
