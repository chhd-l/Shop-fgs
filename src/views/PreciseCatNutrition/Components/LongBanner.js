import React from 'react';
// import SubscriptionBenefitsBanner from './SubscriprionBenefitsBanner';
import '../index.less';
import { FormattedMessage } from 'react-intl';
import benefitsone from '../images/picto_right-diet.png';
import benefitstwo from '../images/picto_individualize-ration.png';
import benefitsthree from '../images/picto_nutrients.png';
import topCat from '../images/BRITISH_SHORTHAIR_ADULT___WEIGHT_MANAGEMENT_EMBLEMATIC_Low_Res.___Web-removebg-preview.png';
import topCatEat from '../images/SacKRAFT-RVB-bis-det.png';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import clublogo from '../images/img.png';
import { getDeviceType } from '../../../utils/utils';
import LazyLoad from 'react-lazyload';
import picto_delivery from '../images/picto_delivery.png';
import picto_advisor from '../images/picto_advisor.png';
import picto_welcome_pack from '../images/picto_welcome-pack.png';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const   toScroll = (anchorName) => {
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
              <div className='rc-max-width--xl rc-margin-y--sm rc-margin-y--lg--mobile'>
                <div
                  className='rc-beta rc-margin-bottom--sm rc-margin-bottom--lg--mobile'
                  style={{ marginBottom: '0px', textAlign: 'center', zIndex: 10 }}
                >
                  <h1 style={isMobile ? { fontWeight: 700, fontSize: '1.6rem' } :
                    { fontWeight: 700, fontSize: '4.6rem' }}>
                    GIVE YOUR CAT THE MOST PRECISE DIET & PORTION FOR A HEALTHY
                    WEIGHT !{/*<FormattedMessage*/}
                    {/*  id="ClubLP.LongBanner.title"*/}
                    {/*  values={{ val1: <br />, val2: <br /> }}*/}
                    {/*></FormattedMessage>*/}
                  </h1>
                  <p style={{ fontSize: '0.6em', color: '#555555' }}>
                    average price
                    {/*<FormattedMessage id="ClubLP.LongBanner.content" />*/}
                  </p>
                  <strong style={{ color: '#000000' }}>0,90€ / day</strong>
                  <p style={{ color: '#555555' }}>25,50€ / month</p>
                  <a
                    onClick={()=>toScroll('aboutPet')}
                  >
                    <button
                      style={{
                        padding: '0',
                        paddingLeft: '80px',
                        paddingRight: '80px'
                      }}
                      className="rc-btn rc-btn--one "
                    >
                      Subscribe now
                      {/*<FormattedMessage id="ClubLP.LongBanner.button" />*/}
                    </button>
                  </a>
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
                  {/*    /!*<FormattedMessage id="ClubLP.LongBanner.button" />*!/*/}
                  {/*  </button>*/}
                  {/*</DistributeHubLinkOrATag>*/}
                  {/*<div className='d-flex' style={{flexDirection:'row'}}>*/}
                  {/*  <img src={topCat} />*/}
                  {/*  <div style={{display:'flex',flexDirection:'column'}}>*/}
                  {/*    <p style={{ fontSize: '0.6em', color: '#555555' }}>*/}
                  {/*      average price*/}
                  {/*      /!*<FormattedMessage id="ClubLP.LongBanner.content" />*!/*/}
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
                  {/*        /!*<FormattedMessage id="ClubLP.LongBanner.button" />*!/*/}
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

        <div
          className="rc-max-width--lg rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block"
          style={{
            marginTop: isMobile ? '220px' : '0',
            boxShadow: 'darkgrey 10px 150px 230px 100px',
            width:(isMobile?'90%':'100')
          }}
        >
          <div className="col mx-0 d-flex justify-content-between align-items-end align-content-center relative">
            <img
              style={
                isMobile
                  ? { width: '80%', position: 'absolute', left: '0%'}
                  : {
                      width: '45%',
                      position: 'absolute',
                      left: ' -8%',
                      top: -350,
                    }
              }
              src={topCat}
            />
            <img
              style={
                isMobile
                  ? { width: '60%', position: 'absolute', right: '0%' }
                  : {
                      width: '35%',
                      position: 'absolute',
                      top: -240,
                      right: '-5%',
                    }
              }
              src={topCatEat}
            />
            <div className='howItWorkNum'
                 style={
                   isMobile
                     ? {width: 90,
                       height: 90,
                       position: 'absolute',
                       top: -220,
                       right: '0%',
                       zIndex: 2
                   }
                     : {
                       width: 105,
                       height: 105,
                       position: 'absolute',
                       top: -240,
                       right: '0%',
                       zIndex: 2
                     }
                 }>
              <h3 style={{marginTop:21,marginBottom:0}}>-25%</h3>
              <h6> on first order </h6>
            </div>
          </div>
          <div className="rc-bg-colour--brand3" id="benefits-box">
            <div className="rc-full-width">
              <div className="rc-max-width--xl rc-padding-x--lg rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                <h4 className="font-weight-bold rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                  YOUR CAT'S BENEFITS
                </h4>

                <div className="value-proposition__container">
                  <div className="row mx-0 justify-content-between rc-text-align-center">
                    <div className="col-12 col-md-1 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center ">
                      <div className=" justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn flex-column">
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <LazyLoad height={200}>
                            <img
                              className="value-proposition__img lazyloaded"
                              src={benefitsone}
                            />
                          </LazyLoad>
                        </div>
                        <div className=" value-proposition__text">
                          <strong
                            className="rc-margin-bottom--none demarginleft"
                            style={{ fontSize: 14, fontWeight: '700' }}
                          >
                            The right diet adapted to support your cat's optimal
                            weight
                            {/*<FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon1'} />*/}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-1 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                      <div className=" justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn flex-column">
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <LazyLoad height={200}>
                            <img
                              className="value-proposition__img lazyloaded"
                              src={benefitstwo}
                            />
                          </LazyLoad>
                        </div>
                        <div className=" value-proposition__text">
                          <strong
                            className="rc-margin-bottom--none demarginleft"
                            style={{ fontSize: 14, fontWeight: '700' }}
                          >
                            Individualize ration calculated for your cat's
                            unique characteristics.
                            {/*<FormattedMessage*/}
                            {/*  id={'ClubLP.SubscriptionBenefitsNew.icon2'}*/}
                            {/*/>*/}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-1 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                      <div className=" justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn flex-column">
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <LazyLoad height={200}>
                            <img
                              className="value-proposition__img lazyl oaded"
                              src={benefitsthree}
                            />
                          </LazyLoad>
                        </div>
                        <div className=" value-proposition__text">
                          <strong
                            className="rc-margin-bottom--none demarginleft"
                            style={{ fontSize: 14, fontWeight: '700' }}
                          >
                            High quality nutrients chosen for their high
                            nutritonal value
                            {/*<FormattedMessage*/}
                            {/*  id={'ClubLP.SubscriptionBenefitsNew.icon3'}*/}
                            {/*/>*/}
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
    </>
  );
};

export default LongBanner;
