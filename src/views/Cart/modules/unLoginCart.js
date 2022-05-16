import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import LoginButton from '@/components/LoginButton';
import { Link } from 'react-router-dom';
import { FOOD_DISPENSER_PIC } from '@/utils/constant';
import {
  formatMoney,
  getFrequencyDict,
  distributeLinktoPrecriberOrPaymentPage,
  unique,
  getDeviceType,
  handleRecommendation,
  isShowMixFeeding,
  optimizeImage
} from '@/utils/utils';
import {
  GAInitUnLogin,
  GACartScreenLoad,
  GACartChangeSubscription
} from '@/utils/GA';
import { getMixFeedings } from '@/api/details';
import { getGoodsRelationBatch, valetGuestMiniCars } from '@/api/cart';
import PayProductInfo from '../../Payment/PayProductInfo';
import Loading from '@/components/Loading';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';
import catsImgFr from '@/assets/images/banner-list/cats-fr.png';
import dogsImgFr from '@/assets/images/banner-list/dogs-fr.png';
import BannerTip from '@/components/BannerTip';
import LazyLoad from 'react-lazyload';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import SubscriptionSelection from '../components/SubscriptionSelection';
import OneOffSelection from '../components/OneOffSelection';
import ClubSelection from '../components/ClubSelection';
import ClubGiftBanner from '../components/ClubGiftBanner';
import ProductCarousel from '@/components/ProductCarousel';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';
import GiftList from '../components/GiftList/index.tsx';
import PromotionCodeText from '../components/PromotionCodeText';
import CartSurvey from '../components/CartSurvey';
import MixFeedingBox from '../components/MixFeedingBox/index.tsx';
import { ErrorMessage } from '@/components/Message';
import { QuantityPicker } from '@/components/Product';
import { PriceDetailsList } from '../components';
import { funcUrl } from '@/lib/url-utils';

const guid = uuidv4();
const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const isGift = true;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const isHubGA = window.__.env.REACT_APP_HUB_GA;
const pageLink = window.location.href;

