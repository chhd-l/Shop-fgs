import React, { useState, useEffect } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import { FormattedMessage } from 'react-intl';

import catImg from '@/assets/images/product-finder-cat.png';
import dogImg from '@/assets/images/product-finder-dog.png';
import './index.less';

const ProductFinder = ({ location, history, match }) => {
  function handleClickBtn(type) {
    history.push(`/product-finder/question/${type}`);
  }
  const _btnJSX = (
    <div className="rc-btn-group">
      <button
        className="rc-btn rc-btn--one"
        onClick={() => handleClickBtn('cat')}
      >
        <FormattedMessage id="cats3" />
      </button>
      <button
        className="rc-btn rc-btn--one"
        onClick={() => handleClickBtn('dog')}
      >
        <FormattedMessage id="dogs3" />
      </button>
    </div>
  );
  const event = {
    page: {
      type: 'Product Finder',
      theme: ''
    }
  };
  return (
    <div>
      <GoogleTagManager additionalEvents={event} />
      <Header
        showMiniIcons={true}
        showUserIcon={true}
        location={location}
        history={history}
        match={match}
      />
      <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
        <BreadCrumbs />
        <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
          <div className="row">
            <div className="col-12 col-md-4 order-0 order-md-1 text-center">
              <h2 className="rc-beta markup-text mb-0">
                <FormattedMessage id="productFinder.tip1" />
              </h2>
              <p>
                <FormattedMessage id="productFinder.tip2" />
              </p>
              <h3 className="rc-gamma markup-text">
                <FormattedMessage id="productFinder.tip3" />
              </h3>
              <div className="rc-md-up">{_btnJSX}</div>
            </div>
            <div className="col-6 col-md-4 order-1 order-md-0">
              <img src={catImg} alt="" />
            </div>
            <div className="col-6 col-md-4 order-2 order-md-2">
              <img src={dogImg} alt="" />
            </div>
          </div>
          <div className="next-step-button d-md-none">{_btnJSX}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductFinder;
