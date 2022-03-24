import React from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getOtherSpecies } from '@/utils/GA';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { Helmet } from 'react-helmet';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';
import './index.css';
import { funcUrl } from '@/lib/url-utils';
import LazyLoad from 'react-lazyload';
import { seoHoc } from '@/framework/common';
import DetailsDisplay from './DetailsDisplay';
import ProductSpecialities from './ProductSpecialities';
import Banner from './components/Banner';
import productList from './productList.json';
import { getDeviceType } from '../../utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
import { getRecommendationInfo } from '@/api/productFinder';
import Loading from '@/components/Loading';
import GroupOne from './image/GroupOne.png';
import { inject, observer } from 'mobx-react';

console.info('productList', productList);
const pageLink = window.location.href;

@seoHoc('preciseRecommendation')
@inject('configStore')
@observer
class PreciseRecommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productShowInfo: productList['IND10007'],
      recommData: {
        // goodsInfo:{},
        // pet:{}
      },
      loading: true
    };
  }
  handleGA({ goodsInfo, totalPrice }) {
    try {
      if (!goodsInfo) {
        return;
      }
      let technology = (
        getOtherSpecies(goodsInfo, 'Technology') || []
      ).toString();
      let range = (getOtherSpecies(goodsInfo, 'Range') || []).toString();
      let breed = getOtherSpecies(goodsInfo, 'breeds') || [];
      let GAData = {
        products: [
          {
            price: totalPrice, //Product Price, including discount if promo code activated for this product
            specie: 'Cat', //'Cat' or 'Dog',
            range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
            name: goodsInfo.goodsInfoName, //WeShare product name, always in English
            mainItemCode: goodsInfo.goodsInfoNo, //Main item code
            SKU: goodsInfo.goodsInfoNo, //product SKU
            subscription: 'Individual', //'One Shot', 'Subscription', 'Club'
            subscriptionFrequency: 3, //Frequency in weeks, to populate only if 'subscription' equals 'Subscription or Club'
            technology, //'Dry', 'Wet', 'Pack'
            brand: 'Royal Canin', //'Royal Canin' or 'Eukanuba'
            size: `1gx${goodsInfo.buyCount}`, //?Same wording as displayed on the site, with units depending on the country (oz, grams...)
            breed, //All animal breeds associated with the product in an array
            quantity: goodsInfo.buyCount, //Number of products, only if already added to cart
            sizeCategory: '', //'Less than 4Kg', 'Over 45kg'... reflecting the 'Weight of my animal' field present in the PLP filters
            promoCodeName: '', //Promo code name, only if promo activated
            promoCodeAmount: '' //Promo code amount, only if promo activated
          }
        ]
      };
      console.info('GAData', GAData);
      window?.dataLayer?.push(GAData);
    } catch (err) {
      console.info('err', err);
    }
  }
  async getProductInfo() {
    let productString = sessionItemRoyal.get('nutrition-recommendation-filter');
    let res = productString && JSON.parse(productString);
    if (res) {
      let productId = res.goodsInfo.goodsInfoNo;
      let productShowInfo = productList[productId];
      let recommData = res;
      this.setState({
        productShowInfo,
        recommData,
        loading: false
      });
      this.handleGA(res);
    } else {
      // 没有走回答问题的时候，需要重定向到landingpage
      this.props.history.push('/precise-cat-nutrition');
    }
  }

  componentDidMount() {
    this.getProductInfo();
  }

  componentWillUnmount() {}

  render() {
    const ru = window.__.env.REACT_APP_COUNTRY == 'ru';
    const tr = window.__.env.REACT_APP_COUNTRY == 'tr';
    const us = window.__.env.REACT_APP_COUNTRY == 'us';
    const firstText = {
      content: <FormattedMessage id="preciseNutrition.Top.title" />
    };
    const list = {
      phone: {
        title: <FormattedMessage id="ClubLP.Help.call.title" />,
        desc: <FormattedMessage id="preciseNutrition.call.content" />,
        btnText: <FormattedMessage id="preciseNutrition.call.number" />
      },
      email: {
        title: <FormattedMessage id="ClubLP.Help.email.title" />,
        desc: <FormattedMessage id="ClubLP.Help.email.content" />,
        btnText: <FormattedMessage id="ClubLP.Help.email.address" />
      },
      faq: {
        desc: (
          <FormattedMessage
            id="preciseNutrition.faq.content"
            values={{
              val: ru ? (
                <DistributeHubLinkOrATag
                  href={'/about-us/faq'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline',
                      color: '#E2001A',
                      fontWeight: '550'
                    }}
                  >
                    часто задаваемые вопросы:
                  </a>
                </DistributeHubLinkOrATag>
              ) : tr ? (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline',
                      color: '#E2001A',
                      fontWeight: '550'
                    }}
                  >
                    Sıkça Sorulan Sorular
                  </a>
                </DistributeHubLinkOrATag>
              ) : us ? (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline',
                      color: '#E2001A',
                      fontWeight: '550'
                    }}
                  >
                    <br />
                    FAQ section
                  </a>
                </DistributeHubLinkOrATag>
              ) : (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline',
                      color: '#E2001A',
                      fontWeight: '550'
                    }}
                  >
                    FAQ pour
                  </a>
                </DistributeHubLinkOrATag>
              )
            }}
          />
        )
      }
    };
    const lastText = {
      title: <FormattedMessage id="preciseNutrition.Address.title" />,
      fline: <FormattedMessage id="preciseNutrition.Address.firstLine" />,
      sline: <FormattedMessage id="preciseNutrition.Address.secondLine" />,
      tline: <FormattedMessage id="preciseNutrition.Address.thirdLine" />
    };
    const { history, match, location } = this.props;

    const event = {
      page: {
        type: 'Homepage',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };

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
          />
          {this.state.loading ? <Loading bgColor={'#fff'} opacity={1} /> : null}
          <main className={'rc-content--fixed-header'}>
            <Banner
              {...this.props}
              productShowInfo={this.state.productShowInfo}
              recommData={this.state.recommData}
            />
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '8px' }}
            ></div>
            <ProductSpecialities />
            <DetailsDisplay productShowInfo={this.state.productShowInfo} />

            <div style={{ height: '5vh', backgroundColor: '#eee' }}></div>
            <div style={{ backgroundColor: '#eee' }}>
              <div
                className="rc-max-width--lg rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block"
                style={{ marginTop: '0' }}
              >
                <div
                  className="rc-bg-colour--brand3"
                  // id="benefits-box"
                  style={{ padding: '1px 0' }}
                >
                  <div className="rc-full-width">
                    <div>
                      <div className="experience-component experience-assets-importContentAsset">
                        <div className="rc-max-width--xl rc-padding-x--lg rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="content-asset">
                            <div
                              className="rc-column row rc-max-width--lg rc-match-heights rc-padding-y--sm flexwrapJoin"
                              style={{
                                margin: '0',
                                padding: '0',
                                display: 'flex',
                                flexWrap: 'wrap'
                              }}
                            >
                              <div className="col-12 col-md-5 rc-padding--none order-1 md:order-0  orderJoin1">
                                <div className="rc-column rc-padding--none">
                                  <h4
                                    className="rc-beta font-weight-bold text-lg-left text-center"
                                    style={{
                                      textTransform: 'uppercase',
                                      fontSize: isMobile ? '18px' : null
                                    }}
                                  >
                                    <FormattedMessage
                                      id="preciseNutrition.Below.title"
                                      values={{
                                        val: this.state.recommData
                                          ?.customerPetsVo?.name
                                      }}
                                    />
                                  </h4>
                                  <div className="text-lg-left text-center rc-padding-right--sm--desktop">
                                    <FormattedMessage
                                      id="preciseNutrition.Below.content"
                                      values={{
                                        val: this.state.recommData
                                          ?.customerPetsVo?.name
                                      }}
                                    />
                                  </div>
                                  <div className="text-lg-left text-center mb-3">
                                    <FormattedMessage id="preciseNutrition.Below.list" />
                                  </div>
                                  <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                    <li className="rc-list__item pl-0 flex">
                                      <div>
                                        <em className="bingo rc-margin-right--xs mr-3"></em>
                                      </div>
                                      <div className="font-weight-normal">
                                        <FormattedMessage id="preciseNutrition.Below.list1" />
                                      </div>
                                    </li>
                                    <li className="rc-list__item pl-0 flex">
                                      <div>
                                        <em className="bingo rc-margin-right--xs mr-3"></em>
                                      </div>
                                      <div className="font-weight-normal">
                                        <FormattedMessage id="preciseNutrition.Below.list2" />
                                      </div>
                                    </li>
                                    <li className="rc-list__item pl-0 flex">
                                      <div>
                                        <em className="bingo rc-margin-right--xs mr-3"></em>
                                      </div>
                                      <div className="font-weight-normal">
                                        <FormattedMessage id="preciseNutrition.Below.list3" />
                                      </div>
                                    </li>
                                    <li className="rc-list__item pl-0 flex">
                                      <div>
                                        <em className="bingo rc-margin-right--xs mr-3"></em>
                                      </div>
                                      <div className="font-weight-normal">
                                        <FormattedMessage id="preciseNutrition.Below.list4" />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-12 col-md-7 rc-padding-right--none rc-padding-x--none order-1 md:order-0 orderJoin1">
                                <div
                                  className="rc-column rc-padding--none text-right"
                                  style={{
                                    display: 'flex',
                                    justifyContent: isMobile
                                      ? 'center'
                                      : 'flex-end',
                                    width: '100%'
                                  }}
                                >
                                  <LazyLoad>
                                    <img
                                      className="w-100 lazyloaded"
                                      src={GroupOne}
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
                </div>
              </div>
            </div>
            <div style={{ height: '5vh', backgroundColor: '#eee' }}></div>

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-layouts-cardcarousel">
                    <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                      <div className="rc-max-width--lg rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                        <div className="rc-padding-x--lg rc-padding-x--sm--mobile">
                          <div>
                            <h4
                              className="rc-beta font-weight-bold text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile text-uppercase"
                              style={{ fontSize: isMobile ? '18px' : null }}
                            >
                              <FormattedMessage id="preciseNutrition.commitment.title" />
                            </h4>
                          </div>
                          <div className="d-flex justify-content-center bottom-content__icon-list text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                            <div className="rc-card--product mx-3">
                              <LazyLoad>
                                <img
                                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-1.png`}
                                />
                              </LazyLoad>
                            </div>
                            <div className="rc-card--product mx-3">
                              <LazyLoad>
                                <img
                                  // className="w-100"
                                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-2.png`}
                                />
                              </LazyLoad>
                            </div>
                            <div className="rc-card--product mx-3">
                              <LazyLoad>
                                <img
                                  // className="w-100"
                                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-3.png`}
                                />
                              </LazyLoad>
                            </div>
                            <div className="rc-card--product mx-3 pt-2">
                              <LazyLoad>
                                <img
                                  // className="w-100"
                                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-4.png`}
                                />
                              </LazyLoad>
                            </div>
                          </div>
                          <p>
                            <span>
                              <FormattedMessage id="preciseNutrition.commitment.content1" />
                            </span>
                          </p>
                          <p>
                            <FormattedMessage id="preciseNutrition.commitment.content2" />
                          </p>
                          <p>
                            <FormattedMessage id="preciseNutrition.commitment.content3" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '8px' }}
            ></div>

            <HelpComponentsNew
              firstText={firstText}
              list={list}
              lastText={lastText}
            />

            <Footer />
          </main>
        </div>
      </>
    );
  }
}

export default PreciseRecommendation;
