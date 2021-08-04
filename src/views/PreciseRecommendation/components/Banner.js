import React, { useState, useEffect } from 'react';
import { getDeviceType, formatMoney } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useLocalStore } from 'mobx-react';
import stores from '@/store';
import { sitePurchase } from '@/api/cart';
import LoginButton from '@/components/LoginButton';
import './Banner.less';
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
          <img
            className="m-auto"
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/${el.img}.svg`}
          />
          <p
            style={{ fontSize: '12px' }}
            dangerouslySetInnerHTML={{ __html: el.text }}
          ></p>
        </div>
      ))}
    </div>
  );
};

const Banner = ({ productShowInfo, intl, recommData }) => {
  const { loginStore, configStore, checkoutStore, clinicStore } = useLocalStore(
    () => stores
  );

  const handleBuyNow = async () => {
    let { goodsInfo, pet } = recommData;
    if (!pet || !goodsInfo) {
      console.info('err');
      return;
    }
    let params = Object.assign(
      {},
      {
        goodsInfoId: goodsInfo.goodsInfoId,
        goodsNum: goodsInfo.buyCount,
        periodTypeId: goodsInfo.periodTypeId,
        // petsId: currentSelectedSize.petsId,
        // petsType: currentSelectedSize.petsType,
        // recommendationId: this.props.clinicStore.linkClinicId,
        // recommendationName: this.props.clinicStore.linkClinicName,
        goodsInfoFlag: 3,
        questionParams: JSON.stringify(pet)
      }
    );
    try {
      await sitePurchase(params);
      sessionItemRoyal.set('recommend_product', JSON.stringify([params]));
      this.props.history.push('/checkout');
      // await this.props.checkoutStore.updateLoginCart({delFlag:1});
      // const url = await distributeLinktoPrecriberOrPaymentPage({
      //   configStore,
      //   checkoutStore,
      //   clinicStore,
      //   isLogin: loginStore.isLogin
      // });
      // this.props.history.push(url);
    } catch (err) {
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
              <img
                src={require('@/assets/images/preciseCatNutrition/productimg.png')}
                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/productimg1.png`}
              />
              <img
                style={{ width: '100px' }}
                src={require('@/assets/images/preciseCatNutrition/productimg.png')}
                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/productimg1.png`}
              />
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
                {recommData?.goodsInfo?.goodsInfoName}
              </h2>
              <div className=" rc-layout-container rc-five-column rc-padding-top--md">
                <div
                  className="rc-column rc-triple-width"
                  style={{ maxWidth: '480px' }}
                >
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    30 days of complete & balanced diet for
                    <br /> adult cat, Recommended diet to limit weight
                  </div>
                  <div className="margin-b-24" style={{ lineHeight: '24px' }}>
                    Daily portion:{' '}
                    <strong style={{ color: '#444', fontWeight: '600' }}>
                      {recommData.weight} {recommData.weightUnit}/day
                    </strong>
                    <br />
                    Total pack weight:{' '}
                    <strong style={{ color: '#444' }}>
                      {recommData.totalPackWeight}
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
                      {formatMoney(recommData.totalprice)}/month
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
                        className={`rc-btn rc-btn--one ${
                          productShowInfo?.goodsInfo?.stock > 0
                            ? ''
                            : 'disabled'
                        }`}
                        style={{ width: '200px', padding: '10px' }}
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
                          // sessionItemRoyal.set('from-felin', true);
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
            {recommData?.goodsInfo?.goodsInfoName}
          </h2>
          <div
            className="rc-margin-bottom--xs  text-left"
            style={{ lineHeight: '24px' }}
          >
            30 days of complete & balanced diet for adult cat, Recommended diet
            to limit weight
          </div>
          <img
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/productimg1.png`}
          />
          <div className="rc-margin-bottom--xs" style={{ lineHeight: '24px' }}>
            Daily portion:{' '}
            <strong style={{ color: '#444', fontWeight: '600' }}>
              {recommData.weight} {recommData.weightUnit}/day
            </strong>
            <br />
            Total pack weight:{' '}
            <strong style={{ color: '#444' }}>
              {recommData.totalPackWeight}
            </strong>
          </div>
          <div className="rc-margin-bottom--md">
            <div style={{ color: '#444', fontSize: '40px', fontWeight: '600' }}>
              {formatMoney(recommData.dailyPrice)}/day
            </div>
            <div style={{ color: '#444' }}>
              {formatMoney(recommData.totalprice)}/month
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
          <button className="rc-btn rc-btn--one">buy now</button>
          <BannerFour />
        </div>
        {/* <div>
          <div
            className="rc-layout-container rc-five-column"
            style={{ marginTop: `${isMobile ? '0' : '-1rem'}` }}
          >
            <div className="rc-column rc-double-width"></div>
            <div className="rc-column rc-triple-width">
              </div>
          </div>
        </div>
       */}
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
          <img
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/cat.png`}
            style={{ border: 'none' }}
          />
        </div>
        <div className="rc-column">
          {productShowInfo.provenBenefits?.map((item) => (
            <div className="d-flex">
              <div className="rc-padding-right--xs" style={{ width: '78px' }}>
                <img
                  // style={{ transform: 'scale(0.7)', transformOrigin: 'top' }}
                  src={`${
                    window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX
                  }/img/CatNutrition/${intl.messages[item.img]}`}
                />
              </div>
              <div style={{ flex: 1, paddingLeft: '8px' }}>
                <strong style={{ fontSize: '20px' }}>
                  <FormattedMessage id={item.title} />{' '}
                </strong>
                <p style={{ fontSize: '18px', lineHeight: '24px' }}>
                  <FormattedMessage id={item.des} values={{ val: <br /> }} />
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
