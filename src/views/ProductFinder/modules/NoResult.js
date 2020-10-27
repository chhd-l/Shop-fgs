import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import { formatMoney } from '@/utils/utils';

import catImg from '@/assets/images/product-finder-cat2.png';
import dogImg from '@/assets/images/product-finder-dog2.png';

function PetJSX(props) {
  return (
    <div className="p-f-pet-box mt-4 pt-4 mb-4 pb-4">
      <div className="row align-items-center">
        <div className="col-12">
          <div className="border rounded">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 row mt-4 mb-2 mb-md-4">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  <img
                    src={{ cat: catImg, dog: dogImg }[props.type]}
                    className="border"
                    style={{
                      borderRadius: '50%',
                      width: '50%',
                      margin: '0 auto'
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 text-center text-md-left">
                  <div className="row">
                    <div className="col-6 mb-2 mb-md-0">
                      Age
                      <br />
                      <span className="font-weight-normal">2 years old</span>
                    </div>
                    <div className="col-6 mb-2 mb-md-0">
                      Breed
                      <br />
                      <span className="font-weight-normal">Mix Breed</span>
                    </div>
                    <div className="col-6 mb-2 mb-md-0">
                      Gender
                      <br />
                      <span className="font-weight-normal">Female</span>
                    </div>
                    <div className="col-6 mb-2 mb-md-0">
                      Sterilized
                      <br />
                      <span className="font-weight-normal">Yes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <p className="text-center pt-3 pb-3">
                  <FormattedMessage id="productFinder.rigisterMyPetProfile" />
                  <br />
                </p>
                <div className="row align-items-center text-center">
                  <div className="col-12 col-md-6">
                    <button class="rc-btn rc-btn--one mb-3">
                      <FormattedMessage id="productFinder.createMyPetProfile" />
                    </button>
                  </div>
                  <div className="col-12 col-md-6">
                    <Link class="rc-btn rc-btn--two mb-4" to="/product-finder">
                      <FormattedMessage id="productFinder.startAgin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductFinderNoResult = ({ location, history, match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail] = useState(null);
  const [qListVisible, setQListVisible] = useState(false);
  const type = 'cat';

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProductDetail({
        img:
          'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202007260439267294.png',
        goodsName: 'Pwrson',
        subTitle: 'Adult cat food',
        price: 200
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  function toggleShowQList() {
    setQListVisible((c) => !c);
  }

  return (
    <div>
      <Header
        showMiniIcons={true}
        showUserIcon={true}
        location={location}
        history={history}
        match={match}
      />
      <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
        <BreadCrumbs />
        <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
          {isLoading ? (
            <div className="mt-4">
              <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
            </div>
          ) : (
            <div className="">
              <h2 className="rc-beta markup-text mb-0 text-center">
                <FormattedMessage id="productFinder.searchResultTip3" />
              </h2>
              <p className="text-center" style={{ fontSize: '1.25rem' }}>
                <FormattedMessage id="productFinder.searchResultTip4" />
              </p>

              <PetJSX type={type} />
              <div className="row">
                <div className="col-12 order-1 order-md-0">
                  <div className="p-f-help-box mt-4">
                    <p
                      className="text-center pt-3"
                      style={{ fontSize: '1.3rem' }}
                    >
                      <FormattedMessage id="productFinder.helpTip1" />
                    </p>
                    <p className="text-center">
                      <FormattedMessage id="productFinder.helpTip2" />
                    </p>
                    <div className="row">
                      <div className="col-12 col-md-6 ">
                        <div class="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
                          <div class="rc-margin-right--xs flex-grow-1">
                            <b>Par téléphone</b>
                            <div class="children-nomargin">
                              <p>De 8h00 à 20h00</p>{' '}
                            </div>
                            <div>
                              <a
                                href="tel:+0 800 005 360"
                                class="rc-large-body tel"
                              >
                                0 800 005 360
                              </a>
                            </div>{' '}
                          </div>
                          <div class="rc-padding-left--xs rc-lg-up">
                            <img
                              class=" ls-is-cached lazyloaded"
                              data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                              alt="Par téléphone icon"
                              src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                            />{' '}
                          </div>{' '}
                          <div class="rc-padding-left--xs rc-md-down">
                            {' '}
                            <img
                              class="lazyload"
                              data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                              alt="Par téléphone icon"
                            />{' '}
                          </div>{' '}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 ">
                        <a
                          class="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
                          href="/fr/help"
                        >
                          {' '}
                          <div class="rc-margin-right--xs flex-grow-1">
                            {' '}
                            <b>Par mail</b>{' '}
                            <div class="children-nomargin"></div>{' '}
                          </div>{' '}
                          <div class="rc-padding-left--xs rc-lg-up">
                            {' '}
                            <img
                              class=" ls-is-cached lazyloaded"
                              data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                              alt="Par e-mail icon"
                              src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                            />{' '}
                          </div>{' '}
                          <div class="rc-padding-left--xs rc-md-down">
                            {' '}
                            <img
                              class="lazyload"
                              data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
                              alt="Par e-mail icon"
                            />{' '}
                          </div>{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 order-0 order-md-1">
                  <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
                    <div className="row">
                      <div className="col-12 col-md-4 order-0 order-md-1 text-center">
                        <h2 className="rc-beta markup-text mb-4">
                          <FormattedMessage id="seeAllOurProducts" />
                        </h2>
                        <div className="rc-btn-group rc-md-up">
                          <Link className="rc-btn rc-btn--one" to="/list/cats">
                            <FormattedMessage id="cats3" />
                          </Link>
                          <Link className="rc-btn rc-btn--one" to="/list/dogs">
                            <FormattedMessage id="dogs3" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 order-1 order-md-0">
                        <img src={catImg} />
                        <div className="rc-md-down text-center mt-4">
                          <Link className="rc-btn rc-btn--one" to="/list/cats">
                            <FormattedMessage id="cats3" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 order-2 order-md-2">
                        <img src={dogImg} />
                        <div className="rc-md-down text-center mt-4">
                          <Link className="rc-btn rc-btn--one" to="/list/dogs">
                            <FormattedMessage id="dogs3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="rc-md-down" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductFinderNoResult;
