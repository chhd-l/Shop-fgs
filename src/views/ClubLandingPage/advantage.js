import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';
import LazyLoad from 'react-lazyload';

import pack from '@/assets/images/home/pack@2x.png';
import autoship from '@/assets/images/home/autoship@2x.png';
import delivery from '@/assets/images/home/delivery@2x.png';
import question from '@/assets/images/home/question@2x.png';

export function Advantage() {
  const defaultJSX = (
    <>
      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
          <LazyLoad height={200}>
            <img
              className="value-proposition__img"
              src={pack}
              alt=""
              title=""
            />
          </LazyLoad>

          <div className="pl-3 d-flex align-items-center value-proposition__text">
            <p className="rc-margin-bottom--none rc-intro">
              <FormattedMessage id="home.convenientTip1" />
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
          <LazyLoad height={200}>
            <img
              className="value-proposition__img"
              src={delivery}
              alt=""
              title=""
            />
          </LazyLoad>
          <div className="pl-3 d-flex align-items-center value-proposition__text">
            <p className="rc-margin-bottom--none rc-intro">
              <FormattedMessage
                id="home.convenientTip2"
                values={{
                  val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
                }}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
          <LazyLoad height={200}>
            <img
              className="value-proposition__img"
              src={question}
              alt=""
              title=""
            />
          </LazyLoad>
          <div className="pl-3 d-flex align-items-center value-proposition__text">
            <p className="rc-margin-bottom--none rc-intro">
              <FormattedMessage id="home.convenientTip3" />
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    {
      en: (
        <>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  className="value-proposition__img lazyloaded"
                  alt="ideal formula"
                  title="ideal formula"
                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/CLUB-BENEFITS_PRODUCT-RECOS@x2.png`}
                />
              </LazyLoad>

              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Find the Ideal Formula for Your Pet’s Health
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  className="value-proposition__img lazyloaded"
                  alt="club benefits"
                  title="club benefits"
                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/CLUB-BENEFITS_DISCOUNT@x2.png`}
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Save 5% on Every Autoship Order Plus, 30% Off Your First Order
                  Through Royal Canin Club
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  className="value-proposition__img lazyloaded"
                  alt="Welcome Box"
                  title="Welcome Box"
                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/COHORT-A_CLUB-BENEFITS_PET-ADVISOR@x2.png`}
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Get Expert Advice & Support with Royal Canin Pet Advisor Live
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  className="value-proposition__img lazyloaded"
                  alt="Free Automatic Shipping"
                  title="Free Automatic Shipping"
                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/CLUB-BENEFITS_FREE-SHIPPING@x2.png`}
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Free Automatic Shipping
                </p>
              </div>
            </div>
          </div>
        </>
      ),
      fr: (
        <>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={pack}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  <FormattedMessage id="home.convenientTip1" />
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={autoship}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  Bénéficiez d'une livraison automatique
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={delivery}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  <FormattedMessage
                    id="home.convenientTip2"
                    values={{
                      val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={question}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  <FormattedMessage id="home.convenientTip3" />
                </p>
              </div>
            </div>
          </div>
        </>
      ),
      de: (
        <>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={pack}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  <FormattedMessage id="home.convenientTip1" />
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={autoship}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  <FormattedMessage id="home.convenientTip2" />
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={delivery}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  <FormattedMessage
                    id="home.convenientTip3"
                    values={{
                      val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={question}
                  alt=""
                  title=""
                />
              </LazyLoad>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p
                  className="rc-margin-bottom--none rc-intro"
                  style={{ textAlign: 'left' }}
                >
                  <FormattedMessage id="home.convenientTip4" />
                </p>
              </div>
            </div>
          </div>
        </>
      )
    }[process.env.REACT_APP_LANG] || defaultJSX
  );
}
