import React from 'react';
import { Header, Footer } from '@/components';
import { Link } from 'react-router-dom';
import './index.less';
import BreadCrumbs from '../components/BreadCrumbs';
const FindProduct = () => {
  return (
    <div className="ru-local-find-product">
      <Header showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3">
        <BreadCrumbs />
        <div className="rc-layout-container rc-one-column rc-text--center rc-max-width--md">
          <div className="rc-column">
            <div className="rc-full-width">
              <div className="rc-container-text">
                <h2 className="rc-beta "></h2>
                <p></p>
                <h2>
                  Чтобы вступить в Клуб, выберите корм, который вы хотите
                  получать. Какой у Вас питомец?
                </h2>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" rc-padding-x--sm rc-margin-bottom--xs rc-bg-colour--brand3"
          data-component="content-animation"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--md ">
            <div className="rc-column rc-padding-y--none rc-single rc-padding--none">
              <div
                className="rc-padding--sm rc-full-width rc-margin-bottom--xs rc-bg-colour--brand3 "
                data-component="content-animation"
                id="content-block-with-text-and-image-1-find-product-page"
              >
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width ">
                      <img
                        className="lazyautosizes lazyloaded"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/product/10001.png`}
                      />
                    </div>
                  </div>
                </div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width rc-text--center ">
                      <div className="rc-container-text">
                        <h2 className="rc-beta "></h2>
                        <Link
                          className="rc-btn rc-btn--one "
                          to="/cats/retail-products"
                        >
                          КОШКА
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>
            <div className="rc-column rc-padding-y--none rc-single rc-padding--none">
              <div
                className="rc-padding--sm rc-full-width rc-margin-bottom--xs rc-bg-colour--brand3 "
                data-component="content-animation"
                id="content-block-with-text-and-image-2-find-product-page"
              >
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width ">
                      <img
                        className="lazyautosizes lazyloaded"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/product/10002.png`}
                      />
                    </div>
                  </div>
                </div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width rc-text--center ">
                      <div className="rc-container-text">
                        <h2 className="rc-beta "></h2>
                        <Link
                          className="rc-btn rc-btn--one "
                          to="/dogs/retail-products"
                        >
                          СОБАКА
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down rc-hidden"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default FindProduct;
