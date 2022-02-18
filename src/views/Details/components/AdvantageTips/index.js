import React from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl-phraseapp';
import { optimizeImage } from '@/utils/utils';

const AdvantageTips = ({ secondIconvisible = true }) => {
  return (
    <div
      className="rc-full-width advantage-tips"
      // data-tms="Product description" 和detail重复
    >
      <div className="experience-component experience-assets-centeredIconList">
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
          <div className="rc-sm-down">
            <div className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list mx-auto text-center">
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={optimizeImage({
                      originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Payment-secure@2x.png`,
                      width: 60
                    })}
                    // srcSet={PaymentSecureHome}
                    className="mx-auto"
                    alt="Secure payments"
                    title="Secure payments"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point1" />
                </p>
              </div>
              {secondIconvisible && (
                <div className="col-6 centered-icon-list__icon">
                  <LazyLoad height={200}>
                    <img
                      src={optimizeImage({
                        originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/reimbursed@2x.png`,
                        width: 60
                      })}
                      // src={reimbursedHome}
                      // srcSet={reimbursedHome}
                      className="mx-auto"
                      alt="Quality assurance"
                      title="Quality assurance"
                    />
                  </LazyLoad>
                  <p className="rc-meta text-center markup-text">
                    <FormattedMessage id="home.point2" />
                  </p>
                </div>
              )}
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={optimizeImage({
                      originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/premium@2x.png`,
                      width: 60
                    })}
                    // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/premium@2x.png`}
                    // srcSet={premiumHome}
                    className="mx-auto"
                    alt="Premium service"
                    title="Premium service"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text text-nowrap">
                  <FormattedMessage id="home.point3" />
                </p>
              </div>
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/shippment@2x.png`}
                    src={optimizeImage({
                      originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/shippment@2x.png`,
                      width: 60
                    })}
                    // srcSet={shippmentHome}
                    className="mx-auto"
                    alt="Fast shipping"
                    title="Fast shipping"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point4" />
                </p>
              </div>
            </div>
          </div>
          <div className="rc-sm-up">
            <div className="d-flex justify-content-center bottom-content__icon-list text-center">
              <div className="centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={optimizeImage({
                      originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Payment-secure@2x.png`,
                      width: 80
                    })}
                    // srcSet={PaymentSecureHome}
                    className="mx-auto"
                    alt="Secure payments"
                    title="Secure payments"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point1" />
                </p>
              </div>
              {secondIconvisible && (
                <div className="centered-icon-list__icon">
                  <LazyLoad height={200}>
                    <img
                      // src={reimbursedHome}
                      src={optimizeImage({
                        originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/reimbursed@2x.png`,
                        width: 80
                      })}
                      // srcSet={reimbursedHome}
                      className="mx-auto"
                      alt="Quality assurance"
                      title="Quality assurance"
                    />
                  </LazyLoad>
                  <p className="rc-meta text-center markup-text">
                    <FormattedMessage id="home.point2" />
                  </p>
                </div>
              )}
              <div className="centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={optimizeImage({
                      originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/premium@2x.png`,
                      width: 80
                    })}
                    className="mx-auto"
                    alt="Premium service"
                    title="Premium service"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text text-nowrap">
                  <FormattedMessage id="home.point3" />
                </p>
              </div>
              <div className="centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    // src={shippmentHome}
                    // srcSet={shippmentHome}
                    src={optimizeImage({
                      originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/shippment@2x.png`,
                      width: 80
                    })}
                    className="mx-auto"
                    alt="Fast shipping"
                    title="Fast shipping"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point4" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantageTips;
