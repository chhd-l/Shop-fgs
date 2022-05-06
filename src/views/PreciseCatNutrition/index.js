import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import GoogleTagManager from '@/components/GoogleTagManager';
import image from '@/assets/images/500.png';
import { seoHoc } from '@/framework/common';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import paw from './images/paw.png';
import cat_wellbeing from './images/cat_wellbeing.png';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { getDeviceType } from '@/utils/utils';
import goldenfood from '../ClubLandingPageNew/image/goldenfood.png';
import '../ClubLandingPageNew/index.css';
import './index.less';
import Subscription from './Components/Subscription';
import HowItWorks from './Components/HowItWorks';
import HelpComponents from './Components/HelpComponents';
import LongBanner from './Components/LongBanner';

import AboutPet from './aboutPet';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

function Divider() {
  return (
    <div className="experience-component experience-assets-divider">
      <div
        className="rc-border-bottom rc-border-colour--brand4"
        style={{ borderBottomWidth: '4px' }}
      />
    </div>
  );
}

const pageLink = window.location.href;
const event = {
  page: {
    type: 'error',
    theme: '',
    path: location?.pathname,
    error: '',
    hitTimestamp: new Date(),
    filters: ''
  }
};

@seoHoc('preciseCatNutrition')
class PreciseCatNutrition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      loading: true,
      categoryLoading: true,
      searchEvent: {}
    };
  }

  componentWillUnmount() {}

  sendGAHeaderSearch = (event) => {
    this.setState({
      searchEvent: event
    });
  };

  toScroll = (anchorName) => {
    let anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
    return (
      <>
        <div>
          <Helmet>
            <link rel="canonical" href={pageLink} />
            <meta name="robots" content="noindex" />
          </Helmet>
          <GoogleTagManager
            key={this.props.location.key}
            additionalEvents={event}
            searchEvent={this.state.searchEvent}
          />
          <Header
            {...this.props}
            showMiniIcons={true}
            showUserIcon={true}
            sendGAHeaderSearch={this.sendGAHeaderSearch}
            showNav={true}
            notScroll={true}
          />
          {/*{this.state.loading ? <Loading /> : null}*/}
          <main className={'rc-content--fixed-header'}>
            {/*<BannerTip />*/}
            {/*<div*/}
            {/*  style={{*/}
            {/*    textAlign: 'center',*/}
            {/*    height: '42px',*/}
            {/*    backgroundColor: '#F6F6F6',*/}
            {/*    display: 'flex',*/}
            {/*    justifyContent: 'center'*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <div style={{ alignSelf: 'center', color: '#E2001A' }}>*/}
            {/*    <FormattedMessage id="ClubLP.discount.content"></FormattedMessage>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <LongBanner />
            <div className="rc-full-width" style={{ height: '4px' }}></div>
            <div className="experience-component experience-layouts-1column">
              <div className={'preciseCatNutritionTop'}>
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div style={{ position: 'relative' }}>
                        <div
                          id="aboutPet"
                          style={{
                            position: 'absolute',
                            marginTop: isMobile ? '-60px' : '-100px'
                          }}
                        ></div>
                      </div>
                      <AboutPet />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*<div style={{*/}
            {/*  height: 828,*/}
            {/*  background: "linear-gradient(white, #d8d8d8)",*/}
            {/*  overflow: "hidden",*/}
            {/*  backgroundSize: "cover"}}*/}
            {/*     className={'preciseCatNutritionTop'}>*/}
            {/*  <div className="row rc-margin-x--none">*/}
            {/*    <div className="rc-full-width">*/}
            {/*      <div className="experience-component experience-assets-contentBlock">*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-headingBlock">
                    <div className="rc-max-width--lg text-center rc-margin-top--md">
                      <div className="rc-beta text-center  rc-margin-bottom--lg--mobile">
                        <div className={'row w-100 rc-margin-x--none--mobile'}>
                          <div
                            className={
                              'col-12 col-md-4 md:text-right relative nowrap'
                            }
                            style={{
                              display: 'inline',
                              marginBottom: isMobile ? 15 : null,
                              paddingRight: isMobile ? null : 0,
                              paddingLeft: isMobile ? null : 30
                            }}
                          >
                            <h2 style={{ fontWeight: 700 }} className="h2style">
                              {' '}
                              {/*DID*/}
                              {/*SAVIE-*/}
                              <div
                                style={{
                                  backgroundColor: '#E2001A',
                                  color: 'white',
                                  display: 'inline',
                                  padding: ' 5px 10px 5px 20px',
                                  margin: ' 0 13px',
                                  fontWeight: 300,
                                  position: 'relative'
                                }}
                              >
                                <div
                                  className="titleRadius"
                                  style={{
                                    width: '24.2%',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    color: '#E2001A',
                                    display: 'inline',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    left: -15,
                                    top: 10,
                                    padding: '4px 1px',
                                    fontWeight: 500,
                                    lineHeight: '18px'
                                  }}
                                >
                                  {/*You*/}
                                  LE
                                </div>
                                {/*{' '} KNOW?*/} SAVIEZ
                                <div className={'whiteRed'}></div>
                              </div>
                              VOUS ?
                            </h2>
                          </div>
                          <div className={'col-12 col-md-8 md:text-left'}>
                            <h2 className="font-weight-bold h2style">
                              {/*THAT HEAlTH IS NOT ONE SIZE FITS ALL*/}
                              CHAQUE CHAT A DES BESOINS SPÉCIFIQUES
                            </h2>
                          </div>
                        </div>
                        {/*<h2> DID you KNOW?  THAT HEAlTH IS NOT ONE SIZE FITS ALL </h2>*/}
                        {/*<FormattedMessage id="ClubLP.Advantage.title" />*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile  content-block rc-max-width--lg">
                        <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row ">
                          <div className="flex-column rc-padding-x--sm--desktop rc-padding-y--md--mobile">
                            <div
                              className="lazyload-wrapper1"
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                with: '100%'
                              }}
                              height={210}
                            >
                              <img
                                alt="With the Subscription, they will always have what they need"
                                className="w-50 lazyloaded"
                                src={paw}
                              />
                            </div>
                          </div>
                          <div className="rc-column didYouKnowText">
                            <div
                              className=" rc-full-width"
                              style={{ width: '99%' }}
                            >
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item flex">
                                  <div>
                                    <FormattedMessage id="PreciseCatNutrition.DidYouKnow.paragraph1" />
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <FormattedMessage
                                      id="PreciseCatNutrition.DidYouKnow.paragraph2"
                                      values={{ val: <sup>2</sup> }}
                                    />
                                  </div>
                                </li>
                                {/*<li className="rc-list__item flex">*/}
                                {/*  <div>*/}
                                {/*    Therefore, having a complete & balanced diet*/}
                                {/*    is key to support their health. An*/}
                                {/*    inappropriated food and portion could lead*/}
                                {/*    to overweight or even obesity, impacting*/}
                                {/*    significantly your cat's wellbeing and*/}
                                {/*    decreasing up to 2 years his lifespan*.*/}
                                {/*  </div>*/}
                                {/*</li>*/}
                              </ul>
                              <div className="rc-padding-x--none detextcenter">
                                <a
                                  onClick={() => {
                                    this.toScroll('aboutPet');
                                    window?.dataLayer?.push({
                                      event: 'individualizationLandingClick',
                                      position: 'Did you know' //value should be one the trees positions : 'Top promotion','Did you know' or 'Reinsurance'
                                    });
                                  }}
                                >
                                  <button className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs">
                                    <FormattedMessage id="PreciseCatNutrition.DidYouKnow.tryIt" />
                                  </button>
                                </a>
                                {/*<DistributeHubLinkOrATag*/}
                                {/*  // href={'/product-finder'}*/}
                                {/*  onClick={()=>this.scrollToAnchor('aboutPet')}*/}
                                {/*  ariaLabel="Links to product finder"*/}
                                {/*>*/}
                                {/*  <button className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs">*/}
                                {/*    /!*<FormattedMessage id="ClubLP.Advantage.button" />*!/*/}
                                {/*    <a>try it now</a>*/}
                                {/*  </button>*/}
                                {/*</DistributeHubLinkOrATag>*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            {isMobile ? null : <Divider />}

            <div className="experience-component experience-layouts-1column">
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--lg rc-padding-x--md text-center rc-margin-top--md">
                        <div className="rc-beta text-center  rc-margin-bottom--lg--mobile">
                          <h2 className="font-weight-bold h2style">
                            {/*{' '}*/}
                            {/*AN ADAPTED FOOD FOR YOUR CAT HEALTH & WELLBEING{' '}*/}
                            <FormattedMessage id="PreciseCatNutrition.AdaptedFood.title" />
                          </h2>
                        </div>
                        <p
                          style={{
                            textAlign: 'left',
                            padding: isMobile ? '0 28px' : null,
                            fontSize: isMobile ? '16px' : null
                          }}
                        >
                          <span>
                            <FormattedMessage
                              id="PreciseCatNutrition.AdaptedFood.paragraph1"
                              values={{
                                val1: <a style={{ fontSize: 12 }}>**</a>
                              }}
                            />
                          </span>
                        </p>
                        <p
                          style={{
                            textAlign: 'left',
                            padding: isMobile ? '0 28px' : null,
                            fontSize: isMobile ? '16px' : null
                          }}
                        >
                          <span>
                            <FormattedMessage id="PreciseCatNutrition.AdaptedFood.paragraph2" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-bottom--md  content-block rc-max-width--lg">
                        <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row ">
                          <div className="rc-column">
                            <div
                              className=" rc-full-width"
                              style={{ position: 'relative' }}
                            >
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo rc-margin-right--xs"></em>
                                  </div>
                                  <div>
                                    <strong>
                                      <FormattedMessage id="PreciseCatNutrition.AdaptedFood.paragraph2.Li1" />
                                    </strong>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo rc-margin-right--xs"></em>
                                  </div>
                                  <div>
                                    <strong>
                                      <FormattedMessage id="PreciseCatNutrition.AdaptedFood.paragraph2.Li2" />
                                    </strong>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo rc-margin-right--xs"></em>
                                  </div>
                                  <div>
                                    <strong>
                                      <FormattedMessage id="PreciseCatNutrition.AdaptedFood.paragraph2.Li3" />
                                    </strong>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo rc-margin-right--xs"></em>
                                  </div>
                                  <div>
                                    <strong>
                                      <FormattedMessage id="PreciseCatNutrition.AdaptedFood.paragraph2.Li4" />
                                    </strong>
                                  </div>
                                </li>
                              </ul>
                              <a style={{ color: 'grey', fontSize: 12 }}>
                                <FormattedMessage id="PreciseCatNutrition.AdaptedFood.paragraph3" />
                              </a>
                              <div
                                className="w-100 rc-margin-y--sm rc-padding-x--none detextcenter"
                                style={
                                  isMobile
                                    ? {
                                        position: 'absolute',
                                        marginTop: '100%'
                                        // marginLeft: '10%',
                                        // marginRight: '10%',
                                      }
                                    : null
                                }
                              >
                                <a onClick={() => this.toScroll('aboutPet')}>
                                  <button className="rc-btn rc-btn--sm rc-btn--two">
                                    <FormattedMessage id="PreciseCatNutrition.AdaptedFood.findFood" />
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="rc-column">
                            <div className="lazyload-wrapper1" height={234}>
                              <img
                                alt="With the Subscription, they will always have what they need"
                                className="w-100 lazyloaded"
                                src={cat_wellbeing}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rc-max-width--xl rc-padding-x--xs rc-padding-x--md--mobile flex flex-column align-items-center justify-content-center">
                <Subscription />
                <br />
                <br />
                <br />
                <HowItWorks />
                <br />
              </div>
            </div>

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-layouts-cardcarousel">
                    <div className="rc-margin-bottom--md rc-margin-top--xl--mobile text-center">
                      <div className="rc-max-width--lg rc-padding-x--lg rc-margin-y--sm rc-margin-y--lg--mobile value-proposition text-left">
                        <p style={{ marginBottom: 0, fontSize: 12 }}>
                          <FormattedMessage id="PreciseCatNutrition.Notes1" />
                        </p>
                        <p style={{ fontSize: 12, marginBottom: 0 }}>
                          <FormattedMessage id="PreciseCatNutrition.Notes2" />
                        </p>
                        <p style={{ fontSize: 12 }}>
                          <FormattedMessage id="PreciseCatNutrition.Notes3" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HelpComponents />

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-layouts-cardcarousel">
                    <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                      <div className="rc-max-width--sm rc-padding-x--md--mobile  rc-margin-bottom--lg--mobile value-proposition">
                        <div>
                          <h4
                            className="font-weight-normal rc-beta text-center  rc-margin-bottom--lg--mobile"
                            style={{ fontSize: 27 }}
                          >
                            {/*Address*/}
                            <FormattedMessage id="preciseNutrition.Address.title" />
                          </h4>
                        </div>
                        <p style={{ marginBottom: 0 }}>
                          <span>
                            {/*Service Consommateur Royal Canin France 650 avenue*/}
                            {/*de la petite Camargue*/}
                            <FormattedMessage id="preciseNutrition.Address.secondLine" />
                          </span>
                        </p>
                        <p>
                          <FormattedMessage id="preciseNutrition.Address.thirdLine" />
                          {/*30470 AIMARGUES*/}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Header showMiniIcons={true} location={this.props.location} /> */}
          </main>
        </div>

        <Footer />
      </>
    );
  }
}

export default PreciseCatNutrition;
