import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';
import LazyLoad from 'react-lazyload';

import pack from '@/assets/images/home/pack@2x.png';
import autoship from '@/assets/images/home/autoship@2x.png';
import delivery from '@/assets/images/home/delivery@2x.png';
import question from '@/assets/images/home/question@2x.png';

import autoicon from './ClubImage/auto@2x.png';
import phoneicon from './ClubImage/phoneicon@4x.png';
import gifticon from './ClubImage/pictogifts@4x.png';
import spetadviser from './ClubImage/pictospetadviser@4x.png';
import shippingicon from './ClubImage/pictoshipping@4x.png';
import nutrition from './ClubImage/pictonutrition@4x.png';
import iconsix from './ClubImage/iconsix.png';
import './index.css';

export function SubscriptionBenefits() {
  const defaultJSX = (
    <>
      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
          <LazyLoad height={200}>
            <img
              className="value-proposition__img"
              src={pack}
              alt="pack icon"
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
              alt="delivery icon"
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
              alt="question icon"
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
      US: (
        <>
          <div className="col-12 col-md-6 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LazyLoad height={200}>
                  <img
                    className="value-proposition__img lazyloaded"
                    style={{ width: '100px', height: '100px' }}
                    alt="ideal formula"
                    title="ideal formula"
                    src={nutrition}
                  />
                </LazyLoad>
              </div>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Find the Ideal Formula for Your Pet’s Health
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LazyLoad height={200}>
                  <img
                    className="value-proposition__img lazyloaded"
                    style={{ width: '100px', height: '100px' }}
                    alt="ideal formula"
                    title="ideal formula"
                    src={gifticon}
                  />
                </LazyLoad>
              </div>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  A welcome box, rewards and services
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LazyLoad height={200}>
                  <img
                    className="value-proposition__img lazyloaded"
                    style={{ width: '100px', height: '100px' }}
                    alt="ideal formula"
                    title="ideal formula"
                    src={spetadviser}
                  />
                </LazyLoad>
              </div>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  A pet advisor and personalized newsletters
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LazyLoad height={200}>
                  <img
                    className="value-proposition__img lazyloaded"
                    style={{ width: '100px', height: '100px' }}
                    alt="ideal formula"
                    title="ideal formula"
                    src={shippingicon}
                  />
                </LazyLoad>
              </div>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Automatic food refills with free shipping
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LazyLoad height={200}>
                  <img
                    className="value-proposition__img lazyloaded"
                    style={{ width: '100px', height: '100px' }}
                    alt="ideal formula"
                    title="ideal formula"
                    src={phoneicon}
                  />
                </LazyLoad>
              </div>
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Full control and free from engagement
                </p>
              </div>
            </div>
          </div>
        </>
      ),
      RU: (
        <>
          <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center ">
            <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LazyLoad height={200}>
                  <img
                    className="value-proposition__img lazyloaded"
                    style={{ width: '100px', height: '100px' }}
                    alt="Питание с учетом потребностей Вашего котенка"
                    title="ideal formula"
                    src={nutrition}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon1" />
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
                    src={gifticon}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon2" />
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
                    src={spetadviser}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon3" />
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
                    src={autoicon}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon4" />
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
                    src={shippingicon}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon5" />
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
                    alt="Два бесплатных ветеринарных осмотра в клинике"
                    title="ideal formula"
                    src={iconsix}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage
                    id="club.subscription.icon6"
                    values={{
                      val: (
                        <a
                          onClick={() => {
                            window.PetStoryWC.start();
                          }}
                          style={{
                            textDecoration: 'underline',
                            color: '#e3001b',
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
        </>
      ),
      TR: (
        <>
          <div className="col-12 col-md-1 col-xxl-2 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LazyLoad height={200}>
                  <img
                    className="value-proposition__img lazyloaded"
                    style={{ width: '100px', height: '100px' }}
                    alt="İhtiyaçlara yönelik geliştirilen kaliteli beslenme çözümleri"
                    title="ideal formula"
                    src={nutrition}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon1" />
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
                    alt="Hoş geldin paketi, hediyeler ve özel hizmetler"
                    title="ideal formula"
                    src={gifticon}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon2" />
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
                    alt="Evcil hayvan danışmanı ve kişiselleştirilmiş bültenler"
                    title="ideal formula"
                    src={spetadviser}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon3" />
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
                    alt="Ücretsiz kargo ile otomatik mama gönderimi"
                    title="ideal formula"
                    src={shippingicon}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon4" />
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
                    alt="Taahhüt yok, tüm kontrol sizde"
                    title="ideal formula"
                    src={phoneicon}
                  />
                </LazyLoad>
              </div>
              <div className="d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro club_subscription_intro_center">
                  <FormattedMessage id="club.subscription.icon5" />
                </p>
              </div>
            </div>
          </div>
        </>
      ),

      FR: (
        <>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={pack}
                  alt="pack icon"
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
                  alt="autoship icon"
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
                  alt="delivery icon"
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
                  alt="question icon"
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
      DE: (
        <>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <LazyLoad height={200}>
                <img
                  style={{ width: '80px' }}
                  className="value-proposition__img"
                  src={pack}
                  alt="pack icon"
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
                  alt="autoship icon"
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
                  alt="delivery icon"
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
                  alt="question icon"
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
    }[process.env.REACT_APP_COUNTRY] || defaultJSX
  );
}
