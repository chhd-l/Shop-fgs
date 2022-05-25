import React from 'react';
// import SubscriptionBenefitsBanner from './SubscriprionBenefitsBanner';
import '../index.less';
import { FormattedMessage } from 'react-intl-phraseapp';
import benefitsone from '../images/picto_right-diet.png';
import benefitstwo from '../images/picto_individualize-ration2.png';
import benefitsthree from '../images/picto_nutrients.png';
// import topCat from '../images/BRITISH_SHORTHAIR_ADULT___WEIGHT_MANAGEMENT_EMBLEMATIC_Low_Res.___Web-removebg-preview.png';
import topCat from '../images/pfCat.png';
import topCatEat from '../images/SacKRAFT-RVB-bis-det.png';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import clublogo from '../images/img.png';
import { getDeviceType } from '../../../utils/utils';
import LazyLoad from 'react-lazyload';
import picto_delivery from '../images/picto_delivery.png';
import picto_advisor from '../images/picto_advisor.png';
import picto_welcome_pack from '../images/picto_welcome-pack.png';
import imageicon from '../images/imageIcon.png';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const toScroll = (anchorName) => {
  let anchorElement = document.getElementById(anchorName);
  // 如果对应id的锚点存在，就跳转到锚点
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const LongBanner = () => {
  return (
    <>
      <div className="top pb-4">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-component experience-assets-contentBlock">
              <div className="rc-max-width--xl rc-margin-y--sm rc-margin-y--lg--mobile">
                <div
                  className="rc-beta rc-margin-bottom--sm rc-margin-bottom--lg--mobile rc-padding-x--xl"
                  style={{
                    marginBottom: '0px',
                    textAlign: 'center',
                    zIndex: 10
                  }}
                >
                  <h1 className={'longBannerTitle'} style={{ fontWeight: 700 }}>
                    <FormattedMessage id="PreciseCatNutrition.LongBanner.title" />

                    {/*GIVE YOUR CAT THE MOST PRECISE DIET & PORTION FOR A HEALTHY*/}
                    {/*WEIGHT !*/}
                  </h1>

                  <p style={{ fontSize: '0.7em', color: '#555555', margin: 0 }}>
                    <FormattedMessage id="PreciseCatNutrition.LongBanner.averagePrice1" />
                  </p>
                  <strong style={{ color: '#000000' }}>
                    <FormattedMessage id="PreciseCatNutrition.LongBanner.averagePrice2" />
                  </strong>
                  <sup style={{ color: '#666666', fontSize: 13, top: '-1em' }}>
                    [1]
                  </sup>
                  <p
                    style={{
                      color: '#555555',
                      fontSize: '0.7em',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <FormattedMessage id="PreciseCatNutrition.LongBanner.averagePrice3" />
                  </p>
                  <a
                    onClick={() => {
                      toScroll('aboutPet');
                      window?.dataLayer?.push({
                        event: 'individualizationLandingClick',
                        position: 'Top promotion' //value should be one the trees positions : 'Top promotion','Did you know' or 'Reinsurance'
                      });
                    }}
                  >
                    <button
                      style={{
                        paddingTop: '0',
                        paddingBottom: '0'
                      }}
                      className="rc-btn rc-btn--one "
                    >
                      <FormattedMessage id="PreciseCatNutrition.LongBanner.button" />
                    </button>
                  </a>

                  <p
                    style={{
                      fontSize: '16px',
                      color: '#4A4A4A',
                      margin: '5px 0 0 0',
                      visibility: 'hidden'
                    }}
                  >
                    SANS ENGAGEMENT
                  </p>
                  <p
                    className="rc-md-up"
                    style={{
                      fontSize: '16px',
                      color: '#4A4A4A',
                      margin: isMobile ? '0' : '-12px 0 0 0',
                      visibility: 'hidden'
                    }}
                  >
                    Des livraisons mensuelles offertes et flexibles, résiliables
                    en quelques clics
                  </p>
                  {/*<DistributeHubLinkOrATag*/}
                  {/*  // href={'/product-finder'}*/}
                  {/*  onClick={()=>this.scrollToAnchor('aboutPet')}*/}
                  {/*  ariaLabel="Links to product finder"*/}
                  {/*>*/}

                  {/*  <button*/}
                  {/*    style={{*/}
                  {/*      padding: '0',*/}
                  {/*      paddingLeft: '80px',*/}
                  {/*      paddingRight: '80px'*/}
                  {/*    }}*/}
                  {/*    className="rc-btn rc-btn--one "*/}
                  {/*  >*/}
                  {/*    Subscribe now*/}
                  {/*    /!*<FormattedMessage id="PreciseCatNutrition.LongBanner.button" />*!/*/}
                  {/*  </button>*/}
                  {/*</DistributeHubLinkOrATag>*/}
                  {/*<div className='d-flex' style={{flexDirection:'row'}}>*/}
                  {/*  <img src={topCat} />*/}
                  {/*  <div style={{display:'flex',flexDirection:'column'}}>*/}
                  {/*    <p style={{ fontSize: '0.6em', color: '#555555' }}>*/}
                  {/*      average price*/}
                  {/*      /!*<FormattedMessage id="PreciseCatNutrition.LongBanner.content" />*!/*/}
                  {/*    </p>*/}
                  {/*    <h3 style={{ color: '#000000' }}>*/}
                  {/*      0,90€ / day*/}
                  {/*    </h3>*/}
                  {/*    <p style={{ color: '#555555' }}>*/}
                  {/*      25,50€ / month*/}
                  {/*    </p>*/}
                  {/*    <DistributeHubLinkOrATag*/}
                  {/*      href={'/product-finder'}*/}
                  {/*      ariaLabel='Links to product finder'*/}
                  {/*    >*/}
                  {/*      <button*/}
                  {/*        style={{*/}
                  {/*          padding: '0',*/}
                  {/*          paddingLeft: '80px',*/}
                  {/*          paddingRight: '80px'*/}
                  {/*        }}*/}
                  {/*        className='rc-btn rc-btn--one '*/}
                  {/*      >*/}
                  {/*        Subscribe now*/}
                  {/*        /!*<FormattedMessage id="PreciseCatNutrition.LongBanner.button" />*!/*/}
                  {/*      </button>*/}
                  {/*    </DistributeHubLinkOrATag>*/}
                  {/*  </div>*/}

                  {/*  <img*/}
                  {/*    src={topCatEat}*/}
                  {/*  />*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*<div className='row rc-margin-x--none' >*/}
        {/*  <div className='rc-full-width' style={{height: 35}}>*/}
        {/*    <div className='experience-component experience-assets-contentBlock'>*/}
        {/*      <div className='rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition'>*/}
        {/*       <div className='col mx-0 d-flex justify-content-between align-items-end align-content-center' style={{marginTop:-400}}>*/}
        {/*         <div>*/}
        {/*           <img*/}
        {/*             style={{width:"82%" ,height:"82%"}}*/}
        {/*             src={topCat}*/}
        {/*           />*/}
        {/*         </div>*/}
        {/*         <div>*/}
        {/*           <img*/}
        {/*             style={{width:"80%" ,height:"80%"}}*/}
        {/*             src={topCatEat}*/}
        {/*           />*/}
        {/*         </div>*/}
        {/*       </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="rc-max-width--xl rc-padding-x--md flex justify-content-center align-items-center">
          <div
            className=" rc-padding-x--md rc-padding-x--md--mobile three-column-content-block longBannerTopPic"
            style={{
              boxShadow: 'darkgrey 10px 150px 230px 100px'
            }}
          >
            <div className="col mx-0 d-flex justify-content-between align-items-end align-content-center relative ">
              <img
                className={'topCat'}
                style={{ zIndex: isMobile ? -100 : 0 }}
                src={topCat}
                height={214}
              />
              <img className={'topCatEat'} src={topCatEat} />
              {/* <div
                className="howItWorkNum2"
                style={{
                  color: 'white',
                  textAlign: 'center',
                  lineHeight: 45,
                  position: 'absolute',
                  zIndex: 2
                }}
              >
                <img src={imageicon} />
              </div> */}
            </div>
            <div className="rc-bg-colour--brand3" id="benefits-box">
              <div className="rc-full-width">
                <div className="rc-max-width--lg rc-padding-x--lg--desktop rc-margin-top--lg--desktop rc-margin-top--sm--mobile rc-margin-bottom--md rc-margin-y--lg--mobile value-proposition">
                  <h2
                    className=" rc-padding-x--md--mobile font-weight-bold rc-beta text-center rc-margin-bottom--sm--mobile rc-margin-bottom--none--desktop"
                    style={{ position: 'relative', zIndex: 10, fontSize: 28 }}
                  >
                    <FormattedMessage id="PreciseCatNutrition.LongBanner.secondTitle" />
                  </h2>

                  <div className="value-proposition__container">
                    <div className="row  mx-lg-5 justify-content-between rc-text-align-center">
                      <div className="col-12 col-md-4 col-xxl-4 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-4 pl-xxl-4 justify-content-center ">
                        <div className=" justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn flex-columnforpc rc-padding-y--md--mobile">
                          <div
                            className="w-100px-forh5"
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <LazyLoad
                              height={143}
                              className="justify-content-center align-items-center"
                              style={{ display: 'flex' }}
                            >
                              <img
                                className="value-proposition__img1 lazyloaded"
                                src={benefitsone}
                              />
                            </LazyLoad>
                          </div>
                          <div className=" value-proposition__text">
                            <strong className="rc-margin-bottom--none LongBannerSomeFontsize">
                              <FormattedMessage
                                id={'PreciseCatNutrition.LongBanner.benefits1'}
                              />
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-xxl-4 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-4 pl-xxl-4 justify-content-center">
                        <div className=" justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn flex-columnforpc rc-padding-y--md--mobile">
                          <div
                            className="w-100px-forh5"
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <LazyLoad
                              height={143}
                              className="justify-content-center align-items-center"
                              style={{ display: 'flex' }}
                            >
                              <img
                                className="value-proposition__img1 lazyloaded"
                                src={benefitstwo}
                              />
                            </LazyLoad>
                          </div>
                          <div className=" value-proposition__text">
                            <strong className="rc-margin-bottom--none LongBannerSomeFontsize">
                              <FormattedMessage
                                id={'PreciseCatNutrition.LongBanner.benefits2'}
                              />
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-xxl-4 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-4 pl-xxl-4 justify-content-center">
                        <div className=" justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn flex-columnforpc rc-padding-y--md--mobile">
                          <div
                            className="w-100px-forh5"
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <LazyLoad
                              height={143}
                              className="justify-content-center align-items-center"
                              style={{ display: 'flex' }}
                            >
                              <img
                                className="value-proposition__img1 lazyl oaded"
                                src={benefitsthree}
                              />
                            </LazyLoad>
                          </div>
                          <div className=" value-proposition__text">
                            <strong className="rc-margin-bottom--none LongBannerSomeFontsize">
                              <FormattedMessage
                                id={'PreciseCatNutrition.LongBanner.benefits3'}
                              />
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LongBanner;
