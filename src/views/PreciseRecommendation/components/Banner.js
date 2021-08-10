import React, { useState, useEffect } from 'react';
import { getDeviceType, formatMoney } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { useLocalStore } from 'mobx-react';
import cloneDeep from 'lodash/cloneDeep';
import stores from '@/store';
import { sitePurchase } from '@/api/cart';
import LoginButton from '@/components/LoginButton';
import './Banner.less';
import productImg from '@/assets/images/preciseCatNutrition/productimg.png';
const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const bannerList = [
  { img: 'secure_payment', text: 'Secure<br/>payment' },
  { img: 'satisfie_or_reimbursed', text: 'Satisfied or<br/> reimbursed' },
  { img: 'premium_quality', text: 'Premium<br/> Quality' },
  { img: 'fast_shipment', text: '3 Days<br/> shipment' }
];
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const BannerFour = () => {
  return (
    <div
      className=" row col-12 text-center  rc-margin-top--md"
      style={{ maxWidth: '500px', padding: 0 }}
    >
      {bannerList.map((el) => (
        <div className={`${isMobile ? 'col-6' : 'col-3'}`}>
          <LazyLoad>
            <img
              className="m-auto"
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/${el.img}.svg`}
            />
          </LazyLoad>
          <p
            style={{ fontSize: '12px' }}
            dangerouslySetInnerHTML={{ __html: el.text }}
          ></p>
        </div>
      ))}
    </div>
  );
};

const Banner = ({ productShowInfo, intl, recommData, history }) => {
  const { loginStore, configStore, checkoutStore, clinicStore } = useLocalStore(
    () => stores
  );
  const [totalWeight, setTotalWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [addCartBtnStatus, setAddCartBtnStatus] = useState(false);
  useEffect(() => {
    if (!recommData.totalPackWeight) {
      return;
    }
    let newAddCartBtnStatus =
      recommData?.goodsInfo?.stock >= recommData?.goodsInfo?.buyCount;
    setAddCartBtnStatus(newAddCartBtnStatus);
    let newTotalWeight = recommData.totalPackWeight + 'kg';
    if (recommData?.weightUnit?.toLowerCase() == 'g') {
      newTotalWeight = recommData.totalPackWeight / 1000 + 'kg';
    }
    setTotalWeight(newTotalWeight);
  }, [recommData.totalPackWeight]);
  const hanldeUnloginAddToCart = async () => {
    let { goodsInfo, customerPetsVo } = recommData;
    setLoading(true);
    let petInfo = Object.assign({}, customerPetsVo, {
      petType: 'cat'
    });
    try {
      let cartItem = Object.assign(
        goodsInfo,
        { ...goodsInfo.goods },
        { goodsInfo: goodsInfo.goods },
        {
          selected: true,
          quantity: goodsInfo.buyCount,
          currentUnitPrice: goodsInfo.marketPrice,
          goodsInfoFlag: 3,
          questionParams: JSON.stringify(petInfo),
          periodTypeId: goodsInfo.periodTypeId || 3560,
          recommendationInfos: clinicStore.linkClinicRecommendationInfos,
          recommendationId:
            clinicStore.linkClinicRecommendationInfos?.recommendationId ||
            clinicStore.linkClinicId,
          recommendationName:
            clinicStore.linkClinicRecommendationInfos?.recommendationName ||
            clinicStore.linkClinicName,
          taggingForTextAtCart: (goodsInfo.taggingList || []).filter(
            (e) =>
              e.taggingType === 'Text' &&
              e.showPage?.includes('Shopping cart page')
          )[0],
          taggingForImageAtCart: (goodsInfo.taggingList || []).filter(
            (e) =>
              e.taggingType === 'Image' &&
              e.showPage?.includes('Shopping cart page')
          )[0]
        }
      );
      let sizeListItem = cloneDeep(cartItem);
      sizeListItem.selected = true;
      cartItem.sizeList = [sizeListItem];
      let addCartData = {
        valid: addCartBtnStatus,
        cartItemList: [cartItem]
      };
      await checkoutStore.hanldeUnloginAddToCart(addCartData);
      localItemRoyal.set('okta-redirectUrl', 'checkout');
    } catch (err) {
      console.info('errerr', err);
    }
  };
  const handleBuyNow = async () => {
    let { goodsInfo, customerPetsVo } = recommData;
    if (!customerPetsVo || !goodsInfo) {
      console.info('err');
      return;
    }
    let petInfo = Object.assign({}, customerPetsVo, {
      petType: 'cat'
    });
    let params = Object.assign(
      {},
      {
        goodsInfoId: goodsInfo.goodsInfoId,
        goodsNum: goodsInfo.buyCount,
        periodTypeId: goodsInfo.periodTypeId || 3560,
        goodsInfoFlag: 3,
        questionParams: JSON.stringify(petInfo)
      }
    );
    try {
      setLoading(true);
      await sitePurchase(params);
      let recommendProd = Object.assign({}, params, recommData, goodsInfo);
      // sessionItemRoyal.set('recommend_product', JSON.stringify([recommendProd]));
      await checkoutStore.updateLoginCart({ delFlag: 1 });
      history.push('/checkout');
      // const url = await distributeLinktoPrecriberOrPaymentPage({
      //   configStore,
      //   checkoutStore,
      //   clinicStore,
      //   isLogin: loginStore.isLogin
      // });
      // this.props.history.push(url);
    } catch (err) {
      setLoading(false);
      console.info('err', err);
    }
  };
  return (
    <section>
      <div
        className="rc-padding-top--md"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className="pc rc-md-up">
          <div
            className=" rc-padding-x--md rc-layout-container rc-five-column"
            style={{ fontSize: '20px' }}
          >
            <div className="rc-column rc-double-width">
              <LazyLoad>
                <img
                  src={productImg}
                  // src={productImg}
                />
              </LazyLoad>
              <LazyLoad>
                <img
                  style={{ width: '100px' }}
                  src={productImg}
                  // src={productImg}
                />
              </LazyLoad>
            </div>

            <div className="rc-column rc-triple-width">
              <h2
                className="rc-text-colour--brand1"
                style={{
                  fontSize: '40px',
                  textTransform: 'uppercase',
                  fontWeight: '700'
                }}
              >
                {recommData?.customerPetsVo?.name}'s adapted diet & portion
                {/* {recommData?.goodsInfo?.goodsInfoName} */}
              </h2>
              <div className=" rc-layout-container rc-five-column rc-padding-top--md">
                <div
                  className="rc-column rc-triple-width"
                  style={{ maxWidth: '450px' }}
                >
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    30 days of complete & balanced diet for adult cat,
                    <FormattedMessage id={productShowInfo.recoSentence} />
                  </div>
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    Daily portion:{' '}
                    <strong style={{ color: '#444', fontWeight: '600' }}>
                      {recommData.weight}
                      {recommData.weightUnit}/day
                    </strong>
                    <br />
                    Total pack weight:{' '}
                    <strong style={{ color: '#444', fontWeight: '600' }}>
                      {totalWeight}
                      {/* {recommData.totalPackWeight} {recommData.weightUnit}/day */}
                    </strong>
                  </div>
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    Automatic shipment every 30 days <br />
                    Free shipment cost
                  </div>
                </div>
                <div className="rc-column rc-double-width">
                  <div className="rc-margin-bottom--sm">
                    <div
                      style={{
                        color: '#444',
                        fontSize: '40px',
                        fontWeight: '600'
                      }}
                    >
                      {formatMoney(recommData.dailyPrice)}/day
                    </div>
                    <div style={{ color: '#444' }}>
                      {formatMoney(recommData.totalPrice)}/month
                    </div>
                  </div>
                  <div
                    className="relative"
                    style={{ left: '-3rem', lineHeight: '1.2' }}
                  >
                    <div
                      className="rc-margin-bottom--xs"
                      style={{
                        color: '#008900',
                        fontSize: '24px',
                        fontWeight: '600'
                      }}
                    >
                      -25% on first order{' '}
                      <span style={{ color: '#444', fontWeight: 300 }}>*</span>
                    </div>
                    {loginStore.isLogin ? (
                      <button
                        onClick={handleBuyNow}
                        className={`rc-btn rc-btn--one
                        ${loading ? 'ui-btn-loading' : ''} ${
                          recommData?.goodsInfo?.stock >=
                          recommData?.goodsInfo?.buyCount
                            ? ''
                            : 'rc-btn-solid-disabled'
                        }`}
                        style={{ width: '200px', padding: '10px' }}
                      >
                        buy now
                      </button>
                    ) : (
                      // <button onClick={async()=>{
                      //  await   hanldeUnloginAddToCart();
                      // }}>test</button>
                      <LoginButton
                        btnStyle={{ width: '200px', padding: '10px' }}
                        className={`rc-btn rc-btn--one rc-btn--sm`}
                        // btnStyle={{ margin: '5px 0', width: '100%' }}
                        // history={this.props.history}
                        beforeLoginCallback={async () => {
                          await hanldeUnloginAddToCart();
                        }}
                      >
                        buy now
                      </LoginButton>
                    )}
                  </div>
                </div>
              </div>
              <BannerFour />
            </div>
          </div>
        </div>
        <div className="mobile rc-md-down rc-padding--md  text-center">
          <h2
            className="rc-text-colour--brand1"
            style={{
              fontSize: '24px',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            {recommData?.customerPetsVo?.name}'s adapted diet & portion
            {/* {recommData?.goodsInfo?.goodsInfoName} */}
          </h2>
          <div
            className="rc-margin-bottom--xs  text-left"
            style={{ lineHeight: '24px' }}
          >
            30 days of complete & balanced diet for adult cat, Recommended diet
            to limit weight
          </div>
          <LazyLoad>
            <img src={productImg} />
          </LazyLoad>

          <div className="rc-margin-y--md">
            <LazyLoad>
              <img
                className="text-center m-auto "
                style={{ width: '100px' }}
                src={productImg}
              />
            </LazyLoad>
          </div>
          <div className="rc-margin-bottom--xs" style={{ lineHeight: '24px' }}>
            Daily portion:{' '}
            <strong style={{ color: '#444', fontWeight: '600' }}>
              {recommData.weight} {recommData.weightUnit}/day
            </strong>
            <br />
            Total pack weight:{' '}
            <strong style={{ color: '#444', fontWeight: '600' }}>
              {totalWeight}
              {/* {recommData.totalPackWeight} {recommData.weightUnit}/day */}
            </strong>
          </div>
          <div className="rc-margin-bottom--md">
            <div style={{ color: '#444', fontSize: '40px', fontWeight: '600' }}>
              {formatMoney(recommData.dailyPrice)}/day
            </div>
            <div style={{ color: '#444' }}>
              {formatMoney(recommData.totalPrice)}/month
            </div>
          </div>
          <div
            className="rc-margin-bottom--xs"
            style={{ color: '#008900', fontSize: '24px', fontWeight: 400 }}
          >
            -25% on first order{' '}
            <span style={{ color: '#444', fontWeight: 300 }}>*</span>
          </div>
          <div className="rc-margin-bottom--lg" style={{ lineHeight: '24px' }}>
            Automatic shipment every 30 days <br />
            Free shipment cost
          </div>
          {loginStore.isLogin ? (
            <button
              className="rc-btn rc-btn--one"
              onClick={handleBuyNow}
              className={`rc-btn rc-btn--one 
          ${loading ? 'ui-btn-loading' : ''} ${
                recommData?.goodsInfo?.stock >= recommData?.goodsInfo?.buyCount
                  ? ''
                  : 'rc-btn-solid-disabled'
              }`}
            >
              buy now
            </button>
          ) : (
            <LoginButton
              btnStyle={{ width: '200px', padding: '10px' }}
              className={`rc-btn rc-btn--one rc-btn--sm`}
              // btnStyle={{ margin: '5px 0', width: '100%' }}
              // history={this.props.history}
              beforeLoginCallback={async () => {
                await hanldeUnloginAddToCart();
              }}
            >
              buy now
            </LoginButton>
          )}

          <div className="rc-padding-x--xl">
            <BannerFour />
          </div>
        </div>
      </div>

      <div className="rc-max-width--xl m-auto rc-padding-x--md  rc-padding-top--lg rc-layout-container rc-two-column">
        <div className="rc-column">
          <h4
            className="rc-beta text-lg-left text-center"
            style={{
              fontSize: '32px',
              textTransform: 'uppercase',
              fontWeight: '600'
            }}
          >
            <FormattedMessage id={'preciseNutrition.benefits.title'} />
          </h4>
          <p
            className=" text-lg-left text-center"
            style={{
              fontSize: '18px',
              lineHeight: '26px',
              width: '460px',
              maxWidth: '100%'
            }}
          >
            <FormattedMessage id={'preciseNutrition.benefits.content'} />
          </p>
          <LazyLoad>
            <img
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/cat.png`}
              style={{ border: 'none' }}
            />
          </LazyLoad>
        </div>
        <div className="rc-column">
          {productShowInfo.provenBenefits?.map((item) => (
            <div className="d-flex">
              <div className="rc-padding-right--xs" style={{ width: '78px' }}>
                <LazyLoad>
                  <img
                    // style={{ transform: 'scale(0.7)', transformOrigin: 'top' }}
                    src={`${
                      window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX
                    }/img/CatNutrition/${intl.messages[item.img]}`}
                  />
                </LazyLoad>
              </div>
              <div style={{ flex: 1, paddingLeft: '8px' }}>
                <strong style={{ fontSize: '20px' }}>
                  <FormattedMessage id={item.title} />{' '}
                </strong>
                <p style={{ fontSize: '18px', lineHeight: '24px' }}>
                  <FormattedMessage
                    id={item.des}
                    values={{
                      val: <br />,
                      italicSentence: item.italicSentence ? (
                        <i>{intl.messages[item.italicSentence]}</i>
                      ) : null
                    }}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default injectIntl(Banner);
