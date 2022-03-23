import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import './index.css';
import { seoHoc } from '@/framework/common';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import icon1 from '../../StaticPage/SubscriptionLanding/images/icon1.png';
import icon2 from '../../StaticPage/SubscriptionLanding/images/icon2.png';
import icon3 from '../../StaticPage/SubscriptionLanding/images/icon3.png';
import icon4 from '../../StaticPage/SubscriptionLanding/images/icon4.png';
import HelpComponents from '../../../components/HelpComponents/HelpComponents';
import vetimg from './images/VET@2x.webp';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;

function Divider() {
  return (
    <div className="experience-component experience-assets-divider">
      <div
        className="rc-border-bottom rc-border-colour--brand4"
        style={{ borderBottomWidth: '4px' }}
      />
    </div>
  );
}

@seoHoc('About Us Page')
class VetLandingPage extends React.Component {
  componentWillUnmount() {}
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <br />
          <BreadCrumbs />
          <div className="storefront-page">
            <nav
              className="rc-progress rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs rc-margin-top--xs "
              data-progress-setup="true"
            />
            <div className="experience-region experience-main">
              {/* <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--md text-center rc-margin-y--md">
                        <div className="rc-alpha inherit-fontsize">
                          <h1><FormattedMessage id="aboutUs.title" /></h1>
                        </div>
                        <div
                          className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <h2><FormattedMessage id="aboutUs.description" /></h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--md text-center rc-margin-y--md">
                        <div className="rc-alpha inherit-fontsize">
                          <h1>У Вашего питомца никогда не закончится корм!</h1>
                        </div>
                        <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <p>
                            Наша услуга по подписке на ветеринарный корм
                            разработана специально для того, чтобы упростить
                            вашу жизнь и гарантировать, что Вы всегда будете
                            получать питание для Вашего питомца, доставляемое
                            прямо к порогу.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                          <div className="rc-column">
                            <div className="rc-padding-y--lg--mobile rc-full-width">
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item">
                                  <em className="wof rc-margin-right--xs"></em>
                                  Вы экономите 10% с каждого заказа
                                </li>
                                <li className="rc-list__item">
                                  <em className="wof rc-margin-right--xs"></em>
                                  Автоматическое пополнение запасов корма с
                                  бесплатной доставкой при подписке на сумму от
                                  2500 руб
                                </li>
                                <li className="rc-list__item">
                                  <em className="wof rc-margin-right--xs"></em>
                                  Вы можете изменить или отменить подписку в
                                  любое время
                                </li>
                              </ul>
                              <br />
                              <br />
                              <div className=" rc-btn-group m-0 rc-column rc-padding-x--none">
                                <Link to="/cats/vet-products">
                                  <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                                    Корм для Кошек
                                  </button>
                                </Link>
                                <Link to="/dogs/vet-products">
                                  <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                                    Корм для Собак
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="rc-column">
                            <div className="lazyload-wrapper">
                              <img
                                alt="With the Subscription, they will always have what they need"
                                className="w-100 lazyloaded"
                                src={vetimg}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <section
                        style={{
                          textAlign: 'center',
                          width: '50%',
                          margin: '0 auto'
                        }}
                      >
                        <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                          Как работает подписка на ветеринарные диеты?
                        </h2>
                      </section>
                      <div
                        className="rc-layout-container rc-four-column"
                        style={{ padding: '1.25rem' }}
                      >
                        <div
                          className="rc-column"
                          style={{ textAlign: 'center' }}
                        >
                          <LazyLoad>
                            <img
                              alt="bitmap image"
                              src={icon1}
                              style={{
                                width: '100px',
                                display: 'inline-block',
                                marginBottom: '1.25rem'
                              }}
                            />
                          </LazyLoad>
                          {/* <p>Выберите подходящий рацион питания для Вашего питомца</p> */}
                          <p>
                            Воспользуйтесь рекомендацией Вашего ветеринарного
                            врача, чтобы определить диету, которая подходит
                            Вашему питомцу
                          </p>
                        </div>
                        <div
                          className="rc-column"
                          style={{ textAlign: 'center' }}
                        >
                          <LazyLoad>
                            <img
                              alt="bitmap image"
                              src={icon2}
                              style={{
                                width: '100px',
                                display: 'inline-block',
                                marginBottom: '1.25rem'
                              }}
                            />
                          </LazyLoad>
                          {/* <p>Выберите частоту отправки, адрес доставки и способ оплаты</p> */}
                          <p>
                            Выберите частоту отправки, адрес доставки и способ
                            оплаты
                          </p>
                        </div>
                        <div
                          className="rc-column"
                          style={{ textAlign: 'center' }}
                        >
                          <LazyLoad>
                            <img
                              alt="bitmap image"
                              src={icon3}
                              style={{
                                width: '100px',
                                display: 'inline-block',
                                marginBottom: '1.25rem'
                              }}
                            />
                          </LazyLoad>
                          {/* <p>Получайте заказ автоматически по Вашему расписанию</p> */}
                          <p>
                            Получайте заказ автоматически&nbsp;
                            <strong>по Вашему расписанию</strong>
                          </p>
                        </div>
                        <div
                          className="rc-column"
                          style={{ textAlign: 'center' }}
                        >
                          <LazyLoad>
                            <img
                              alt="bitmap image"
                              src={icon4}
                              style={{
                                width: '100px',
                                display: 'inline-block',
                                marginBottom: '1.25rem'
                              }}
                            />
                          </LazyLoad>
                          {/* <p>Меняйте график доставки в любое время, когда захотите</p> */}
                          <p>
                            Меняйте график доставки в любое время,&nbsp;
                            <strong>когда захотите</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <Divider />
              <br />
              <HelpComponents />
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default VetLandingPage;
