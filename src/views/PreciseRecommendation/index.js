import React from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { Helmet } from 'react-helmet';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';
import './index.css';
import LazyLoad from 'react-lazyload';
import { setSeoConfig } from '@/utils/utils';
import DetailsDisplay from './DetailsDisplay';
import ProductSpecialities from './ProductSpecialities';
import Banner from './components/Banner';
import productList from './productList.json';
import { getDeviceType } from '../../utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

console.info('productList', productList);
const pageLink = window.location.href;

class PreciseRecommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productShowInfo: productList['IND10007'],
      recommData: {
        // goodsInfo:{},
        // pet:{}
      },
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      }
    };
  }
  async getProductInfo() {
    let res = {
      pet: {
        petsName: 'tiger',
        petsSex: 'male',
        sterilised: 'true',
        petsBreed: 'donskoy',
        dateOfBirth: '2017-06-03'
      },
      goodsInfo: {
        goodsInfoId: 'ff8080817ac19c38017aec3dec6d0012',
        goodsId: 'ff8080817ac19c38017aec3dec410011',
        goodsInfoName: 'individualization',
        goodsInfoNo: 'IND10001',
        innerGoodsInfoNo: 'FR_IND10001',
        goodsInfoImg: null,
        goodsInfoBarcode: null,
        stock: 999999999,
        marketPrice: 0.0161,
        supplyPrice: null,
        retailPrice: null,
        grouponPrice: null,
        costPrice: null,
        createTime: '2021-07-28 16:31:59.000',
        updateTime: '2021-08-02 17:48:09.000',
        addedTime: '2021-07-28 16:31:59.000',
        delFlag: 0,
        addedFlag: 1,
        companyInfoId: 1053,
        storeId: 123457909,
        storeName: null,
        customFlag: 0,
        levelDiscountFlag: 0,
        auditStatus: 1,
        companyType: 0,
        aloneFlag: false,
        salePrice: null,
        priceType: null,
        mockSpecIds: null,
        mockSpecDetailIds: null,
        specDetailRelIds: null,
        buyCount: 1,
        count: null,
        maxCount: null,
        intervalPriceIds: null,
        specText: null,
        intervalMinPrice: null,
        intervalMaxPrice: null,
        validFlag: null,
        cateId: 1134,
        brandId: 400,
        storeCateIds: null,
        distributionCommission: null,
        commissionRate: null,
        distributionSalesCount: null,
        distributionGoodsAudit: 0,
        distributionGoodsAuditReason: null,
        checked: false,
        goodsStatus: 0,
        goodsUnit: null,
        marketingLabels: [],
        grouponLabel: null,
        couponLabels: [],
        goodsCubage: null,
        goodsWeight: null,
        freightTempId: null,
        saleType: 0,
        allowPriceSet: null,
        smallProgramCode: null,
        joinDistributior: null,
        goodsEvaluateNum: null,
        goodsCollectNum: null,
        goodsSalesNum: null,
        goodsFavorableCommentNum: null,
        enterPrisePrice: null,
        enterPriseAuditState: null,
        enterPriseGoodsAuditReason: null,
        subscriptionStatus: 1,
        subscriptionPrice: 0.0161,
        linePrice: 0.0,
        basePrice: null,
        subscriptionBasePrice: null,
        basePriceType: '',
        goodsInfoWeight: 0e-10,
        goodsInfoUnit: 'kg',
        goods: {
          goodsId: 'ff8080817ac19c38017aec3dec410011',
          cateId: 1134,
          brandId: 400,
          brandName: null,
          goodsName: 'individualization',
          goodsSubtitle: null,
          goodsNewSubtitle: null,
          goodsDescription: null,
          goodsDescriptionDetails: null,
          goodsNo: 'IND1',
          innerGoodsNo: 'FR_IND1',
          goodsUnit: '',
          goodsCateName: null,
          goodsImg: null,
          goodsWeight: 1.0,
          marketPrice: null,
          supplyPrice: null,
          goodsType: 0,
          costPrice: null,
          createTime: '2021-07-28 16:31:59.000',
          updateTime: '2021-08-02 17:48:09.000',
          addedTime: '2021-07-28 16:31:59.000',
          goodsSource: 1,
          delFlag: 0,
          addedFlag: 1,
          moreSpecFlag: 1,
          priceType: 2,
          customFlag: 0,
          levelDiscountFlag: 0,
          companyInfoId: 1053,
          supplierName: 'Royal Canin_France',
          storeId: 123457909,
          cateName: null,
          submitTime: '2021-07-28 16:31:59.000',
          auditStatus: 1,
          auditReason: null,
          goodsDetail: '',
          goodsMobileDetail: null,
          stock: null,
          goodsInfoIds: null,
          storeCateIds: null,
          storeCateNames: null,
          companyType: 0,
          goodsCubage: 1.0,
          freightTempId: 62,
          freightTempName: null,
          saleType: 0,
          goodsVideo: '',
          linePrice: null,
          allowPriceSet: 0,
          goodsEvaluateNum: 0,
          goodsCollectNum: 0,
          goodsSalesNum: 0,
          goodsFavorableCommentNum: 0,
          grouponForbiddenFlag: false,
          subscriptionStatus: 1,
          minMarketPrice: 0.0155,
          minSubscriptionPrice: 0.0155,
          avgEvaluate: null,
          avgEvaluateScore: null,
          baseSpec: null,
          saleableFlag: 1,
          displayFlag: 1,
          weShareId: null,
          weightValue: 'None',
          goodsStoreCateNames: null,
          productCategoryNames: null,
          defaultPurchaseType: null,
          defaultFrequencyId: null,
          resource: 1,
          promotions: 'individual',
          goodsPillar: null,
          exclusiveFlag: null,
          wsEnergyCategory: null,
          wsReferenceEnergyValue: null,
          wsTechnologyCode: null,
          wsDensity: null,
          sourceCreateTime: null,
          sourceUpdateTime: null
        },
        goodsPromotion: null,
        description: null,
        auditCatFlag: null,
        prescriberFlag: null,
        goodsMeasureNum: null,
        goodsMeasureUnit: '',
        subscriptionDiscountPrice: null,
        goodsInfoFlag: 3,
        periodTypeId: 3560,
        purchasePrice: null,
        goodsInfoType: null,
        goodsInfoBundleRels: [],
        recommendationId: null,
        recommendationName: null,
        recommendationSerialCode: null,
        weShareScode: null,
        packSize: '',
        subscriptionPercentage: null,
        maxStock: null,
        subscriptionPlanId: null,
        packageId: null,
        subscriptionPlanPromotionFlag: null,
        settingPrice: null,
        virtualInventory: null,
        virtualAlert: null,
        marketingCode: null,
        marketingName: null,
        promotionDiscountPrice: null,
        externalSku: null,
        promotions: 'individual',
        isOfflineStore: null,
        petsId: null,
        petsType: null,
        questionParams: null,
        referenceData: null,
        depth: 0.0,
        depthUnit: 'mm',
        width: 0.0,
        widthUnit: 'mm',
        height: 0.0,
        heightUnit: 'mm'
      },
      mainItem: '2524',
      weight: '223',
      weightUnit: 'g',
      totalPackWeight: '',
      dailyPrice: '',
      totalprice: ''
    };
    let productId = res.goodsInfo.goodsInfoNo;
    let productShowInfo = productList[productId];
    let recommData = res;
    this.setState({
      productShowInfo,
      recommData
    });
  }

  componentDidMount() {
    setSeoConfig({ pageName: 'preciseRecommendation' }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.getProductInfo();
  }

  componentWillUnmount() {
    // localItemRoyal.set('isRefresh', true);
  }

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
      <div>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <GoogleTagManager
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          match={match}
          location={location}
          history={history}
          sendGAHeaderSearch={this.sendGAHeaderSearch}
        />
        <main className={'rc-content--fixed-header'}>
          <Banner
            history={this.props.history}
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
                            <div className="col-12 col-md-5 rc-padding--none order-1 order-md-0  orderJoin1">
                              <div className="rc-column rc-padding--none">
                                <h4 className="rc-beta font-weight-bold text-lg-left text-center">
                                  <FormattedMessage id="preciseNutrition.Below.title" />
                                </h4>
                                <div className="text-lg-left text-center rc-padding-right--sm--desktop">
                                  <FormattedMessage id="preciseNutrition.Below.content" />
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
                            <div className="col-12 col-md-7 rc-padding-right--none rc-padding-x--none order-1 order-md-0 orderJoin1">
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
                                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Group%206-1.png`}
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
                          <h4 className="rc-beta font-weight-bold text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
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
    );
  }
}

export default PreciseRecommendation;
