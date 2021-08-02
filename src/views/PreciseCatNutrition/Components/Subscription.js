import React from 'react';
import LazyLoad from 'react-lazyload';
import shippingiconnew from '../../ClubLandingPageNew/image/pictosshippingnew@4x.png';
import { FormattedMessage } from 'react-intl';
import picto_delivery from '../images/picto_delivery.png';
import picto_advisor from '../images/picto_advisor.png';
import picto_welcome_pack from '../images/picto_welcome-pack.png';
import picto_loyalty_program from '../images/picto_loyalty-program.png';
import picto_advice from '../images/picto_advice.png';

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

const subscription = () => {
  return (
    <div
      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block"
      style={{ marginTop: '0', boxShadow: 'darkgrey 10px 10px 30px 5px',width:(isMobile?'90%':'100')}}

    >
      <div
        className="rc-bg-colour--brand3"
        id="benefits-box"
        style={{ padding: '1px 0' }}
      >
        <div className="rc-full-width">
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
            <h2
              className="font-weight-bold rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile dt"
            >
              A SUBSCRIPTION TO SIMPLIFY YOUR LIFE
              {/*<FormattedMessage id="ClubLP.SubscriptionBenefitsNew.title" />*/}
            </h2>
            <div className="value-proposition__container">
              <div className="row mx-0 justify-content-between">
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center ">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '120px', height: '120px' }}
                          src={picto_delivery}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p className="rc-margin-bottom--none demarginleft" style={{fontSize:14}} style={{fontSize:14}}>
                        Automatic & flexible delivery
                        at door every month
                        {/*<FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon1'} />*/}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '120px', height: '120px' }}
                          src={picto_advisor}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none demarginleft"
                        style={{ fontSize: 14 }}
                      >
                        A personal pet advisor available for you
                        {/*<FormattedMessage*/}
                        {/*  id={'ClubLP.SubscriptionBenefitsNew.icon2'}*/}
                        {/*/>*/}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '120px', height: '120px' }}
                          src={picto_welcome_pack}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none demarginleft"
                        style={{ fontSize: 14 }}
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
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '120px', height: '120px' }}
                          src={picto_loyalty_program}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none demarginleft"
                        style={{ fontSize: 14 }}
                      >
                        Enjoy a loyalty program with exclusive gift to stimulate
                        your pet
                        {/*<FormattedMessage*/}
                        {/*  id={'ClubLP.SubscriptionBenefitsNew.icon4'}*/}
                        {/*/>*/}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-0 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '120px', height: '120px' }}
                          src={picto_advice}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none demarginleft"
                        style={{ fontSize: 14 }}
                      >
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
            <DistributeHubLinkOrATag
              href={'/product-finder'}
              ariaLabel="Links to product finder"
            >
              <button
                className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                style={{ paddingLeft: '90px', paddingRight: '90px' }}
              >
                Get started
                {/*<FormattedMessage*/}
                {/*  id={'ClubLP.SubscriptionBenefitsNew.button'}*/}
                {/*/>*/}
              </button>
            </DistributeHubLinkOrATag>
          </h4>
        </div>
      </div>
    </div>
  );
};
export default subscription;
