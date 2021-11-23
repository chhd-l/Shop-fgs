import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import BannerTip from '@/components/BannerTip';
import ImageMagnifier from '@/components/ImageMagnifierForUS';
import { formatMoney, getDeviceType } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import Loading from '@/components/Loading';
import giftsImg from './images/gifts@2x.png'
import discountImg from './images/discount@2x.svg'
import petadviserimg from './images/petadviser@2x.png'
import shippingImg from './images/shipping@2x.png'
import supportImg from './images/support@2x.png'

import './index.less';
import { inject, observer } from 'mobx-react';
import {
  getRecommendationList,
  getRecommendationList_prescriberId,
  getRecommendationList_token
} from '@/api/recommendation';
import { getPrescriberByPrescriberIdAndStoreId } from '@/api/clinic';
import { getProductPetConfig } from '@/api/payment';
import { sitePurchase } from '@/api/cart';
import Modal from '../Recommendation_FR/components/Modal';
import {
  setSeoConfig,
  distributeLinktoPrecriberOrPaymentPage,
  getFrequencyDict
} from '@/utils/utils';
import { Helmet } from 'react-helmet';
import {
  GARecommendationProduct,
  GABreederRecoPromoCodeCTA,
  GABreederRecoSeeInCart,
  GABigBreederAddToCar
} from '@/utils/GA';
import ImageMagnifier_fr from '../Details/components/ImageMagnifier';

const imgUrlPreFix = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const isUs = window.__.env.REACT_APP_COUNTRY === 'us';
const isRu = window.__.env.REACT_APP_COUNTRY === 'ru';
const isFr = window.__.env.REACT_APP_COUNTRY === 'fr';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

