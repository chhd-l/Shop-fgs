import React, { useState, useEffect } from 'react';
import { getDeviceType, formatMoney } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import { useLocalStore } from 'mobx-react';
import cloneDeep from 'lodash/cloneDeep';
import stores from '@/store';
import { sitePurchase } from '@/api/cart';
import LoginButton from '@/components/LoginButton';
import './Banner.less';
import productImg from '@/assets/images/preciseCatNutrition/productimg.png';
import product1 from '../image/product1.png';
import product2 from '../image/product2.png';
import product3 from '../image/product3.png';
import product4 from '../image/product4.png';
import lefticon from '../image/lefticon.png';
import righticon from '../image/righticon.png';
import productback1 from '../image/productBack1.png';
import productImage2 from '../image/productImage2.png';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const BannerFour = ({ intl }) => {
  const bannerList = [
    {
      img: 'secure_payment',
      text: intl.messages['preciseNutrition.bannertext1']
    },
    {
      img: 'satisfie_or_reimbursed',
      text: intl.messages['preciseNutrition.bannertext2']
    },
    {
      img: 'premium_quality',
      text: intl.messages['preciseNutrition.bannertext3']
    },
    {
      img: 'fast_shipment',
      text: intl.messages['preciseNutrition.bannertext4']
    }
  ];

  return (
    <div
      className=" row col-12 text-center  rc-margin-top--md--desktop rc-margin-top--lg--mobile rc-padding-x--xl"
      style={{
        maxWidth: 730,
        padding: isMobile ? null : 0,
        marginLeft: isMobile ? null : '-10%'
      }}
    >
      {bannerList.map((el, idx) => (
        <div
          className={`${isMobile ? 'col-6' : 'col-3'}`}
          style={isMobile ? { marginBottom: '20px' } : {}}
        >
          <LazyLoad>
            <img
              className="m-auto"
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/${el.img}.svg`}
            />
          </LazyLoad>
          <p
            className="m-auto"
            style={{
              fontSize: '12px',
              maxWidth: `${idx == 3 ? '120px' : '60px'}`
            }}
            dangerouslySetInnerHTML={{ __html: el.text }}
          ></p>
        </div>
      ))}
    </div>
  );
};

const bannerProductList = [
  {
    imageSrc: productback1,
    imageCurrent: 0
  },
  {
    imageSrc: product2,
    imageCurrent: 1
  },
  {
    imageSrc: product3,
    imageCurrent: 2
  },
  {
    imageSrc: product4,
    imageCurrent: 3
  }
];

const bannerProductDetailList = [
  {
    imageSrc: product1,
    imageCurrent: 0
  },
  {
    imageSrc: productImage2,
    imageCurrent: 1
  },
  {
    imageSrc: product3,
    imageCurrent: 2
  },
  {
    imageSrc: product4,
    imageCurrent: 3
  }
];

const Banner = ({
  productShowInfo,
  intl,
  recommData,
  history,
  ...restProps
}) => {
  const { loginStore, configStore, checkoutStore, clinicStore } = useLocalStore(
    () => stores
  );
  const [totalWeight, setTotalWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [addCartBtnStatus, setAddCartBtnStatus] = useState(false);

  const [imageCurrent, setImageCurrent] = useState(0);

  useEffect(() => {
    if (!recommData.totalPackWeight) {
      return;
    }
    let newAddCartBtnStatus =
      recommData?.goodsInfo?.stock >= recommData?.goodsInfo?.buyCount;
    setAddCartBtnStatus(newAddCartBtnStatus);
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
          isNotShowCart: 1, //加入购物车 但是在header不显示
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

      await checkoutStore.hanldeUnloginAddToCart({
        valid: addCartBtnStatus,
        cartItemList: [cartItem],
        ...restProps
      });
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
    if (!addCartBtnStatus) {
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
        periodTypeId:
          goodsInfo?.goods?.defaultFrequencyId ||
          configStore.info?.storeVO?.defaultSubscriptionClubFrequencyId,
        goodsInfoFlag: 3,
        questionParams: JSON.stringify(petInfo)
      }
    );
    try {
      window?.dataLayer?.push({
        event: 'individualizationRecoAddToCart'
      });
      setLoading(true);
      await sitePurchase(params);
      let recommendProd = Object.assign({}, params, recommData, goodsInfo);
      // sessionItemRoyal.set('recommend_product', JSON.stringify([recommendProd]));
      await checkoutStore.updateLoginCart({
        delFlag: 1,
        intl
      });
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
        style={{
          // backgroundColor: '#f5f5f5',
          // backgroundImage: '-webkit-gradient(linear,left bottom,left top,color-start(0, #15A216),color-stop(1, #fafafa))',
          boxShadow: 'inset 0px 35px 35px #eeeeee ',
          background:
            '-webkit-gradient(linear, 0% 50%, 0% 75%,from(#ffffff), to(#eeeeee))'
        }}
      >
        {/*//电脑端*/}
        <div className="pc experience-component experience-layouts-1column rc-md-up ">
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-headingBlock">
                  <div className="rc-max-width--xl text-center rc-margin-top--md rc-padding-top--xs">
                    <div
                      className="experience-component experience-layouts-1column rc-padding-x--md rc-layout-container rc-five-column"
                      style={{ fontSize: '20px' }}
                    >
                      <div className="rc-column rc-double-width pl-0">
                        <LazyLoad>
                          <img
                            src={bannerProductDetailList[imageCurrent].imageSrc}
                            // src={productImg}
                            style={{ height: '341px' }}
                          />
                        </LazyLoad>
                        <div className="row">
                          <div
                            className="col-1 flex align-self-center"
                            onClick={() => {
                              if (imageCurrent > 0) {
                                setImageCurrent(imageCurrent - 1);
                              } else {
                                setImageCurrent(3);
                              }
                            }}
                          >
                            <LazyLoad>
                              <img src={lefticon} style={{ width: '10px' }} />
                            </LazyLoad>
                          </div>
                          {bannerProductList.map((index) => (
                            <div
                              onClick={() => {
                                setImageCurrent(index.imageCurrent);
                              }}
                            >
                              <LazyLoad>
                                <img
                                  style={{ width: '90px', margin: '5px' }}
                                  src={index.imageSrc}
                                />
                              </LazyLoad>
                            </div>
                          ))}
                          <div
                            className="col-1 flex align-self-center"
                            onClick={() => {
                              if (imageCurrent < 3) {
                                setImageCurrent(imageCurrent + 1);
                              } else {
                                setImageCurrent(0);
                              }
                            }}
                          >
                            <LazyLoad>
                              <img src={righticon} style={{ width: '10px' }} />
                            </LazyLoad>
                          </div>
                        </div>
                      </div>

                      <div className="rc-column rc-triple-width">
                        <h2
                          className="rc-text-colour--brand1"
                          style={{
                            fontSize: '34px',
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            textAlign: 'left'
                          }}
                        >
                          <FormattedMessage
                            id="preciseNutrition.banner.names"
                            values={{ val: recommData?.customerPetsVo?.name }}
                          />
                          {/* {recommData?.goodsInfo?.goodsInfoName} */}
                        </h2>
                        <div className=" rc-layout-container rc-five-column rc-padding-top--md">
                          <div
                            className="rc-column rc-triple-width"
                            style={{ maxWidth: '450px', textAlign: 'left' }}
                          >
                            <div
                              className="margin-b-24"
                              style={{ lineHeight: '24px' }}
                            >
                              <FormattedMessage id="preciseNutrition.banner.des1" />
                              .{' '}
                              <FormattedMessage
                                id={productShowInfo.recoSentence}
                              />
                            </div>
                            <div
                              className="margin-b-24"
                              style={{ lineHeight: '24px' }}
                            >
                              <FormattedMessage id="preciseNutrition.banner.portion" />
                              :{' '}
                              <strong
                                style={{ color: '#444', fontWeight: '600' }}
                              >
                                {recommData.weight}
                                {/* {recommData.weightUnit}/ */}
                                /
                                <FormattedMessage id="preciseNutrition.banner.day" />
                              </strong>
                              <br />
                              <FormattedMessage id="preciseNutrition.banner.weight" />
                              :{' '}
                              <strong
                                style={{ color: '#444', fontWeight: '600' }}
                              >
                                {/* {totalWeight} */}
                                {recommData.totalPackWeight}
                                {/* {recommData.weightUnit}/day */}
                              </strong>
                            </div>
                            <div
                              className="margin-b-24"
                              style={{ lineHeight: '24px' }}
                            >
                              <FormattedMessage id="preciseNutrition.banner.des2" />{' '}
                              <br />
                              <FormattedMessage id="preciseNutrition.banner.des3" />
                            </div>
                          </div>
                          <div className="rc-column rc-double-width">
                            <div className="rc-margin-bottom--md">
                              <div
                                style={{
                                  color: '#444',
                                  fontSize: '37px',
                                  fontWeight: '550',
                                  margin: '-8px 0'
                                }}
                              >
                                {formatMoney(recommData.dailyPrice)} /&nbsp;
                                <FormattedMessage id="preciseNutrition.banner.day" />
                              </div>
                              <div style={{ color: '#444', fontSize: '29px' }}>
                                {formatMoney(recommData.totalPrice)} /&nbsp;
                                <FormattedMessage id="preciseNutrition.banner.month" />
                              </div>
                            </div>
                            <div
                              className="relative"
                              style={{ lineHeight: '1.2' }}
                            >
                              {loginStore.isLogin || !addCartBtnStatus ? (
                                <button
                                  onClick={handleBuyNow}
                                  className={`rc-btn rc-btn--one
                        ${loading ? 'ui-btn-loading' : ''} ${
                                    addCartBtnStatus
                                      ? ''
                                      : 'rc-btn-solid-disabled'
                                  }`}
                                  style={{ width: '300px', padding: '10px' }}
                                >
                                  <FormattedMessage id="preciseNutrition.banner.button" />
                                </button>
                              ) : (
                                <LoginButton
                                  btnStyle={{ width: '230px', padding: '15px' }}
                                  intl={intl}
                                  className={`rc-btn rc-btn--one rc-btn--sm`}
                                  // btnStyle={{ margin: '5px 0', width: '100%' }}
                                  // history={this.props.history}
                                  beforeLoginCallback={async () => {
                                    await hanldeUnloginAddToCart();
                                  }}
                                  // beforeLoginCallback={async () => {
                                  //   localItemRoyal.set(
                                  //     'okta-redirectUrl',
                                  //     'precise-cat-nutrition-recommendation'
                                  //   );
                                  // }}
                                >
                                  <FormattedMessage id="preciseNutrition.banner.button" />
                                </LoginButton>
                              )}
                            </div>
                          </div>
                        </div>
                        <BannerFour intl={intl} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            <FormattedMessage
              id="preciseNutrition.banner.names"
              values={{ val: recommData?.customerPetsVo?.name }}
            />
            {/* {recommData?.goodsInfo?.goodsInfoName} */}
          </h2>
          <div
            className="rc-margin-y--lg  text-left"
            style={{ lineHeight: '24px' }}
          >
            <FormattedMessage id="preciseNutrition.banner.des1" />.{' '}
            <FormattedMessage id={productShowInfo.recoSentence} />
          </div>
          <LazyLoad>
            <img src={bannerProductDetailList[imageCurrent].imageSrc} />
          </LazyLoad>
          <div className="row justify-content-center align-items-center">
            <div
              className="col-1 flex align-self-center"
              onClick={() => {
                if (imageCurrent > 1) {
                  setImageCurrent(imageCurrent - 1);
                } else {
                  setImageCurrent(3);
                }
              }}
            >
              <LazyLoad>
                <img
                  src={lefticon}
                  style={{ width: '12px', maxWidth: 'inherit' }}
                />
              </LazyLoad>
            </div>
            {bannerProductList.map((index) => (
              <div
                className="col-2 flex align-self-center py-0 px-0"
                onClick={() => {
                  setImageCurrent(index.imageCurrent);
                }}
              >
                <LazyLoad>
                  <img
                    src={index.imageSrc}
                    // src={productImg}
                  />
                </LazyLoad>
              </div>
            ))}
            <div
              className="col-1 flex align-self-center"
              onClick={() => {
                if (imageCurrent < 3) {
                  setImageCurrent(imageCurrent + 1);
                } else {
                  setImageCurrent(0);
                }
              }}
            >
              <LazyLoad>
                <img
                  src={righticon}
                  style={{ width: '12px', maxWidth: 'inherit' }}
                />
              </LazyLoad>
            </div>
          </div>

          {/*<div className="rc-margin-y--md">*/}
          {/*  <LazyLoad>*/}
          {/*    <img*/}
          {/*      className="text-center"*/}
          {/*      style={{ width: '100px', marginLeft: '20%' }}*/}
          {/*      src={productImg}*/}
          {/*    />*/}
          {/*  </LazyLoad>*/}
          {/*</div>*/}
          <div className="rc-margin-bottom--xs" style={{ lineHeight: '24px' }}>
            <FormattedMessage id="preciseNutrition.banner.portion" />:{' '}
            <strong style={{ color: '#444', fontWeight: '600' }}>
              {recommData.weight}
              {/* {recommData.weightUnit}/ */}
              /<FormattedMessage id="preciseNutrition.banner.day" />
            </strong>
            <br />
            <FormattedMessage id="preciseNutrition.banner.weight" />:{' '}
            <strong style={{ color: '#444', fontWeight: '600' }}>
              {/* {totalWeight} */}
              {recommData.totalPackWeight}
              {/*  {recommData.weightUnit}/day */}
            </strong>
          </div>
          <div className="rc-margin-bottom--md">
            <div
              style={{
                color: '#444',
                fontSize: '37px',
                fontWeight: '600',
                marginBottom: -10
              }}
            >
              {formatMoney(recommData.dailyPrice)}/
              <FormattedMessage id="preciseNutrition.banner.day" />
            </div>
            <div style={{ color: '#444', fontSize: '29px' }}>
              {formatMoney(recommData.totalPrice)}/
              <FormattedMessage id="preciseNutrition.banner.month" />
            </div>
          </div>
          <div className="rc-margin-bottom--lg" style={{ lineHeight: '24px' }}>
            <FormattedMessage id="preciseNutrition.banner.des2" /> <br />
            <FormattedMessage id="preciseNutrition.banner.des3" />
          </div>
          {loginStore.isLogin || !addCartBtnStatus ? (
            <button
              style={{ width: 160 }}
              onClick={handleBuyNow}
              className={`rc-btn rc-btn--one
          ${loading ? 'ui-btn-loading' : ''} ${
                addCartBtnStatus ? '' : 'rc-btn-solid-disabled'
              }`}
            >
              <FormattedMessage id="preciseNutrition.banner.button" />
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
              intl={intl}
            >
              <FormattedMessage id="preciseNutrition.banner.button" />
            </LoginButton>
          )}

          <div className="rc-padding-x--xl">
            <BannerFour intl={intl} />
          </div>
        </div>
      </div>

      <div className="rc-max-width--xl m-auto rc-padding-x--md  rc-padding-top--lg rc-layout-container rc-two-column">
        <div className="rc-column">
          <h4
            className="rc-beta text-lg-left text-center"
            style={{
              fontSize: isMobile ? '18px' : '32px',
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
              <div className="rc-padding-right--xs">
                <LazyLoad>
                  <img
                    style={{ width: '70px' }}
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
