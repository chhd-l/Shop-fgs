import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import { formatMoney } from '@/utils/utils';

import catImg from '@/assets/images/product-finder-cat.png';
import dogImg from '@/assets/images/product-finder-dog.png';

function QListAndPetJSX(props) {
  return (
    <div className="p-f-pet-box mt-4 pt-4 mb-4 pb-4">
      <div className="row">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="border rounded">
            <p
              className="text-center mt-2 mb-0"
              style={{ fontSize: '1.25rem' }}
              onClick={props.toggleShowQList}
            >
              {props.summaryIcon}
              <FormattedMessage id="productFinder.summary" />
            </p>
            <img
              src={{ cat: catImg, dog: dogImg }[props.type]}
              style={{ width: '50%', margin: '0 auto' }}
              alt=""
            />
            <ul className="rc-list rc-list--blank rc-list--align ml-2 mr-2">
              {['My dsfa', 'dsfahofiads', 'ddsadsadsfdsa'].map((ele, i) => (
                <li
                  className={`d-flex justify-content-between align-items-center pt-1 pb-1 ${
                    i ? 'border-top' : ''
                  }`}
                >
                  <span>{ele}</span>
                  <p className="rc-styled-link mb-1">
                    <FormattedMessage id="edit" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border rounded">
            <div className="row align-items-center mt-4 mb-2 mb-md-4">
              <div className="col-12 col-md-6 mb-4 mb-md-0">
                <img
                  src={{ cat: catImg, dog: dogImg }[props.type]}
                  className="border"
                  style={{
                    borderRadius: '50%',
                    width: '50%',
                    margin: '0 auto'
                  }}
                  alt=""
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
            <p className="text-center pt-3 pb-3">
              <FormattedMessage id="productFinder.createMyPetProfileTip" />
              <br />
            </p>
            <div className="text-center pb-4">
              <button class="rc-btn rc-btn--one mb-3">
                <FormattedMessage id="productFinder.createMyPetProfile" />
              </button>
              <br />
              <Link class="rc-btn rc-btn--two mb-4" to="/product-finder">
                <FormattedMessage id="productFinder.startAgin" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductFinderResult = ({ location, history, match }) => {
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
              {!qListVisible && (
                <div className="text-center mb-3 rc-md-down">
                  <div
                    className="rc-bg-colour--brand4 text-center rounded ui-cursor-pointer-pure inlineblock pl-4 pr-4"
                    onClick={toggleShowQList}
                  >
                    {qListVisible ? (
                      <span className="rc-icon rc-down--xs rc-iconography mr-2" />
                    ) : (
                      <span className="rc-icon rc-right--xs rc-iconography mr-2" />
                    )}
                    <FormattedMessage id="productFinder.summary" />
                  </div>
                </div>
              )}
              {qListVisible && (
                <div>
                  <QListAndPetJSX
                    summaryIcon={
                      <span className="rc-icon rc-down--xs rc-iconography" />
                    }
                    type={type}
                    toggleShowQList={toggleShowQList}
                  />
                </div>
              )}

              <h2 className="rc-beta markup-text mb-0 text-center">
                <FormattedMessage id="productFinder.searchCompleted" />
              </h2>
              <p className="text-center" style={{ fontSize: '1.25rem' }}>
                <FormattedMessage id="productFinder.searchResultTip1" />
                <br />
                <FormattedMessage id="productFinder.searchResultTip2" />
              </p>
              <div className="p-f-result-box">
                <div className="border rounded row pt-3 pb-3">
                  <div className="col-12 col-md-6">
                    <img src={productDetail.img} className="p-img" alt="" />
                  </div>
                  <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                    <header class="rc-text--center">
                      <h3
                        class="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen"
                        title={productDetail.goodsName}
                      >
                        {productDetail.goodsName}
                      </h3>
                    </header>
                    <div
                      class="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                      title={productDetail.subTitle}
                    >
                      {productDetail.subTitle}
                    </div>
                    <div className="text-center mt-2">
                      {formatMoney(productDetail.price)}
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <button className="rc-btn rc-btn--one rc-btn--sm">
                        <FormattedMessage id="chooseTheProduct" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row flex-nowrap mt-2">
                  <span className="rc-icon rc-incompatible--xs rc-iconography" />
                  <p style={{ fontSize: '.66em' }}>
                    The recommendations provided here are for informational
                    purpose only.It should not be considered as guarantee for
                    what may be best for your indivaidual pet.
                  </p>
                </div>
              </div>
              <p className="text-center" style={{ fontSize: '1.4rem' }}>
                <FormattedMessage id="productFinder.otherProductsToConsider" />
              </p>
              <div className="p-f-other-box rc-scroll--x pb-4">
                <div className="d-flex">
                  {[1, 2, 3, 4].map((ele, i) => (
                    <div
                      className={`border rounded pt-3 pb-3 pl-2 pr-2 pl-md-0 pr-md-0 ${
                        i ? 'ml-2' : ''
                      }`}
                    >
                      <div className="mb-3">
                        <img src={productDetail.img} className="p-img" alt="" />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <header class="rc-text--center">
                          <h3
                            class="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen"
                            title={productDetail.goodsName}
                          >
                            {productDetail.goodsName}
                          </h3>
                        </header>
                        <div
                          class="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                          title={productDetail.subTitle}
                        >
                          {productDetail.subTitle}
                        </div>
                        <div className="text-center mt-2">
                          {formatMoney(productDetail.price)}
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                          <button className="rc-btn rc-btn--one rc-btn--sm">
                            <FormattedMessage id="chooseTheProduct" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rc-md-up">
                <QListAndPetJSX type={type} toggleShowQList={toggleShowQList} />
              </div>
              <hr />
              <div className="p-f-help-box mt-4">
                <p className="text-center pt-3" style={{ fontSize: '1.3rem' }}>
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
                        <b>
                          Par mail
                        </b> <div class="children-nomargin"></div>{' '}
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductFinderResult;
