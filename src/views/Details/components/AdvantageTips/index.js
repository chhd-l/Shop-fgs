import React from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl';
import PaymentSecureHome from '@/assets/images/home/Payment-secure@2x.png';
import premiumHome from '@/assets/images/home/premium@2x.png';
import reimbursedHome from '@/assets/images/home/reimbursed@2x.png';
import shippmentHome from '@/assets/images/home/shippment@2x.png';

const AdvantageTips = ({ secondIconvisible = true }) => {
  return (
    <div
      className="rc-full-width advantage-tips"
      data-tms="Product description"
    >
      <div className="experience-component experience-assets-centeredIconList">
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
          <div className="rc-sm-down">
            <div className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list mx-auto text-center">
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={PaymentSecureHome}
                    srcSet={PaymentSecureHome}
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
                      src={reimbursedHome}
                      srcSet={reimbursedHome}
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
                    src={premiumHome}
                    srcSet={premiumHome}
                    className="mx-auto"
                    alt="Premium service"
                    title="Premium service"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point3" />
                </p>
              </div>
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={shippmentHome}
                    srcSet={shippmentHome}
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
                    src={PaymentSecureHome}
                    srcSet={PaymentSecureHome}
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
                      src={reimbursedHome}
                      srcSet={reimbursedHome}
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
                    src={premiumHome}
                    srcSet={premiumHome}
                    className="mx-auto"
                    alt="Premium service"
                    title="Premium service"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point3" />
                </p>
              </div>
              <div className="centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={shippmentHome}
                    srcSet={shippmentHome}
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
