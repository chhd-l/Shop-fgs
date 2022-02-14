import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import shippingiconnew from './image/pictosshippingnew@4x.png';
import phoneicon from './image/phoneicon@4x.png';
import gifticonnew from './image/pictosgiftsnew@4x.png';
import discountnew from './image/discountnew@4x.png';
import discountnewtr from './image/discountnewtr.png';
import advisernew from './image/pictospetadvisernew@4x.png';
import iconsix from './image/iconsix.png';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';

const SubsriptionBenefitsNew = () => {
  return (
    <div
      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block"
      style={{ marginTop: '0' }}
    >
      <div
        className="rc-bg-colour--brand3"
        id="benefits-box"
        style={{ padding: '1px 0' }}
      >
        <div className="rc-full-width">
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-y--lg--mobile value-proposition">
            <h4
              className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile"
              style={{ fontWeight: '550' }}
            >
              <FormattedMessage id="ClubLP.SubscriptionBenefitsNew.title" />
            </h4>
            <div className="value-proposition__container">
              <div className="row mx-0 justify-content-between">
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center ">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '100px', height: '100px' }}
                          alt="Питание с учетом потребностей Вашего котенка"
                          title="ideal formula"
                          src={shippingiconnew}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none rc-intro demarginleft "
                        style={{ fontSize: '16px' }}
                      >
                        <FormattedMessage
                          id={'ClubLP.SubscriptionBenefitsNew.icon1'}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '100px', height: '100px' }}
                          alt="Брендированный подарок при каждой доставке"
                          title="ideal formula"
                          src={discountnew}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none rc-intro demarginleft"
                        style={{ fontSize: '16px' }}
                      >
                        <FormattedMessage
                          id={'ClubLP.SubscriptionBenefitsNew.icon2'}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '100px', height: '100px' }}
                          alt="Ваш персональный эксперт по уходу за питомцем на связи ежедневно с 9 до 21"
                          title="ideal formula"
                          src={advisernew}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none rc-intro demarginleft"
                        style={{ fontSize: '16px' }}
                      >
                        <FormattedMessage
                          id={'ClubLP.SubscriptionBenefitsNew.icon3'}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '100px', height: '100px' }}
                          alt="Бесплатная доставка корма на протяжении всего участия в программе "
                          title="ideal formula"
                          src={gifticonnew}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none rc-intro demarginleft"
                        style={{ fontSize: '16px' }}
                      >
                        <FormattedMessage
                          id={'ClubLP.SubscriptionBenefitsNew.icon4'}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '100px', height: '100px' }}
                          alt="Бесплатная доставка корма на протяжении всего участия в программе "
                          title="ideal formula"
                          src={phoneicon}
                        />
                      </LazyLoad>
                    </div>
                    <div className=" value-proposition__text">
                      <p
                        className="rc-margin-bottom--none rc-intro demarginleft"
                        style={{ fontSize: '16px' }}
                      >
                        <FormattedMessage
                          id={'ClubLP.SubscriptionBenefitsNew.icon5'}
                          values={{ val1: '-', val2: <br /> }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
                  <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                    <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <LazyLoad height={200}>
                          <img
                            className="value-proposition__img lazyloaded"
                            style={{ width: '100px', height: '100px' }}
                            alt="Бесплатная доставка корма на протяжении всего участия в программе "
                            title="ideal formula"
                            src={iconsix}
                          />
                        </LazyLoad>
                      </div>
                      <div className=" value-proposition__text">
                        <p
                          className="rc-margin-bottom--none rc-intro demarginleft"
                          style={{ fontSize: '16px' }}
                        >
                          <FormattedMessage
                            id="ClubLP.SubscriptionBenefitsNew.icon6"
                            values={{
                              val: (
                                <a
                                  onClick={() => {
                                    return false;
                                    // window.PetStoryWC.start();
                                  }}
                                  style={{
                                    cursor: 'pointer'
                                  }}
                                >
                                  PetStory
                                </a>
                              )
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
            <DistributeHubLinkOrATag
              href={'/product-finder'}
              ariaLabel="Links to product finder"
            >
              <button
                onClick={() => {
                  window.__.env.REACT_APP_COUNTRY == 'ru' &&
                    window?.dataLayer?.push({
                      event: 'ruClubSubscriptionCtA',
                      ruClubSubscriptionCtAName: 'Join the club - Middle'
                    });
                }}
                className="rc-btn rc-btn--one"
                style={{
                  paddingLeft: '90px',
                  paddingRight: '90px',
                  paddingTop: '5px',
                  paddingBottom: '5px'
                }}
              >
                <FormattedMessage
                  id={'ClubLP.SubscriptionBenefitsNew.button'}
                />
              </button>
            </DistributeHubLinkOrATag>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SubsriptionBenefitsNew;
