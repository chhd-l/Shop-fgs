import React, { useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
const Fr = (props) => {
  const imgUrlPreFix = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
  let PuppyJPG = `${imgUrlPreFix}/${props.intl.messages['recommendation.plusImg']}`;
  return (
    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
      <div className="row align-items-md-center">
        <div className=" col-12 col-lg-6">
          <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
            {/* <h2 className="rc-beta markup-text">
          <FormattedMessage id="recommendation.plusTitle" />
        </h2> */}
            <p style={{ color: 'rgb(23, 43, 77)' }}>
              <FormattedMessage id="recommendation.plusContent" />
            </p>
            {/* <button
          className={`rc-btn rc-btn--two ${
            props.buttonLoading ? 'ui-btn-loading' : ''
          } ${props.inStockProducts.length ? '' : 'rc-btn-disabled'}`}
          onClick={props.addCart}
        >
          <FormattedMessage id="recommendation.plusBtn" />
        </button> */}
          </div>
        </div>
        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
          <LazyLoad>
            <img src={PuppyJPG} alt="puppy image" />
          </LazyLoad>
        </div>
      </div>
    </div>
  );
};
export default injectIntl(Fr);
