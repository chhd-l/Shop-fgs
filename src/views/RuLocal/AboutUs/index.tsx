import React from 'react';
import { Header, Footer } from '@/components';
import BreadCrumbs from '../components/BreadCrumbs';
import './index.less';
import { Link } from 'react-router-dom';
import HrLine from '../components/HrLine';

const AboutUs = () => {
  return (
    <div className="ru-local-about-us">
      <Header showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3">
        <BreadCrumbs />
        <div className="rc-layout-container rc-two-column rc-max-width--lg rc-content-h-middle ">
          <div className="rc-column rc-padding-bottom--none  rc-text--left">
            <div className="rc-full-width">
              <div>
                <h1 className="rc-alpha ">
                  Здоровье питомцев&nbsp;— наша главная забота
                </h1>
                <p style={{ textAlign: 'justify' }}>
                  Мы уделяем особое внимание уникальным потребностям кошек и
                  собак. Благодаря такому пристальному вниманию к каждой детали
                  мы разрабатываем сбалансированное питание с учетом
                  потребностей животных и помогаем им раскрыться во всем
                  великолепии.
                </p>
              </div>
            </div>
          </div>
          <div className="rc-column rc-padding-bottom--none  rc-text--left">
            <div className="rc-full-width">
              <img
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/about-us/10001.png`}
              />
            </div>
          </div>
        </div>
        <HrLine />
        <div className="rc-padding-x--sm rc-margin--none rc-bg-colour--brand3 rc-animation-001--base rc-animation-001--active">
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--xl ">
            <div className="rc-column rc-padding-y--none rc-single ">
              <a className="offset-top-header"></a>
              <div
                className="content-block-variation-1 rc_center_on_mobile rc-padding-x--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width "
                id="content-block-with-text-and-image-6-about-us-page"
              >
                <div className="content-container">
                  <div className="img-container rc-padding-bottom--none">
                    <img
                      className="lazyautosizes lazyloaded"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/about-us/10002.jpg`}
                    />
                  </div>
                  <div className="text-container">
                    <div className="rc-full-width rc-text--left">
                      {/* <div
                        className="control-btns-size"
                        style={{ display: 'none' }}
                      ></div> */}
                      <div className="rc-container-text">
                        <h2 className="rc-beta " data-en-title="Наши ценности">
                          Наши ценности
                        </h2>
                        <p>
                          Узнайте больше об идеях и ценностях, определяющих роль
                          компании Royal Canin в мире.
                        </p>
                        <Link
                          to="/about-us/our-values"
                          className="rc-btn rc-btn--two"
                        >
                          Узнайте больше
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rc-column rc-single ">
              <a className="offset-top-header"></a>
              <div
                className="content-block-variation-1 rc_center_on_mobile rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width "
                id="content-block-with-text-and-image-5-about-us-page"
              >
                <div className="content-container">
                  <div className="img-container ">
                    <img
                      className="lazyautosizes lazyloaded"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/about-us/10003.jpg`}
                    />
                  </div>
                  <div className="text-container">
                    <div className="rc-full-width rc-text--left">
                      {/* <div
                        className="control-btns-size"
                        style={{ display: 'none' }}
                      ></div> */}
                      <div className="rc-container-text">
                        <h2 className="rc-beta " data-en-title="Наша история">
                          Наша история
                        </h2>
                        <p>
                          Узнайте больше о том, как мы ориентировались на эти
                          ценности в своей ежедневной работе в течение
                          50&nbsp;лет.
                        </p>
                        <Link
                          to="/about-us/our-history"
                          className="rc-btn rc-btn--two"
                        >
                          Узнайте больше
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down rc-hidden"></div>
        </div>
        <HrLine />
        {/* 
        <div
          className="content-block-variation-1 rc_center_on_mobile rc-padding--sm rc-margin--none rc-bg-colour--brand3 rc-full-width rc-animation-001--base rc-animation-001--active"
          id="content-block-with-text-and-image-10-about-us-page"
        >
          <div className="content-container">
            <div className="img-container ">
              <img
                className="lazyautosizes lazyloaded"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/about-us/10004.png`}
              />
            </div>
            <div className="text-container">
              <div className="rc-full-width rc-text--left">
                <div className="rc-container-text">
                  <h2
                    className="rc-beta "
                  >
                    Наш диетологический подход
                  </h2>
                  <p>
                    Вся наша деятельность направлена на создание формул питания
                    с учетом индивидуальных потребностей животных для
                    поддержания их здоровья и благополучия. Узнайте больше о
                    нашем научном подходе к созданию кормов для домашних
                    питомцев, экологически чистых ингредиентах и адаптированном
                    питании.
                  </p>
                  <Link
                    to="/about-us/our-nutritional-approach"
                    className="rc-btn rc-btn--two"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HrLine /> */}

        <div className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-animation-001--base rc-animation-001--active">
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--xl ">
            <div className="rc-column rc-single ">
              <a className="offset-top-header"></a>
              <div
                className="content-block-variation-1 rc_center_on_mobile rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width "
                id="content-block-with-text-and-image-8-about-us-page"
              >
                <div className="content-container justify-center">
                  <div className="img-container ">
                    <img
                      className="lazyautosizes lazyloaded"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/about-us/10005.jpg`}
                    />
                  </div>
                  <div className="text-container">
                    <div className="rc-full-width rc-text--left">
                      {/* <div className="control-btns-size" style="display:none;"></div> */}
                      <div className="rc-container-text">
                        <h2
                          className="rc-beta "
                          data-en-title="Для устойчивого будущего"
                        >
                          Для устойчивого будущего
                        </h2>
                        <p>
                          Устойчивое развитие занимает центральное место
                          в&nbsp;ежедневной работе Royal Canin.
                        </p>
                        <Link
                          to="/about-us/sustainability"
                          className="rc-btn rc-btn--two"
                        >
                          Узнайте больше
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default AboutUs;
