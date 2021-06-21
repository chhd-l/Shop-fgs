import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Help from '../../../SmartFeederSubscription/modules/Help';
import { FormattedMessage, injectIntl } from 'react-intl';

const imgUrlPreFix = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const howImageArr = [
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-SHOP.png`,
    title: 'GRAB YOUR PRODUCTS',
    des: 'Find your handpicked nutrition products in your cart.'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-AUTOSHIP.png`,
    title: 'CHOOSE AUTOMATIC SHIPPING',
    des: 'Set your automatic shipping schedule  and input your payment method.'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-SCHEDULE.png`,
    title: 'GET WHAT YOUR PET NEEDS, WHEN YOU NEED IT',
    des:
      'Receive your product automatically based on your schedule. Change or cancel at any time.'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-ENJOY.png`,
    title: 'ENJOY YOUR PERKS',
    des:
      'Get your exclusive <strong>Royal Canin Club</strong> perks, including access to Royal Canin Pet Advisor Live.'
  }
];

const LineModule = () => (
  <div
    className="rc-border-bottom rc-border-colour--brand4"
    style={{ borderBottomWidth: '4px' }}
  ></div>
);
const UsAndRu = (props) => {
  let PuppyJPG = `${imgUrlPreFix}/${props.intl.messages['recommendation.plusImg']}`;
  const isUs = window.__.env.REACT_APP_COUNTRY === 'us';
  const isRu = window.__.env.REACT_APP_COUNTRY === 'ru';
  let cur_recommendation2 = `${imgUrlPreFix}/1xexpertise.jpg`;
  let cur_recommendation3 = `${imgUrlPreFix}/2xpartnership.jpg`;
  let cur_recommendation4 = `${imgUrlPreFix}/3xquality.jpg`;
  const imagesArr = [
    {
      img: `${imgUrlPreFix}/COHORT-A_CLUB-BENEFITS_PET-ADVISOR.png`,
      text: 'Royal Canin Pet Advisor Live'
    },
    {
      img: `${imgUrlPreFix}/CLUB-BENEFITS_PRODUCT-RECOS.png`,
      text: 'Personalized Recommendations'
    },
    {
      img: `${imgUrlPreFix}/CLUB-BENEFITS_FREE-SHIPPING.png`,
      text: 'Free Shipping & 5% Off Every Autoship Order'
    }
  ];
  const helpContentText = {
    title: props.intl.messages['recommendation.helpContentText.title'],
    des: props.intl.messages['recommendation.helpContentText.des'],
    emailTitle:
      props.intl.messages['recommendation.helpContentText.emailTitle'],
    emailDes: props.intl.messages['recommendation.helpContentText.emailDes'],
    emailLink: props.intl.messages['recommendation.helpContentText.emailLink'],
    phoneTitle:
      props.intl.messages['recommendation.helpContentText.phoneTitle'],
    phone: props.intl.messages['recommendation.helpContentText.phone'],
    email: props.intl.messages['recommendation.helpContentText.email'],
    phoneDes1: `<strong>${props.intl.messages['recommendation.helpContentText.phoneDes1']}</strong>`,
    phoneDes2: props.intl.messages['recommendation.helpContentText.phoneDes2']
  };
  return (
    <>
      {isUs && (
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
          <div className="rc-layout-container rc-four-column rc-content-v-middle text-center">
            {imagesArr.map((item) => (
              <div className="rc-column">
                <div className="img-hover-switch rc-margin-bottom--sm">
                  <LazyLoad>
                    <img
                      className="m-center"
                      src={item.img}
                      alt="recommendation image"
                    />
                  </LazyLoad>
                </div>
                <p>
                  <strong style={{ color: 'rgb(61, 61, 60)' }}>
                    {item.text}
                  </strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <LineModule />
      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--xl">
        <div className="row align-items-md-center">
          <div className=" col-12 col-lg-6">
            <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
              <h2 className="rc-beta markup-text">
                <FormattedMessage id="recommendation.plusTitle" />
              </h2>
              <p style={{ color: 'rgb(23, 43, 77)' }}>
                <FormattedMessage id="recommendation.plusContent" />
              </p>
              <button
                className={`rc-btn rc-btn--two ${
                  props.buttonLoading ? 'ui-btn-loading' : ''
                } ${props.addCartBtnStatus ? '' : 'rc-btn-disabled'}`}
                onClick={props.addCart}
              >
                <FormattedMessage id="recommendation.plusBtn" />
              </button>
            </div>
          </div>
          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
            <LazyLoad>
              <img src={PuppyJPG} alt="puppy image" />
            </LazyLoad>
          </div>
        </div>
      </div>
      <LineModule />
      {isUs && (
        <div className="arrow-img-columns rc-max-width--xl rc-padding-y--sm rc-padding-y--xl--mobile rc-padding-x--sm rc-padding-x--md--mobile">
          <div className="rc-margin-bottom--md">
            <h2 className="rc-beta" style={{ color: '#e2001a' }}>
              How to Join Royal Canin Club
            </h2>
          </div>
          <div className="rc-card-grid rc-match-heights rc-card-grid--fixed text-center rc-content-v-middle for-icon-size">
            {howImageArr.map((item) => (
              <div className="rc-grid">
                <div>
                  <h3 className="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs">
                    <strong>{item.title}</strong>
                  </h3>
                  <lazyload>
                    <img
                      className="mx-auto rc-margin-bottom--xs"
                      src={item.img}
                      alt="recommendation image"
                    />
                  </lazyload>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.des }}
                    className="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <LineModule />
      <div className="help-container 1111">
        <Help
          isRecommendationPage={true}
          contentText={helpContentText}
          needReverse={false}
        />
      </div>
      {isUs && (
        <React.Fragment>
          <LineModule />
          <section
            style={{ textAlign: 'center' }}
            className="rc-max-width--md text-center rc-margin-top--md"
          >
            <h2 style={{ color: '#E2001A' }}>
              <FormattedMessage id="recommendation.fourTitle" />
            </h2>
            <p style={{ fontSize: '1.125rem' }}>
              We focus our attention on the unique needs of cats and dogs. That
              obsession with detail is what makes it possible for us to deliver
              precise, effective nutrition and help pets become their
              magnificent best.
              {/* <FormattedMessage id="recommendation.fourContent" /> */}
            </p>
            <p>
              <button
                className={`rc-btn rc-btn--one ${
                  props.buttonLoading ? 'ui-btn-loading' : ''
                } ${props.addCartBtnStatus ? '' : 'rc-btn-solid-disabled'}`}
                onClick={props.addCart}
              >
                Place order
              </button>
            </p>
            <div className="experience-component experience-assets-youtubeVideo">
              <div className="rc-max-width--md rc-padding-x--lg">
                <div className="rc-video-wrapper dog-video">
                  <iframe
                    allowfullscreen=""
                    frameborder="0"
                    id="video-dog"
                    className="optanon-category-4 "
                    src="https://www.youtube.com/embed/ICmjePIyMkI"
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="rc-max-width--lg rc-padding-y--sm img-text-box">
            <div className="rc-layout-container rc-margin-to--md rc-padding-x--sm">
              <div className="rc-column">
                <LazyLoad>
                  <img src={cur_recommendation2} alt="recommendation image" />
                </LazyLoad>
              </div>
              <div className="rc-column">
                <LazyLoad>
                  <img src={cur_recommendation3} alt="recommendation image" />
                </LazyLoad>
              </div>
              <div className="rc-column">
                <LazyLoad>
                  <img src={cur_recommendation4} alt="recommendation image" />
                </LazyLoad>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};
export default injectIntl(UsAndRu);
