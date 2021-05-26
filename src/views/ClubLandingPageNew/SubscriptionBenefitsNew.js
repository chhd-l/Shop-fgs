import React from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import shippingiconnew from './image/pictosshippingnew@4x.png';
import phoneiconnew from './image/phonenew@4x.png';
import gifticonnew from './image/pictosgiftsnew@4x.png';
import discountnew from './image/discountnew@4x.png';
import advisernew from './image/pictospetadvisernew@4x.png';

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
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
            <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
              <FormattedMessage id="ClubLP.SubscriptionBenefitsNew.title"/>
            </h4>
            <div className="value-proposition__container">
              <div className="row mx-0 justify-content-between">
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center ">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
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
                    <div className="d-flex align-items-center value-proposition__text">
                      <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                        <FormattedMessage id={"ClubLP.SubscriptionBenefitsNew.icon1"}/>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
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
                    <div className="d-flex align-items-center value-proposition__text">
                      <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                        <FormattedMessage id={"ClubLP.SubscriptionBenefitsNew.icon2"}/>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
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
                    <div className="d-flex align-items-center value-proposition__text">
                      <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                        <FormattedMessage id={"ClubLP.SubscriptionBenefitsNew.icon3"}/>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
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
                    <div className="d-flex align-items-center value-proposition__text">
                      <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                        <FormattedMessage id={"ClubLP.SubscriptionBenefitsNew.icon4"}/>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '100px', height: '100px' }}
                          alt="Бесплатная доставка корма на протяжении всего участия в программе "
                          title="ideal formula"
                          src={phoneiconnew}
                        />
                      </LazyLoad>
                    </div>
                    <div className="d-flex align-items-center value-proposition__text">
                      <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                        <FormattedMessage id={"ClubLP.SubscriptionBenefitsNew.icon5"}/>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                  <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LazyLoad height={200}>
                        <img
                          className="value-proposition__img lazyloaded"
                          style={{ width: '100px', height: '100px' }}
                          alt="Бесплатная доставка корма на протяжении всего участия в программе "
                          title="ideal formula"
                          src={phoneiconnew}
                        />
                      </LazyLoad>
                    </div>
                    <div className="d-flex align-items-center value-proposition__text">
                      <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                        <FormattedMessage id={"ClubLP.SubscriptionBenefitsNew.icon6"}/>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
            <button className="rc-btn rc-btn--one"><FormattedMessage id={"ClubLP.SubscriptionBenefitsNew.button"}/></button>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SubsriptionBenefitsNew;
