import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Help from '../../../SmartFeederSubscription/modules/Help';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import usDog from '../../images/2usChange.jpg';

const imgUrlPreFix = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const howImageArr = [
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-SHOP.png`,
    title: 'GRAB YOUR PRODUCTS',
    des: 'Add expert-recommended pet food and products to your cart'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-AUTOSHIP.png`,
    title: 'CHOOSE AUTOMATIC SHIPPING',
    des: 'Select automatic shipping and input your payment method'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-SCHEDULE.png`,
    title: 'GET WHAT YOUR PET NEEDS, WHEN YOU NEED IT',
    des: 'Receive your autoship purchase based on your schedule––change or cancel at any time'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-ENJOY.png`,
    title: 'ENJOY YOUR PERKS',
    des: 'Get your exclusive Royal Canin Club perks, including access to a Royal Canin Advisor'
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
      // img: `${imgUrlPreFix}/COHORT-A_CLUB-BENEFITS_PET-ADVISOR_COPY2.jpg`,
      img: <span className="rc-icon rc-vet--sm rc-brand1 rc-iconography" />,
      text: 'Expert food and product recommendations'
    },
    {
      // img: `${imgUrlPreFix}/CLUB-BENEFITS_PRODUCT-RECOS.png`,
      img: (
        <span className="rc-icon rc-delivery--sm rc-brand1 rc-iconography" />
      ),
      text:
        '5% off every autoship order + free shipping,  \n' +
        ' with no minimum purchase'
    },
    {
      // img: `${imgUrlPreFix}/CLUB-BENEFITS_FREE-SHIPPING.png`,
      img: <span className="rc-brand1 rc-icon rc-friendly rc-iconography" />,
      text: 'A Royal Canin Advisor to answer all your pet \n' + 'questions'
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
          <div
            className="rc-layout-container rc-four-column rc-content-v-middle text-center"
            style={{ backgroundColor: 'rgb(245, 245, 245)' }}
            data-tms={props.dataTms1 || ''}
          >
            {/*{imagesArr.map((ele, i) => (*/}
            {/*  <div className="rc-column rc-padding-y--xs" key={i}>*/}
            {/*    <div className="reassurance-banner__item rc-text--left">*/}
            {/*    <span className="rc-header-with-icon rc-header-with-icon--gamma">*/}
            {/*      {ele.img}*/}
            {/*      {ele.text}*/}
            {/*    </span>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*))}*/}
            {imagesArr.map((item, index) => (
              <div
                className="row mx-5 flex-wrap "
                style={
                  index < imagesArr.length - 1
                    ? {
                        alignItems: 'center',
                        borderRightColor: '#ddd',
                        borderRightWidth: '1.5px'
                      }
                    : { alignItems: 'center' }
                }
              >
                <div className="img-hover-switch rc-margin-bottom--xs mx-4 pt-4">
                  {/*<LazyLoad>*/}
                  {/*  <img*/}
                  {/*    style={{ width: '20px' }}*/}
                  {/*    className="m-center"*/}
                  {/*    src={item.img}*/}
                  {/*    alt="recommendation image"*/}
                  {/*  />*/}
                  {/*</LazyLoad>*/}
                  {item.img}
                </div>
                <p
                  style={{
                    width: '335px',
                    textAlign: 'left',
                    color: '#777777'
                  }}
                >
                  {/* <strong style={{ color: '#888888' }}> */}
                  {item.text}
                  {/* </strong> */}
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
                <strong>
                  <FormattedMessage id="recommendation.plusTitle" />
                </strong>
              </h2>
              <p style={{ color: 'rgb(23, 43, 77)' }}>
                <FormattedMessage id="recommendation.plusContent" />
              </p>
              <button
                className={`rc-btn rc-btn--two rc-margin-top--sm ${
                  props.buttonLoading ? 'ui-btn-loading' : ''
                } ${props.addCartBtnStatus ? '' : 'rc-btn-disabled'}`}
                onClick={props.addCart}
              >
                <FormattedMessage id="recommendation.plusBtn" />
              </button>
            </div>
          </div>
          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
            {window.__.env.REACT_APP_COUNTRY === 'us' ? (
              <LazyLoad>
                <img src={usDog} alt="puppy image" />
              </LazyLoad>
            ) : (
              <LazyLoad>
                <img src={PuppyJPG} alt="puppy image" />
              </LazyLoad>
            )}
          </div>
        </div>
      </div>
      <LineModule />
      {isUs && (
        <div
          data-tms={props.dataTms2 || ''}
          className="arrow-img-columns rc-max-width--xl rc-padding-y--sm rc-padding-y--xl--mobile rc-padding-x--sm rc-padding-x--md--mobile"
        >
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
          GAforEmail={props.GAforEmail}
        />
      </div>
      {isUs && (
        <React.Fragment>
          <LineModule />
          <section
            style={{ textAlign: 'center' }}
            className="rc-max-width--md text-center rc-margin-top--md rc-padding-x--md"
          >
            <div data-tms={props.dataTms3}>
              <h2 style={{ color: '#E2001A' }}>
                <FormattedMessage id="recommendation.fourTitle" />
              </h2>
              <p style={{ fontSize: '1.125rem' }}>
                We focus our attention on the unique needs of cats and dogs.
                That obsession with detail is what makes it possible for us to
                deliver precise, effective nutrition and help pets become their
                magnificent best.
                {/* <FormattedMessage id="recommendation.fourContent" /> */}
              </p>
            </div>
            <p>
              <button
                className={`rc-btn rc-btn--one rc-margin-y--xs mr-auto ml-auto ${
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
