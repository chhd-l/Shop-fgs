import React from 'react';
import LazyLoad from 'react-lazyload';
import shippingiconnew from '../../ClubLandingPageNew/image/pictosshippingnew@4x.png';
import { FormattedMessage } from 'react-intl';
import picto_delivery from '../images/picto_delivery3.png';
import picto_advisor from '../images/picto_advisor2.png';
import picto_welcome_pack from '../images/picto_welcome-pack2.png';
import picto_loyalty_program from '../images/picto_loyalty-program2.png';
import picto_advice from '../images/picto_advice2.png';

import discountnewtr from '../../ClubLandingPageNew/image/discountnewtr.png';
import discountnew from '../../ClubLandingPageNew/image/discountnew@4x.png';
import advisernew from '../../ClubLandingPageNew/image/pictospetadvisernew@4x.png';
import gifticonnew from '../../ClubLandingPageNew/image/pictosgiftsnew@4x.png';
import phoneicon from '../../ClubLandingPageNew/image/phoneicon@4x.png';
import iconsix from '../../ClubLandingPageNew/image/iconsix.png';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { isMobileDevice } from 'react-select/dist/index-fe3694ff.cjs.dev';
import { getDeviceType } from '../../../utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const toScroll = (anchorName) => {
  let anchorElement = document.getElementById(anchorName);
  // 如果对应id的锚点存在，就跳转到锚点
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const subscription = () => {
  return (
    <div
      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile three-column-content-block"
      style={{
        marginTop: isMobile ? '33%' : '0',
        boxShadow: 'darkgrey 10px 10px 30px 5px',
        width: isMobile ? '90%' : '100'
      }}
    >
      <div
        className="rc-bg-colour--brand3"
        id="benefits-box"
        style={{ padding: '1px 0' }}
      >
        <div className="rc-full-width">
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
            <h2 className="font-weight-bold rc-beta text-center rc-margin-bottom--lg--mobile dt pb-3">
              A SUBSCRIPTION TO SIMPLIFY YOUR LIFE
              {/*<FormattedMessage id="ClubLP.SubscriptionBenefitsNew.title" />*/}
            </h2>
            <div className="value-proposition__container">
              <div className="row mx-0 justify-content-between">
                <div className="col-12 col-md-6 col-lg-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className="row centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow  flex-nowrap">
                    <div
                      className="col-4 col-md-6 text-md-right px-0 py-0"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          src={picto_delivery}
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-8 col-md-12 value-proposition__text pr-0 py-0">
                      <p className="rc-margin-bottom--none subscriptionSomeFontsize">
                        Automatic & flexible delivery at door every month
                        {/*<FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon1'} />*/}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className="row centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow flex-nowrap">
                    <div
                      className="col-4 col-md-6 text-md-right px-0 py-0"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          src={picto_advisor}
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-8 col-md-12 value-proposition__text pr-0 py-0">
                      <p
                        className="rc-margin-bottom--none subscriptionSomeFontsize"
                        // // style={{ fontSize: 14}}
                      >
                        A personal pet advisor available for you
                        {/*<FormattedMessage*/}
                        {/*  id={'ClubLP.SubscriptionBenefitsNew.icon2'}*/}
                        {/*/>*/}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className="row centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow flex-nowrap">
                    <div
                      className="col-4 col-md-6 text-md-right px-0 py-0"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          src={picto_welcome_pack}
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-8 col-md-12 value-proposition__text pr-0 py-0">
                      <p
                        className="rc-margin-bottom--none subscriptionSomeFontsize"
                        // // style={{ fontSize: 14}}
                      >
                        A welcome pack with a scale & all materials to properly
                        feed your pet
                        {/*<FormattedMessage*/}
                        {/*  id={'ClubLP.SubscriptionBenefitsNew.icon3'}*/}
                        {/*/>*/}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className="row centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow flex-nowrap">
                    <div
                      className="col-4 col-md-6 text-md-right px-0 py-0"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          src={picto_loyalty_program}
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-8 col-md-12 value-proposition__text pr-0 py-0">
                      <p className="rc-margin-bottom--none subscriptionSomeFontsize">
                        Enjoy a loyalty program with exclusive gift to stimulate
                        your pet
                        {/*<FormattedMessage*/}
                        {/*  id={'ClubLP.SubscriptionBenefitsNew.icon4'}*/}
                        {/*/>*/}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className="row centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow flex-nowrap">
                    <div
                      className="col-4 col-md-6 text-md-right px-0 py-0"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          src={picto_advice}
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-8 col-md-12 value-proposition__text pr-0 py-0">
                      <p className="rc-margin-bottom--none subscriptionSomeFontsize">
                        Tailored professional advice & tips
                        {/*<FormattedMessage*/}
                        {/*  id={'ClubLP.SubscriptionBenefitsNew.icon5'}*/}
                        {/*/>*/}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
            <a
              onClick={() => {
                toScroll('aboutPet');
                dataLayer.push({
                  event: 'individualizationLandingClick',
                  position: 'Reinsurance' //value should be one the trees positions : 'Top promotion','Did you know' or 'Reinsurance'
                });
              }}
            >
              <button
                className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                style={isMobile ? null : { padding: '0 50px' }}
              >
                Get started
                {/*<FormattedMessage*/}
                {/*  id={'ClubLP.SubscriptionBenefitsNew.button'}*/}
                {/*/>*/}
              </button>
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
};
export default subscription;