let advantageArr = [
  { img: shippingImg, text: 'Livraison offerte et automatique' },
  { img: discountImg, text: '10% de réduction pour toute commande1' },
  { img: petadviserimg, text: 'Un conseiller à votre écoute' },
  { img: giftsImg, text: 'Un kit de bienvenue et des cadeaux exclusifs' },
  { img: supportImg, text: 'Un accompagnement pédagogique individualisé' },
  { img: '', text: '' }
];
let advantageList = [];
advantageArr.forEach((el, i) => {
  if (i % 2 == 0) {
    advantageList[i / 2] = [];
    advantageList[i / 2].push(el);
  } else {
    advantageList[Math.floor(i / 2)].push(el);
  }
});
console.info('advantageList', advantageList);
@inject('checkoutStore', 'loginStore', 'configStore', 'clinicStore')
@injectIntl
@observer
class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showCoiedTips: false,
      noData: false,
      showCur: -1,
      isSPT: false,
      frequencyList: [],
      isNoMoreProduct: '', //页面error的时候的翻译id
      promotionCode: '',
      promotionCodeText: '',
      prescriptionJson: '',
      // secondlist: secondlistArr,
      showMore: false,
      petType: 1, //0 dog;1 cat
      details: {
        id: '',
        goodsName: '',
        goodsImg: '',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsCategory: '',
        goodsSpecDetails: [],
        goodsSpecs: []
      },
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      productList: [],
      currentDetail: {},
      images: [],
      activeIndex: 0,
      pageLoading: isRu, // 俄罗斯的时候需要直接跳转购物车，需要pageLoading这种全遮罩
      loading: false,
      buttonLoading: false,
      errorMsg: '',
      modalShow: false,
      modalList: [
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_cart,
          type: 'addToCart'
        },
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_pay,
          type: 'payNow'
        }
      ],
      currentModalObj: {
        title: this.props.intl.messages.isContinue,
        content: this.props.intl.messages.outOfStockContent_cart,
        type: 'addToCart'
      },
      outOfStockProducts: [],
      inStockProducts: [],
      needLogin: false,
      isMobile: false,
      currentBenefit: '',
      checkPromotionCodeAndCopy: false, // 控制点击查看promotion code并复制按钮
      viewShoppingCartWidth: 0
    };
    this.helpContentText = {
      title: this.props.intl.messages['recommendation.helpContentText.title'],
      des: this.props.intl.messages['recommendation.helpContentText.des'],
      emailTitle: this.props.intl.messages[
        'recommendation.helpContentText.emailTitle'
      ],
      emailDes: this.props.intl.messages[
        'recommendation.helpContentText.emailDes'
      ],
      emailLink: this.props.intl.messages[
        'recommendation.helpContentText.emailLink'
      ], //俄罗斯是其他的链接
      phoneTitle: this.props.intl.messages[
        'recommendation.helpContentText.phoneTitle'
      ],
      phone: this.props.intl.messages['recommendation.helpContentText.phone'],
      email: this.props.intl.messages['recommendation.helpContentText.email'],
      phoneDes1: `<strong>${this.props.intl.messages['recommendation.helpContentText.phoneDes1']}</strong>`,
      phoneDes2: this.props.intl.messages[
        'recommendation.helpContentText.phoneDes2'
      ]
    };
  }

  handleSelect(id) {
    if (id === this.state.showCur) {
      this.setState({
        showCur: -1
      });
    } else {
      this.setState({
        showCur: id
      });
    }
  }
  async componentDidMount() {
    // document.onclick = () => {
    //   this.setState({ showCoiedTips: false });
    // };
    console.time('begin');
    let frequencyList = [];
    getFrequencyDict().then((res) => {
      frequencyList = res;
      this.setState({
        frequencyList: res
      });
    });
    // let paramArr = this.props.location.search.split('&');
    // let token = paramArr[paramArr.length - 1].split('=')[1];
    let { search } = this.props.history.location;
    search = search && decodeURIComponent(search);
    let token = funcUrl({ name: 'token' });
    let promotionCode = funcUrl({ name: 'coupon' });
    let promotionCodeText = promotionCode?.toUpperCase() || '';
    let prescription = funcUrl({ name: 'prescription' });
    setSeoConfig({
      pageName: 'SPT reco landing page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.setState({
      isMobile: getDeviceType() === 'H5',
      promotionCodeText,
      loading: true
    });
    let params = token;
    let requestName = getRecommendationList_token;
    if ((isFr || isRu || isUs) && !token) {
      requestName = getRecommendationList_prescriberId;
      params = prescription;
    }
    console.timeEnd('begin');
    console.time('接口请求');
    let res = {
      code: 'K-000000',
      message: 'Opération réussie',
      errorData: null,
      context: {
        id: null,
        recommendationId: '60bf2fe0d04401001eb7d681',
        consumerFirstName: null,
        consumerLastName: null,
        emailConsent: null,
        consumerEmail: null,
        consumerPhoneNumber: null,
        prescriberId: '00uc6de49c5uiy7wW416',
        prescriberName: null,
        doctorId: null,
        customerId: null,
        taskId: null,
        externalSellerOktaId: '00uc6de49c5uiy7wW416',
        petName: 'Anubis',
        petBirthDate: null,
        petSpecie: '',
        recommendationSuggestions: null,
        linkStatus: null,
        recommendationGoodsInfoRels: [
          {
            id: null,
            recommendationId: null,
            goods: {
              goodsId: '2c918085768f3a4101768f3e1e9a0029',
              cateId: 1134,
              brandId: 400,
              brandName: null,
              goodsName: 'Ageing 12+ en gelée',
              goodsSubtitle:
                'Aliment complet pour chats seniors de plus de 12 ans (émincé en gelée).',
              goodsNewSubtitle: 'Chats seniors de plus de 12 ans',
              goodsDescription: '',
              goodsDescriptionDetails: null,
              goodsNo: '4153',
              innerGoodsNo: 'FR_4153',
              goodsUnit: null,
              goodsCateName: 'Cat/Feline Health Nutrition Wet/Wet',
              goodsImg:
                'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg',
              goodsWeight: 1.0,
              marketPrice: null,
              supplyPrice: null,
              goodsType: 0,
              costPrice: null,
              createTime: '2021-09-30 06:43:26.000',
              updateTime: '2021-09-30 06:43:26.000',
              addedTime: '2021-09-30 06:43:26.000',
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
              storeName: null,
              cateName: null,
              submitTime: '2021-09-30 06:43:26.000',
              auditStatus: 1,
              auditReason: null,
              goodsDetail:
                '[WsContentsDTO(type=Text, title=Text, content=[{"Prescriber Description":"ROYAL CANIN® Ageing 12+ en Gelée est spécialement conçu pour répondre aux besoins de votre chat âgé de 12 ans ou plus. ROYAL CANIN® Ageing 12+ en Gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations. - Santé articulaire - Instinctivement préféré - Santé rénale"}, {"EretailShort Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, vous devrez lui donner une alimentation qu’il mangera volontiers et instinctivement. \\nC’est pourquoi ROYAL CANIN® Ageing 12+ en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement.\\n \\nROYAL CANIN® Ageing 12+ en gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment).\\n \\nDe plus, ROYAL CANIN® Ageing 12+ en gelée contient également une teneur en phosphore adaptée pour entretenir la santé des reins et du système rénal dans son ensemble.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en sauce ou en croquettes savoureuses et croquantes.\\nSi vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal.\\n"}, {"EretailLong Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, vous devrez lui donner une alimentation qu’il mangera volontiers et instinctivement. C’est pourquoi ROYAL CANIN® Ageing 12+ en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement. ROYAL CANIN® Ageing 12+ en gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment). De plus, ROYAL CANIN® Ageing 12+ en gelée contient également une teneur en phosphore adaptée pour entretenir la santé des reins et du système rénal dans son ensemble. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en sauce ou en croquettes savoureuses et croquantes.Si vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal."}]), WsContentsDTO(type=Text, title=Compositions, content=[{"COMPOSITION":"Composition : viandes et sous-produits animaux, extraits de protéines végétales, céréales, huiles et graisses, sous-produits d’origine végétale, substances minérales, sucres, mollusques et crustacés."}, {"ADDITIFS (AU KG)":"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 350 UI, E1 (Fer) : 3 mg, E2 (Iode) : 0,31 mg, E4 (Cuivre) : 2,4 mg, E5 (Manganèse) : 1 mg, E6 (Zinc) : 10 mg."}, {"CONSTITUANTS ANALYTIQUES":"Constituants analytiques : Protéine : 9,5 % - Teneur en matières grasses : 4,5 % - Cendres brutes : 1,2 % - Cellulose brute : 0,9 % - Humidité : 81 % - EPA/DHA : 0,15 % - Phosphore : 0,12 %. "}, {"RATIONNEMENT":"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.   "}]), WsContentsDTO(type=Image, title=Benefits, content=[{"Santé articulaire EPA/DHA":{"Description":"Aide à maintenir la santé des articulations grâce à un niveau élevé d’acides gras EPA/DHA."}}, {"Instinctivement préféré":{"Description":"Formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats."}}, {"Santé rénale":{"Description":"Teneur adaptée en phosphore."}}]), WsContentsDTO(type=Image, title=Feeding Guidelines, content=[{"Table":{"Description":"<table><thead><tr><th>Poids du chat</th><th>Alimentation humide</th><th>Alimentation mixte</th></tr></thead><tbody><tr><td>3 kg</td><td>2 sachets</td><td>1 sachet + 22 g </td></tr><tr><td>4 kg</td><td>2+1/2 sachets</td><td>1 sachet + 31g </td></tr><tr><td>5 kg</td><td>3 sachets</td><td>1 sachet + 40 g </td></tr><tr><td>6 kg</td><td>3+1/2 sachets</td><td>1 sachet + 49 g </td></tr></tbody></table>"}}])]',
              goodsMobileDetail: null,
              stock: null,
              goodsInfoIds: null,
              storeCateIds: null,
              storeCateNames: null,
              companyType: null,
              goodsCubage: 1.0,
              freightTempId: 62,
              freightTempName: 'Default template',
              saleType: 0,
              goodsVideo: null,
              linePrice: null,
              allowPriceSet: null,
              goodsEvaluateNum: 0,
              goodsCollectNum: 0,
              goodsSalesNum: 238,
              goodsFavorableCommentNum: 0,
              grouponForbiddenFlag: false,
              subscriptionStatus: 1,
              minMarketPrice: 14.99,
              minSubscriptionPrice: 13.49,
              avgEvaluate: null,
              avgEvaluateScore: null,
              baseSpec: null,
              saleableFlag: 1,
              displayFlag: 0,
              weShareId: 129171,
              weightValue: '1020',
              goodsStoreCateNames: null,
              productCategoryNames: null,
              defaultPurchaseType: null,
              defaultFrequencyId: null,
              resource: 1,
              promotions: 'autoship',
              goodsPillar: null,
              exclusiveFlag: null,
              wsEnergyCategory: 'normal_outdoor_fcn_breed',
              wsReferenceEnergyValue: 935.0,
              wsTechnologyCode: 'wet',
              wsDensity: 1.0,
              sourceCreateTime: null,
              sourceUpdateTime: '2021-09-27 16:57:35.000',
              serviceTypeId: null,
              assignResources: null
            },
            goodsInfo: {
              goodsInfoId: '2c91808576903fd8017690461ec3020e',
              goodsId: '2c918085768f3a4101768f3e1e9a0029',
              goodsInfoName: 'Ageing 12+ en gelée',
              goodsInfoNo: '41530102',
              innerGoodsInfoNo: 'FR_41530102',
              goodsInfoImg: null,
              goodsInfoBarcode: '9003579311813',
              stock: 30,
              marketPrice: 14.99,
              supplyPrice: null,
              retailPrice: null,
              grouponPrice: null,
              costPrice: null,
              createTime: '2021-09-30 06:43:26.000',
              updateTime: '2021-11-14 20:28:50.000',
              addedTime: '2021-04-23 07:03:04.000',
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
              salePrice: 14.99,
              priceType: 2,
              mockSpecIds: [20757],
              mockSpecDetailIds: [30097],
              specDetailRelIds: null,
              buyCount: 0,
              count: null,
              maxCount: null,
              intervalPriceIds: null,
              specText: '12X85G',
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
              subscriptionPrice: 13.49,
              linePrice: 14.99,
              basePrice: 0.01,
              subscriptionBasePrice: 0.01,
              basePriceType: '',
              goodsInfoWeight: 1020.0,
              goodsInfoUnit: 'G',
              goods: null,
              goodsPromotion: null,
              description: null,
              auditCatFlag: null,
              prescriberFlag: null,
              goodsMeasureNum: 1.0,
              goodsMeasureUnit: 'UNIT',
              subscriptionDiscountPrice: null,
              goodsInfoFlag: null,
              periodTypeId: null,
              purchasePrice: null,
              goodsInfoType: null,
              goodsInfoBundleRels: [],
              recommendationId: null,
              recommendationName: null,
              recommendationSerialCode: null,
              weShareScode: '5011631',
              packSize: '12X85G',
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
              marketingId: null,
              externalSku: '41530102',
              promotions: 'autoship',
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
              heightUnit: 'mm',
              specification: null,
              isNotShowCart: null,
              externalStock: 30,
              externalMarketPrice: 14.99,
              externalSubscriptionPrice: 13.49,
              externalLinePrice: 14.99,
              externalPurchasePrice: null,
              factor: 1,
              stockUomId: 'f09127132fd011ec99b42c71b536ef0c',
              priceUomId: 'f09127132fd011ec99b42c71b536ef0c',
              priceUom: null,
              stockUom: null
            },
            goodsSpecDetails: [
              {
                specDetailId: 30097,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                specId: 20757,
                detailName: '12X85G',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0,
                mockSpecId: null,
                mockSpecDetailId: null,
                calculateSort: 1285,
                editable: true
              }
            ],
            goodsInfos: [
              {
                goodsInfoId: '2c91808576903fd8017690461ec3020e',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsInfoName: 'Ageing 12+ en gelée',
                goodsInfoNo: '41530102',
                innerGoodsInfoNo: 'FR_41530102',
                goodsInfoImg: null,
                goodsInfoBarcode: '9003579311813',
                stock: 30,
                marketPrice: 14.99,
                supplyPrice: null,
                retailPrice: null,
                grouponPrice: null,
                costPrice: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-11-14 20:28:50.000',
                addedTime: '2021-04-23 07:03:04.000',
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
                salePrice: 14.99,
                priceType: null,
                mockSpecIds: [20757],
                mockSpecDetailIds: [30097],
                specDetailRelIds: null,
                buyCount: 0,
                count: null,
                maxCount: null,
                intervalPriceIds: null,
                specText: '12X85G',
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
                subscriptionPrice: 13.49,
                linePrice: 14.99,
                basePrice: 0.01,
                subscriptionBasePrice: 0.01,
                basePriceType: '',
                goodsInfoWeight: 1020.0,
                goodsInfoUnit: 'G',
                goods: {
                  goodsId: '2c918085768f3a4101768f3e1e9a0029',
                  cateId: 1134,
                  brandId: 400,
                  brandName: null,
                  goodsName: 'Ageing 12+ en gelée',
                  goodsSubtitle:
                    'Aliment complet pour chats seniors de plus de 12 ans (émincé en gelée).',
                  goodsNewSubtitle: 'Chats seniors de plus de 12 ans',
                  goodsDescription: '',
                  goodsDescriptionDetails: null,
                  goodsNo: '4153',
                  innerGoodsNo: 'FR_4153',
                  goodsUnit: null,
                  goodsCateName: 'Cat/Feline Health Nutrition Wet/Wet',
                  goodsImg:
                    'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg',
                  goodsWeight: 1.0,
                  marketPrice: null,
                  supplyPrice: null,
                  goodsType: 0,
                  costPrice: null,
                  createTime: '2021-09-30 06:43:26.000',
                  updateTime: '2021-09-30 06:43:26.000',
                  addedTime: '2021-09-30 06:43:26.000',
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
                  storeName: null,
                  cateName: null,
                  submitTime: '2021-09-30 06:43:26.000',
                  auditStatus: 1,
                  auditReason: null,
                  goodsDetail:
                    '[WsContentsDTO(type=Text, title=Text, content=[{"Prescriber Description":"ROYAL CANIN® Ageing 12+ en Gelée est spécialement conçu pour répondre aux besoins de votre chat âgé de 12 ans ou plus. ROYAL CANIN® Ageing 12+ en Gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations. - Santé articulaire - Instinctivement préféré - Santé rénale"}, {"EretailShort Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, vous devrez lui donner une alimentation qu’il mangera volontiers et instinctivement. \\nC’est pourquoi ROYAL CANIN® Ageing 12+ en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement.\\n \\nROYAL CANIN® Ageing 12+ en gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment).\\n \\nDe plus, ROYAL CANIN® Ageing 12+ en gelée contient également une teneur en phosphore adaptée pour entretenir la santé des reins et du système rénal dans son ensemble.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en sauce ou en croquettes savoureuses et croquantes.\\nSi vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal.\\n"}, {"EretailLong Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, vous devrez lui donner une alimentation qu’il mangera volontiers et instinctivement. C’est pourquoi ROYAL CANIN® Ageing 12+ en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement. ROYAL CANIN® Ageing 12+ en gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment). De plus, ROYAL CANIN® Ageing 12+ en gelée contient également une teneur en phosphore adaptée pour entretenir la santé des reins et du système rénal dans son ensemble. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en sauce ou en croquettes savoureuses et croquantes.Si vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal."}]), WsContentsDTO(type=Text, title=Compositions, content=[{"COMPOSITION":"Composition : viandes et sous-produits animaux, extraits de protéines végétales, céréales, huiles et graisses, sous-produits d’origine végétale, substances minérales, sucres, mollusques et crustacés."}, {"ADDITIFS (AU KG)":"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 350 UI, E1 (Fer) : 3 mg, E2 (Iode) : 0,31 mg, E4 (Cuivre) : 2,4 mg, E5 (Manganèse) : 1 mg, E6 (Zinc) : 10 mg."}, {"CONSTITUANTS ANALYTIQUES":"Constituants analytiques : Protéine : 9,5 % - Teneur en matières grasses : 4,5 % - Cendres brutes : 1,2 % - Cellulose brute : 0,9 % - Humidité : 81 % - EPA/DHA : 0,15 % - Phosphore : 0,12 %. "}, {"RATIONNEMENT":"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.   "}]), WsContentsDTO(type=Image, title=Benefits, content=[{"Santé articulaire EPA/DHA":{"Description":"Aide à maintenir la santé des articulations grâce à un niveau élevé d’acides gras EPA/DHA."}}, {"Instinctivement préféré":{"Description":"Formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats."}}, {"Santé rénale":{"Description":"Teneur adaptée en phosphore."}}]), WsContentsDTO(type=Image, title=Feeding Guidelines, content=[{"Table":{"Description":"<table><thead><tr><th>Poids du chat</th><th>Alimentation humide</th><th>Alimentation mixte</th></tr></thead><tbody><tr><td>3 kg</td><td>2 sachets</td><td>1 sachet + 22 g </td></tr><tr><td>4 kg</td><td>2+1/2 sachets</td><td>1 sachet + 31g </td></tr><tr><td>5 kg</td><td>3 sachets</td><td>1 sachet + 40 g </td></tr><tr><td>6 kg</td><td>3+1/2 sachets</td><td>1 sachet + 49 g </td></tr></tbody></table>"}}])]',
                  goodsMobileDetail: null,
                  stock: null,
                  goodsInfoIds: null,
                  storeCateIds: null,
                  storeCateNames: null,
                  companyType: null,
                  goodsCubage: 1.0,
                  freightTempId: 62,
                  freightTempName: null,
                  saleType: 0,
                  goodsVideo: null,
                  linePrice: null,
                  allowPriceSet: null,
                  goodsEvaluateNum: 0,
                  goodsCollectNum: 0,
                  goodsSalesNum: 238,
                  goodsFavorableCommentNum: 0,
                  grouponForbiddenFlag: false,
                  subscriptionStatus: 1,
                  minMarketPrice: 14.99,
                  minSubscriptionPrice: 13.49,
                  avgEvaluate: null,
                  avgEvaluateScore: null,
                  baseSpec: null,
                  saleableFlag: 1,
                  displayFlag: 0,
                  weShareId: 129171,
                  weightValue: '1020',
                  goodsStoreCateNames: null,
                  productCategoryNames: null,
                  defaultPurchaseType: null,
                  defaultFrequencyId: null,
                  resource: 1,
                  promotions: 'autoship',
                  goodsPillar: null,
                  exclusiveFlag: null,
                  wsEnergyCategory: 'normal_outdoor_fcn_breed',
                  wsReferenceEnergyValue: 935.0,
                  wsTechnologyCode: 'wet',
                  wsDensity: 1.0,
                  sourceCreateTime: null,
                  sourceUpdateTime: '2021-09-27 16:57:35.000',
                  serviceTypeId: null,
                  assignResources: null
                },
                goodsPromotion: null,
                description: null,
                auditCatFlag: null,
                prescriberFlag: null,
                goodsMeasureNum: 1.0,
                goodsMeasureUnit: 'UNIT',
                subscriptionDiscountPrice: null,
                goodsInfoFlag: null,
                periodTypeId: null,
                purchasePrice: null,
                goodsInfoType: null,
                goodsInfoBundleRels: [],
                recommendationId: null,
                recommendationName: null,
                recommendationSerialCode: null,
                weShareScode: '5011631',
                packSize: '12X85G',
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
                marketingId: null,
                externalSku: '41530102',
                promotions: 'autoship',
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
                heightUnit: 'mm',
                specification: null,
                isNotShowCart: null,
                externalStock: 30,
                externalMarketPrice: 14.99,
                externalSubscriptionPrice: 13.49,
                externalLinePrice: 14.99,
                externalPurchasePrice: null,
                factor: 1,
                stockUomId: 'f09127132fd011ec99b42c71b536ef0c',
                priceUomId: 'f09127132fd011ec99b42c71b536ef0c',
                priceUom: null,
                stockUom: null
              }
            ],
            images: [
              {
                imageId: 302162,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                imageType: 'master',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0
              },
              {
                imageId: 302163,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                imageType: 'other',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_328049.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0
              },
              {
                imageId: 302164,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                imageType: 'hero',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_hero_508324.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0
              },
              {
                imageId: 302165,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                imageType: 'bag',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_bag_498159.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0
              },
              {
                imageId: 302166,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                imageType: 'other',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_508353.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0
              },
              {
                imageId: 302167,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                imageType: 'kibble',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_kibble_328050.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0
              },
              {
                imageId: 302168,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                imageType: 'other',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_633479.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0
              }
            ],
            taggingList: null,
            goodsAttributesValueRelVOAllList: [
              {
                id: 'GAR202109300643258350',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20210805061921392',
                goodsAttributeValueId: 'AV87290813743648768',
                goodsAttributeName: 'Species',
                goodsAttributeNameEn: 'Species',
                goodsAttributeValue: 'Cat',
                goodsAttributeValueEn: 'Cat',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202109300643258351',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20210802131015380',
                goodsAttributeValueId: 'AV86307058661224448',
                goodsAttributeName: 'Portfolio Classification',
                goodsAttributeNameEn: 'Portfolio Classification',
                goodsAttributeValue:
                  'ROYAL CANIN / SPT Retail / Feline Health Nutrition Wet',
                goodsAttributeValueEn:
                  'ROYAL CANIN / SPT Retail / Feline Health Nutrition Wet',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202109300643258352',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20210129065742589',
                goodsAttributeValueId: 'AV202101290657426030',
                goodsAttributeName: 'Pillar',
                goodsAttributeNameEn: 'Pillar',
                goodsAttributeValue: 'SPT Retail',
                goodsAttributeValueEn: 'SPT retail',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202109300643258353',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20201209075253707',
                goodsAttributeValueId: 'AV202012160309154906',
                goodsAttributeName: 'Sterilized',
                goodsAttributeNameEn: 'STÉRILISÉ',
                goodsAttributeValue: 'false',
                goodsAttributeValueEn: 'NON',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202109300643258354',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20201209071503738',
                goodsAttributeValueId: 'AV202012160309230726',
                goodsAttributeName: 'Range',
                goodsAttributeNameEn: 'Gramme',
                goodsAttributeValue: 'Feline Health Nutrition Wet_Cat',
                goodsAttributeValueEn: 'Bouchées en sauce',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202109300643258355',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20201209071341624',
                goodsAttributeValueId: 'AV202012160309231106',
                goodsAttributeName: 'Breeds',
                goodsAttributeNameEn: 'RACE',
                goodsAttributeValue: 'Cat_Cat',
                goodsAttributeValueEn: 'Tous les chats',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202109300643258356',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20201209071322816',
                goodsAttributeValueId: 'AV202012160309158056',
                goodsAttributeName: 'Technology',
                goodsAttributeNameEn: 'TEXTURE',
                goodsAttributeValue: 'Wet',
                goodsAttributeValueEn: 'Aliment humide',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202109300643258357',
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                goodsAttributeId: 'A20201209071242331',
                goodsAttributeValueId: 'AV202012160309253586',
                goodsAttributeName: 'Lifestages',
                goodsAttributeNameEn: 'ÂGE',
                goodsAttributeValue: 'Senior_Cat',
                goodsAttributeValueEn: 'Senior (+12 ans)',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              }
            ],
            recommendationNumber: 1,
            createTime: null,
            updateTime: null,
            delFlag: null,
            productMessage: null,
            goodsDescriptionDetailList: [
              {
                id: 'GDD107590592036552704',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                descriptionId: 'D20210225030745215',
                descriptionName: 'Text',
                contentType: 'json',
                editable: true,
                content:
                  '[{"Prescriber Description":"ROYAL CANIN® Ageing 12+ en Gelée est spécialement conçu pour répondre aux besoins de votre chat âgé de 12 ans ou plus. ROYAL CANIN® Ageing 12+ en Gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations. - Santé articulaire - Instinctivement préféré - Santé rénale"}, {"EretailShort Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, vous devrez lui donner une alimentation qu’il mangera volontiers et instinctivement. \\nC’est pourquoi ROYAL CANIN® Ageing 12+ en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement.\\n \\nROYAL CANIN® Ageing 12+ en gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment).\\n \\nDe plus, ROYAL CANIN® Ageing 12+ en gelée contient également une teneur en phosphore adaptée pour entretenir la santé des reins et du système rénal dans son ensemble.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en sauce ou en croquettes savoureuses et croquantes.\\nSi vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal.\\n"}, {"EretailLong Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, vous devrez lui donner une alimentation qu’il mangera volontiers et instinctivement. C’est pourquoi ROYAL CANIN® Ageing 12+ en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement. ROYAL CANIN® Ageing 12+ en gelée fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment). De plus, ROYAL CANIN® Ageing 12+ en gelée contient également une teneur en phosphore adaptée pour entretenir la santé des reins et du système rénal dans son ensemble. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en sauce ou en croquettes savoureuses et croquantes.Si vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal."}]',
                sort: 0,
                status: true,
                storeId: 123457909,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202103150515288850',
                    languageId: '5655',
                    name: 'Text',
                    translateName: 'Description',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:29.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202103150515289001',
                    languageId: '5656',
                    name: 'Text',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:29.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              },
              {
                id: 'GDD107590592036552705',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                descriptionId: 'D20210224090433046',
                descriptionName: 'Benefits',
                contentType: 'json',
                editable: true,
                content:
                  '[{"Santé articulaire EPA/DHA":{"Description":"Aide à maintenir la santé des articulations grâce à un niveau élevé d’acides gras EPA/DHA."}}, {"Instinctivement préféré":{"Description":"Formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats."}}, {"Santé rénale":{"Description":"Teneur adaptée en phosphore."}}]',
                sort: 1,
                status: true,
                storeId: 123457909,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202103150515553980',
                    languageId: '5655',
                    name: 'Benefits',
                    translateName: 'Bénéfices',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:55.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202103150515554071',
                    languageId: '5656',
                    name: 'Benefits',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:55.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              },
              {
                id: 'GDD107590592036552706',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                descriptionId: 'D20210224090754235',
                descriptionName: 'Compositions',
                contentType: 'json',
                editable: true,
                content:
                  '[{"COMPOSITION":"Composition : viandes et sous-produits animaux, extraits de protéines végétales, céréales, huiles et graisses, sous-produits d’origine végétale, substances minérales, sucres, mollusques et crustacés."}, {"ADDITIFS (AU KG)":"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 350 UI, E1 (Fer) : 3 mg, E2 (Iode) : 0,31 mg, E4 (Cuivre) : 2,4 mg, E5 (Manganèse) : 1 mg, E6 (Zinc) : 10 mg."}, {"CONSTITUANTS ANALYTIQUES":"Constituants analytiques : Protéine : 9,5 % - Teneur en matières grasses : 4,5 % - Cendres brutes : 1,2 % - Cellulose brute : 0,9 % - Humidité : 81 % - EPA/DHA : 0,15 % - Phosphore : 0,12 %. "}, {"RATIONNEMENT":"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.   "}]',
                sort: 2,
                status: true,
                storeId: 123457909,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202103150515421910',
                    languageId: '5655',
                    name: 'Compositions',
                    translateName: 'informations nutritionelles',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:42.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202103150515422001',
                    languageId: '5656',
                    name: 'Compositions',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:42.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              },
              {
                id: 'GDD107590592036552707',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                descriptionId: 'D20210224090406862',
                descriptionName: 'Guide',
                contentType: 'json',
                editable: true,
                content:
                  '[{"Table":{"Description":"<table><thead><tr><th>Poids du chat</th><th>Alimentation humide</th><th>Alimentation mixte</th></tr></thead><tbody><tr><td>3 kg</td><td>2 sachets</td><td>1 sachet + 22 g </td></tr><tr><td>4 kg</td><td>2+1/2 sachets</td><td>1 sachet + 31g </td></tr><tr><td>5 kg</td><td>3 sachets</td><td>1 sachet + 40 g </td></tr><tr><td>6 kg</td><td>3+1/2 sachets</td><td>1 sachet + 49 g </td></tr></tbody></table>"}}]',
                sort: 3,
                status: true,
                storeId: 123457909,
                createTime: '2021-09-30 06:43:26.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202104230752271620',
                    languageId: '5655',
                    name: 'Guide',
                    translateName: 'rations',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-04-23 07:52:27.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202104230752271711',
                    languageId: '5656',
                    name: 'Guide',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-04-23 07:52:27.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              }
            ],
            goodsSpecs: [
              {
                specId: 20757,
                goodsId: '2c918085768f3a4101768f3e1e9a0029',
                specName: 'Taille',
                createTime: '2021-09-30 06:43:26.000',
                updateTime: '2021-09-30 06:43:26.000',
                delFlag: 0,
                mockSpecId: 20757,
                specDetailIds: null,
                editable: true
              }
            ]
          },
          {
            id: null,
            recommendationId: null,
            goods: {
              goodsId: '2c918085768f3a4101768f3e1b2e0028',
              cateId: 1134,
              brandId: 400,
              brandName: null,
              goodsName: 'Ageing 12+ en sauce',
              goodsSubtitle:
                'Aliment complet pour chats seniors de plus de 12 ans (émincé en sauce).',
              goodsNewSubtitle: 'Chats seniors de plus de 12 ans',
              goodsDescription: '',
              goodsDescriptionDetails: null,
              goodsNo: '4082',
              innerGoodsNo: 'FR_4082',
              goodsUnit: null,
              goodsCateName: 'Cat/Feline Health Nutrition Wet/Wet',
              goodsImg:
                'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_master.jpg',
              goodsWeight: 1.0,
              marketPrice: null,
              supplyPrice: null,
              goodsType: 0,
              costPrice: null,
              createTime: '2021-10-01 15:23:16.000',
              updateTime: '2021-11-19 01:33:33.000',
              addedTime: '2021-10-01 15:23:16.000',
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
              storeName: null,
              cateName: null,
              submitTime: '2021-10-01 15:23:16.000',
              auditStatus: 1,
              auditReason: null,
              goodsDetail:
                '[WsContentsDTO(type=Text, title=Text, content=[{"Prescriber Description":"ROYAL CANIN® Ageing 12+ en Sauce est spécialement conçu pour répondre aux besoins de votre chat âgé de 12 ans ou plus. ROYAL CANIN® Ageing 12+ en Sauce fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations. - Santé articulaire - Instinctivement préféré - Santé rénale"}, {"EretailShort Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, il faut que vous lui donniez l’alimentation qu’il préfère naturellement d’instinct.\\n \\nC’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement.\\n \\nLes chats âgés auront souvent besoin de niveaux plus élevés d’apport nutritionnel pour le maintien général d’une bonne santé articulaire. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est spécialement formulé pour entretenir la santé articulaire grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment).\\n \\nPour entretenir la santé des reins et du système rénal dans son ensemble, ROYAL CANIN® Ageing 12+ en Sauce contient de plus une teneur soigneusement dosée en phosphore.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en gelée ou en croquettes savoureuses et croquantes.\\nSi vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal.\\n"}, {"EretailLong Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, il faut que vous lui donniez l’alimentation qu’il préfère naturellement d’instinct. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement. Les chats âgés auront souvent besoin de niveaux plus élevés d’apport nutritionnel pour le maintien général d’une bonne santé articulaire. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est spécialement formulé pour entretenir la santé articulaire grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment). Pour entretenir la santé des reins et du système rénal dans son ensemble, ROYAL CANIN® Ageing 12+ en Sauce contient de plus une teneur soigneusement dosée en phosphore. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en gelée ou en croquettes savoureuses et croquantes.Si vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal."}]), WsContentsDTO(type=Text, title=Compositions, content=[{"COMPOSITION":"Composition : viandes et sous-produits animaux, céréales, extraits de protéines végétales, huiles et graisses, sous-produits d’origine végétale, substances minérales, sucres, mollusques et crustacés."}, {"ADDITIFS (AU KG)":"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 300 UI, E1 (Fer) : 4 mg, E2 (Iode) : 0,34 mg, E4 (Cuivre) : 2,7 mg, E5 (Manganèse) : 1,3 mg, E6 (Zinc) : 13 mg."}, {"CONSTITUANTS ANALYTIQUES":"Constituants analytiques : Protéine : 9,5 % - Teneur en matières grasses : 4 % - Cendres brutes : 1,2 % - Cellulose brute : 1,1 % - Humidité : 80 % - EPA/DHA : 0,15 % - Phosphore : 0,13 %."}, {"RATIONNEMENT":"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.  "}]), WsContentsDTO(type=Image, title=Benefits, content=[{"Santé articulaire EPA/DHA":{"Description":"Aide à maintenir la santé des articulations grâce à un niveau élevé d’acides gras EPA/DHA."}}, {"Instinctivement préféré":{"Description":"Formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats."}}, {"Santé rénale":{"Description":"Teneur adaptée en phosphore."}}]), WsContentsDTO(type=Image, title=Feeding Guidelines, content=[{"Table":{"Description":"<table><thead><tr><th>Poids du chat</th><th>Alimentation humide</th><th>Alimentation mixte</th></tr></thead><tbody><tr><td>3 kg</td><td>2 sachets</td><td>1 sachet + 22 g </td></tr><tr><td>4 kg</td><td> 2+1/2 sachets</td><td>1 sachet + 31 g </td></tr><tr><td>5 kg</td><td>3 sachets</td><td>1 sachet + 40 g </td></tr><tr><td>6 kg</td><td>3+1/2 sachets</td><td>1 sachet + 48 g </td></tr></tbody></table>"}}])]',
              goodsMobileDetail: null,
              stock: null,
              goodsInfoIds: null,
              storeCateIds: null,
              storeCateNames: null,
              companyType: null,
              goodsCubage: 1.0,
              freightTempId: 62,
              freightTempName: 'Default template',
              saleType: 0,
              goodsVideo: null,
              linePrice: null,
              allowPriceSet: null,
              goodsEvaluateNum: 12,
              goodsCollectNum: 0,
              goodsSalesNum: 918,
              goodsFavorableCommentNum: 12,
              grouponForbiddenFlag: false,
              subscriptionStatus: 1,
              minMarketPrice: 14.99,
              minSubscriptionPrice: 13.49,
              avgEvaluate: null,
              avgEvaluateScore: null,
              baseSpec: null,
              saleableFlag: 1,
              displayFlag: 0,
              weShareId: 129161,
              weightValue: '1020',
              goodsStoreCateNames: null,
              productCategoryNames: null,
              defaultPurchaseType: null,
              defaultFrequencyId: null,
              resource: 1,
              promotions: 'autoship',
              goodsPillar: null,
              exclusiveFlag: null,
              wsEnergyCategory: 'normal_outdoor_fcn_breed',
              wsReferenceEnergyValue: 953.0,
              wsTechnologyCode: 'wet',
              wsDensity: 1.0,
              sourceCreateTime: null,
              sourceUpdateTime: '2021-09-14 06:51:50.000',
              serviceTypeId: null,
              assignResources: null
            },
            goodsInfo: {
              goodsInfoId: '2c91808576903fd8017690461e5a020d',
              goodsId: '2c918085768f3a4101768f3e1b2e0028',
              goodsInfoName: 'Ageing 12+ en sauce',
              goodsInfoNo: '40820102',
              innerGoodsInfoNo: 'FR_40820102',
              goodsInfoImg: null,
              goodsInfoBarcode: '9003579310175',
              stock: 26,
              marketPrice: 14.99,
              supplyPrice: null,
              retailPrice: null,
              grouponPrice: null,
              costPrice: null,
              createTime: '2021-10-01 15:23:16.000',
              updateTime: '2021-11-13 16:01:38.000',
              addedTime: '2021-04-23 07:03:03.000',
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
              salePrice: 14.99,
              priceType: 2,
              mockSpecIds: [20756],
              mockSpecDetailIds: [30096],
              specDetailRelIds: null,
              buyCount: 0,
              count: null,
              maxCount: null,
              intervalPriceIds: null,
              specText: '12X85G',
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
              subscriptionPrice: 13.49,
              linePrice: 14.99,
              basePrice: 0.01,
              subscriptionBasePrice: 0.01,
              basePriceType: '',
              goodsInfoWeight: 1020.0,
              goodsInfoUnit: 'G',
              goods: null,
              goodsPromotion: null,
              description: null,
              auditCatFlag: null,
              prescriberFlag: null,
              goodsMeasureNum: 1.0,
              goodsMeasureUnit: 'UNIT',
              subscriptionDiscountPrice: null,
              goodsInfoFlag: null,
              periodTypeId: null,
              purchasePrice: null,
              goodsInfoType: null,
              goodsInfoBundleRels: [],
              recommendationId: null,
              recommendationName: null,
              recommendationSerialCode: null,
              weShareScode: '5011478',
              packSize: '12X85G',
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
              marketingId: null,
              externalSku: '40820102',
              promotions: 'autoship',
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
              heightUnit: 'mm',
              specification: null,
              isNotShowCart: null,
              externalStock: 26,
              externalMarketPrice: 14.99,
              externalSubscriptionPrice: 13.49,
              externalLinePrice: 14.99,
              externalPurchasePrice: null,
              factor: 1,
              stockUomId: 'f09127132fd011ec99b42c71b536ef0c',
              priceUomId: 'f09127132fd011ec99b42c71b536ef0c',
              priceUom: null,
              stockUom: null
            },
            goodsSpecDetails: [
              {
                specDetailId: 30096,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                specId: 20756,
                detailName: '12X85G',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0,
                mockSpecId: null,
                mockSpecDetailId: null,
                calculateSort: 1285,
                editable: true
              }
            ],
            goodsInfos: [
              {
                goodsInfoId: '2c91808576903fd8017690461e5a020d',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsInfoName: 'Ageing 12+ en sauce',
                goodsInfoNo: '40820102',
                innerGoodsInfoNo: 'FR_40820102',
                goodsInfoImg: null,
                goodsInfoBarcode: '9003579310175',
                stock: 26,
                marketPrice: 14.99,
                supplyPrice: null,
                retailPrice: null,
                grouponPrice: null,
                costPrice: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-11-13 16:01:38.000',
                addedTime: '2021-04-23 07:03:03.000',
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
                salePrice: 14.99,
                priceType: null,
                mockSpecIds: [20756],
                mockSpecDetailIds: [30096],
                specDetailRelIds: null,
                buyCount: 0,
                count: null,
                maxCount: null,
                intervalPriceIds: null,
                specText: '12X85G',
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
                subscriptionPrice: 13.49,
                linePrice: 14.99,
                basePrice: 0.01,
                subscriptionBasePrice: 0.01,
                basePriceType: '',
                goodsInfoWeight: 1020.0,
                goodsInfoUnit: 'G',
                goods: {
                  goodsId: '2c918085768f3a4101768f3e1b2e0028',
                  cateId: 1134,
                  brandId: 400,
                  brandName: null,
                  goodsName: 'Ageing 12+ en sauce',
                  goodsSubtitle:
                    'Aliment complet pour chats seniors de plus de 12 ans (émincé en sauce).',
                  goodsNewSubtitle: 'Chats seniors de plus de 12 ans',
                  goodsDescription: '',
                  goodsDescriptionDetails: null,
                  goodsNo: '4082',
                  innerGoodsNo: 'FR_4082',
                  goodsUnit: null,
                  goodsCateName: 'Cat/Feline Health Nutrition Wet/Wet',
                  goodsImg:
                    'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_master.jpg',
                  goodsWeight: 1.0,
                  marketPrice: null,
                  supplyPrice: null,
                  goodsType: 0,
                  costPrice: null,
                  createTime: '2021-10-01 15:23:16.000',
                  updateTime: '2021-11-19 01:33:33.000',
                  addedTime: '2021-10-01 15:23:16.000',
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
                  storeName: null,
                  cateName: null,
                  submitTime: '2021-10-01 15:23:16.000',
                  auditStatus: 1,
                  auditReason: null,
                  goodsDetail:
                    '[WsContentsDTO(type=Text, title=Text, content=[{"Prescriber Description":"ROYAL CANIN® Ageing 12+ en Sauce est spécialement conçu pour répondre aux besoins de votre chat âgé de 12 ans ou plus. ROYAL CANIN® Ageing 12+ en Sauce fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations. - Santé articulaire - Instinctivement préféré - Santé rénale"}, {"EretailShort Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, il faut que vous lui donniez l’alimentation qu’il préfère naturellement d’instinct.\\n \\nC’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement.\\n \\nLes chats âgés auront souvent besoin de niveaux plus élevés d’apport nutritionnel pour le maintien général d’une bonne santé articulaire. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est spécialement formulé pour entretenir la santé articulaire grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment).\\n \\nPour entretenir la santé des reins et du système rénal dans son ensemble, ROYAL CANIN® Ageing 12+ en Sauce contient de plus une teneur soigneusement dosée en phosphore.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en gelée ou en croquettes savoureuses et croquantes.\\nSi vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal.\\n"}, {"EretailLong Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, il faut que vous lui donniez l’alimentation qu’il préfère naturellement d’instinct. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement. Les chats âgés auront souvent besoin de niveaux plus élevés d’apport nutritionnel pour le maintien général d’une bonne santé articulaire. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est spécialement formulé pour entretenir la santé articulaire grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment). Pour entretenir la santé des reins et du système rénal dans son ensemble, ROYAL CANIN® Ageing 12+ en Sauce contient de plus une teneur soigneusement dosée en phosphore. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en gelée ou en croquettes savoureuses et croquantes.Si vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal."}]), WsContentsDTO(type=Text, title=Compositions, content=[{"COMPOSITION":"Composition : viandes et sous-produits animaux, céréales, extraits de protéines végétales, huiles et graisses, sous-produits d’origine végétale, substances minérales, sucres, mollusques et crustacés."}, {"ADDITIFS (AU KG)":"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 300 UI, E1 (Fer) : 4 mg, E2 (Iode) : 0,34 mg, E4 (Cuivre) : 2,7 mg, E5 (Manganèse) : 1,3 mg, E6 (Zinc) : 13 mg."}, {"CONSTITUANTS ANALYTIQUES":"Constituants analytiques : Protéine : 9,5 % - Teneur en matières grasses : 4 % - Cendres brutes : 1,2 % - Cellulose brute : 1,1 % - Humidité : 80 % - EPA/DHA : 0,15 % - Phosphore : 0,13 %."}, {"RATIONNEMENT":"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.  "}]), WsContentsDTO(type=Image, title=Benefits, content=[{"Santé articulaire EPA/DHA":{"Description":"Aide à maintenir la santé des articulations grâce à un niveau élevé d’acides gras EPA/DHA."}}, {"Instinctivement préféré":{"Description":"Formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats."}}, {"Santé rénale":{"Description":"Teneur adaptée en phosphore."}}]), WsContentsDTO(type=Image, title=Feeding Guidelines, content=[{"Table":{"Description":"<table><thead><tr><th>Poids du chat</th><th>Alimentation humide</th><th>Alimentation mixte</th></tr></thead><tbody><tr><td>3 kg</td><td>2 sachets</td><td>1 sachet + 22 g </td></tr><tr><td>4 kg</td><td> 2+1/2 sachets</td><td>1 sachet + 31 g </td></tr><tr><td>5 kg</td><td>3 sachets</td><td>1 sachet + 40 g </td></tr><tr><td>6 kg</td><td>3+1/2 sachets</td><td>1 sachet + 48 g </td></tr></tbody></table>"}}])]',
                  goodsMobileDetail: null,
                  stock: null,
                  goodsInfoIds: null,
                  storeCateIds: null,
                  storeCateNames: null,
                  companyType: null,
                  goodsCubage: 1.0,
                  freightTempId: 62,
                  freightTempName: null,
                  saleType: 0,
                  goodsVideo: null,
                  linePrice: null,
                  allowPriceSet: null,
                  goodsEvaluateNum: 12,
                  goodsCollectNum: 0,
                  goodsSalesNum: 918,
                  goodsFavorableCommentNum: 12,
                  grouponForbiddenFlag: false,
                  subscriptionStatus: 1,
                  minMarketPrice: 14.99,
                  minSubscriptionPrice: 13.49,
                  avgEvaluate: null,
                  avgEvaluateScore: null,
                  baseSpec: null,
                  saleableFlag: 1,
                  displayFlag: 0,
                  weShareId: 129161,
                  weightValue: '1020',
                  goodsStoreCateNames: null,
                  productCategoryNames: null,
                  defaultPurchaseType: null,
                  defaultFrequencyId: null,
                  resource: 1,
                  promotions: 'autoship',
                  goodsPillar: null,
                  exclusiveFlag: null,
                  wsEnergyCategory: 'normal_outdoor_fcn_breed',
                  wsReferenceEnergyValue: 953.0,
                  wsTechnologyCode: 'wet',
                  wsDensity: 1.0,
                  sourceCreateTime: null,
                  sourceUpdateTime: '2021-09-14 06:51:50.000',
                  serviceTypeId: null,
                  assignResources: null
                },
                goodsPromotion: null,
                description: null,
                auditCatFlag: null,
                prescriberFlag: null,
                goodsMeasureNum: 1.0,
                goodsMeasureUnit: 'UNIT',
                subscriptionDiscountPrice: null,
                goodsInfoFlag: null,
                periodTypeId: null,
                purchasePrice: null,
                goodsInfoType: null,
                goodsInfoBundleRels: [],
                recommendationId: null,
                recommendationName: null,
                recommendationSerialCode: null,
                weShareScode: '5011478',
                packSize: '12X85G',
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
                marketingId: null,
                externalSku: '40820102',
                promotions: 'autoship',
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
                heightUnit: 'mm',
                specification: null,
                isNotShowCart: null,
                externalStock: 26,
                externalMarketPrice: 14.99,
                externalSubscriptionPrice: 13.49,
                externalLinePrice: 14.99,
                externalPurchasePrice: null,
                factor: 1,
                stockUomId: 'f09127132fd011ec99b42c71b536ef0c',
                priceUomId: 'f09127132fd011ec99b42c71b536ef0c',
                priceUom: null,
                stockUom: null
              }
            ],
            images: [
              {
                imageId: 304359,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                imageType: 'master',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_master.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0
              },
              {
                imageId: 304360,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                imageType: 'other',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_other_328044.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0
              },
              {
                imageId: 304361,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                imageType: 'other',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_other_633476.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0
              },
              {
                imageId: 304362,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                imageType: 'hero',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_hero_508309.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0
              },
              {
                imageId: 304363,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                imageType: 'bag',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_bag_498164.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0
              },
              {
                imageId: 304364,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                imageType: 'kibble',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_kibble_328045.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0
              },
              {
                imageId: 304365,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                imageType: 'other',
                goodsInfoId: null,
                artworkUrl:
                  'https://d2cstgstorage.z13.web.core.windows.net/FR_129161_other_508315.jpg',
                middleUrl: null,
                thumbUrl: null,
                bigUrl: null,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0
              }
            ],
            taggingList: null,
            goodsAttributesValueRelVOAllList: [
              {
                id: 'GAR202110011523163900',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20210805061921392',
                goodsAttributeValueId: 'AV87290813743648768',
                goodsAttributeName: 'Species',
                goodsAttributeNameEn: 'Species',
                goodsAttributeValue: 'Cat',
                goodsAttributeValueEn: 'Cat',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202110011523163901',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20210802131015380',
                goodsAttributeValueId: 'AV86307058661224448',
                goodsAttributeName: 'Portfolio Classification',
                goodsAttributeNameEn: 'Portfolio Classification',
                goodsAttributeValue:
                  'ROYAL CANIN / SPT Retail / Feline Health Nutrition Wet',
                goodsAttributeValueEn:
                  'ROYAL CANIN / SPT Retail / Feline Health Nutrition Wet',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202110011523163902',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20210129065742589',
                goodsAttributeValueId: 'AV202101290657426030',
                goodsAttributeName: 'Pillar',
                goodsAttributeNameEn: 'Pillar',
                goodsAttributeValue: 'SPT Retail',
                goodsAttributeValueEn: 'SPT retail',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202110011523163903',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20201209075253707',
                goodsAttributeValueId: 'AV202012160309154906',
                goodsAttributeName: 'Sterilized',
                goodsAttributeNameEn: 'STÉRILISÉ',
                goodsAttributeValue: 'false',
                goodsAttributeValueEn: 'NON',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202110011523163904',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20201209071503738',
                goodsAttributeValueId: 'AV202012160309230726',
                goodsAttributeName: 'Range',
                goodsAttributeNameEn: 'Gramme',
                goodsAttributeValue: 'Feline Health Nutrition Wet_Cat',
                goodsAttributeValueEn: 'Bouchées en sauce',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202110011523163905',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20201209071341624',
                goodsAttributeValueId: 'AV202012160309231106',
                goodsAttributeName: 'Breeds',
                goodsAttributeNameEn: 'RACE',
                goodsAttributeValue: 'Cat_Cat',
                goodsAttributeValueEn: 'Tous les chats',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202110011523163906',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20201209071322816',
                goodsAttributeValueId: 'AV202012160309158056',
                goodsAttributeName: 'Technology',
                goodsAttributeNameEn: 'TEXTURE',
                goodsAttributeValue: 'Wet',
                goodsAttributeValueEn: 'Aliment humide',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              },
              {
                id: 'GAR202110011523163907',
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                goodsAttributeId: 'A20201209071242331',
                goodsAttributeValueId: 'AV202012160309253586',
                goodsAttributeName: 'Lifestages',
                goodsAttributeNameEn: 'ÂGE',
                goodsAttributeValue: 'Senior_Cat',
                goodsAttributeValueEn: 'Senior (+12 ans)',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                dataSource: 0
              }
            ],
            recommendationNumber: 1,
            createTime: null,
            updateTime: null,
            delFlag: null,
            productMessage: null,
            goodsDescriptionDetailList: [
              {
                id: 'GDD108083802475282432',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                descriptionId: 'D20210225030745215',
                descriptionName: 'Text',
                contentType: 'json',
                editable: true,
                content:
                  '[{"Prescriber Description":"ROYAL CANIN® Ageing 12+ en Sauce est spécialement conçu pour répondre aux besoins de votre chat âgé de 12 ans ou plus. ROYAL CANIN® Ageing 12+ en Sauce fournit également aux chats âgés des aliments spécialement formulés pour entretenir la santé de leurs articulations. - Santé articulaire - Instinctivement préféré - Santé rénale"}, {"EretailShort Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, il faut que vous lui donniez l’alimentation qu’il préfère naturellement d’instinct.\\n \\nC’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement.\\n \\nLes chats âgés auront souvent besoin de niveaux plus élevés d’apport nutritionnel pour le maintien général d’une bonne santé articulaire. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est spécialement formulé pour entretenir la santé articulaire grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment).\\n \\nPour entretenir la santé des reins et du système rénal dans son ensemble, ROYAL CANIN® Ageing 12+ en Sauce contient de plus une teneur soigneusement dosée en phosphore.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en gelée ou en croquettes savoureuses et croquantes.\\nSi vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal.\\n"}, {"EretailLong Description":"Pour vous assurer que votre chat âgé de 12 ans ou plus reçoit la nutrition spécifique dont il a besoin pour conserver une santé optimale, il faut que vous lui donniez l’alimentation qu’il préfère naturellement d’instinct. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est conçu pour correspondre au profil macro-nutritionnel optimal que les chats vieillissants comme le vôtre préfèrent instinctivement. Les chats âgés auront souvent besoin de niveaux plus élevés d’apport nutritionnel pour le maintien général d’une bonne santé articulaire. C’est pourquoi ROYAL CANIN® Ageing 12+ en sauce est spécialement formulé pour entretenir la santé articulaire grâce à une teneur élevée en acides gras oméga-3 (EPA et DHA notamment). Pour entretenir la santé des reins et du système rénal dans son ensemble, ROYAL CANIN® Ageing 12+ en Sauce contient de plus une teneur soigneusement dosée en phosphore. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Ageing 12+ est également disponible en émincé en gelée ou en croquettes savoureuses et croquantes.Si vous envisagez une alimentation mixte, il vous suffit de suivre nos instructions pour vous assurer que votre chat reçoive la quantité de nourriture sèche et humide nécessaire pour un bénéfice optimal."}]',
                sort: 0,
                status: true,
                storeId: 123457909,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202103150515288850',
                    languageId: '5655',
                    name: 'Text',
                    translateName: 'Description',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:29.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202103150515289001',
                    languageId: '5656',
                    name: 'Text',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:29.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              },
              {
                id: 'GDD108083802475282433',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                descriptionId: 'D20210224090433046',
                descriptionName: 'Benefits',
                contentType: 'json',
                editable: true,
                content:
                  '[{"Santé articulaire EPA/DHA":{"Description":"Aide à maintenir la santé des articulations grâce à un niveau élevé d’acides gras EPA/DHA."}}, {"Instinctivement préféré":{"Description":"Formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats."}}, {"Santé rénale":{"Description":"Teneur adaptée en phosphore."}}]',
                sort: 1,
                status: true,
                storeId: 123457909,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202103150515553980',
                    languageId: '5655',
                    name: 'Benefits',
                    translateName: 'Bénéfices',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:55.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202103150515554071',
                    languageId: '5656',
                    name: 'Benefits',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:55.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              },
              {
                id: 'GDD108083802475282434',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                descriptionId: 'D20210224090754235',
                descriptionName: 'Compositions',
                contentType: 'json',
                editable: true,
                content:
                  '[{"COMPOSITION":"Composition : viandes et sous-produits animaux, céréales, extraits de protéines végétales, huiles et graisses, sous-produits d’origine végétale, substances minérales, sucres, mollusques et crustacés."}, {"ADDITIFS (AU KG)":"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 300 UI, E1 (Fer) : 4 mg, E2 (Iode) : 0,34 mg, E4 (Cuivre) : 2,7 mg, E5 (Manganèse) : 1,3 mg, E6 (Zinc) : 13 mg."}, {"CONSTITUANTS ANALYTIQUES":"Constituants analytiques : Protéine : 9,5 % - Teneur en matières grasses : 4 % - Cendres brutes : 1,2 % - Cellulose brute : 1,1 % - Humidité : 80 % - EPA/DHA : 0,15 % - Phosphore : 0,13 %."}, {"RATIONNEMENT":"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.  "}]',
                sort: 2,
                status: true,
                storeId: 123457909,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202103150515421910',
                    languageId: '5655',
                    name: 'Compositions',
                    translateName: 'informations nutritionelles',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:42.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202103150515422001',
                    languageId: '5656',
                    name: 'Compositions',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-03-15 05:15:42.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              },
              {
                id: 'GDD108083802475282435',
                goodsCateId: 1134,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                descriptionId: 'D20210224090406862',
                descriptionName: 'Guide',
                contentType: 'json',
                editable: true,
                content:
                  '[{"Table":{"Description":"<table><thead><tr><th>Poids du chat</th><th>Alimentation humide</th><th>Alimentation mixte</th></tr></thead><tbody><tr><td>3 kg</td><td>2 sachets</td><td>1 sachet + 22 g </td></tr><tr><td>4 kg</td><td> 2+1/2 sachets</td><td>1 sachet + 31 g </td></tr><tr><td>5 kg</td><td>3 sachets</td><td>1 sachet + 40 g </td></tr><tr><td>6 kg</td><td>3+1/2 sachets</td><td>1 sachet + 48 g </td></tr></tbody></table>"}}]',
                sort: 3,
                status: true,
                storeId: 123457909,
                createTime: '2021-10-01 15:23:16.000',
                updateTime: null,
                delTime: null,
                delFlag: false,
                translateList: [
                  {
                    id: 'T202104230752271620',
                    languageId: '5655',
                    name: 'Guide',
                    translateName: 'rations',
                    sort: 0,
                    storeId: 123457909,
                    createTime: '2021-04-23 07:52:27.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  },
                  {
                    id: 'T202104230752271711',
                    languageId: '5656',
                    name: 'Guide',
                    translateName: '',
                    sort: 1,
                    storeId: 123457909,
                    createTime: '2021-04-23 07:52:27.000',
                    updateTime: null,
                    delTime: null,
                    delFlag: false
                  }
                ]
              }
            ],
            goodsSpecs: [
              {
                specId: 20756,
                goodsId: '2c918085768f3a4101768f3e1b2e0028',
                specName: 'Taille',
                createTime: '2021-10-01 15:23:16.000',
                updateTime: '2021-10-01 15:23:16.000',
                delFlag: 0,
                mockSpecId: 20756,
                specDetailIds: null,
                editable: true
              }
            ]
          }
        ],
        createTime: null,
        updateTime: null,
        delTime: null,
        delFlag: null,
        storeId: null,
        promotionCode: null,
        structureType: 'spt',
        prescriptionJson:
          '{"prescriber":{"country":"FR","structureType":"spt","oktaId":"00uc6de49c5uiy7wW416","__v":0,"structureId":"00uc6de49c5uiy7wW416","company":{},"_id":"609187954a7946001f83e6e2"},"nutritionalReco":"Merci de nous avoir rendu visite.\\n\\nAfin de répondre aux besoins uniques de votre animal je vous recommande un aliment Royal Canin pour lui fournir une nutrition équilibrée, la plus adaptée à son mode de vie et qui pourra l’aider à maintenir sa bonne santé.\\n\\nCliquez sur le bouton ci-dessous pour découvrir l’aliment Royal Canin le plus adapté pour votre animal et le commander en ligne. ","dateReco":"2021-06-08T08:52:47.281Z","__v":0,"statuses":[{"date":"2021-06-08T08:52:48.276Z","value":"send"}],"_id":"60bf2fe0d04401001eb7d681","pet":{"genderCode":"","birthdate":"","speciesCode":"","name":"Anubis","breedCode":"","id":""},"products":[{"productId":"129171"},{"productId":"129161"}]}'
      },
      defaultLocalDateTime: '2021-11-19 09:18:50.265',
      i18nParams: null,
      internalMessage: null
    };
    console.timeEnd('接口请求');
    console.time('js处理');
    let petType = res.context.petSpecie?.toLowerCase() === 'cat' ? 1 : 0;
    let productLists = res.context.recommendationGoodsInfoRels;
    let prescriberId = res.context.prescriberId;
    let curScrollTop = await sessionItemRoyal.get('recommendation-scroll');
    let prescriptionJson = res.context.prescriptionJson || '';
    const currentShowProduct = [].concat(productLists)?.splice(0, 1);
    if (res.context.structureType != 'breeder' && isFr) {
      // 法国区分stp和breeder
      this.setState({ isSPT: true });
    }
    if (res.context.promotionCode && isRu) {
      // ru需要直接应用promotioncode
      this.setState({
        promotionCodeText: res.context.promotionCode
      });
    }
    setTimeout(() => {
      GARecommendationProduct(
        currentShowProduct,
        1,
        this.state.frequencyList,
        promotionCode,
        this.state.activeIndex
      );
    }, 3000);

    if (curScrollTop) {
      window.scrollTo({
        top: curScrollTop,
        behavior: 'smooth'
      });
      setTimeout(() => {
        sessionItemRoyal.set('recommendation-scroll', 0);
      }, 100);
    }
    prescriberId &&
      isRu &&
      this.getPrescriberByPrescriberIdAndStoreId(prescriberId);
    productLists.map((el) => {
      el?.goodsDescriptionDetailList?.forEach((g) => {
        if (g.content && g.contentType === 'json') {
          try {
            let tempContentMobile = [];
            let tempContent = [];
            switch (g.descriptionName) {
              case 'Benefits':
                const parsedContent = JSON.parse(g.content).map((el) => {
                  // el = JSON.parse(el);
                  return el;
                });
                parsedContent.map((ele, idx) => {
                  // <div className="">${Object.keys(JSON.parse(ele))[0]}</div>
                  tempContent.push(`<li>
                      <div class="">${
                        Object.values(ele)[0]['Description']
                      }</div>
                    </li>`);
                  tempContentMobile.push(`
                      <div class="rc-list__accordion-item
                      ${
                        this.state.showCur === idx ? 'showItem' : 'hiddenItem'
                      }">
                      <dt>
                        <button
                          onClick=this.handleSelect.bind(this, idx)
                          class="rc-list__header"
                          id="heading-${idx}"
                          data-toggle="content-${idx}"
                        >
                          <div>
                          Benefit${idx + 1}
                          </div>
                        </button>
                      </dt>
                      <dd
                        class="rc-list__content"
                        id="content-${idx}"
                        aria-labelledby="heading-${idx}"
                        style="text-align:left"
                      >
                        ${Object.values(ele)[0]['Description']}
                      </dd>
                    </div>
                      `);
                });
                console.info('tempContent', tempContent);
                tempContent = `<ul class=" rc-md-up">
                          ${tempContent.join('')}
                        </ul>`;
                tempContentMobile = `<div class="fr-faq rc-md-down" style="padding:0">
                        <dl
                          data-toggle-group=""
                          data-toggle-effect="rc-expand--vertical"
                          class=""
                        >
                        ${tempContentMobile.join('')}
                        </dl>
                      </div>`;
                el.benefit = tempContent;
                el.benefitMobile = tempContentMobile;
                break;
            }
          } catch (err) {
            console.log(111, err);
          }
        } else {
          switch (g.descriptionName) {
            case 'Benefits':
              let content = g.content.replace(
                'ui-star-list rc_proudct_html_tab2 list-paddingleft-2',
                ''
              );
              el.benefit = `<div class=" rc-md-up"> ${content}</div>`;
              el.benefitMobile = `<div class="fr-faq rc-md-down" style="padding:0">
                  <dl
                    data-toggle-group=""
                    data-toggle-effect="rc-expand--vertical"
                    class=""
                  >
                  ${content}
                  </dl>
                </div>`;
          }
        }
      });
      if (!el.goodsInfo.goodsInfoImg) {
        el.goodsInfo.goodsInfoImg = el.goodsInfo?.goods?.goodsImg;
      }
      if (!el.goodsInfo.goods) {
        el.goodsInfo.goods = {};
      }
      el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
        g = Object.assign({}, g, { selected: false });
        if (g.goodsInfoId === el.goodsInfo.goodsInfoId) {
          g.selected = true;
        }
        return g;
      });
      let specList = el.goodsSpecs;
      let specDetailList = el.goodsSpecDetails;
      if (specList) {
        specList.map((sItem) => {
          sItem.chidren = specDetailList.filter((sdItem, i) => {
            return sdItem.specId === sItem.specId;
          });
          sItem.chidren.map((child) => {
            if (
              el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) > -1
            ) {
              child.selected = true;
            }
            return child;
          });
          return sItem;
        });
      }
      el.goodsInfo.goods.goodsInfos = el.goodsInfos;
      el.goodsInfo.goods.goodsSpecDetails = el.goodsSpecDetails;
      el.goodsInfo.goods.goodsSpecs = specList;
      return el;
    });
    let autoshipDictRes = frequencyList.filter((el) => el.goodsInfoFlag === 1);
    // let promotionCode = res.context.promotionCode || '';
    let filterProducts = productLists.filter((el) => {
      let defaultFrequencyId =
        el?.defaultFrequencyId ||
        this.props.configStore?.info?.storeVO?.defaultSubscriptionFrequencyId ||
        (autoshipDictRes[0] && autoshipDictRes[0].id) ||
        '';
      el.defaultFrequencyId = defaultFrequencyId;
      return el.goodsInfo.addedFlag && el.goods.saleableFlag;
    });
    console.info('filterProductsfilterProducts', filterProducts);
    // 只展示上架商品
    if (!filterProducts.length) {
      this.setState({
        isNoMoreProduct: 'recommendation.noMoreRecommendation'
      });
    }
    this.setState(
      {
        productList: filterProducts,
        petType,
        promotionCode,
        prescriptionJson
      },
      () => {
        this.checkoutStock();
        this.calcIsShowMore()
      }
    );
    let recommendationInfos = {
      recommenderName: res.context?.recommendationName || '',
      recommenderId: res.context?.recommendationId || '',
      recommendationName: res.context?.prescriberName || '',
      recommendationId: res.context?.prescriberId || '',
      referenceObject: res.context?.structureType || '',
      referenceData: res.context?.prescriptionJson || ''
    };
    this.props.clinicStore.setLinkClinicRecommendationInfos(
      recommendationInfos
    );
    // getPrescriptionById({ id: res.context.prescriberId }).then((res2) => {
    if (!isRu || !isFr) {
      this.props.clinicStore.setLinkClinicId(
        res.context?.id || res.context.prescriberId
      );
      this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
      this.props.clinicStore.setLinkClinicCode(
        res.context.recommendationCode || ''
      );
    }
    this.props.clinicStore.setAuditAuthority(false);
    if (isRu) {
      // Ru need redirected to the cart page and the recommended products added to cart automatically via clicking this link.
      this.addCart();
    } else {
      this.setState({ loading: false, pageLoading: false });
    }
    console.timeEnd('js处理');
    // requestName(params)
    //   .then(async (res) => {
    //     console.timeEnd('接口请求');
    //     console.time('js处理');
    //     let petType = res.context.petSpecie?.toLowerCase() === 'cat' ? 1 : 0;
    //     let productLists = res.context.recommendationGoodsInfoRels;
    //     let prescriberId = res.context.prescriberId;
    //     let curScrollTop = await sessionItemRoyal.get('recommendation-scroll');
    //     let prescriptionJson = res.context.prescriptionJson || '';
    //     const currentShowProduct = [].concat(productLists)?.splice(0, 1);
    //     if (res.context.structureType != 'breeder' && isFr) {
    //       // 法国区分stp和breeder
    //       this.setState({ isSPT: true });
    //     }
    //     if (res.context.promotionCode && isRu) {
    //       // ru需要直接应用promotioncode
    //       this.setState({
    //         promotionCodeText: res.context.promotionCode
    //       });
    //     }
    //     setTimeout(() => {
    //       GARecommendationProduct(
    //         currentShowProduct,
    //         1,
    //         this.state.frequencyList,
    //         promotionCode,
    //         this.state.activeIndex
    //       );
    //     }, 3000);

    //     if (curScrollTop) {
    //       window.scrollTo({
    //         top: curScrollTop,
    //         behavior: 'smooth'
    //       });
    //       setTimeout(() => {
    //         sessionItemRoyal.set('recommendation-scroll', 0);
    //       }, 100);
    //     }
    //     prescriberId &&
    //       isRu &&
    //       this.getPrescriberByPrescriberIdAndStoreId(prescriberId);
    //     productLists.map((el) => {
    //       el?.goodsDescriptionDetailList?.forEach((g) => {
    //         if (g.content && g.contentType === 'json') {
    //           try {
    //             let tempContentMobile = [];
    //             let tempContent = [];
    //             switch (g.descriptionName) {
    //               case 'Benefits':
    //                 const parsedContent = JSON.parse(g.content).map((el) => {
    //                   // el = JSON.parse(el);
    //                   return el;
    //                 });
    //                 parsedContent.map((ele, idx) => {
    //                   // <div className="">${Object.keys(JSON.parse(ele))[0]}</div>
    //                   tempContent.push(`<li>
    //                   <div class="">${
    //                     Object.values(ele)[0]['Description']
    //                   }</div>
    //                 </li>`);
    //                   tempContentMobile.push(`
    //                   <div class="rc-list__accordion-item
    //                   ${
    //                     this.state.showCur === idx ? 'showItem' : 'hiddenItem'
    //                   }">
    //                   <dt>
    //                     <button
    //                       onClick=this.handleSelect.bind(this, idx)
    //                       class="rc-list__header"
    //                       id="heading-${idx}"
    //                       data-toggle="content-${idx}"
    //                     >
    //                       <div>
    //                       Benefit${idx + 1}
    //                       </div>
    //                     </button>
    //                   </dt>
    //                   <dd
    //                     class="rc-list__content"
    //                     id="content-${idx}"
    //                     aria-labelledby="heading-${idx}"
    //                     style="text-align:left"
    //                   >
    //                     ${Object.values(ele)[0]['Description']}
    //                   </dd>
    //                 </div>
    //                   `);
    //                 });
    //                 console.info('tempContent', tempContent);
    //                 tempContent = `<ul class=" rc-md-up">
    //                       ${tempContent.join('')}
    //                     </ul>`;
    //                 tempContentMobile = `<div class="fr-faq rc-md-down" style="padding:0">
    //                     <dl
    //                       data-toggle-group=""
    //                       data-toggle-effect="rc-expand--vertical"
    //                       class=""
    //                     >
    //                     ${tempContentMobile.join('')}
    //                     </dl>
    //                   </div>`;
    //                 el.benefit = tempContent;
    //                 el.benefitMobile = tempContentMobile;
    //                 break;
    //             }
    //           } catch (err) {
    //             console.log(111, err);
    //           }
    //         } else {
    //           switch (g.descriptionName) {
    //             case 'Benefits':
    //               let content = g.content.replace(
    //                 'ui-star-list rc_proudct_html_tab2 list-paddingleft-2',
    //                 ''
    //               );
    //               el.benefit = `<div class=" rc-md-up"> ${content}</div>`;
    //               el.benefitMobile = `<div class="fr-faq rc-md-down" style="padding:0">
    //               <dl
    //                 data-toggle-group=""
    //                 data-toggle-effect="rc-expand--vertical"
    //                 class=""
    //               >
    //               ${content}
    //               </dl>
    //             </div>`;
    //           }
    //         }
    //       });
    //       if (!el.goodsInfo.goodsInfoImg) {
    //         el.goodsInfo.goodsInfoImg = el.goodsInfo?.goods?.goodsImg;
    //       }
    //       if (!el.goodsInfo.goods) {
    //         el.goodsInfo.goods = {};
    //       }
    //       el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
    //         g = Object.assign({}, g, { selected: false });
    //         if (g.goodsInfoId === el.goodsInfo.goodsInfoId) {
    //           g.selected = true;
    //         }
    //         return g;
    //       });
    //       let specList = el.goodsSpecs;
    //       let specDetailList = el.goodsSpecDetails;
    //       if (specList) {
    //         specList.map((sItem) => {
    //           sItem.chidren = specDetailList.filter((sdItem, i) => {
    //             return sdItem.specId === sItem.specId;
    //           });
    //           sItem.chidren.map((child) => {
    //             if (
    //               el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) >
    //               -1
    //             ) {
    //               child.selected = true;
    //             }
    //             return child;
    //           });
    //           return sItem;
    //         });
    //       }
    //       el.goodsInfo.goods.goodsInfos = el.goodsInfos;
    //       el.goodsInfo.goods.goodsSpecDetails = el.goodsSpecDetails;
    //       el.goodsInfo.goods.goodsSpecs = specList;
    //       return el;
    //     });
    //     let promotionCode = res.context.promotionCode || '';
    //     let filterProducts = productLists.filter((el) => {
    //       return el.goodsInfo.addedFlag && el.goods.saleableFlag;
    //     });
    //     // 只展示上架商品
    //     if (!filterProducts.length) {
    //       this.setState({
    //         isNoMoreProduct: 'recommendation.noMoreRecommendation'
    //       });
    //     }
    //     this.setState(
    //       {
    //         productList: filterProducts,
    //         petType,
    //         promotionCode,
    //         prescriptionJson
    //       },
    //       () => {
    //         this.checkoutStock();
    //       }
    //     );
    //     let recommendationInfos = {
    //       recommenderName: res.context?.recommendationName || '',
    //       recommenderId: res.context?.recommendationId || '',
    //       recommendationName: res.context?.prescriberName || '',
    //       recommendationId: res.context?.prescriberId || '',
    //       referenceObject: res.context?.structureType || '',
    //       referenceData: res.context?.prescriptionJson || ''
    //     };
    //     this.props.clinicStore.setLinkClinicRecommendationInfos(
    //       recommendationInfos
    //     );
    //     // getPrescriptionById({ id: res.context.prescriberId }).then((res2) => {
    //     if (!isRu || !isFr) {
    //       this.props.clinicStore.setLinkClinicId(
    //         res.context?.id || res.context.prescriberId
    //       );
    //       this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
    //       this.props.clinicStore.setLinkClinicCode(
    //         res.context.recommendationCode || ''
    //       );
    //     }
    //     this.props.clinicStore.setAuditAuthority(false);
    //     if (isRu) {
    //       // Ru need redirected to the cart page and the recommended products added to cart automatically via clicking this link.
    //       this.addCart();
    //     } else {
    //       this.setState({ loading: false, pageLoading: false });
    //     }
    //     console.timeEnd('js处理');
    //     // });
    //   })
    //   .catch((err) => {
    //     console.log(err, 'err');
    //     this.setState({ noData: true, pageLoading: false, loading: false });
    //     // this.props.history.push('/home');
    //   });

    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  get addCartBtnStatus() {
    return this.state.inStockProducts.length > 0;
  }
  getPrescriberByPrescriberIdAndStoreId = (prescriberId) => {
    getPrescriberByPrescriberIdAndStoreId({
      prescriberId,
      storeId: window.__.env.REACT_APP_STOREID
    }).then((res) => {
      let recommendationInfos = {
        recommenderName: res.context?.recommendationName || '',
        recommenderId: res.context?.recommendationId || '',
        recommendationName: res.context?.prescriberName || '',
        recommendationId: res.context?.id || res.context?.prescriberId || '',
        referenceObject: res.context?.structureType || '',
        referenceData: res.context?.prescriptionJson || ''
      };
      this.props.clinicStore.setLinkClinicRecommendationInfos(
        recommendationInfos
      );
      this.props.clinicStore.setLinkClinicId(
        res.context?.id || res.context?.prescriberId
      );
      this.props.clinicStore.setLinkClinicName(res.context?.prescriberName);
      this.props.clinicStore.setLinkClinicCode(
        res.context?.recommendationCode || ''
      );
      let locationPath = res.context?.location;
      this.setState({ locationPath });
    });
  };
  checkoutStock() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].recommendationNumber > productList[i].goodsInfo.stock
      ) {
        outOfStockProducts.push(productList[i]);
      } else {
        inStockProducts.push(productList[i]);
      }
    }
    let outOfStockVal = '';
    outOfStockProducts.map((el, i) => {
      if (i === outOfStockProducts.length - 1) {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName;
      } else {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName + ',';
      }
      return el;
    });
    modalList[0].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_cart' },
      { val: outOfStockVal }
    );
    modalList[1].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_pay' },
      { val: outOfStockVal }
    );
  }
  async hanldeLoginAddToCart() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    GABigBreederAddToCar(productList);
    // console.log(outOfStockProducts, inStockProducts, '...1')
    // return

    // for (let i = 0; i < productList.length; i++) {
    //   if(productList[i].recommendationNumber > productList[i].goodsInfo.stock) {
    //     outOfStockProducts.push(productList[i])
    //     this.setState({ buttonLoading: false });
    //     continue
    //   }else {
    //     inStockProducts.push(productList[i])
    //   }
    // }
    if (outOfStockProducts.length > 0) {
      this.setState({ modalShow: true, currentModalObj: modalList[0] });
    } else {
      if ((isFr && !this.state.isSPT) || isRu) {
        // 是fr breeder的特殊code，需要主动默认填充
        await this.props.checkoutStore.setPromotionCode(
          this.state.promotionCodeText
        );
      }
      this.setState({ buttonLoading: true });
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 1,
            periodTypeId: inStockProducts[i].defaultFrequencyId,
            recommendationId:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationId || this.props.clinicStore.linkClinicId,
            recommendationInfos: this.props.clinicStore
              .linkClinicRecommendationInfos,
            recommendationName:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationName || this.props.clinicStore.linkClinicName
          });
          await this.props.checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      // this.props.history.push('/cart');
    }
  }
  async hanldeUnloginAddToCart(products, path) {
    GABigBreederAddToCar(products);
    this.setState({ buttonLoading: true });
    await this.props.checkoutStore.hanldeUnloginAddToCart({
      valid: this.addCartBtnStatus,
      cartItemList: products.map((p) => {
        return Object.assign(
          p,
          { ...p.goods, ...p.goodsInfo.goods },
          {
            selected: true,
            quantity: p.recommendationNumber,
            currentUnitPrice: p.goodsInfo.marketPrice,
            goodsInfoFlag: 1,
            periodTypeId: inStockProducts[i].defaultFrequencyId,
            recommendationInfos: this.props.clinicStore
              .linkClinicRecommendationInfos,
            recommendationId:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationId || this.props.clinicStore.linkClinicId,
            recommendationName:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationName || this.props.clinicStore.linkClinicName,
            taggingForTextAtCart: (p.taggingList || []).filter(
              (e) =>
                e.taggingType === 'Text' &&
                e.showPage?.includes('Shopping cart page')
            )[0],
            taggingForImageAtCart: (p.taggingList || []).filter(
              (e) =>
                e.taggingType === 'Image' &&
                e.showPage?.includes('Shopping cart page')
            )[0]
          }
        );
      })
    });
    if ((isFr && !this.state.isSPT) || isRu) {
      // 是fr breeder的特殊code，需要主动默认填充
      await this.props.checkoutStore.setPromotionCode(
        this.state.promotionCodeText
      );
    }
    this.setState({ buttonLoading: false });
    this.props.history.push(path);
  }
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  async buyNow(needLogin) {
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
    if (needLogin) {
      localItemRoyal.set('okta-redirectUrl', '/prescription');
    }
    this.setState({ needLogin });
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    let totalPrice;
    inStockProducts.map((el) => {
      console.log(el, 'instock');
      totalPrice =
        totalPrice + el.recommendationNumber * el.goodsInfo.salePrice;
      return el;
    });
    if (totalPrice < window.__.env.REACT_APP_MINIMUM_AMOUNT) {
      console.log(totalPrice, 'instock');
      this.showErrorMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT) }}
        />
      );
      return false;
    }
    if (outOfStockProducts.length > 0) {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.setState({ modalShow: true, currentModalObj: modalList[1] });
      return false;
    } else {
      // for (let i = 0; i < inStockProducts.length; i++) {
      //   try {
      //     await sitePurchase({
      //       goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
      //       goodsNum: inStockProducts[i].recommendationNumber,
      //       goodsCategory: '',
      //       goodsInfoFlag: 0
      //     });
      //     await checkoutStore.updateLoginCart();
      //   } catch (e) {
      //     this.setState({ buttonLoading: false });
      //   }
      // }
      if (loginStore.isLogin) {
        await this.hanldeLoginAddToCart();
      } else {
        let res = await getProductPetConfig({
          goodsInfos: inStockProducts.map((el) => {
            el.goodsInfo.buyCount = el.recommendationNumber;
            return el.goodsInfo;
          })
        });
        let handledData = inStockProducts.map((el, i) => {
          el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
          el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
          el.sizeList = el.goodsInfo.goods.sizeList;
          return el;
        });
        // let handledData = res.context.goodsInfos;
        let AuditData = handledData.filter((el) => el.auditCatFlag);
        checkoutStore.setCartData(handledData);
        checkoutStore.setAuditData(AuditData);
        let autoAuditFlag = res.context.autoAuditFlag;
        checkoutStore.setPetFlag(res.context.petFlag);
        checkoutStore.setAutoAuditFlag(autoAuditFlag);
        sessionItemRoyal.set(
          'recommend_product',
          JSON.stringify(inStockProducts)
        );
        if (!needLogin) {
          const url = await distributeLinktoPrecriberOrPaymentPage({
            configStore: this.props.configStore,
            checkoutStore,
            clinicStore,
            isLogin: loginStore.isLogin
          });
          await this.hanldeUnloginAddToCart(this.state.productList, url);
        }
      }
    }
  }
  get100Words = (str) => {
    let removeTAGStr = str.replace(/<[^>]+>/g, '');
    let sliceText = removeTAGStr.slice(0, 200) || '';
    let trimStr = sliceText.trim();
    return trimStr ? trimStr + '...' : '';
  };
  async hanldeClickSubmit() {
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
    let {
      currentModalObj,
      subDetail,
      outOfStockProducts,
      inStockProducts
    } = this.state;
    this.setState({ loading: true, modalShow: false });
    if (currentModalObj.type === 'addToCart') {
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            periodTypeId: inStockProducts[i].defaultFrequencyId,
            goodsCategory: '',
            goodsInfoFlag: 1
          });
          await checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      history.push('/cart');
    } else if (currentModalObj.type === 'payNow') {
      // for (let i = 0; i < inStockProducts.length; i++) {
      //   try {
      //     await sitePurchase({
      //       goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
      //       goodsNum: inStockProducts[i].recommendationNumber,
      //       goodsCategory: ''
      //     });
      //     await checkoutStore.updateLoginCart();
      //   } catch (e) {
      //     this.setState({ buttonLoading: false });
      //   }
      // }
      let res = await getProductPetConfig({
        goodsInfos: inStockProducts.map((el) => {
          el.goodsInfo.buyCount = el.recommendationNumber;
          return el.goodsInfo;
        })
      });
      let handledData = inStockProducts.map((el, i) => {
        el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
        el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
        el.sizeList = el.goodsInfo.goods.sizeList;
        return el;
      });
      // let handledData = res.context.goodsInfos;
      let AuditData = handledData.filter((el) => el.auditCatFlag);
      loginStore.isLogin
        ? checkoutStore.setLoginCartData(handledData)
        : checkoutStore.setCartData(handledData);
      checkoutStore.setAuditData(AuditData);
      let autoAuditFlag = res.context.autoAuditFlag;
      checkoutStore.setPetFlag(res.context.petFlag);
      checkoutStore.setAutoAuditFlag(autoAuditFlag);
      const url = await distributeLinktoPrecriberOrPaymentPage({
        configStore: this.props.configStore,
        checkoutStore,
        clinicStore,
        isLogin: loginStore.isLogin
      });
      url && history.push(url);
      // history.push('/prescription');
    }
  }
  addCart = () => {
    if (this.state.inStockProducts.length < 1) {
      return;
    }
    GABreederRecoSeeInCart();
    let { productList } = this.state;
    if (this.props.loginStore.isLogin) {
      this.hanldeLoginAddToCart();
    } else {
      this.hanldeUnloginAddToCart(productList, '/cart');
    }
  };

  // 复制 promotion code
  copyPromotion = () => {
    let { promotionCodeText } = this.state;
    var copy = function (e) {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.clearData();
        e.clipboardData.setData('text/plain', promotionCodeText);
      } else if (window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege(
            'UniversalXPConnect'
          );
        } catch (e) {
          alert(
            "被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'"
          );
        }
        var clip = Components.classes[
          '@mozilla.org/widget/clipboard;1'
        ].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;
        var trans = Components.classes[
          '@mozilla.org/widget/transferable;1'
        ].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes[
          '@mozilla.org/supports-string;1'
        ].createInstance(Components.interfaces.nsISupportsString);
        var copytext = promotionCodeText;
        str.data = copytext;
        trans.setTransferData('text/unicode', str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert('复制成功！');
      } else {
        window.clipboardData.setData('promotionCodeText', promotionCodeText);
      }
    };
    // var copy = function (e) {
    //   e.preventDefault();
    //   debugger
    //   if (e.clipboardData) {
    // console.info('2222promotionCodeText', promotionCodeText);
    //     e.clipboardData.clearData()
    //     e.clipboardData.setData('text/plain', promotionCodeText);
    //   } else if (window.clipboardData) {
    // console.info('1111promotionCodeText', promotionCodeText);
    //     window.clipboardData.setData('promotionCodeText', promotionCodeText);
    //   }
    // };
    window.addEventListener('copy', copy);
    document.execCommand('copy');
    window.removeEventListener('copy', copy);
  };
  // 查看 promotion code
  checkPromotionCode = (e) => {
    this.copyPromotion();
    // let { showCoiedTips } = this.state;
    // this.setState({ showCoiedTips: !showCoiedTips });
    // e.nativeEvent.stopImmediatePropagation();
    // e.stopPropagation();
    if (this.state.checkPromotionCodeAndCopy) {
      return;
    }
    GABreederRecoPromoCodeCTA();
    this.setState(
      {
        checkPromotionCodeAndCopy: true
      },
      () => {
        let el = document.getElementById('btnCopyPromotionCode');
        let elWidth = el.clientWidth;
        this.setState({
          viewShoppingCartWidth: elWidth
        });
      }
    );
  };
  // 查看购物车
  viewShoppingCart = () => {
    GABreederRecoSeeInCart();
    this.props.history.push('/cart');
  };
  tabChange(productList, index) {
    let promotionCode = funcUrl({ name: 'coupon' }) || '';
    this.setState({ activeIndex: index },()=>{
      this.calcIsShowMore()
    });
    const currentProduct = productList.filter((item, i) => i == index && item);
    GARecommendationProduct(
      currentProduct,
      2,
      this.state.frequencyList,
      promotionCode,
      this.state.activeIndex
    );
  }
  calcIsShowMore=()=>{
    let descriptionDom = document.querySelector('.description')
      console.log("scrollHeight: ", descriptionDom.scrollHeight)
      console.log("offsetHeight: ", descriptionDom.offsetHeight)
      if (descriptionDom.scrollHeight > descriptionDom.offsetHeight) {
        console.log("出现了省略号")
        this.setState({showMore:true})
      } else {
        this.setState({showMore:false})
        console.log("没有出现省略号")
      }
  }

  render() {
    const event = {
      page: {
        type: 'Recommendation',
        theme: '',
        path: this.props.location.pathname
      }
    };
    const createMarkup = (text) => ({ __html: text });
    // const { details, images } = this.state
    console.log('productList', this.state.productList);
    let {
      productList,
      activeIndex,
      currentModalObj,
      isMobile,
      promotionCode,
      promotionCodeText,
      isSPT
    } = this.state;
    console.info('productList[activeIndex]', productList[activeIndex]);
    console.info('productList', productList);
    let MaxLinePrice,
      MinLinePrice,
      MaxMarketPrice,
      MinMarketPrice,
      MaxSubPrice,
      MinSubPrice;
    if (productList.length) {
      // MaxLinePrice = Math.max.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      // );
      // MinLinePrice = Math.min.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      // );
      MaxMarketPrice = Math.max.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      MinMarketPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      if (isRu) {
        MaxMarketPrice = MinMarketPrice; // 俄罗斯只展示最低价格
      }
      // MaxSubPrice = Math.min.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      // );
      // MinSubPrice = Math.min.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      // );
    }
    let nutritionalReco =
      this.state.prescriptionJson &&
      JSON.parse(this.state.prescriptionJson)?.nutritionalReco;
    let tabDes =
      productList[activeIndex]?.goodsInfos[0]?.goods.goodsSubtitle || '';
    let tabDesText = tabDes.length > 101 ? this.get100Words(tabDes) : tabDes;
    let grayBoxInnerText = {
      fr: isSPT
        ? tabDesText
        : nutritionalReco ||
          "Les quantités d'alimentation recommandées se trouvent au dos du sac. Assurez-vous de faire la transition des aliments lentement au cours de la semaine pour éviter les maux d'estomac.",
      us:
        nutritionalReco ||
        'Recommended feeding amounts are located on the back of the bag. Make sure you transition food slowly over the course of the week to help prevent stomach upset.',
      ru: this.state.locationPath
    };

    let details = productList[activeIndex] || {};
    const filterImages =
      details.images?.filter((i) => {
        i.artworkUrl = i.goodsInfoImg || i.artworkUrl;
        return i.goodsInfoImg;
      }) || [];
    console.info('detailsdetails', filterImages);
    console.info('...............', details.images);
    return (
      <div className="Recommendation_FRBreeder">
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
          showBannerTip={false}
          // showBannerTip={isUs ? true : false}
          bannerTipShowBtn={isUs ? true : false}
        />
        <Modal
          key="1"
          needLogin={this.state.needLogin}
          visible={this.state.modalShow}
          confirmLoading={this.state.submitLoading}
          modalTitle={currentModalObj.title}
          confirmBtnText={<FormattedMessage id="yes" />}
          cancelBtnVisible={<FormattedMessage id="cancel" />}
          close={() => {
            this.setState({ modalShow: false });
          }}
          hanldeClickConfirm={() => this.hanldeClickSubmit()}
        >
          <span>{currentModalObj.content}</span>
        </Modal>
        {this.state.pageLoading ? (
          <Loading bgColor={'#fff'} opacity={1} />
        ) : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <p className="text-center sub-title m-auto">
            VOTRE RECOMMANDATION ÉLEVEUR
          </p>
          <p className="text-center rc-beta m-auto recommendation-title">
            Offrez à votre nouveau compagnon la nutrition adaptée à ses besoins
            spécifiques​
          </p>
         {details?.goodsInfos? <div className="goods-list-container  m-auto text-center">
            <ul className="tab-list m-auto">
              {productList.map((el,index)=>(<li onClick={()=>this.tabChange(productList,index)} className={`text-center ${activeIndex==index?'active':''}`}
               style={{cursor:'pointer',display:'inline-block',padding:'0 1rem'}}>
                <img className="tab-img"  src={el.images[0].artworkUrl}/>
                <div>{el.goodsInfo.goodsInfoName}</div>
              </li>))}
            </ul>
            <div className="goods-container rc-layout-container rc-five-column">
              <div className="goods-imgs rc-double-width rc-column">
                <ImageMagnifier_fr
                  sizeList={details.sizeList||[]}
                  video={details.goodsVideo}
                  images={details.images || []}
                  minImg={details.goodsImg}
                  maxImg={details.goodsImg}
                  imgAlt={details?.goodsName}
                  config={this.state.imageMagnifierCfg?.config}
                  taggingForText={details.taggingForTextAtPDP}
                  taggingForImage={
                    details.taggingForImageAtPDP
                  }
                  // spuImages={[]}
                  spuImages={
                    filterImages.length
                      ? filterImages
                      : details.images
                  }
                />
              </div>
              <div className="goods-info  rc-triple-width rc-column text-left">
                <h2 title={details?.goodsInfo?.goodsInfoName}>{details?.goodsInfo?.goodsInfoName}</h2>
                <p className="description">
                {details?.goodsInfos[0]?.goods.goodsSubtitle}
                的角度讲活动结束精神抖擞结合实际都会上看记录卡拉卡拉卡拉卡拉看掉了上课的索拉卡双联单控实力坑爹双联单控塑料袋 
                  {/* Donner le meilleur départ dans la vie à votre chaton commence
                  par une bonne nutrition. En lui apportant les nutriments
                  essentiels dont il a besoin… */}
                  <span className="show-more"><span>...</span><span style={{cursor:'pointer'}} onClick={()=>{()=>{

                  }}}>Show More</span></span>
                </p>
                <div className="price">
                  <FormattedMessage id="from" />{' '}
                  {formatMoney(details.goodsInfo.subscriptionPrice)}{' '}
                  <FormattedMessage id="to" />{' '}
                  {formatMoney(details.goodsInfo.marketPrice)}
                </div>
                {/* <button>Ajouter au panier</button> */}
                <button
                onClick={this.addCart}
              className={`rc-btn add-to-cart-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile md-up`}
               /*  ${ addToCartLoading ? 'ui-btn-loading' : ''} 
              ${btnStatus ? '' : 'rc-btn-solid-disabled'}*/
              // onClick={}
            >
              <span className="fa rc-icon rc-cart--xs rc-brand3" />
              <span className="default-txt">
              <FormattedMessage id="details.addToCart" />
              </span>
            </button>
                <p className=" md-up">Livraison en 3 jours ouvrés offerte</p>
                <div className="advantage-container">
                  <h5>Découvrez les avantages du CLUB Royal Canin</h5>
                  <p >Un abonnement <span style={{color:'#333'}}>flexible et sans engagement</span></p>
                  <div className="advantage-list">
                    {advantageList.map((advantages) => (
                      <div className="rc-layout-container rc-two-colum">
                        {advantages.map(el=>(<div  className="rc-column" style={{display:'flex',alignItems:'center'}}>
                        {el.img&&<img style={{width:'60px',height:'60px'}} src={el.img} />}
                        {/* <div style={{width:'60px',height:'60px',background:`url(${el.img})`,backgroundSize:'250%',backgroundRepeat:'no-repeat',backgroundPosition:'center'}}></div> */}
                        <span style={{display:'inline-block',flex:1}}>{el.text}</span>
                      </div>))}
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: '0.75rem' }}>
                    <sup>1</sup> Cumulable avec l'offre de bienvenue
                  </p>
                </div>
              </div>
            </div>
            <div className="md-down add-cart-for-mobile">
            <button
                onClick={this.addCart}
              className={`rc-btn add-to-cart-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile`}
               /*  ${ addToCartLoading ? 'ui-btn-loading' : ''} 
              ${btnStatus ? '' : 'rc-btn-solid-disabled'}*/
              // onClick={}
            >
              <span className="fa rc-icon rc-cart--xs rc-brand3" />
              <span className="default-txt">
              <FormattedMessage id="details.addToCart" />
              </span>
            </button>
            <p>
            Livraison en 3 jours ouvrés offerte
            </p>
            </div>
          </div>:null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default Recommendation;
