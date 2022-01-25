import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import Help from './Fr/help';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import autoship from './images/us_autoship.png';
import icon1 from './images/us_icon1.png';
import icon2 from './images/us_icon2.png';
import icon3 from './images/us_icon3.png';
import icon4 from './images/us_icon4.png';
import emailImg from './images/Emailus_icon.png';
import callImg from './images/customer-service.png';
import helpImg from './images/FAQ_icon.png';
import usImage from './images/DogWithLogo.png';
import wof from './images/wof.png';
import { inject, observer } from 'mobx-react';
import './index.css';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import { seoHoc } from '@/framework/common';

const pageLink = window.location.href;
@inject('configStore')
@observer
@seoHoc('Subscription Page')
class SubscriptionLanding extends React.Component {
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div className="subscriptionLanding">
        <Helmet>
          <link rel="canonical" href={pageLink} />
        </Helmet>
        <GoogleTagManager additionalEvents={event} />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <h1 className="hidden">Royal canin</h1>
          <BannerTip />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-pawListBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--lg--mobile">
                    <div className="rc-max-width--lg rc-padding-y--sm">
                      <div className="rc-max-width--md text-center rc-margin-y--md rc-padding-x--sm">
                        <h2 className="rc-beta text-center">
                          {/*IT’S MORE THAN FREE DELIVERY*/}
                          <FormattedMessage id="SubscriptionLanding.MainTitle" />
                        </h2>
                        <div className="rc-intro inherit-fontsize children-nomargin">
                          <p>
                            {/*At Royal Canin®, we know that caring for a new pet*/}
                            {/*can bring a lot of questions. That’s why we offer*/}
                            {/*exclusive benefits like access to a Royal Canin*/}
                            {/*Advisor and more through the Royal Canin Club.*/}
                            {/*Joining is easy — sign up for automatic shipping on*/}
                            {/*your pet’s tailored formulas to become a member*/}
                            {/*today.*/}
                            <FormattedMessage id="SubscriptionLanding.MainText1" />
                            <br />
                            <br />
                          </p>
                          <p>
                            <FormattedMessage
                              id="SubscriptionLanding.MainText2"
                              values={{
                                val1: (
                                  <strong>
                                    <FormattedMessage id="free" />
                                  </strong>
                                )
                              }}
                            />
                            {/*Your <strong>free</strong> membership includes:*/}
                          </p>
                          <p>&nbsp;</p>
                          <p>&nbsp;</p>
                        </div>
                        <div className="rc-btn-group d-block d-md-none rc-text--center">
                          <Link to="/cats">
                            <button className="rc-btn rc-btn--one rc-margin-right--xs mb-2 md:mb-0">
                              {/*Shop Cat Formulas*/}
                              <FormattedMessage id="SubscriptionLanding.catFormulas" />
                            </button>
                          </Link>
                          <Link to="/dogs">
                            <button className="rc-btn rc-btn--one mb-2 md:mb-0">
                              {/*Shop Dog Formulas*/}
                              <FormattedMessage id="SubscriptionLanding.dogFormulas" />
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="rc-layout-container rc-two-column rc-content-h-middle">
                        <div className="rc-column">
                          <div className="rc-padding-y--lg--mobile rc-full-width">
                            <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                              <li className="rc-list__item">
                                <em className="wof rc-margin-right--xs"></em>
                                <strong>
                                  {/*Expert Guidance*/}
                                  <FormattedMessage id="SubscriptionLanding.listTitle1" />
                                </strong>
                                {/*- Receive*/}
                                {/*nutritional recommendations on Royal Canin food*/}
                                {/*and products as your pet grows*/}
                                <FormattedMessage id="SubscriptionLanding.listText1" />
                              </li>
                              <li className="rc-list__item">
                                <em className="wof rc-margin-right--xs"></em>
                                <strong>
                                  {/*Special Savings*/}
                                  <FormattedMessage id="SubscriptionLanding.listTitle2" />
                                </strong>
                                {/*- Save 30% off*/}
                                {/*your first purchase through Royal Canin Club,*/}
                                {/*and 5% off every autoship order. Plus, free*/}
                                {/*shipping –– with no minimum purchase*/}
                                <FormattedMessage id="SubscriptionLanding.listText2" />
                              </li>
                              <li className="rc-list__item">
                                <em className="wof rc-margin-right--xs"></em>
                                <strong>
                                  {/*Royal Canin Advisor*/}
                                  <FormattedMessage id="SubscriptionLanding.listTitle3" />
                                </strong>
                                {/*- Like a*/}
                                {/*coach for everything related to your pet’s*/}
                                {/*nutrition, your Royal Canin Advisor can help*/}
                                {/*with diet recommendations and expert feeding*/}
                                {/*advice, updates on products, and more*/}
                                <FormattedMessage id="SubscriptionLanding.listText3" />
                              </li>
                            </ul>
                            <div className="d-none d-md-block rc-btn-group m-0 rc-column rc-padding-x--none">
                              <Link to="/cats">
                                <button className="rc-btn rc-btn--one rc-margin-right--xs">
                                  {/*Shop Cat Formulas*/}
                                  <FormattedMessage id="SubscriptionLanding.catFormulas" />
                                </button>
                              </Link>
                              <Link to="/dogs">
                                <button className="rc-btn rc-btn--one">
                                  {/*Shop Dog Formulas*/}
                                  <FormattedMessage id="SubscriptionLanding.dogFormulas" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column">
                          <LazyLoad>
                            <img
                              alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin"
                              className="w-100 lazyloaded"
                              src={usImage}
                            />
                          </LazyLoad>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            ></div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-importContentAsset">
                  <div className="content-asset">
                    <div className="rc-max-width--lg rc-padding-y--md rc-padding-y--xl--mobile">
                      <div className="rc-max-width--md text-center rc-margin-y--md rc-padding-x--sm">
                        <h2 className="rc-beta text-center">
                          {/*How to Join Royal Canin Club*/}
                          <FormattedMessage id="SubscriptionLanding.howToJoinTitle" />
                        </h2>
                      </div>
                      <div className="row text-center">
                        <div className="col-6 col-md-3">
                          <img
                            className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs"
                            src={icon1}
                            alt="Bitmap image"
                          />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p>
                              {/*Add expert-recommended pet food and products to*/}
                              {/*your cart*/}
                              <FormattedMessage id="SubscriptionLanding.howToJoinText1" />
                            </p>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <img
                            className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs"
                            src={icon2}
                            alt="Bitmap image"
                          />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p>
                              {/*Select automatic shipping and input your payment*/}
                              {/*method.*/}
                              <FormattedMessage id="SubscriptionLanding.howToJoinText2" />
                            </p>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <img
                            className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs"
                            src={icon3}
                            alt="Bitmap image"
                          />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p>
                              {/*Receive your autoship purchase based on your*/}
                              {/*schedule––change or cancel at any time*/}
                              <FormattedMessage id="SubscriptionLanding.howToJoinText3" />
                            </p>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <img
                            className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs"
                            src={icon4}
                            alt="Bitmap image"
                          />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p>
                              {/*Get your exclusive Royal Canin Club perks,*/}
                              {/*including access to a Royal Canin Advisor*/}
                              <FormattedMessage id="SubscriptionLanding.howToJoinText4" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-importContentAsset">
                  <div className="content-asset">
                    <div className="rc-bg-colour--brand4">
                      <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm">
                        <div className="col-12 col-md-4 order-1 md:order-0">
                          <div className="rc-column rc-padding--none">
                            <img
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship-landing/cat.jpg`}
                              alt="Cat image"
                            />
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <Link
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              to="/cats/"
                            >
                              {/*Cat*/}
                              <FormattedMessage id="SubscriptionLanding.cat" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 md:order-1">
                          <div className="rc-gamma rc-text--center">
                            {/*Get Started*/}
                            <FormattedMessage id="SubscriptionLanding.getStarted" />
                          </div>
                          <div className="rc-intro inherit-fontsize rc-text--center">
                            <p>
                              {/*Find your pet’s precise formula, and be sure to*/}
                              {/*choose automatic shipping at checkout.*/}
                              <FormattedMessage id="SubscriptionLanding.getStartedText" />
                            </p>
                          </div>
                          <div className="rc-btn-group rc-margin--none rc-padding-x--xs d-none d-md-flex">
                            <Link
                              className="rc-btn rc-btn--sm rc-btn--two"
                              to="/cats/"
                            >
                              {/*Cat*/}
                              <FormattedMessage id="SubscriptionLanding.cat" />
                            </Link>
                            <Link
                              className="rc-btn rc-btn--sm rc-btn--two"
                              to="/dogs/"
                            >
                              {/*Dog*/}
                              <FormattedMessage id="SubscriptionLanding.dog" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 order-2 md:order-2">
                          <div className="rc-column rc-padding--none">
                            <img
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship-landing/dog.jpg`}
                              alt="Dog image"
                            />
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <Link
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              to="/dogs/"
                            >
                              {/*Dog*/}
                              <FormattedMessage id="SubscriptionLanding.dog" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none ">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contactOptionsBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile contact_options">
                    <h2 className="rc-beta text-center">
                      {/*Need help?*/}
                      <FormattedMessage id="SubscriptionLanding.helpTitle" />
                    </h2>
                    <div className="rc-intro inherit-fontsize text-center contact_options__subheading">
                      <p>
                        <span style={{ color: 'rgb(102, 102, 102)' }}>
                          {/*As true pet lovers and experts in tailored nutrition,*/}
                          {/*we're here to help you give your pet the healthiest*/}
                          {/*life possible.*/}
                          <FormattedMessage id="SubscriptionLanding.helpText" />
                        </span>
                      </p>
                    </div>
                    <div className="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">
                      <div className="rc-column rc-padding--none">
                        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                          <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                                <div className="w-100">
                                  <b style={{ color: '#00A4A6' }}>
                                    {/*Call us*/}
                                    <FormattedMessage id="SubscriptionLanding.helpListTitle1" />
                                  </b>
                                  <p>
                                    <span
                                      style={{ color: 'rgb(102, 102, 102)' }}
                                    >
                                      {/*Monday through Friday from 8:00 a.m. to*/}
                                      {/*4:30 p.m. CT.*/}
                                      <FormattedMessage id="SubscriptionLanding.helpListText1" />
                                    </span>
                                  </p>
                                  <div className="rc-margin-top--xs">
                                    <a
                                      href="tel: 1-844-673-3772"
                                      style={{ color: '#00A4A6' }}
                                      className="rc-numeric nowrap"
                                    >
                                      {/*1-844-673-3772*/}
                                      <FormattedMessage id="SubscriptionLanding.helpListText12" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                <img
                                  className="align-self-center widthAuto lazyloaded"
                                  alt="call us"
                                  title="call us"
                                  src={callImg}
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="rc-column rc-padding--none">
                        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                          <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                                <div className="w-100">
                                  <b style={{ color: '#0087BD' }}>
                                    {/*Email Us*/}
                                    <FormattedMessage id="SubscriptionLanding.helpListTitle2" />
                                  </b>
                                  <p>
                                    <span
                                      style={{ color: 'rgb(102, 102, 102)' }}
                                    >
                                      {/*We will respond as soon as possible.*/}
                                      <FormattedMessage id="SubscriptionLanding.helpListText2" />
                                    </span>
                                  </p>
                                  <div className="rc-margin-top--xs">
                                    <Link
                                      to="/help/contact"
                                      style={{ color: '#0087BD' }}
                                      className="rc-numeric nowrap"
                                    >
                                      {/*Send us an Email*/}
                                      <FormattedMessage id="SubscriptionLanding.helpListText22" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                <img
                                  className="align-self-center widthAuto lazyloaded"
                                  alt="email us"
                                  title="email us"
                                  src={emailImg}
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="rc-column rc-padding--none">
                        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                          <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                                <div className="w-100">
                                  <strong>
                                    {/*Have a question?*/}
                                    <FormattedMessage id="SubscriptionLanding.helpListTitle3" />
                                  </strong>
                                  <p>
                                    <span
                                      style={{ color: 'rgb(102, 102, 102)' }}
                                    >
                                      {/*Check out our&nbsp;*/}
                                      <FormattedMessage
                                        id="SubscriptionLanding.helpListText3"
                                        values={{
                                          val1: <span>&nbsp;</span>
                                        }}
                                      />
                                    </span>
                                    <Link
                                      to="/faq"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      data-link-type="external"
                                      style={{
                                        color: 'rgb(236, 0, 26)',
                                        backgroundColor: 'rgb(255, 255, 255)'
                                      }}
                                    >
                                      {/*FAQs*/}
                                      <FormattedMessage id="SubscriptionLanding.FAQs" />
                                      {Boolean(
                                        window.__.env
                                          .REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                                      ) && (
                                        <span className="warning_blank">
                                          {/*Opens a new window*/}
                                          <FormattedMessage id="SubscriptionLanding.helpListText32" />
                                        </span>
                                      )}
                                    </Link>
                                    <span
                                      style={{ color: 'rgb(102, 102, 102)' }}
                                    >
                                      {/*&nbsp;to find the answers you're looking*/}
                                      {/*for.*/}
                                      <FormattedMessage
                                        id="SubscriptionLanding.helpListText33"
                                        values={{
                                          val1: <span>&nbsp;</span>
                                        }}
                                      />
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                <img
                                  className="align-self-center widthAuto lazyloaded"
                                  alt="faq images"
                                  title="faq"
                                  src={helpImg}
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default SubscriptionLanding;