@injectIntl
@inject('checkoutStore', 'loginStore', 'clinicStore', 'configStore')
@observer
class UnLoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionCode: '',
      mobileCartVisibleKey: 'less',
      errorMsg: '',
      productList: [],
      currentProductIdx: -1,
      loading: true,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
      checkoutLoading: false,
      validateAllItemsStock: true,
      isPromote: false,
      petModalVisible: false,
      isAdd: 0,
      form: {
        buyWay: 'once', // once/frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      frequencyList: [],
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      isShowValidCode: false, //是否显示无效promotionCode
      subscriptionDiscount: 0,
      activeToolTipIndex: 0,
      goodsIdArr: [],
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      relatedGoodsList: [],
      mixFeedings: [],
      promotionsVisible: false,
      circleLoading: false
    };
    this.hanldeToggleOneOffOrSub = this.hanldeToggleOneOffOrSub.bind(this);
    this.showErrMsg = this.showErrMsg.bind(this);
  }
  get totalNum() {
    return this.state.productList
      .filter((ele) => ele.selected)
      .reduce((pre, cur) => {
        return pre + cur.quantity;
      }, 0);
  }
  get subscriptionPrice() {
    return this.props.checkoutStore.subscriptionPrice;
  }
  get totalPrice() {
    return this.props.checkoutStore.totalPrice;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  get discountPrice() {
    return this.props.checkoutStore.discountPrice;
  }
  get promotionDiscountPrice() {
    return this.props.checkoutStore.promotionDiscountPrice;
  }
  get subscriptionDiscountPrice() {
    return this.props.checkoutStore.subscriptionDiscountPrice;
  }
  get deliveryPrice() {
    return this.props.checkoutStore.deliveryPrice;
  }
  get freeShippingDiscountPrice() {
    return this.props.checkoutStore.freeShippingDiscountPrice;
  }
  get freeShippingFlag() {
    return this.props.checkoutStore.freeShippingFlag;
  }
  get taxFeePrice() {
    return this.props.checkoutStore.taxFeePrice;
  }
  get isPromote() {
    return parseFloat(this.discountPrice) > 0;
  }
  get promotionDesc() {
    return this.props.checkoutStore.promotionDesc;
  }
  get promotionDiscount() {
    return this.props.checkoutStore.promotionDiscount;
  }
  get promotionVOList() {
    return this.props.checkoutStore.promotionVOList;
  }
  get computedList() {
    return this.state.frequencyList.map((ele) => {
      delete ele.value;
      return {
        value: ele.id,
        ...ele
      };
    });
  }
  get loginCartData() {
    return this.props.checkoutStore.loginCartData;
  }
  get unLoginCartData() {
    return this.props.checkoutStore.cartData;
  }
  get giftList() {
    return this.props.checkoutStore.giftList || [];
  }
  // 可购买状态
  get btnStatus() {
    const { productList } = this.state;
    let autoShipFlag = false,
      clubFlag = false,
      numFlag = true;
    var reg = /^[0-9]*/;
    productList.forEach((el) => {
      if (!reg.test(el.buyCount)) {
        numFlag = false;
      }
      // if (el.promotions && el.promotions.includes('club')) {
      //   clubFlag = true;
      // } else if (el.promotions && el.promotions.includes('autoship')) {
      //   autoShipFlag = true;
      // }
    });
    return numFlag;
  }
  getGoodsIdArr = () => {
    let goodsIdArr = this.unLoginCartData.map((item) => item.goodsId);
    this.setState({ goodsIdArr });
    getGoodsRelationBatch({ goodsIds: goodsIdArr }).then((res) => {
      this.setState({ relatedGoodsList: res.context.goods });
    });
  };
  async componentDidMount() {
    console.log('unLoginPage');
    const guestId = sessionItemRoyal.get('rc-guestId', guestId);
    if (guestId) {
      this.setState({ circleLoading: true });
      const getDetail = ({
        goodsInfos,
        goodsSpecDetails,
        goodsSpecs,
        goodsInfoNo,
        goodsInfoId
      }) => {
        let choosedSpecsArr = [];
        let sizeList = [];
        if (true) {
          // 通过sku查询
          let specsItem = goodsInfos.filter(
            (item) => item.goodsInfoNo == goodsInfoNo
          );

          choosedSpecsArr =
            specsItem && specsItem[0] && specsItem[0].mockSpecDetailIds;
        }

        // 组装购物车的前端数据结构与规格的层级关系
        if (goodsSpecDetails) {
          // 是否有规格可用
          let isAllSpecDisabled = true;
          goodsSpecs.map((sItem, index) => {
            // 该层判断是为了去判断sku是否存在
            sItem.chidren = goodsSpecDetails.filter((sdItem, i) => {
              if (index === 0) {
                let filterproducts = goodsInfos.filter((goodEl) =>
                  goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
                );
                sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
                sdItem.isEmpty = filterproducts.every(
                  (item) => item.stock === 0
                );
                sdItem.isUnitPriceZero = filterproducts?.[0]?.marketPrice === 0;
                sdItem.isDisabled = sdItem.isEmpty || sdItem.isUnitPriceZero;
                // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
              }
              return sdItem.specId === sItem.specId;
            });
            let defaultSelcetdSku = -1;
            if (choosedSpecsArr.length) {
              for (let i = 0; i < choosedSpecsArr.length; i++) {
                let specDetailIndex = sItem.chidren.findIndex(
                  (el) => el.specDetailId === choosedSpecsArr[i]
                );
                if (specDetailIndex > -1) {
                  defaultSelcetdSku = specDetailIndex;
                }
              }
            }
            const isSelectedDefaultSkuItem = sItem.chidren.findIndex(
              (_item) => _item.isSelected && !_item.isDisabled
            );
            // 所有规格都不可用，一旦有可用的，则置为false
            if (sItem.chidren.some((_item) => !_item.isDisabled)) {
              isAllSpecDisabled = false;
            }

            if (defaultSelcetdSku > -1) {
              // 默认选择该sku
              if (!sItem.chidren[defaultSelcetdSku].isEmpty) {
                // 如果是sku进来的，需要默认当前sku被选择
                sItem.chidren[defaultSelcetdSku].selected = true;
              }
            } else if (isSelectedDefaultSkuItem > -1) {
              // sprint6添加的需求，在storePortal设置了defaultSku那么该sku被选中.
              sItem.chidren[isSelectedDefaultSkuItem].selected = true;
            } else {
              if (
                window.__.env.REACT_APP_COUNTRY === 'de' &&
                sItem.chidren.length &&
                !sItem.chidren[0].isEmpty
              ) {
                // de设置最小的
                sItem.chidren[0].selected = true;
              } else if (
                sItem.chidren.length > 1 &&
                !sItem.chidren[1].isDisabled
              ) {
                sItem.chidren[1].selected = true;
              } else {
                for (let i = 0; i < sItem.chidren.length; i++) {
                  if (!sItem.chidren[i].isDisabled) {
                    sItem.chidren[i].selected = true;
                    break;
                  }
                }
                // 如果所有sku都没有库存 取第一个可用的规格
                if (
                  sItem.chidren.filter((el) => el.selected).length === 0 &&
                  sItem.chidren.filter((el) => !el.isDisabled).length &&
                  sItem.chidren.length
                ) {
                  const targetItem = sItem.chidren.filter(
                    (el) => !el.isDisabled
                  )[0];
                  if (targetItem) {
                    targetItem.selected = true;
                  }
                }
              }
            }
            return sItem;
          });
        } else {
          goodsInfos[0].selected = true;
        }
        goodsInfos = goodsInfos.map((g) => {
          g.selected = g.goodsInfoId === goodsInfoId;
          return g;
        });
        return goodsInfos;
      };

      let res = await valetGuestMiniCars(guestId);
      // console.log(res)
      // let res = {
      //   "code": "K-000000",
      //   "message": "Opération réussie",
      //   "context": {
      //     "goodsList": [
      //       {
      //         "goodsInfoId": "8a7080567faf8ff5017fb48cd9d00006",
      //         "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //         "goodsInfoName": "Instinctive en gelée",
      //         "goodsInfoNo": "237550",
      //         "innerGoodsInfoNo": "FR_40740102",
      //         "goodsInfoImg": "https://cdn.royalcanin-weshare-online.io/s1Y1JnUBBKJuub5qvZiW/v23/instinctive-gele",
      //         "goodsInfoBarcode": null,
      //         "stock": 408,
      //         "marketPrice": 14.99,
      //         "supplyPrice": null,
      //         "retailPrice": null,
      //         "grouponPrice": null,
      //         "costPrice": null,
      //         "createTime": "2022-03-23 02:13:24.000",
      //         "updateTime": "2022-03-23 02:13:24.000",
      //         "addedTime": "2022-03-23 02:13:24.000",
      //         "delFlag": 0,
      //         "addedFlag": 1,
      //         "companyInfoId": 1053,
      //         "storeId": 123457909,
      //         "storeName": null,
      //         "customFlag": 0,
      //         "levelDiscountFlag": 0,
      //         "auditStatus": 1,
      //         "companyType": null,
      //         "aloneFlag": false,
      //         "salePrice": 14.99,
      //         "priceType": 2,
      //         "mockSpecIds": null,
      //         "mockSpecDetailIds": null,
      //         "specDetailRelIds": null,
      //         "buyCount": 1,
      //         "count": null,
      //         "maxCount": null,
      //         "intervalPriceIds": null,
      //         "specText": "12×85G",
      //         "intervalMinPrice": null,
      //         "intervalMaxPrice": null,
      //         "validFlag": null,
      //         "cateId": 1134,
      //         "cateName": null,
      //         "isHidden": null,
      //         "brandId": 400,
      //         "storeCateIds": null,
      //         "distributionCommission": null,
      //         "commissionRate": null,
      //         "distributionSalesCount": null,
      //         "distributionGoodsAudit": 0,
      //         "distributionGoodsAuditReason": null,
      //         "checked": false,
      //         "goodsStatus": 0,
      //         "goodsUnit": null,
      //         "marketingLabels": [

      //         ],
      //         "grouponLabel": null,
      //         "couponLabels": [

      //         ],
      //         "goodsCubage": 1,
      //         "goodsWeight": 1,
      //         "freightTempId": 62,
      //         "saleType": 0,
      //         "allowPriceSet": null,
      //         "smallProgramCode": null,
      //         "joinDistributior": null,
      //         "goodsEvaluateNum": 0,
      //         "goodsCollectNum": 0,
      //         "goodsSalesNum": 5,
      //         "goodsFavorableCommentNum": 0,
      //         "enterPrisePrice": null,
      //         "enterPriseAuditState": null,
      //         "enterPriseGoodsAuditReason": null,
      //         "subscriptionStatus": 1,
      //         "subscriptionPrice": 13.49,
      //         "linePrice": 0,
      //         "basePrice": null,
      //         "subscriptionBasePrice": null,
      //         "basePriceType": "",
      //         "goodsInfoWeight": 0,
      //         "goodsInfoUnit": "kg",
      //         "goods": {
      //           "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //           "cateId": 1134,
      //           "brandId": 400,
      //           "brandName": null,
      //           "goodsName": "Instinctive en gelée",
      //           "goodsSubtitle": "Aliment complet pour chats adultes de 1 à 7 ans.",
      //           "goodsNewSubtitle": "Chats adultes de 1 à 7 ans",
      //           "goodsDescription": null,
      //           "goodsDescriptionDetails": null,
      //           "goodsNo": "4074",
      //           "innerGoodsNo": "FR_4074",
      //           "goodsUnit": null,
      //           "goodsCateName": "Cat/Feline Health Nutrition Wet/Wet",
      //           "goodsImg": "https://cdn.royalcanin-weshare-online.io/s1Y1JnUBBKJuub5qvZiW/v23/instinctive-gele",
      //           "goodsWeight": 1,
      //           "marketPrice": null,
      //           "supplyPrice": null,
      //           "goodsType": 0,
      //           "costPrice": null,
      //           "createTime": "2022-03-23 02:04:31.000",
      //           "updateTime": "2022-05-10 08:31:09.000",
      //           "addedTime": "2022-03-23 02:13:24.000",
      //           "goodsSource": 1,
      //           "delFlag": 0,
      //           "addedFlag": 1,
      //           "moreSpecFlag": 1,
      //           "priceType": 2,
      //           "customFlag": 0,
      //           "levelDiscountFlag": 0,
      //           "companyInfoId": 1053,
      //           "supplierName": null,
      //           "storeId": 123457909,
      //           "storeName": null,
      //           "cateName": null,
      //           "submitTime": "2022-04-25 08:27:03.000",
      //           "auditStatus": 1,
      //           "auditReason": null,
      //           "goodsDetail": "[WsContentsDTO(type=Image, title=Feeding Guidelines, content=[{\"Table\":{\"Description\":\"&lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;Poids du chat&lt;/th&gt;&lt;th&gt;Alimentation humide&lt;/th&gt;&lt;th&gt;Alimentation mixte&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;3 kg&lt;/td&gt;&lt;td&gt;2 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 23 g&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;4 kg&lt;/td&gt;&lt;td&gt;2+1/2 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 33 g&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;5 kg&lt;/td&gt;&lt;td&gt;3 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 43 g&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;6 kg&lt;/td&gt;&lt;td&gt;3+1/4 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 52 g&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;\"}}]), WsContentsDTO(type=Image, title=Benefits, content=[{\"Instinctivement préféré\":{\"Description\":\"ROYAL CANIN® Instinctive est formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats adultes.\"}}, {\"Santé du système urinaire\":{\"Description\":\"Favorise la bonne santé du système urinaire.\"}}, {\"Maintien du poids idéal\":{\"Description\":\"Formulé pour aider à maintenir le poids idéal.\"}}]), WsContentsDTO(type=Text, title=Compositions, content=[{\"additives\":\"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 100 UI, E1 (Fer) : 4 mg, E2 (Iode) : 0,3 mg, E4 (Cuivre) : 2,5 mg, E5 (Manganèse) : 1,2 mg, E6 (Zinc) : 12 mg.\"}, {\"analytical_constituants\":\"Constituants analytiques : Protéine : 11,8 % - Teneur en matières grasses : 4,5 % - Cendres brutes : 1,5 % - Cellulose brute : 0,8 % - Humidité : 80 %.\"}, {\"composition\":\"Composition : viandes et sous-produits animaux, extraits de protéines végétales, sous-produits d’origine végétale, huiles et graisses, substances minérales, sucres.\"}, {\"feeding_instructions\":\"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.   \"}]), WsContentsDTO(type=Text, title=Text, content=[{\"EretailLong Description\":\"Trouver une alimentation à la fois nutritive et appétissante pour votre chat n’est pas toujours chose simple. Les chats sont parfois capricieux et refusent de manger des aliments qui ne sont pas à leur goût – même s’ils sont faits sur mesure pour contenir les nutriments dont votre chat a besoin. ROYAL CANIN® Instinctive émincé en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats adultes préfèrent instinctivement. Ses nutriments soigneusement choisis pour la meilleure palatabilité possible en font un plat auquel votre chat ne pourra tout simplement pas résister. Incluant une combinaison de vitamines, de minéraux et d’acides aminés (tous nécessaires au maintien d’une bonne santé générale et à une croissance régulière), ROYAL CANIN® Instinctive émincé en gelée offre à votre chat une alimentation à la fois très digeste et équilibrée sur le plan nutritionnel. Ce mélange de nutriments n’a pas seulement été élaboré pour être préféré d’instinct et être sain sur le plan nutritionnel, mais aussi pour aider votre chat à maintenir son poids de forme et à renforcer le bon fonctionnement de son système urinaire. ROYAL CANIN® Instinctive émincé en gelée contient la teneur recommandée en matières grasses pour une bonne régulation des niveaux d’énergie et le maintien du poids. De plus, le mélange de fibres et de protéines contribue à la sensation de satiété. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Instinctive est également disponible en émincé en sauce ou en mousse.\",\"EretailShort Description\":\"Trouver une alimentation à la fois nutritive et appétissante pour votre chat n’est pas toujours chose simple. Les chats sont parfois capricieux et refusent de manger des aliments qui ne sont pas à leur goût – même s’ils sont faits sur mesure pour contenir les nutriments dont votre chat a besoin.\\n \\nROYAL CANIN® Instinctive émincé en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats adultes préfèrent instinctivement. Ses nutriments soigneusement choisis pour la meilleure palatabilité possible en font un plat auquel votre chat ne pourra tout simplement pas résister.\\n \\nIncluant une combinaison de vitamines, de minéraux et d’acides aminés (tous nécessaires au maintien d’une bonne santé générale et à une croissance régulière), ROYAL CANIN® Instinctive émincé en gelée offre à votre chat une alimentation à la fois très digeste et équilibrée sur le plan nutritionnel.\\n \\nCe mélange de nutriments n’a pas seulement été élaboré pour être préféré d’instinct et être sain sur le plan nutritionnel, mais aussi pour aider votre chat à maintenir son poids de forme et à renforcer le bon fonctionnement de son système urinaire.\\n \\nROYAL CANIN® Instinctive émincé en gelée contient la teneur recommandée en matières grasses pour une bonne régulation des niveaux d’énergie et le maintien du poids. De plus, le mélange de fibres et de protéines contribue à la sensation de satiété.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Instinctive est également disponible en émincé en sauce ou en mousse.\\n\",\"Prescriber Description\":\"ROYAL CANIN® Instinctive émincé en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats adultes préfèrent instinctivement. Ses nutriments soigneusement choisis pour la meilleure palatabilité possible en font un plat auquel votre chat ne pourra tout simplement pas résister. - Instinctivement préféré - Santé du système urinaire - Maintien du poids idéal\"}])]",
      //           "goodsMobileDetail": null,
      //           "stock": null,
      //           "goodsInfoIds": null,
      //           "storeCateIds": null,
      //           "storeCateNames": null,
      //           "companyType": null,
      //           "goodsCubage": 1,
      //           "freightTempId": 62,
      //           "freightTempName": null,
      //           "saleType": 0,
      //           "goodsVideo": null,
      //           "linePrice": null,
      //           "allowPriceSet": 0,
      //           "goodsEvaluateNum": 0,
      //           "goodsCollectNum": 0,
      //           "goodsSalesNum": 5,
      //           "goodsFavorableCommentNum": 0,
      //           "grouponForbiddenFlag": false,
      //           "subscriptionStatus": 1,
      //           "minMarketPrice": 14.99,
      //           "minSubscriptionPrice": 13.49,
      //           "avgEvaluate": null,
      //           "avgEvaluateScore": null,
      //           "baseSpec": null,
      //           "saleableFlag": 1,
      //           "displayFlag": 1,
      //           "weShareId": 129166,
      //           "weightValue": "None",
      //           "goodsStoreCateNames": null,
      //           "productCategoryNames": null,
      //           "defaultPurchaseType": null,
      //           "defaultFrequencyId": null,
      //           "resource": null,
      //           "promotions": "club",
      //           "goodsPillar": null,
      //           "exclusiveFlag": null,
      //           "wsEnergyCategory": "normal_outdoor_fcn_breed",
      //           "wsReferenceEnergyValue": 983,
      //           "wsTechnologyCode": "wet",
      //           "wsDensity": 1,
      //           "sourceCreateTime": null,
      //           "sourceUpdateTime": "2022-03-27 22:38:49.000",
      //           "serviceTypeId": null,
      //           "assignResources": null
      //         },
      //         "goodsPromotion": null,
      //         "description": null,
      //         "auditCatFlag": null,
      //         "prescriberFlag": null,
      //         "goodsMeasureNum": null,
      //         "goodsMeasureUnit": "",
      //         "subscriptionDiscountPrice": null,
      //         "goodsInfoFlag": 0,
      //         "periodTypeId": null,
      //         "purchasePrice": null,
      //         "goodsInfoType": null,
      //         "goodsInfoBundleRels": [

      //         ],
      //         "recommendationId": null,
      //         "recommendationName": null,
      //         "recommendationSerialCode": null,
      //         "weShareScode": null,
      //         "packSize": "",
      //         "subscriptionPercentage": "10%",
      //         "maxStock": null,
      //         "subscriptionPlanId": null,
      //         "packageId": null,
      //         "subscriptionPlanPromotionFlag": null,
      //         "settingPrice": null,
      //         "virtualInventory": null,
      //         "virtualAlert": null,
      //         "marketingCode": null,
      //         "marketingName": null,
      //         "promotionDiscountPrice": null,
      //         "marketingId": null,
      //         "externalSku": "237550",
      //         "promotions": "club",
      //         "isOfflineStore": null,
      //         "petsId": null,
      //         "petsType": null,
      //         "questionParams": null,
      //         "referenceData": null,
      //         "depth": 0,
      //         "depthUnit": "mm",
      //         "width": 0,
      //         "widthUnit": "mm",
      //         "height": 0,
      //         "heightUnit": "mm",
      //         "specification": null,
      //         "isNotShowCart": 0,
      //         "externalStock": 408,
      //         "externalMarketPrice": null,
      //         "externalSubscriptionPrice": null,
      //         "externalLinePrice": null,
      //         "externalPurchasePrice": null,
      //         "factor": 1,
      //         "stockUomId": "33586ce71f5811ecaa72a77450361cec",
      //         "priceUomId": "33586ce71f5811ecaa72a77450361cec",
      //         "priceUom": null,
      //         "stockUom": null,
      //         "defaultSku": 0,
      //         "displayOnShop": 1,
      //         "productCategory": null,
      //         "cateRate": null,
      //         "goodsName": "Instinctive en gelée",
      //         "goodsCategory": null,
      //         "purchaseId": null,
      //         "sortNumber": null,
      //         "prefixFn": null,
      //         "prefixBreed": null,
      //         "utmSource": null,
      //         "utmMedium": null,
      //         "utmCampaign": null,
      //         "subscriptionPlanGiftList": null,
      //         "itemTotalAmount": null,
      //         "recommendationInfos": "",
      //         "taggingVOList": null,
      //         "peaweeUseing": null,
      //         "goodsSpecDetails": [
      //           {
      //             "specDetailId": 260646144,
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "specId": 67047168,
      //             "detailName": "12×85G",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": "2022-04-25 08:27:03.000",
      //             "delFlag": 0,
      //             "mockSpecId": null,
      //             "mockSpecDetailId": null,
      //             "calculateSort": 1285,
      //             "editable": null,
      //             "isSelected": null
      //           }
      //         ],
      //         "goodsInfos": [
      //           {
      //             "goodsInfoId": "8a7080567faf8ff5017fb48cd9d00006",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsInfoName": "Instinctive en gelée",
      //             "goodsInfoNo": "237550",
      //             "innerGoodsInfoNo": "FR_40740102",
      //             "goodsInfoImg": "https://cdn.royalcanin-weshare-online.io/s1Y1JnUBBKJuub5qvZiW/v23/instinctive-gele",
      //             "goodsInfoBarcode": null,
      //             "stock": 408,
      //             "marketPrice": 14.99,
      //             "supplyPrice": null,
      //             "retailPrice": null,
      //             "grouponPrice": null,
      //             "costPrice": null,
      //             "createTime": "2022-03-23 02:13:24.000",
      //             "updateTime": "2022-03-23 02:13:24.000",
      //             "addedTime": "2022-03-23 02:13:24.000",
      //             "delFlag": 0,
      //             "addedFlag": 1,
      //             "companyInfoId": 1053,
      //             "storeId": 123457909,
      //             "storeName": null,
      //             "customFlag": 0,
      //             "levelDiscountFlag": 0,
      //             "auditStatus": 1,
      //             "companyType": null,
      //             "aloneFlag": false,
      //             "salePrice": null,
      //             "priceType": null,
      //             "mockSpecIds": [
      //               67047168
      //             ],
      //             "mockSpecDetailIds": [
      //               260646144
      //             ],
      //             "specDetailRelIds": null,
      //             "buyCount": 0,
      //             "count": null,
      //             "maxCount": null,
      //             "intervalPriceIds": null,
      //             "specText": null,
      //             "intervalMinPrice": null,
      //             "intervalMaxPrice": null,
      //             "validFlag": null,
      //             "cateId": 1134,
      //             "cateName": null,
      //             "isHidden": null,
      //             "brandId": 400,
      //             "storeCateIds": null,
      //             "distributionCommission": null,
      //             "commissionRate": null,
      //             "distributionSalesCount": null,
      //             "distributionGoodsAudit": 0,
      //             "distributionGoodsAuditReason": null,
      //             "checked": false,
      //             "goodsStatus": 0,
      //             "goodsUnit": null,
      //             "marketingLabels": [

      //             ],
      //             "grouponLabel": null,
      //             "couponLabels": [

      //             ],
      //             "goodsCubage": null,
      //             "goodsWeight": null,
      //             "freightTempId": null,
      //             "saleType": 0,
      //             "allowPriceSet": null,
      //             "smallProgramCode": null,
      //             "joinDistributior": null,
      //             "goodsEvaluateNum": null,
      //             "goodsCollectNum": null,
      //             "goodsSalesNum": null,
      //             "goodsFavorableCommentNum": null,
      //             "enterPrisePrice": null,
      //             "enterPriseAuditState": null,
      //             "enterPriseGoodsAuditReason": null,
      //             "subscriptionStatus": 1,
      //             "subscriptionPrice": 13.49,
      //             "linePrice": 0,
      //             "basePrice": null,
      //             "subscriptionBasePrice": null,
      //             "basePriceType": "",
      //             "goodsInfoWeight": 0,
      //             "goodsInfoUnit": "kg",
      //             "goods": {
      //               "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //               "cateId": 1134,
      //               "brandId": 400,
      //               "brandName": null,
      //               "goodsName": "Instinctive en gelée",
      //               "goodsSubtitle": "Aliment complet pour chats adultes de 1 à 7 ans.",
      //               "goodsNewSubtitle": "Chats adultes de 1 à 7 ans",
      //               "goodsDescription": null,
      //               "goodsDescriptionDetails": null,
      //               "goodsNo": "4074",
      //               "innerGoodsNo": "FR_4074",
      //               "goodsUnit": null,
      //               "goodsCateName": "Cat/Feline Health Nutrition Wet/Wet",
      //               "goodsImg": "https://cdn.royalcanin-weshare-online.io/s1Y1JnUBBKJuub5qvZiW/v23/instinctive-gele",
      //               "goodsWeight": 1,
      //               "marketPrice": null,
      //               "supplyPrice": null,
      //               "goodsType": 0,
      //               "costPrice": null,
      //               "createTime": "2022-03-23 02:04:31.000",
      //               "updateTime": "2022-05-10 08:31:09.000",
      //               "addedTime": "2022-03-23 02:13:24.000",
      //               "goodsSource": 1,
      //               "delFlag": 0,
      //               "addedFlag": 1,
      //               "moreSpecFlag": 1,
      //               "priceType": 2,
      //               "customFlag": 0,
      //               "levelDiscountFlag": 0,
      //               "companyInfoId": 1053,
      //               "supplierName": null,
      //               "storeId": 123457909,
      //               "storeName": null,
      //               "cateName": null,
      //               "submitTime": "2022-04-25 08:27:03.000",
      //               "auditStatus": 1,
      //               "auditReason": null,
      //               "goodsDetail": "[WsContentsDTO(type=Image, title=Feeding Guidelines, content=[{\"Table\":{\"Description\":\"&lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;Poids du chat&lt;/th&gt;&lt;th&gt;Alimentation humide&lt;/th&gt;&lt;th&gt;Alimentation mixte&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;3 kg&lt;/td&gt;&lt;td&gt;2 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 23 g&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;4 kg&lt;/td&gt;&lt;td&gt;2+1/2 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 33 g&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;5 kg&lt;/td&gt;&lt;td&gt;3 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 43 g&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;6 kg&lt;/td&gt;&lt;td&gt;3+1/4 sachets&lt;/td&gt;&lt;td&gt;1 sachet + 52 g&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;\"}}]), WsContentsDTO(type=Image, title=Benefits, content=[{\"Instinctivement préféré\":{\"Description\":\"ROYAL CANIN® Instinctive est formulé pour répondre au profil macro-nutritionnel optimal instinctivement préféré par les chats adultes.\"}}, {\"Santé du système urinaire\":{\"Description\":\"Favorise la bonne santé du système urinaire.\"}}, {\"Maintien du poids idéal\":{\"Description\":\"Formulé pour aider à maintenir le poids idéal.\"}}]), WsContentsDTO(type=Text, title=Compositions, content=[{\"additives\":\"Additifs (au kg) : Additifs nutritionnels : Vitamine D3 : 100 UI, E1 (Fer) : 4 mg, E2 (Iode) : 0,3 mg, E4 (Cuivre) : 2,5 mg, E5 (Manganèse) : 1,2 mg, E6 (Zinc) : 12 mg.\"}, {\"analytical_constituants\":\"Constituants analytiques : Protéine : 11,8 % - Teneur en matières grasses : 4,5 % - Cendres brutes : 1,5 % - Cellulose brute : 0,8 % - Humidité : 80 %.\"}, {\"composition\":\"Composition : viandes et sous-produits animaux, extraits de protéines végétales, sous-produits d’origine végétale, huiles et graisses, substances minérales, sucres.\"}, {\"feeding_instructions\":\"Mode d’emploi : voir tableau. Numéro de lot et d’identifiant usine, à utiliser de préférence avant : voir sur l’emballage. À conserver dans un endroit sec et frais.   \"}]), WsContentsDTO(type=Text, title=Text, content=[{\"EretailLong Description\":\"Trouver une alimentation à la fois nutritive et appétissante pour votre chat n’est pas toujours chose simple. Les chats sont parfois capricieux et refusent de manger des aliments qui ne sont pas à leur goût – même s’ils sont faits sur mesure pour contenir les nutriments dont votre chat a besoin. ROYAL CANIN® Instinctive émincé en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats adultes préfèrent instinctivement. Ses nutriments soigneusement choisis pour la meilleure palatabilité possible en font un plat auquel votre chat ne pourra tout simplement pas résister. Incluant une combinaison de vitamines, de minéraux et d’acides aminés (tous nécessaires au maintien d’une bonne santé générale et à une croissance régulière), ROYAL CANIN® Instinctive émincé en gelée offre à votre chat une alimentation à la fois très digeste et équilibrée sur le plan nutritionnel. Ce mélange de nutriments n’a pas seulement été élaboré pour être préféré d’instinct et être sain sur le plan nutritionnel, mais aussi pour aider votre chat à maintenir son poids de forme et à renforcer le bon fonctionnement de son système urinaire. ROYAL CANIN® Instinctive émincé en gelée contient la teneur recommandée en matières grasses pour une bonne régulation des niveaux d’énergie et le maintien du poids. De plus, le mélange de fibres et de protéines contribue à la sensation de satiété. Pour répondre aux préférences de chaque chat, ROYAL CANIN® Instinctive est également disponible en émincé en sauce ou en mousse.\",\"EretailShort Description\":\"Trouver une alimentation à la fois nutritive et appétissante pour votre chat n’est pas toujours chose simple. Les chats sont parfois capricieux et refusent de manger des aliments qui ne sont pas à leur goût – même s’ils sont faits sur mesure pour contenir les nutriments dont votre chat a besoin.\\n \\nROYAL CANIN® Instinctive émincé en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats adultes préfèrent instinctivement. Ses nutriments soigneusement choisis pour la meilleure palatabilité possible en font un plat auquel votre chat ne pourra tout simplement pas résister.\\n \\nIncluant une combinaison de vitamines, de minéraux et d’acides aminés (tous nécessaires au maintien d’une bonne santé générale et à une croissance régulière), ROYAL CANIN® Instinctive émincé en gelée offre à votre chat une alimentation à la fois très digeste et équilibrée sur le plan nutritionnel.\\n \\nCe mélange de nutriments n’a pas seulement été élaboré pour être préféré d’instinct et être sain sur le plan nutritionnel, mais aussi pour aider votre chat à maintenir son poids de forme et à renforcer le bon fonctionnement de son système urinaire.\\n \\nROYAL CANIN® Instinctive émincé en gelée contient la teneur recommandée en matières grasses pour une bonne régulation des niveaux d’énergie et le maintien du poids. De plus, le mélange de fibres et de protéines contribue à la sensation de satiété.\\n \\nPour répondre aux préférences de chaque chat, ROYAL CANIN® Instinctive est également disponible en émincé en sauce ou en mousse.\\n\",\"Prescriber Description\":\"ROYAL CANIN® Instinctive émincé en gelée est conçu pour correspondre au profil macro-nutritionnel optimal que les chats adultes préfèrent instinctivement. Ses nutriments soigneusement choisis pour la meilleure palatabilité possible en font un plat auquel votre chat ne pourra tout simplement pas résister. - Instinctivement préféré - Santé du système urinaire - Maintien du poids idéal\"}])]",
      //               "goodsMobileDetail": null,
      //               "stock": null,
      //               "goodsInfoIds": null,
      //               "storeCateIds": null,
      //               "storeCateNames": null,
      //               "companyType": null,
      //               "goodsCubage": 1,
      //               "freightTempId": 62,
      //               "freightTempName": null,
      //               "saleType": 0,
      //               "goodsVideo": null,
      //               "linePrice": null,
      //               "allowPriceSet": 0,
      //               "goodsEvaluateNum": 0,
      //               "goodsCollectNum": 0,
      //               "goodsSalesNum": 5,
      //               "goodsFavorableCommentNum": 0,
      //               "grouponForbiddenFlag": false,
      //               "subscriptionStatus": 1,
      //               "minMarketPrice": 14.99,
      //               "minSubscriptionPrice": 13.49,
      //               "avgEvaluate": null,
      //               "avgEvaluateScore": null,
      //               "baseSpec": null,
      //               "saleableFlag": 1,
      //               "displayFlag": 1,
      //               "weShareId": 129166,
      //               "weightValue": "None",
      //               "goodsStoreCateNames": null,
      //               "productCategoryNames": null,
      //               "defaultPurchaseType": null,
      //               "defaultFrequencyId": null,
      //               "resource": null,
      //               "promotions": "club",
      //               "goodsPillar": null,
      //               "exclusiveFlag": null,
      //               "wsEnergyCategory": "normal_outdoor_fcn_breed",
      //               "wsReferenceEnergyValue": 983,
      //               "wsTechnologyCode": "wet",
      //               "wsDensity": 1,
      //               "sourceCreateTime": null,
      //               "sourceUpdateTime": "2022-03-27 22:38:49.000",
      //               "serviceTypeId": null,
      //               "assignResources": null
      //             },
      //             "goodsPromotion": null,
      //             "description": null,
      //             "auditCatFlag": null,
      //             "prescriberFlag": null,
      //             "goodsMeasureNum": null,
      //             "goodsMeasureUnit": "",
      //             "subscriptionDiscountPrice": null,
      //             "goodsInfoFlag": null,
      //             "periodTypeId": null,
      //             "purchasePrice": null,
      //             "goodsInfoType": null,
      //             "goodsInfoBundleRels": [

      //             ],
      //             "recommendationId": null,
      //             "recommendationName": null,
      //             "recommendationSerialCode": null,
      //             "weShareScode": null,
      //             "packSize": "",
      //             "subscriptionPercentage": null,
      //             "maxStock": null,
      //             "subscriptionPlanId": null,
      //             "packageId": null,
      //             "subscriptionPlanPromotionFlag": null,
      //             "settingPrice": null,
      //             "virtualInventory": null,
      //             "virtualAlert": null,
      //             "marketingCode": null,
      //             "marketingName": null,
      //             "promotionDiscountPrice": null,
      //             "marketingId": null,
      //             "externalSku": "237550",
      //             "promotions": "club",
      //             "isOfflineStore": null,
      //             "petsId": null,
      //             "petsType": null,
      //             "questionParams": null,
      //             "referenceData": null,
      //             "depth": 0,
      //             "depthUnit": "mm",
      //             "width": 0,
      //             "widthUnit": "mm",
      //             "height": 0,
      //             "heightUnit": "mm",
      //             "specification": null,
      //             "isNotShowCart": null,
      //             "externalStock": 408,
      //             "externalMarketPrice": 14.99,
      //             "externalSubscriptionPrice": 13.49,
      //             "externalLinePrice": 0,
      //             "externalPurchasePrice": null,
      //             "factor": 1,
      //             "stockUomId": "33586ce71f5811ecaa72a77450361cec",
      //             "priceUomId": "33586ce71f5811ecaa72a77450361cec",
      //             "priceUom": null,
      //             "stockUom": null,
      //             "defaultSku": 0,
      //             "displayOnShop": 1,
      //             "productCategory": null,
      //             "cateRate": null
      //           }
      //         ],
      //         "goodsAttributesValueRelVOList": [
      //           {
      //             "id": "GAR202204250827026840",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20210707094201787",
      //             "goodsAttributeValueId": "AV76832570398162944",
      //             "goodsAttributeName": "Species",
      //             "goodsAttributeNameEn": "Species",
      //             "goodsAttributeValue": "Cat",
      //             "goodsAttributeValueEn": "Cat",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           },
      //           {
      //             "id": "GAR202204250827026841",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20210621090253754",
      //             "goodsAttributeValueId": "AV71024517134053376",
      //             "goodsAttributeName": "Portfolio Classification",
      //             "goodsAttributeNameEn": "Portfolio Classification",
      //             "goodsAttributeValue": "ROYAL CANIN / SPT Retail / Feline Health Nutrition Wet",
      //             "goodsAttributeValueEn": "ROYAL CANIN / SPT Retail / Feline Health Nutrition Wet",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           },
      //           {
      //             "id": "GAR202204250827026842",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20210129065742589",
      //             "goodsAttributeValueId": "AV145394772401610752",
      //             "goodsAttributeName": "Pillar",
      //             "goodsAttributeNameEn": "Pillar",
      //             "goodsAttributeValue": "SPT",
      //             "goodsAttributeValueEn": "SPT Retail",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           },
      //           {
      //             "id": "GAR202204250827026843",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20201209075253707",
      //             "goodsAttributeValueId": "AV202012160309154906",
      //             "goodsAttributeName": "Sterilized",
      //             "goodsAttributeNameEn": "STÉRILISÉ",
      //             "goodsAttributeValue": "false",
      //             "goodsAttributeValueEn": "NON",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           },
      //           {
      //             "id": "GAR202204250827026844",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20201209071503738",
      //             "goodsAttributeValueId": "AV202012160309230726",
      //             "goodsAttributeName": "Range",
      //             "goodsAttributeNameEn": "Gramme",
      //             "goodsAttributeValue": "Feline Health Nutrition Wet_Cat",
      //             "goodsAttributeValueEn": "Bouchées en sauce",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           },
      //           {
      //             "id": "GAR202204250827026845",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20201209071341624",
      //             "goodsAttributeValueId": "AV202012160309231106",
      //             "goodsAttributeName": "Breeds",
      //             "goodsAttributeNameEn": "RACE",
      //             "goodsAttributeValue": "Cat_Cat",
      //             "goodsAttributeValueEn": "Tous les chats",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           },
      //           {
      //             "id": "GAR202204250827026846",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20201209071322816",
      //             "goodsAttributeValueId": "AV202012160309158056",
      //             "goodsAttributeName": "Technology",
      //             "goodsAttributeNameEn": "Texture des aliments",
      //             "goodsAttributeValue": "Wet",
      //             "goodsAttributeValueEn": "Bouchées en sauce ou en gelée",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           },
      //           {
      //             "id": "GAR202204250827026847",
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "goodsAttributeId": "A20201209071242331",
      //             "goodsAttributeValueId": "AV202012160309229266",
      //             "goodsAttributeName": "Lifestages",
      //             "goodsAttributeNameEn": "ÂGE",
      //             "goodsAttributeValue": "Adult_Cat",
      //             "goodsAttributeValueEn": "Adulte (1-7 ans)",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": null,
      //             "delTime": null,
      //             "delFlag": false,
      //             "dataSource": 1
      //           }
      //         ],
      //         "goodsSpecs": [
      //           {
      //             "specId": 67047168,
      //             "goodsId": "8a7080567faf8ff5017fb4862b860005",
      //             "specName": "Taille",
      //             "createTime": "2022-04-25 08:27:03.000",
      //             "updateTime": "2022-04-25 08:27:03.000",
      //             "delFlag": 0,
      //             "mockSpecId": 67047168,
      //             "specDetailIds": null,
      //             "editable": null
      //           }
      //         ]
      //       }
      //     ],
      //     "goodsIntervalPrices": [

      //     ],
      //     "purchaseCount": 1,
      //     "num": 1
      //   },
      //   "defaultLocalDateTime": "2022-05-13 10:49:46.246"
      // }
      let goodsList = res.context.goodsList.map((item) => {
        item.sizeList = getDetail({
          goodsInfos: item.goodsInfos,
          goodsSpecDetails: item.goodsSpecDetails,
          goodsSpecs: item.goodsSpecs,
          goodsInfoNo: item.goodsInfoNo,
          goodsInfoId: item.goodsInfoId
        });
        item.selected = true;
        item.quantity = item.buyCount;
        return item;
      });

      await this.props.checkoutStore.updateUnloginCart({
        cartData: goodsList,
        intl: this.props.intl
      });
    }

    setSeoConfig({
      pageName: 'Cart page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.getGoodsIdArr();
    await getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res,
        form: Object.assign(this.state.form, {
          frequencyVal: res[0]?.valueEn || '',
          frequencyName: res[0]?.name || '',
          frequencyId: res[0]?.id || ''
        })
      });
    });
    this.setState(
      {
        promotionInputValue: this.props.checkoutStore.promotionCode
      },
      () => {
        setTimeout(() => {
          document.getElementById('promotionApply') &&
            document.getElementById('promotionApply').click();
        });
      }
    );
    GACartScreenLoad(() =>
      GAInitUnLogin({
        productList: this.props.checkoutStore.cartData,
        frequencyList: this.state.frequencyList,
        props: this.props,
        isReturnList: true
      })
    );
    this.setCartData({ initPage: true });

    if (guestId) {
      await this.handleCheckout();
    }
    // shop推荐链接超出数量，页面加载不出来的问题(只要加购报错都跳转到购物车界面，把错误message带过去显示)
    const errMsg = this.props.history.location?.state?.errMsg;
    // const errMsg = funcUrl({ name: 'errorMsg' });
    if (errMsg) {
      this.showErrMsg(errMsg);
    }
  }
  GACheckUnLogin(productList) {
    let product = [],
      basketAmount = this.tradePrice,
      basketID = guid,
      option = '',
      step = 1;
    for (let item of productList) {
      let cur_selected_size = item.sizeList.filter((item2) => {
        return item2.selected == true;
      });
      let variant = cur_selected_size[0].specText;
      let goodsInfoNo = cur_selected_size[0].goodsInfoNo;
      product.push({
        brand: item.brandName || 'ROYAL CANIN',
        // category: item.goodsCateName ? JSON.parse(item.goodsCateName)[0] : '',
        category: item.goodsCateName,
        club: 'no',
        id: item.goodsNo,
        name: item.goodsName,
        price:
          item.goodsInfoFlag == 1
            ? item.minSubscriptionPrice
            : item.minMarketPrice,
        quantity: item.quantity,
        recommendation: 'self-selected',
        type: item.goodsInfoFlag == 1 ? 'subscription' : 'one-time',
        variant: parseInt(variant),
        sku: goodsInfoNo
      });
    }
    try {
      dataLayer[0].checkout.basketAmount = basketAmount;
      dataLayer[0].checkout.basketID = basketID;
      dataLayer[0].checkout.option = option;
      dataLayer[0].checkout.product = product;
      dataLayer[0].checkout.step = step;
    } catch (err) {
      console.log(err);
    }
  }
  setCartData({ initPage = false } = {}) {
    !isHubGA && this.GACheckUnLogin(this.props.checkoutStore.cartData);
    const { configStore } = this.props;
    let productList = this.props.checkoutStore.cartData.map((el) => {
      let filterData =
        this.computedList.filter((item) => item.id === el.periodTypeId)[0] ||
        this.computedList[0];
      if (el.goodsInfoFlag) {
        el.form = {
          frequencyVal: filterData?.valueEn,
          frequencyName: filterData?.name,
          frequencyId:
            filterData?.id ||
            el.goods.defaultFrequencyId ||
            configStore?.defaultSubscriptionFrequencyId,
          //GA 计算周数
          frequencyType: filterData?.type
        };
      } else {
        if (el.promotions?.includes('club')) {
          el.form = {
            frequencyVal: filterData?.valueEn,
            frequencyName: filterData?.name,
            frequencyId:
              el.goods?.defaultFrequencyId ||
              configStore.info?.storeVO.defaultSubscriptionClubFrequencyId ||
              filterData?.id,
            frequencyType: filterData?.type
          };
        } else {
          el.form = {
            frequencyVal: filterData?.valueEn,
            frequencyName: filterData?.name,
            frequencyId:
              el.goods?.defaultFrequencyId ||
              configStore.info?.storeVO?.defaultSubscriptionFrequencyId ||
              filterData?.id,
            frequencyType: filterData?.type
          };
        }
      }
      return el;
    });

    if (isShowMixFeeding()) {
      getMixFeedings(productList.map((el) => el.goodsId)).then((res) => {
        let unHandleMixFeedings = res?.context;
        if (unHandleMixFeedings && unHandleMixFeedings.length) {
          let mixFeedings = productList.map((el, i) => {
            let mixFeeding = handleRecommendation(
              unHandleMixFeedings[i].goodsRelationAndRelationInfos.filter(
                (el) => el.sort === 0
              )[0] || unHandleMixFeedings[i].goodsRelationAndRelationInfos[0]
            );
            if (mixFeeding) {
              mixFeeding.quantity = 1;
            }
            return mixFeeding;
          });
          this.setState({ mixFeedings });
        }
      });
    }

    this.setState(
      {
        productList
      },
      () => {
        this.queryEmptyCartSeo();
      }
    );
  }
  // 若为空购物车，则要用其他seo
  queryEmptyCartSeo() {
    if (!this.state.productList.length) {
      // 延时是为了，页面初始化时，先请求Cart page的seo，再请求Empty Cart page时，会导致第一个先回来
      setTimeout(() => {
        setSeoConfig({
          pageName: 'Empty Cart page'
        }).then((res) => {
          this.setState({ seoConfig: res });
        });
      }, 1000);
    }
  }
  showErrMsg(msg) {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    clearTimeout(this.timer);
    this.setState({
      errorMsg: msg
    });
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  }
  handleSelectedItemChange(pitem, data) {
    pitem.form.frequencyVal = data.value;
    pitem.form.frequencyName = data.name;
    pitem.form.frequencyId = data.id;
    pitem.periodTypeId = data.id;
    this.changeFrequencyType(pitem);
  }
  GAAccessToGuestCheck() {
    if (isHubGA) return;
    window?.dataLayer?.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}guestCheckout`,
      interaction: {
        category: 'checkout',
        action: 'guest checkout',
        label: 'cart page', //"cart page cart pop-in "
        value: 1
      }
    });
  }
  savePromotionCode = (promotionCode) => {
    this.setState({
      promotionCode
    });
  };
  toggleMobileCart(name) {
    this.setState({ mobileCartVisibleKey: name });
  }
  async handleCheckout({ needLogin = false } = {}) {
    if (!this.btnStatus) {
      return false;
    }
    try {
      this.GAAccessToGuestCheck();
      localItemRoyal.set('okta-redirectUrl', '/cart-force-to-checkout');
      const { configStore, checkoutStore, history, clinicStore } = this.props;
      this.setState({ checkoutLoading: true });
      await this.updateStock({ isThrowErr: true });
      if (!needLogin) {
        const url = await distributeLinktoPrecriberOrPaymentPage({
          configStore,
          checkoutStore,
          clinicStore,
          isLogin: false
        });
        url && history.push(url);
      }
    } catch (e) {
      console.log(e);
      this.showErrMsg(e.message);
      throw new Error(e);
    } finally {
      this.setState({ checkoutLoading: false });
    }
  }
  //GA 移除购物车商品 埋点
  GARemoveFromCart(product) {
    if (isHubGA) return;
    const cur_selected_size = product.sizeList.filter((item) => {
      return item.selected == true;
    });
    const variant = cur_selected_size[0].specText;
    const goodsInfoNo = cur_selected_size[0].goodsInfoNo;
    const list = [
      {
        name: product.goodsName,
        id: product.goodsNo,
        club: 'no',
        type: product.goodsInfoFlag == 1 ? 'subscription' : 'one-time',
        price:
          product.goodsInfoFlag == 1
            ? product.minSubscriptionPrice
            : product.minMarketPrice,
        brand: 'Royal Canin',
        category: product.goodsCateName,
        variant: variant,
        quantity: product.quantity ? product.quantity : '',
        recommendation: 'self-selected', //self-selected, recommanded
        sku: goodsInfoNo
      }
    ];
    window?.dataLayer?.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComRemoveFromCart`,
      ecommerce: {
        remove: {
          products: list
        }
      }
    });
  }
  deleteProduct(item) {
    let { currentProductIdx, productList } = this.state;
    const product = productList[currentProductIdx];
    item.confirmTooltipVisible = false;
    productList.splice(currentProductIdx, 1);
    this.setState(
      {
        productList
      },
      () => {
        this.updateStock();
        !isHubGA && this.GARemoveFromCart(product);
        isHubGA &&
          window?.dataLayer?.push({
            event: 'removeFromCart'
          });
        this.queryEmptyCartSeo();
      }
    );
  }
  async updateStock({ isThrowErr, callback } = {}) {
    try {
      const { productList } = this.state;
      this.setState({ checkoutLoading: true });
      await this.props.checkoutStore.updateUnloginCart({
        cartData: productList,
        isThrowErr,
        intl: this.props.intl
      });
      callback && callback();
      this.getGoodsIdArr(); //删除相关商品
      this.setState({ checkoutLoading: false });
      //增加数量 重新埋点 start
      !isHubGA && this.GACheckUnLogin(this.props.checkoutStore.cartData);
      //增加数量 重新埋点 end
    } catch (err) {
      throw new Error(err.message);
    }
  }
  toggleSelect(pitem) {
    pitem.selected = !pitem.selected;
    this.setState(
      {
        productList: this.state.productList
      },
      () => {
        this.updateStock();
      }
    );
  }
  getQuantityBox = (pitem) => {
    const {
      configStore: {
        info: { skuLimitThreshold }
      }
    } = this.props;
    const { productList } = this.state;
    return (
      <div className="cart-quantity-container">
        <div className="product-card-footer product-card-price d-flex">
          <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
            <div>
              <FormattedMessage id="quantity" />:{' '}
            </div>
            <QuantityPicker
              initQuantity={pitem.quantity}
              min={1}
              max={skuLimitThreshold.skuMaxNum}
              initRestTotalLimitConf={{
                num:
                  skuLimitThreshold.totalMaxNum -
                  productList
                    .filter((p) => p.goodsId !== pitem.goodsId)
                    .reduce((pre, cur) => {
                      return Number(pre) + Number(cur.quantity);
                    }, 0),
                errorMsg: (
                  <FormattedMessage
                    id="cart.errorAllProductNumLimit"
                    values={{ val: skuLimitThreshold.skuMaxNum }}
                  />
                )
              }}
              updateQuantity={(val) => {
                pitem.quantity = val;
                setTimeout(() => {
                  this.updateStock();
                });
              }}
              showError={this.showErrMsg}
            />
          </div>
        </div>
      </div>
    );
  };
  getSizeBox = (pitem, index) => {
    let isGift = !!pitem.subscriptionPlanGiftList;
    return (
      <div
        className={`product-quickview product-null product-wrapper product-detail ${
          isGift ? 'gift-size-mobile-fr' : ''
        }`}
        // style={{ display: `${isGift ? 'initial' : 'none'}` }}
      >
        <div className="detail-panel">
          <section className="attributes">
            <div data-attr="size" className="swatch">
              <div className="cart-and-ipay">
                <div className="rc-swatch __select-size">
                  {/* <div className="rc-swatch__item selected">
              <span>
                {find(pitem.sizeList, s => s.selected).specText}
              </span>
            </div> */}
                  {pitem.goodsSpecs &&
                    pitem.goodsSpecs.map((sItem, i) => (
                      <div key={i} className="overflow-hidden">
                        <div className="text-left ml-1 text-capitalize">
                          {sItem.specName}:
                        </div>
                        {sItem.chidren.map((sdItem, i2) => (
                          <div
                            style={{
                              display: `${
                                !sdItem.selected && isGift ? 'none' : 'initial'
                              }`
                            }}
                            className={`rc-swatch__item ${
                              sdItem.selected ? 'selected' : ''
                            } ${sdItem.isEmpty ? 'outOfStock' : ''}`}
                            key={i2}
                            onClick={() =>
                              this.handleChooseSize(sdItem, pitem, index)
                            }
                          >
                            <span key={i2}>{sdItem.detailName}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };
  getProducts(plist) {
    const { intl } = this.props;
    const { mixFeedings } = this.state;
    const Lists = plist.map((pitem, index) => {
      {
        var isGift = !!pitem.subscriptionPlanGiftList;
      }
      return (
        <div className="product-info" key={index}>
          <div
            className={`rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile ${
              isGift ? 'no-margin-bottom' : 'has-margin-bottom'
            }`}
          >
            <span className="remove-product-btn z-50">
              <span
                className="rc-icon rc-close--sm rc-iconography inline-block"
                style={{ width: '32px', height: '32px' }}
                onClick={() => {
                  this.updateConfirmTooltipVisible(pitem, true);
                  this.setState({ currentProductIdx: index });
                }}
              />
              <ConfirmTooltip
                containerStyle={{ transform: 'translate(-89%, 105%)' }}
                arrowStyle={{ left: '89%' }}
                display={pitem.confirmTooltipVisible}
                confirm={(e) => this.deleteProduct(pitem)}
                updateChildDisplay={(status) =>
                  this.updateConfirmTooltipVisible(pitem, status)
                }
                content={<FormattedMessage id="confirmDeleteProduct" />}
              />
            </span>
            <div
              className="rc-input rc-input--inline position-absolute hidden"
              style={{ left: '1%' }}
              onClick={() => this.toggleSelect(pitem)}
            >
              <input
                type="checkbox"
                className="rc-input__checkbox"
                checked={pitem.selected}
              />
              <label className="rc-input__label--inline">&nbsp;</label>
            </div>
            <div className="d-flex">
              <div className="product-info__img mr-2 overflow-hidden">
                <LazyLoad>
                  <img
                    className="w-100"
                    src={
                      optimizeImage({
                        originImageUrl: find(pitem.sizeList, (s) => s.selected)
                          .goodsInfoImg
                      }) || optimizeImage({ originImageUrl: pitem.goodsImg })
                    }
                    alt={pitem.goodsName}
                    title={pitem.goodsName}
                  />
                </LazyLoad>
              </div>
              <div className="product-info__desc relative" style={{ flex: 1 }}>
                <Link
                  className="ui-cursor-pointer rc-margin-top--xs rc-padding-right--sm align-items-md-center flex-column flex-md-row mt-0"
                  to={`/${pitem.goodsName
                    .toLowerCase()
                    .split(' ')
                    .join('-')
                    .replace('/', '')}-${pitem.goodsNo}`}
                >
                  <h4
                    className="rc-gamma rc-margin--none ui-text-overflow-line2 ui-text-overflow-md-line1 d-md-inline-block cart-item-md__tagging_title order-2"
                    title={pitem.goodsName}
                  >
                    {pitem.goodsName}
                  </h4>
                  {pitem.taggingForImageAtCart?.taggingImgUrl ? (
                    <LazyLoad className="order-1 md:order-3">
                      <img
                        src={pitem.taggingForImageAtCart?.taggingImgUrl}
                        className="cart-item__tagging_image ml-2"
                        alt="tagging image"
                      />
                    </LazyLoad>
                  ) : null}
                </Link>
                <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
                  <div
                    style={{
                      maxWidth: '250px',
                      width: isMobile ? '9rem' : 'inherit'
                    }}
                  >
                    {/* <div className="productGoodsSubtitle">
                    {pitem.goodsSubtitle}
                  </div> */}
                    <div className="align-left flex">
                      <div className="stock__wrapper">
                        <div className="stock flex">
                          <label
                            className={[
                              'availability',
                              pitem.addedFlag &&
                              pitem.quantity <=
                                pitem.sizeList.filter((el) => el.selected)[0]
                                  .stock
                                ? 'instock'
                                : 'outofstock'
                            ].join(' ')}
                          >
                            <span className="title-select">
                              {/* <FormattedMessage id="details.availability" /> : */}
                            </span>
                          </label>
                          <span className="availability-msg inline-block">
                            {console.log(111111, pitem.quantity)}
                            <div
                              className={[
                                pitem.addedFlag &&
                                pitem.quantity <=
                                  pitem.sizeList.filter((el) => el.selected)[0]
                                    .stock
                                  ? ''
                                  : 'out-stock'
                              ].join(' ')}
                            >
                              {pitem.addedFlag &&
                              pitem.quantity <=
                                pitem.sizeList.filter((el) => el.selected)[0]
                                  .stock ? (
                                <FormattedMessage id="details.inStock" />
                              ) : pitem.addedFlag ? (
                                <FormattedMessage id="details.outStock" />
                              ) : (
                                <FormattedMessage id="details.OffShelves" />
                              )}
                            </div>
                          </span>
                          {/* <label className="availability instock">
                        <span className="title-select"></span>
                      </label>
                      <span
                        className="availability-msg"
                        data-ready-to-order="true"
                      >
                        <div>
                          <FormattedMessage id="details.inStock" />
                        </div>
                      </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {!isGift && this.getSizeBox(pitem, index)}
                  {!isGift && this.getQuantityBox(pitem, index)}
                </div>
              </div>
            </div>
            <div
              className={`buyMethodBox -mx-4 ${
                pitem.sizeList.filter((el) => el.selected)[0]
                  .subscriptionStatus &&
                pitem.sizeList.filter((el) => el.selected)[0].subscriptionPrice
                  ? 'rc-two-column'
                  : ''
              }`}
            >
              <div className="rc-column">
                <OneOffSelection
                  isGift={isGift}
                  pitem={pitem}
                  isLogin={false}
                  chooseOneOff={this.hanldeToggleOneOffOrSub.bind(this, {
                    goodsInfoFlag: 0,
                    periodTypeId: null,
                    pitem
                  })}
                />
                {isGift && this.getSizeBox(pitem, index)}
                {isGift && this.getQuantityBox(pitem, index)}
              </div>
              {pitem.sizeList.filter((el) => el.selected)[0]
                .subscriptionStatus &&
              pitem.sizeList.filter((el) => el.selected)[0].subscriptionPrice &&
              formatMoney(this.tradePrice) !== '0,00 €' ? (
                <div className="rc-column  rc-padding-left--none--desktop">
                  {!pitem.promotions || !pitem.promotions.includes('club') ? (
                    <SubscriptionSelection
                      isGift={isGift}
                      pitem={pitem}
                      activeToolTipIndex={this.state.activeToolTipIndex}
                      index={index}
                      toolTipVisible={this.state.toolTipVisible}
                      computedList={this.computedList.filter(
                        (el) => el.goodsInfoFlag === 1
                      )}
                      chooseSubscription={this.hanldeToggleOneOffOrSub.bind(
                        this,
                        {
                          goodsInfoFlag: 1,
                          periodTypeId: pitem.form.frequencyId,
                          pitem
                        }
                      )}
                      changeFrequency={(pitem, data) =>
                        this.handleSelectedItemChange(pitem, data)
                      }
                      isLogin={false}
                      setState={this.setState.bind(this)}
                    />
                  ) : null}
                  {pitem.promotions && pitem.promotions.includes('club') ? (
                    <ClubSelection
                      isGift={isGift}
                      pitem={pitem}
                      activeToolTipIndex={this.state.activeToolTipIndex}
                      index={index}
                      toolTipVisible={this.state.toolTipVisible}
                      computedList={this.computedList.filter(
                        (el) => el.goodsInfoFlag === 2
                      )}
                      chooseSubscription={this.hanldeToggleOneOffOrSub.bind(
                        this,
                        {
                          goodsInfoFlag: 2,
                          periodTypeId: pitem.form.frequencyId,
                          pitem
                        }
                      )}
                      changeFrequency={(pitem, data) =>
                        this.handleSelectedItemChange(pitem, data)
                      }
                      isLogin={false}
                      setState={this.setState.bind(this)}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          {mixFeedings &&
          mixFeedings[index] &&
          plist.filter((el) => el.goodsNo === mixFeedings[index].goods.goodsNo)
            .length === 0 ? (
            <MixFeedingBox
              isLogin={false}
              mixFeedingData={mixFeedings[index]}
              goodsInfoFlag={pitem.goodsInfoFlag}
              periodTypeId={pitem.periodTypeId}
              beforeUpdate={() => {
                this.setState({ checkoutLoading: true });
              }}
              update={() => {
                this.setCartData({ initPage: true });
                this.setState({ checkoutLoading: false });
              }}
              intl={intl}
            />
          ) : null}

          {pitem.promotions &&
          pitem.promotions.includes('club') &&
          pitem.goodsInfoFlag === 2 &&
          window.__.env.REACT_APP_COUNTRY !== 'ru' ? (
            <ClubGiftBanner intl={intl} />
          ) : null}
          {isGift &&
            false &&
            pitem.subscriptionPlanGiftList.map((gift) => (
              <div className="d-flex food-dispensor-box rc-border-all gift-text-center-mobile-gift rc-border-colour--interface product-info">
                <div className="name-info flex-column-gift rc-main-content__wrapper d-flex">
                  <img
                    className="img"
                    src={
                      optimizeImage({ originImageUrl: gift.goodsInfoImg }) ||
                      FOOD_DISPENSER_PIC
                    }
                    alt="goods Information Image"
                  />
                  <div className="mobile-text-center">
                    <div>{gift.goodsInfoName}</div>
                    <div>
                      x1{' '}
                      <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
                    </div>
                  </div>
                </div>
                <div className="tips-info mobile-text-center">
                  You can cancel your subscription anytime, but you will have to
                  pay the remaining balance of the dispenser market price of 120
                  euros.*
                </div>
              </div>
            ))}
        </div>
      );
    });
    return Lists;
  }
  /**
   *
   * @param {*} pItem 单条product info
   * @param {*} sizeItem 当前product选中的规格信息
   * @param {*} index 当前product的索引
   */
  async handleChooseSize(sdItem, pitem, index) {
    if (sdItem.isEmpty || sdItem.isUnitPriceZero) {
      return false;
    }
    pitem.goodsSpecs
      .filter((item) => item.specId === sdItem.specId)[0]
      .chidren.map((item) => {
        item.selected = item.specDetailId === sdItem.specDetailId;
        return item;
      });

    let selectedSpecIds = [];
    let selectedSpecDetailId = [];
    for (let item of pitem.goodsSpecs) {
      const selectedItem = item.chidren.filter((ele) => ele.selected)[0];
      selectedSpecIds.push(selectedItem.specId);
      selectedSpecDetailId.push(selectedItem.specDetailId);
    }

    const selectedGoodsInfo = pitem.goodsInfos.filter(
      (ele) =>
        unique(ele.mockSpecIds).sort().toString() ===
          selectedSpecIds.sort().toString() &&
        unique(ele.mockSpecDetailIds).sort().toString() ===
          selectedSpecDetailId.sort().toString()
    )[0];
    // 之前sku pitem.goodsInfoId
    // 增加当前sku selectedGoodsInfo.goodsInfoId
    Array.from(pitem.sizeList, (ele) => {
      ele.selected = selectedGoodsInfo.goodsInfoId === ele.goodsInfoId;
      return ele;
    });

    const { productList } = this.state;
    // 合并购物车，有相同规格的，删除本条
    const tmpIdx = findIndex(
      productList.filter((el, i) => i !== index),
      (ele) =>
        find(ele.sizeList, (s) => s.selected).goodsInfoId ===
        selectedGoodsInfo.goodsInfoId
    );
    if (tmpIdx > -1) {
      productList.splice(tmpIdx, 1);
    }
    // await this.handleRemovePromotionCode();
    // this.props.checkoutStore.removePromotionCode();
    this.setState(
      {
        productList
      },
      () => {
        this.updateStock({ callback: this.clearPromotionCode.bind(this) });
      }
    );
  }
  updateConfirmTooltipVisible(item, status) {
    let { productList } = this.state;
    item.confirmTooltipVisible = status;
    this.setState({
      productList: productList
    });
  }
  handlerChange = (e) => {
    this.setState({
      isShowValidCode: false,
      promotionInputValue: e.target.value
    });
  };
  getCheckotBtn = () => {
    const { intl, configStore } = this.props;
    const { paymentAuthority } = configStore;
    const { checkoutLoading, mobileCartVisibleKey } = this.state;
    return (
      <a className={`${checkoutLoading ? 'ui-btn-loading' : ''}`}>
        <div className="rc-padding-y--xs rc-column">
          {this.totalNum > 0 ? (
            <LoginButton
              beforeLoginCallback={async () => {
                try {
                  await this.handleCheckout({ needLogin: true });
                } catch (err) {
                  throw new Error(err);
                }
              }}
              btnClass={`${this.btnStatus ? '' : 'rc-btn-solid-disabled'} ${
                checkoutLoading ? 'ui-btn-loading' : ''
              } rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width`}
              intl={intl}
            >
              <FormattedMessage id="checkout" />
            </LoginButton>
          ) : (
            <div
              className={`${
                this.btnStatus ? '' : 'rc-btn-solid-disabled'
              } rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width rc-btn-solid-disabled`}
            >
              <FormattedMessage id="checkout" />
            </div>
          )}
        </div>
        <div className="rc-padding-y--xs rc-column">
          {this.totalNum > 0 ? (
            this.props.checkoutStore.cartData.filter((el) => el.goodsInfoFlag)
              .length > 0 ? (
              <div className="text-center" style={{ fontSize: '.9375rem' }}>
                <FormattedMessage id="unLoginSubscriptionTips" />
              </div>
            ) : paymentAuthority === 'MEMBER_AND_VISITOR' ? (
              <div
                className="text-center"
                onClick={() => this.handleCheckout()}
              >
                <div
                  className={`rc-styled-link color-999 ${
                    checkoutLoading
                      ? 'ui-btn-loading ui-btn-loading-border-red'
                      : ''
                  }`}
                  aria-pressed="true"
                >
                  <FormattedMessage id="guestCheckout" />
                </div>
              </div>
            ) : null
          ) : paymentAuthority === 'MEMBER_AND_VISITOR' ? (
            <div className="text-center">
              <div className="rc-styled-link color-999 rc-btn-disabled">
                <FormattedMessage id="guestCheckout" />
                {mobileCartVisibleKey === 'less'
                  ? formatMoney(this.tradePrice)
                  : null}
              </div>
            </div>
          ) : null}
        </div>
      </a>
    );
  };
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { mobileCartVisibleKey, promotionCode } = this.state;
    const { checkoutStore } = this.props;
    const subtractionSign = '-';

    return (
      <div className={`${className}`} style={{ ...style }} id={id}>
        <div className="group-order rc-border-colour--interface cart__total__content rc-border-all bg-white">
          <div className="row">
            <div className="col-12 total-items medium">
              <FormattedMessage
                id="cart.totalProduct"
                values={{ val: this.totalNum }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <span className="rc-input rc-input--inline rc-input--label mr-0 w-full mb-2.5 mt-0 overflow-hidden">
                <FormattedMessage id="promotionCode">
                  {(txt) => (
                    <input
                      className="rc-input__control"
                      id="id-text2"
                      type="text"
                      name="text"
                      placeholder={txt}
                      value={this.state.promotionInputValue}
                      onChange={this.handlerChange}
                    />
                  )}
                </FormattedMessage>
                <label className="rc-input__label" htmlFor="id-text2" />
              </span>
            </div>
            <div className="col-6 no-padding-left">
              <p className="text-right sub-total">
                <button
                  id="promotionApply"
                  className={`rc-btn rc-btn--sm rc-btn--two mr-0 ${
                    this.state.isClickApply
                      ? 'ui-btn-loading ui-btn-loading-border-red my-2.5 float-right'
                      : ''
                  }`}
                  onClick={() => this.handleClickPromotionApply(false)}
                >
                  <FormattedMessage id="apply" />
                </button>
              </p>
            </div>
          </div>
          {this.state.isShowValidCode ? (
            <div className="red pl-3 pb-3 pt-2 text-sm">
              <FormattedMessage id="validPromotionCode" />
            </div>
          ) : null}
          {!this.state.isShowValidCode &&
            this.state.discount.map((el, i) => (
              <div
                className={`row leading-lines shipping-item d-flex m-2.5 overflow-hidden`}
                style={{
                  border: '1px solid #ccc',
                  height: '60px',
                  lineHeight: '60px'
                }}
                key={i}
              >
                <div
                  className={`${
                    !checkoutStore.couponCodeFitFlag ? 'col-6' : 'col-10'
                  }`}
                >
                  <p className="truncate">
                    {this.promotionDesc || (
                      <FormattedMessage id="NoPromotionDesc" />
                    )}
                  </p>
                </div>
                <div
                  className={`${
                    !checkoutStore.couponCodeFitFlag ? 'col-4' : 'col-0'
                  } red p-0`}
                >
                  <p className="mb-4">
                    {!checkoutStore.couponCodeFitFlag && (
                      <FormattedMessage id="Non appliqué" />
                    )}
                  </p>
                </div>
                <div className="col-2" style={{ padding: '0 .9375rem 0 0' }}>
                  <p className="text-right shipping-cost mb-4">
                    <span
                      className="rc-icon rc-close--sm rc-iconography ml-2.5 cursor-pointer leading-5 text-lg"
                      onClick={this.handleRemovePromotionCode}
                    />
                  </p>
                </div>
              </div>
            ))}
          <PriceDetailsList
            data={{
              totalPrice: this.totalPrice,
              taxFeePrice: this.taxFeePrice,
              subscriptionDiscountPrice: this.subscriptionDiscountPrice,
              deliveryPrice: this.deliveryPrice,
              freeShippingDiscountPrice: this.freeShippingDiscountPrice,
              freeShippingFlag: this.freeShippingFlag,
              promotionVOList: this.promotionVOList,
              isShowValidCode: this.state.isShowValidCode
            }}
          />
          <div className="group-total">
            <div className="row d-flex align-items-center">
              <div className="col-7 medium">
                <strong>
                  <FormattedMessage id="totalIncluIVA" />
                </strong>
              </div>
              <div className="col-5">
                <p className="text-right grand-total-sum medium mb-0">
                  {this.props.configStore?.customTaxSettingOpenFlag &&
                  this.props.configStore?.enterPriceType === 'NO_TAX' ? (
                    <>
                      {this.tradePrice > 0 ? (
                        formatMoney(this.tradePrice)
                      ) : (
                        <strong>{subtractionSign}</strong>
                      )}
                    </>
                  ) : (
                    formatMoney(this.tradePrice)
                  )}
                </p>
              </div>
            </div>
            <div className="row checkout-proccess rc-md-up">
              <div className="col-lg-12 checkout-continue">
                {this.getCheckotBtn()}
              </div>
            </div>

            <div className="checkout-product-summary rc-bg-colour--brand3 rc-border-all rc-border-colour--brand4 rc-md-down">
              <div
                className={`order-summary-title rc-padding--none align-items-center justify-content-center text-center ${
                  mobileCartVisibleKey === 'less' ? 'd-flex' : 'hidden'
                }`}
                onClick={this.toggleMobileCart.bind(this, 'more')}
              >
                <span
                  className="rc-icon rc-up rc-iconography"
                  style={{ transform: 'scale(.7)' }}
                />
                <span>
                  <FormattedMessage id="mobile.cart.orderSummary" />
                </span>
              </div>
              <PayProductInfo
                data={[]}
                needHideProductList={true}
                fixToHeader={false}
                style={{
                  background: '#fff',
                  maxHeight: '80vh'
                }}
                isGuestCart={true}
                className={`${mobileCartVisibleKey === 'more' ? '' : 'hidden'}`}
                ref="payProductInfo"
                location={this.props.location}
                history={history}
                buttonForCart={true}
                // frequencyName={subForm.frequencyName}
                // buyWay={subForm.buyWay}
                sendPromotionCode={this.savePromotionCode}
                promotionCode={promotionCode}
                operateBtnVisible={false}
                onClickHeader={this.toggleMobileCart.bind(this, 'less')}
                headerIcon={
                  <span className="rc-icon rc-down--xs rc-iconography" />
                }
              />
              {this.getCheckotBtn()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderSideCart({ fixToHeader = true }) {
    return fixToHeader ? (
      <div id="J_sidecart_container">
        {this.sideCart({
          className: 'hidden rc-md-up relative bg-white',
          style: {
            zIndex: 9,
            width: 320
          },
          id: 'J_sidecart_fix'
        })}
        {this.sideCart()}
      </div>
    ) : (
      this.sideCart()
    );
  }
  async changeFrequencyType(pitem) {
    this.setState({ errorMsg: '' });
    // await this.handleRemovePromotionCode();
    // this.props.checkoutStore.removePromotionCode();
    this.setState(
      {
        productList: this.state.productList
      },
      () => {
        this.updateStock({ callback: this.clearPromotionCode.bind(this) });
      }
    );
  }
  // 切换规格/单次订阅购买时，清空promotion code
  clearPromotionCode() {
    this.handleClickPromotionApply();
    // this.setState({
    //   discount: [],
    //   isShowValidCode: false,
    //   lastPromotionInputValue: '',
    //   promotionInputValue: ''
    // });
  }
  handleClickPromotionApply = async (falseCodeAndReRequest) => {
    //falseCodeAndReRequest 需要重新请求code填充公共code
    const { checkoutStore, loginStore, buyWay, intl } = this.props;
    let { promotionInputValue, discount } = this.state;
    if (!promotionInputValue && !falseCodeAndReRequest) return;

    let result = {};
    this.setState({
      isClickApply: !falseCodeAndReRequest,
      isShowValidCode: false,
      lastPromotionInputValue: promotionInputValue
    });
    if (loginStore.isLogin) {
      result = await checkoutStore.updateLoginCart({
        promotionCode: promotionInputValue,
        subscriptionFlag: buyWay === 'frequency',
        intl
      });
    } else {
      result = await checkoutStore.updateUnloginCart({
        promotionCode: promotionInputValue,
        intl
      });
    }
    if (
      result &&
      (!result.context.promotionFlag || result.context.couponCodeFlag)
    ) {
      //表示输入apply promotionCode成功
      discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
      this.setState({ discount });
      // this.props.sendPromotionCode(
      //   this.state.promotionInputValue
      // );
    } else {
      this.setState({
        isShowValidCode: true
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState(
          {
            isShowValidCode: false
          },
          () => {
            // 本次失败之后公共的code也被清空了，需要重新请求code填充公共code
            result &&
              result.code === 'K-000000' &&
              this.handleClickPromotionApply(true);
          }
        );
      }, 4000);
      // this.props.sendPromotionCode('');
    }
    this.setState({
      isClickApply: false,
      promotionInputValue: ''
    });
  };
  handleRemovePromotionCode = async () => {
    const { checkoutStore, loginStore, buyWay, intl } = this.props;
    let { discount } = this.state;
    let result = {};
    // await checkoutStore.removeCouponCodeFitFlag();
    await checkoutStore.removePromotionCode();
    await checkoutStore.removeCouponCode();
    if (!loginStore.isLogin) {
      //游客
      result = await checkoutStore.updateUnloginCart({ intl });
    } else {
      //会员
      result = await checkoutStore.updateLoginCart({
        promotionCode: '',
        subscriptionFlag: buyWay === 'frequency',
        intl
      });
    }
    this.setState({
      discount: [],
      isShowValidCode: false,
      lastPromotionInputValue: '',
      promotionInputValue: ''
    });
  };
  hanldeToggleOneOffOrSub({ goodsInfoFlag, periodTypeId: frequencyId, pitem }) {
    // goodsInfoFlag 1-订阅 0-单次购买
    // 当前状态与需要切换的状态相同时，直接返回
    if (pitem.goodsInfoFlag) {
      isHubGA && GACartChangeSubscription('Autoship');
    } else {
      isHubGA && GACartChangeSubscription('Single purchase');
    }

    if (pitem.goodsInfoFlag === goodsInfoFlag) {
      return false;
    }
    this.setState({ checkoutLoading: true });
    pitem.goodsInfoFlag = goodsInfoFlag;
    pitem.periodTypeId = frequencyId;
    this.changeFrequencyType(pitem);
  }
  render() {
    const { productList, errorMsg, goodsIdArr } = this.state;
    const { history, location } = this.props;
    const List = this.getProducts(this.state.productList);

    const dogsPic =
      window.__.env.REACT_APP_COUNTRY === 'fr' ? dogsImgFr : dogsImg;
    const catsPic =
      window.__.env.REACT_APP_COUNTRY === 'fr' ? catsImgFr : catsImg;
    return (
      <div className="Carts">
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        {this.state.circleLoading || this.state.checkoutLoading ? (
          <Loading
            bgColor={'#000'}
            opacity={this.state.checkoutLoading ? 0.3 : 1}
          />
        ) : null}
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main
          className={`rc-content--fixed-header ${
            productList.length ? '' : 'cart-empty'
          }`}
        >
          <BannerTip />
          <div className="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing pt-0 rc-padding-x--none--mobile">
            {productList.length ? (
              <>
                <div className="rc-layout-container rc-one-column pt-1">
                  <div className="rc-column d-flex">
                    <FormattedMessage id="continueShopping">
                      {(txt) => (
                        <DistributeHubLinkOrATag
                          href=""
                          to="/home"
                          className="ui-cursor-pointer-pure"
                        >
                          <span className="rc-header-with-icon rc-header-with-icon--gamma">
                            <span
                              className="rc-icon rc-left rc-iconography rc-icon-btnback"
                              style={{ transform: 'scale(.8)' }}
                            />
                            {txt}
                          </span>
                        </DistributeHubLinkOrATag>
                      )}
                    </FormattedMessage>
                  </div>
                </div>
                <div className="rc-layout-container rc-three-column cart cart-page pt-0">
                  <div className="rc-column rc-double-width pt-0">
                    <ErrorMessage msg={errorMsg} />
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        <FormattedMessage id="cart.yourShoppingCart" />
                      </h5>
                    </div>
                    <div id="product-cards-container">{List}</div>
                    <div id="product-cards-container">
                      {this.giftList.map((el, i) => (
                        <GiftList {...this.props} pitem={el} key={i} />
                      ))}
                    </div>
                    {window.__.env.REACT_APP_COUNTRY === 'us' && <CartSurvey />}
                  </div>
                  <div className="rc-column totals cart__total pt-0">
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        <FormattedMessage id="orderSummary" />
                      </h5>
                    </div>
                    {this.renderSideCart({
                      fixToHeader: false
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="rc-text-center">
                  <h1 className="rc-beta mb-1 mt-3 text-18">
                    <FormattedMessage id="cart.yourShoppingCart" />
                  </h1>
                  <div className="rc-gamma title-empty mb-0 text-center text-base md:text-2xl">
                    <FormattedMessage id="header.basketEmpty" />
                  </div>
                </div>
                <div className="content-asset">
                  <div className="rc-bg-colour--brand3 rc-padding--sm pt-0 pb-0">
                    <div className="rc-max-width--lg rc-padding-x--lg--mobile">
                      <div>
                        <div className="rc-alpha">
                          <h2 className="text-center text-lg md:text-3xl">
                            <FormattedMessage id="cart.fullPrice" />
                          </h2>
                        </div>
                        <div
                          className="d-flex justify-content-between flex-wrap ui-pet-item text-center"
                          style={
                            window.__.env.REACT_APP_COUNTRY === 'fr'
                              ? {}
                              : { margin: '0 10%' }
                          }
                        >
                          <div className="ui-item border radius-3">
                            <Link to="/dogs">
                              <LazyLoad>
                                <img
                                  className="w-100"
                                  src={dogsPic}
                                  alt="Dog products"
                                />
                              </LazyLoad>
                              <br />
                              <h4 className="card__title red">
                                <FormattedMessage id="cart.dogDiet" />
                              </h4>
                            </Link>
                          </div>
                          <div className="ui-item border radius-3">
                            <Link to="/cats">
                              <LazyLoad>
                                <img
                                  className="w-100"
                                  src={catsPic}
                                  alt="Cat products"
                                />
                              </LazyLoad>
                              <br />
                              <h4 className="card__title red">
                                <FormattedMessage id="cart.catDiet" />
                              </h4>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {this.state.relatedGoodsList.length > 0 ? (
            <ProductCarousel goodsList={this.state.relatedGoodsList} />
          ) : null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default UnLoginCart;
