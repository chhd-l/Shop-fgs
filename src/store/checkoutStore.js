import { action, observable, computed, runInAction } from 'mobx';
import { purchases, sitePurchases, siteMiniPurchases } from '@/api/cart';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { toJS } from 'mobx';
import stores from './index';
import {
  getProductPetConfig,
  calculateServiceFeeAndLoyaltyPoints
} from '@/api/payment';
import { NOTUSEPOINT } from '@/views/Payment/PaymentMethod/paymentMethodsConstant';
import { truncate } from 'fs';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const nullTaxFeeData = {
  country: '',
  region: '',
  city: '',
  street: '',
  postalCode: '',
  customerAccount: ''
};
const getLoginData = (data) => {
  // 登录情况下，有indv数据，直接到checkout页面下单
  let cartData = data || localItemRoyal.get('rc-cart-data-login') || [];
  cartData.forEach((el) => {
    el.isNotShowCart = el.goodsInfoFlag == 3 ? 1 : 0;
  });
  let indvData = cartData.find((el) => el.goodsInfoFlag == 3);
  if (indvData) {
    cartData = [indvData];
  }
  // console.info('cartData', cartData);
  return cartData;
};

class CheckoutStore {
  @observable cartData = localItemRoyal.get('rc-cart-data') || [];
  @observable AuditData = localItemRoyal.get('rc-audit-data') || [];
  @observable autoAuditFlag = localItemRoyal.get('rc-autoAuditFlag') || false;
  @observable petFlag = localItemRoyal.get('rc-petFlag') || false; // 商品列表
  @observable loginCartData = localItemRoyal.get('rc-cart-data-login') || []; // 商品列表
  @observable cartPrice = localItemRoyal.get('rc-totalInfo') || null; // 价格数据
  @observable goodsMarketingMap =
    localItemRoyal.get('goodsMarketingMap') || null; // promotion
  @observable isLoadingCartData = false;
  @observable outOfstockProNames = []; // 超出库存的商品
  @observable offShelvesProNames = []; // 下架的商品
  @observable deletedProNames = []; // 被删除的商品
  @observable notSeableProNames = []; // 不可销售的商品
  @observable couponCode = localItemRoyal.get('rc-couponCode') || '';
  @observable promotionCode =
    localItemRoyal.get('rc-couponCode') ||
    localItemRoyal.get('rc-promotionCode') ||
    '';
  // @observable clixRayPromotionCode = localItemRoyal.get('rc-clixRay-promotionCode')||'';// 是fr breeder的特殊code，需要主动默认填充
  @observable couponCodeFitFlag =
    localItemRoyal.get('rc-couponCodeFitFlag') || false;
  @observable pr_petsInfo = localItemRoyal.get('pr-petsInfo') || {};

  @observable installMentParam = null; // 分期参数

  @observable giftList = localItemRoyal.get('rc-giftList') || [];

  // @observable promotionDesc = localItemRoyal.get('rc-promotionDesc') || '';
  @observable GA_product = {};
  // @computed get loginCartData(){
  //  return getLoginData()
  // }
  @observable selectDiscountWay = NOTUSEPOINT;

  @observable inputPoint = '';
  @observable inputPointErr = false;
  @observable inputPointOk = false; //输入的积分满足要求时去查询积分的状态

  @observable CurrentHoldingPoint = 0; //当前积分

  @observable earnedPoint = 0; //这笔单能挣得的积分

  @observable loyaltyPointsMinimum = 0; //最小使用的积分数

  @observable loyaltyPointsMaximum = 0; //最小大使用的积分数

  @observable isCanUsePoint = true; //是否能使用积分

  @observable originTradePrice = -1; // 不包含任何服务费的总价，最初进入checkout页面的总价

  @computed get tradePrice() {
    let ret = this?.cartPrice?.tradePrice;
    if (this.installMentParam) {
      ret = this.installMentParam.totalPrice;
    }
    return ret || 0;
  }

  @computed get totalMinusSubPrice() {
    return this?.cartPrice?.totalMinusSubPrice || 0;
  }

  @computed get totalPrice() {
    return this?.cartPrice?.totalPrice || 0;
  }

  @computed get serviceFeePrice() {
    return this?.cartPrice?.serviceFeePrice;
  }

  @computed get loyaltyPointsPrice() {
    return this?.cartPrice?.loyaltyPointsPrice || 0;
  }

  @computed get taxFeePrice() {
    return this?.cartPrice?.taxFeePrice || 0;
  }

  @computed get couponCodeDiscount() {
    return this?.cartPrice?.couponCodeDiscount || 0;
  }

  @computed get freeShippingFlag() {
    return this?.cartPrice?.freeShippingFlag || 0;
  }

  @computed get freeShippingDiscountPrice() {
    return this?.cartPrice?.freeShippingDiscountPrice || 0;
  }

  @computed get discountPrice() {
    return this?.cartPrice?.discountPrice || 0;
  }

  @computed get subscriptionDiscountPrice() {
    return this?.cartPrice?.subscriptionDiscountPrice || 0;
  }

  @computed get promotionDiscountPrice() {
    return this?.cartPrice?.promotionDiscountPrice || 0;
  }

  @computed get deliveryPrice() {
    return this?.cartPrice?.deliveryPrice || 0;
  }

  @computed get subscriptionPrice() {
    return this?.cartPrice?.subscriptionPrice || 0;
  }

  @computed get promotionDesc() {
    return this?.cartPrice?.promotionDesc || '';
  }

  @computed get promotionDiscount() {
    return this?.cartPrice?.promotionDiscount || '';
  }

  @computed get promotionVOList() {
    let list = [];
    if (this?.cartPrice?.promotionVOList) {
      list = this?.cartPrice?.promotionVOList.filter((el) => el.discountPrice);
    }
    return list;
  }

  @computed get isShowBindPet() {
    return this.petFlag;
  }

  @action.bound
  setSelectDiscountWay(way) {
    this.selectDiscountWay = way;
  }

  @action.bound
  setInputPoint(data) {
    this.inputPoint = data;
  }

  @action.bound
  setInputPointOk(bool) {
    this.inputPointOk = bool;
  }

  @action.bound
  setCurrentHoldingPoint(data) {
    this.CurrentHoldingPoint = data;
  }

  @action.bound
  setInputPointErr(bool) {
    this.inputPointErr = bool;
  }

  @action.bound
  setEarnedPoint(data) {
    this.earnedPoint = data;
  }

  @action.bound
  setLoyaltyPointsMinimum(data) {
    this.loyaltyPointsMinimum = data;
  }

  @action.bound
  setLoyaltyPointsMaximum(data) {
    this.loyaltyPointsMaximum = data;
  }

  @action.bound
  setIsCanUsePoint(bool) {
    this.isCanUsePoint = bool;
  }

  @action.bound
  setPetInfo(data) {
    this.pr_petsInfo = data;
    localItemRoyal.set('pr-petsInfo', data);
  }

  @action.bound
  setPromotionCode(data) {
    this.promotionCode = data;
    localItemRoyal.set('rc-promotionCode', data);
    if (data) {
      this.removeCouponCode();
    }
  }

  @action.bound
  removePromotionCode(data) {
    this.promotionCode = '';
    localItemRoyal.remove('rc-promotionCode');
  }

  @action.bound
  setCouponCode(data) {
    this.couponCode = data;
    localItemRoyal.set('rc-couponCode', data);
  }

  @action.bound
  removeCouponCode() {
    this.couponCode = '';
    localItemRoyal.remove('rc-couponCode');
  }

  // @action.bound
  // setclixRayPromotionCode(data) {
  //   this.clixRayPromotionCode = data;
  //   localItemRoyal.set('rc-clixRay-promotionCode', data);
  // }
  // @action.bound
  // removeclixRayPromotionCode(data) {
  //   this.clixRayPromotionCode = '';
  //   localItemRoyal.remove('rc-clixRay-promotionCode');
  // }

  @action.bound
  setCouponCodeFitFlag(data) {
    this.couponCodeFitFlag = data;
    localItemRoyal.set('rc-couponCodeFitFlag', data);
  }

  @action.bound
  removeCouponCodeFitFlag(data) {
    this.couponCodeFitFlag = false;
    localItemRoyal.remove('rc-couponCodeFitFlag');
  }

  @action.bound
  setAutoAuditFlag(data) {
    this.autoAuditFlag = data;
    localItemRoyal.set('rc-autoAuditFlag', data);
  }

  @action.bound
  setPetFlag(data) {
    this.petFlag = data;
    localItemRoyal.set('rc-petFlag', data);
  }

  @action.bound
  setAuditData(data) {
    this.AuditData = data;
    localItemRoyal.set('rc-audit-data', data);
  }

  @action.bound
  removeAuditData(data) {
    this.AuditData = [];
    localItemRoyal.set('rc-audit-data', data);
  }

  @action.bound
  setCartData(data) {
    this.cartData = data?.map((el) => {
      el.isNotShowCart = el.goodsInfoFlag == 3 ? 1 : 0;
      return el;
    });
    console.log(data);
    // debugger;
    localItemRoyal.set('rc-cart-data', data);
  }

  @action.bound
  removeCartData() {
    this.cartData = [];
    localItemRoyal.remove('rc-cart-data');
  }

  @action
  setLoginCartData(data) {
    let datas = getLoginData(data);
    this.loginCartData = datas;
    // console.info('datasdatas', datas);
    localItemRoyal.set('rc-cart-data-login', datas);
  }

  @action.bound
  setGiftList(data) {
    this.giftList = data;
    localItemRoyal.set('rc-giftList', data || []);
  }

  @action.bound
  removeLoginCartData() {
    this.loginCartData = [];
    localItemRoyal.remove('rc-cart-data-login');
  }

  @action.bound
  setCartPrice(data) {
    this.cartPrice = data;
    localItemRoyal.set('rc-totalInfo', data);
  }

  @action.bound
  setGoodsMarketingMap(data) {
    this.goodsMarketingMap = data;
    localItemRoyal.set('goodsMarketingMap', data);
  }

  @action.bound
  async updatePromotionFiled(data, promotionCode = this.promotionCode) {
    let param = data.map((el) => {
      return {
        goodsInfoId: el.goodsInfoId,
        goodsNum: el.buyCount,
        invalid: false
      };
    });
    let purchasesRes = await purchases({
      goodsInfoDTOList: param,
      goodsInfoIds: [],
      goodsMarketingDTOList: [],
      promotionCode
    });

    let backCode = purchasesRes.code;
    purchasesRes = purchasesRes.context;

    this.setGiftList(purchasesRes.giftList);
    let newPromotionCode = purchasesRes.promotionDesc || '';
    this.setPromotionCode(newPromotionCode);

    this.setGoodsMarketingMap(purchasesRes.goodsMarketingMap);
    this.setCartPrice({
      totalPrice: purchasesRes.totalPrice,
      taxFeePrice: purchasesRes.taxFeePrice,
      couponCodeDiscount: purchasesRes.couponCodeDiscount,
      freeShippingFlag: purchasesRes.freeShippingFlag,
      freeShippingDiscountPrice: purchasesRes.freeShippingDiscountPrice,
      tradePrice: purchasesRes.tradePrice,
      discountPrice: purchasesRes.discountPrice,
      promotionDiscountPrice: purchasesRes.promotionDiscountPrice,
      subscriptionDiscountPrice: purchasesRes.subscriptionDiscountPrice,
      deliveryPrice: purchasesRes.deliveryPrice,
      promotionDesc: purchasesRes.promotionDesc,
      promotionDiscount: purchasesRes.promotionDiscount,
      subscriptionPrice: purchasesRes.subscriptionPrice,
      goodsInfos: purchasesRes.goodsInfos,
      promotionVOList: purchasesRes.promotionVOList,
      totalMinusSubPrice: purchasesRes.totalMinusSubPrice
    });
  }

  /**
   * 产品下单限制逻辑控制: 下架、无库存、被删除、不可销售
   */
  @action.bound
  async validCheckoutLimitRule({
    offShelvesProNames = this.offShelvesProNames,
    outOfstockProNames = this.outOfstockProNames,
    deletedProNames = this.deletedProNames,
    notSeableProNames = this.notSeableProNames,
    intl = {},
    purchasesRes = {}
  } = {}) {
    const { formatMessage } = intl;
    // 没达到下单额度，不能下单
    if (purchasesRes.canShipped === false && purchasesRes.cantShippedMessage) {
      throw new Error(purchasesRes.cantShippedMessage);
    }
    if (offShelvesProNames.length > 0) {
      throw new Error(
        formatMessage(
          { id: 'cart.errorInfo4' },
          { val: offShelvesProNames.join('/') }
        )
      );
    }
    if (outOfstockProNames.length > 0) {
      throw new Error(
        formatMessage(
          { id: 'cart.errorInfo2' },
          { val: outOfstockProNames.join('/') }
        )
      );
    }
    if (deletedProNames.length > 0) {
      throw new Error(
        formatMessage(
          { id: 'cart.errorInfo5' },
          { val: deletedProNames.join('/') }
        )
      );
    }
    if (notSeableProNames.length > 0) {
      throw new Error(
        formatMessage(
          { id: 'cart.errorInfo6' },
          { val: notSeableProNames.join('/') }
        )
      );
    }
  }

  /**
   * 1. 游客查询后台购物车，并计算价格
   * 2. 抛出下单限制错误
   */
  @action.bound
  async updateUnloginCart({
    cartData: data,
    promotionCode = this.promotionCode,
    purchaseFlag,
    taxFeeData,
    guestEmail,
    isThrowErr,
    deliverWay,
    shippingFeeAddress,
    intl
  } = {}) {
    console.log(data);
    // debugger;
    try {
      let recommend_data = null;
      //兼容商品没有加入购物车，是直接去购买页的，否则出现总价展示错误情况
      if (sessionItemRoyal.get('recommend_product')) {
        recommend_data = JSON.parse(sessionItemRoyal.get('recommend_product'));
        //兼容下面需要selected字段
        recommend_data.forEach((element) => {
          element.selected = true;
        });
      }
      if (!data) {
        data = recommend_data || this.cartData;
      }
      let param = data
        .filter((ele) => ele.selected)
        .map((ele) => {
          return {
            goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
            goodsNum: ele.quantity,
            invalid: false,
            goodsInfoFlag: ele.goodsInfoFlag
          };
        });

      if (!taxFeeData) {
        taxFeeData = nullTaxFeeData;
      }
      // debugger;
      const email = guestEmail || taxFeeData.customerAccount;
      // 获取总价
      let purchasesRes = await purchases({
        goodsInfoDTOList: param,
        goodsInfoIds: [],
        goodsMarketingDTOList: [],
        promotionCode,
        purchaseFlag: purchaseFlag,
        country: taxFeeData.country,
        region: taxFeeData.region,
        city: taxFeeData.city,
        street: taxFeeData.street,
        postalCode: taxFeeData.postalCode,
        customerAccount: email,
        guestEmail: email,
        deliverWay,
        shippingFeeAddress // DuData地址对象，俄罗斯计算运费用
      });

      console.log(purchasesRes);
      // debugger;
      // console.log('★ 305 ----- checkoutStore 获取总价: ', purchasesRes);
      let backCode = purchasesRes.code;
      purchasesRes = purchasesRes.context;

      this.setGiftList(purchasesRes.giftList);

      let newPromotionCode = purchasesRes.promotionDesc || '';
      this.setPromotionCode(newPromotionCode);

      this.setGoodsMarketingMap(purchasesRes.goodsMarketingMap);
      let params = {
        totalPrice: purchasesRes.totalPrice,
        taxFeePrice: purchasesRes.taxFeePrice,
        freeShippingFlag: purchasesRes.freeShippingFlag,
        freeShippingDiscountPrice: purchasesRes.freeShippingDiscountPrice,
        tradePrice: purchasesRes.tradePrice,
        deliveryPrice: purchasesRes.deliveryPrice,
        promotionDesc: purchasesRes.promotionDesc,
        promotionDiscount: purchasesRes.promotionDiscount,
        subscriptionPrice: purchasesRes.subscriptionPrice,
        goodsInfos: purchasesRes.goodsInfos,
        promotionVOList: purchasesRes.promotionVOList,
        totalMinusSubPrice: purchasesRes.totalMinusSubPrice
      };
      if (
        !promotionCode ||
        !purchasesRes.promotionFlag ||
        purchasesRes.couponCodeFlag
      ) {
        if (
          purchasesRes.couponCodeFlag &&
          !purchasesRes.couponCodeDiscount &&
          !purchasesRes.freeShippingDiscountPrice
        ) {
          this.setCouponCodeFitFlag(false);
        } else {
          this.setCouponCodeFitFlag(true);
        }
        params.discountPrice = purchasesRes.discountPrice;
        params.promotionDiscountPrice = purchasesRes.promotionDiscountPrice;
        params.subscriptionDiscountPrice =
          purchasesRes.subscriptionDiscountPrice;
      } else {
        params.discountPrice = this.discountPrice;
        params.promotionDiscountPrice = this.promotionDiscountPrice;
        params.subscriptionDiscountPrice = this.subscriptionDiscountPrice;
      }
      this.setCartPrice(params);

      // 更新stock值
      let tmpOutOfstockProNames = [];
      let tmpOffShelvesProNames = [];
      let tmpDeletedProNames = [];
      let tmpNotSeableProNames = [];

      Array.from(data, (item) => {
        item.sizeList.map((el) => {
          el.goodsInfoImg = el.goodsInfoImg || item.goodsImg;
          el.currentAmount = el.salePrice * item.quantity;
          return el;
        });
        const selectedSize = find(item.sizeList, (s) => s.selected);
        const tmpSkuObj = find(
          purchasesRes.goodsInfos,
          (l) =>
            l.goodsId === item.goodsId &&
            l.goodsInfoId === selectedSize.goodsInfoId
        );
        const tmpSpuObj = find(
          purchasesRes.goodses,
          (l) => l.goodsId === item.goodsId
        );
        if (tmpSkuObj) {
          item.addedFlag = tmpSkuObj.addedFlag;
          selectedSize.stock = tmpSkuObj.stock;
          item.saleableFlag = tmpSpuObj.saleableFlag;
          const tmpName = [tmpSkuObj.goodsInfoName, tmpSkuObj.specText]
            .filter((e) => e)
            .join(' ');
          // handle product off shelves logic
          if (!tmpSkuObj.addedFlag) {
            tmpOffShelvesProNames.push(tmpName);
          }
          if (tmpSkuObj.delFlag) {
            tmpDeletedProNames.push(tmpName);
          }
          if (item.quantity > selectedSize.stock) {
            tmpOutOfstockProNames.push(tmpName);
          }
          if (!item.saleableFlag) {
            tmpNotSeableProNames.push(tmpName);
          }
        }
        return item;
      });
      this.setCartData(data);

      this.offShelvesProNames = tmpOffShelvesProNames;
      this.outOfstockProNames = tmpOutOfstockProNames;
      this.deletedProNames = tmpDeletedProNames;
      this.notSeableProNames = tmpNotSeableProNames;
      // 抛出错误
      if (isThrowErr) {
        await this.validCheckoutLimitRule({ intl, purchasesRes });
      }
      return new Promise(function (resolve) {
        resolve({ backCode, context: purchasesRes });
      });
    } catch (err) {
      console.log(err.message);
      // debugger;
      if (isThrowErr) {
        throw new Error(err.message);
      }
    }
  }

  /**
   * 1. 会员查询后台购物车，并计算价格
   * 2. 抛出下单限制错误
   */
  @action
  async updateLoginCart({
    promotionCode,
    delFlag = 2,
    subscriptionFlag = false,
    purchaseFlag,
    taxFeeData,
    isThrowErr = false,
    deliverWay,
    shippingFeeAddress,
    intl,
    paymentStore
  } = {}) {
    try {
      this.changeIsLoadingCartData(true);
      if (!taxFeeData) {
        taxFeeData = nullTaxFeeData;
      }
      let promotionCodeNew =
        promotionCode === undefined ? this.promotionCode : promotionCode;

      // 获取购物车列表
      // 删除felin sku
      let siteMiniPurchasesRes = await siteMiniPurchases({ delFlag });
      siteMiniPurchasesRes.context.goodsList =
        siteMiniPurchasesRes?.context?.goodsList?.map((item) => {
          if (item.goodsInfos) {
            item.goodsInfos = item.goodsInfos.filter((el) => {
              if (el.displayOnShop === 0) {
                item.goodsSpecDetails = item.goodsSpecDetails.filter(
                  (ele) =>
                    el.mockSpecDetailIds.join('') !== String(ele.specDetailId)
                );
              }
              return el.displayOnShop !== 0;
            });
          }
          return item;
        });
      // 兼容ind的参数传值
      let newGoodsList = getLoginData(siteMiniPurchasesRes.context?.goodsList);
      siteMiniPurchasesRes = Object.assign({}, siteMiniPurchasesRes, {
        goodsList: newGoodsList
      });
      //兼容商品没有加入购物车，是直接去购买页的，否则出现总价展示错误情况
      // if (sessionItemRoyal.get('recommend_product')) {
      //   recommend_data = JSON.parse(sessionItemRoyal.get('recommend_product'));
      //   //兼容下面需要selected字段
      //   recommend_data.forEach((element) => {
      //     element.selected = true;
      //   });
      //   siteMiniPurchasesRes = recommend_data;
      // }
      // 获取总价
      // debugger;
      let sitePurchasesRes = await sitePurchases({
        goodsInfoIds: siteMiniPurchasesRes.goodsList.map(
          (ele) => ele.goodsInfoId
        ),
        promotionCode: promotionCodeNew,
        subscriptionFlag,
        purchaseFlag,
        country: taxFeeData.country,
        region: taxFeeData.region,
        city: taxFeeData.city,
        street: taxFeeData.street,
        postalCode: taxFeeData.postalCode,
        customerAccount: taxFeeData.customerAccount,
        deliverWay,
        shippingFeeAddress, // DuData地址对象，俄罗斯计算运费用
        paymentCode: paymentStore?.curPayWayInfo?.code
      });
      // console.log('purchase api res', sitePurchasesRes);
      // debugger;
      // console.log('★ 449 ----- checkoutStore 获取总价: ', sitePurchasesRes);
      let backCode = sitePurchasesRes.code;
      sitePurchasesRes = sitePurchasesRes.context;

      this.setGiftList(sitePurchasesRes.giftList);

      let newPromotionCode = sitePurchasesRes.promotionDesc || '';
      this.setPromotionCode(newPromotionCode);

      let goodsList = siteMiniPurchasesRes.goodsList;
      for (let good of goodsList) {
        good.goodsInfoImg = good.goodsInfoImg
          ? good.goodsInfoImg
          : good.goods.goodsImg;
        const selectdSkuInfo = (good.goodsInfos || []).filter((g) => {
          if (good.buyCount > g.stock) {
            g.isEmpty = true;
          }
          return g.goodsInfoId === good.goodsInfoId;
        })[0];
        const taggingVOList = (good.taggingVOList || []).filter(
          (t) => t.displayStatus
        );
        good.taggingForText = taggingVOList.filter(
          (e) =>
            e.taggingType === 'Text' &&
            e.showPage?.includes('Shopping cart page')
        )[0];
        good.taggingForImage = taggingVOList.filter(
          (e) =>
            e.taggingType === 'Image' &&
            e.showPage?.includes('Shopping cart page')
        )[0];
        let specList = good.goodsSpecs;
        let specDetailList = good.goodsSpecDetails || [];
        (specList || []).map((sItem) => {
          sItem.chidren = specDetailList.filter((sdItem) => {
            if (
              selectdSkuInfo &&
              selectdSkuInfo.mockSpecDetailIds &&
              selectdSkuInfo.mockSpecIds &&
              selectdSkuInfo.mockSpecDetailIds.includes(sdItem.specDetailId) &&
              selectdSkuInfo.mockSpecIds.includes(sdItem.specId)
            ) {
              sdItem.selected = true;
            }
            good.goodsInfos.map((el) => {
              if (
                el.mockSpecDetailIds &&
                el.mockSpecIds &&
                el.mockSpecDetailIds.includes(sdItem.specDetailId) &&
                el.mockSpecIds.includes(sdItem.specId)
              ) {
                if (el.isEmpty) {
                  sdItem.isEmpty = true;
                }
                if (el.marketPrice === 0) {
                  sdItem.isUnitPriceZero = true;
                }
              }
            });

            return sdItem.specId === sItem.specId;
          });
          return sItem;
        });
      }
      this.setLoginCartData(goodsList);
      let params = {
        totalPrice: sitePurchasesRes.totalPrice,
        taxFeePrice: sitePurchasesRes.taxFeePrice,
        freeShippingFlag: sitePurchasesRes.freeShippingFlag,
        freeShippingDiscountPrice: sitePurchasesRes.freeShippingDiscountPrice,
        tradePrice: sitePurchasesRes.tradePrice,
        // discountPrice: sitePurchasesRes.discountPrice,
        deliveryPrice: sitePurchasesRes.deliveryPrice,
        promotionDesc: sitePurchasesRes.promotionDesc,
        promotionDiscount: sitePurchasesRes.promotionDiscount,
        subscriptionPrice: sitePurchasesRes.subscriptionPrice,
        goodsInfos: sitePurchasesRes.goodsInfos,
        promotionVOList: sitePurchasesRes.promotionVOList,
        totalMinusSubPrice: sitePurchasesRes.totalMinusSubPrice
      };

      if (
        !promotionCodeNew ||
        !sitePurchasesRes.promotionFlag ||
        sitePurchasesRes.couponCodeFlag
      ) {
        if (
          sitePurchasesRes.couponCodeFlag &&
          !sitePurchasesRes.couponCodeDiscount &&
          !sitePurchasesRes.freeShippingDiscountPrice
        ) {
          this.setCouponCodeFitFlag(false);
        } else {
          this.setCouponCodeFitFlag(true);
        }
        params.discountPrice = sitePurchasesRes.discountPrice;
        params.promotionDiscountPrice = sitePurchasesRes.promotionDiscountPrice;
        params.subscriptionDiscountPrice =
          sitePurchasesRes.subscriptionDiscountPrice;
      } else {
        params.discountPrice = this.discountPrice;
        params.promotionDiscountPrice = this.promotionDiscountPrice;
        params.subscriptionDiscountPrice = this.subscriptionDiscountPrice;
      }
      this.setCartPrice(params);

      this.offShelvesProNames = siteMiniPurchasesRes.goodsList
        .filter((ele) => !ele.addedFlag)
        .map((ele) =>
          [ele.goodsInfoName, ele.specText].filter((e) => e).join(' ')
        );

      this.outOfstockProNames = siteMiniPurchasesRes.goodsList
        .filter((ele) => ele.buyCount > ele.stock)
        .map((ele) =>
          [ele.goodsInfoName, ele.specText].filter((e) => e).join(' ')
        );
      this.deletedProNames = siteMiniPurchasesRes.goodsList
        .filter((ele) => ele.delFlag)
        .map((ele) =>
          [ele.goodsInfoName, ele.specText].filter((e) => e).join(' ')
        );
      this.notSeableProNames = siteMiniPurchasesRes.goodsList
        .filter((ele) => !ele?.goods?.saleableFlag)
        .map((ele) =>
          [ele.goodsInfoName, ele.specText].filter((e) => e).join(' ')
        );

      this.setGoodsMarketingMap(sitePurchasesRes.goodsMarketingMap);
      this.changeIsLoadingCartData(false);
      // 抛出错误
      if (isThrowErr) {
        await this.validCheckoutLimitRule({
          intl,
          purchasesRes: sitePurchasesRes
        });
      }

      return new Promise(function (resolve) {
        resolve({ backCode, context: sitePurchasesRes });
      });
    } catch (err) {
      console.log(err);
      this.changeIsLoadingCartData(false);
      if (isThrowErr) {
        throw new Error(err.message);
      }
    }
  }

  /**
   * 根据产品类别，查询审核配置
   * @param {array} cartData 三个来源:
   * 1.checkout.cartData - 非登录普通流程
   * 2.checkout.loginCartData - 登录普通流程
   * 3. "recommend_product"- 推荐流程
   */
  @action
  async queryAuditConfByProduct({ isLogin }) {
    const curCartData = isLogin ? this.loginCartData : this.cartData;

    // 传入cartData时，不需要更新cart缓存
    const setCurCartData = isLogin
      ? () => this.setLoginCartData
      : () => this.setCartData;
    const res = await getProductPetConfig({
      goodsInfos: curCartData.map((el) => {
        return {
          cateId: el.cateId || el?.goodsInfo?.cateId
        };
      })
    });
    const contextRes = res.context;
    const goodsInfosRes = contextRes.goodsInfos;
    const handledData = curCartData.map((el, i) => {
      el.auditCatFlag = goodsInfosRes[i]['auditCatFlag'];
      el.prescriberFlag = goodsInfosRes[i]['prescriberFlag'];
      return el;
    });
    setCurCartData && setCurCartData(handledData);
    const AuditData = handledData.filter((el) => el.auditCatFlag);
    this.setAuditData(AuditData);
    this.setAutoAuditFlag(contextRes.autoAuditFlag);
    this.setPetFlag(contextRes.petFlag);
  }

  @action
  changeIsLoadingCartData(data) {
    this.isLoadingCartData = data;
  }

  //存储GA需要的product变量 给confirmation用
  @action
  saveGAProduct(data) {
    localItemRoyal.set('rc-ga-product', data);
  }

  @action
  changeFromStorePortal(data) {
    this.isFromStorePortal = data;
  }

  /**
   * 游客加入购物车
   * @param {Boolean} valid - 按钮可点击状态
   * @param {Array} cartItemList - 需要加入购物车的数据
   * @param {Number} currentUnitPrice - 当前选择规格的单价
   */
  @action
  async hanldeUnloginAddToCart({
    valid,
    cartItemList,
    currentUnitPrice = 0,
    isMobile,
    intl = {},
    configStore
  }) {
    console.log(this.cartData);
    // debugger;
    const { formatMessage } = intl;
    const {
      info: { skuLimitThreshold }
    } = configStore;
    if (valid) {
      try {
        let cartDataCopy = cloneDeep(toJS(this.cartData).filter((el) => el));
        let oldIndvIndex = cartDataCopy.findIndex(
          (item) => item.goodsInfoFlag == 3
        );
        oldIndvIndex > -1 && cartDataCopy.splice(oldIndvIndex, 1); //删除购物车已有的indv商品
        cartItemList.forEach((cartItem) => {
          const selectedGoodsInfo =
            find(cartItem.sizeList, (s) => s.selected) || cartItem.goodsInfo;
          cartItem.goodsInfoId = selectedGoodsInfo.goodsInfoId;
          const historyItemIdx = findIndex(
            cartDataCopy,
            (c) =>
              c.goodsId === cartItem.goodsId &&
              find(c.sizeList, (s) => s.selected).goodsInfoId ===
                selectedGoodsInfo.goodsInfoId
          );
          const historyItem = cartDataCopy[historyItemIdx];
          // 如果之前该商品(同spu 同sku)加入过购物车，则需取出其数量，进行累加
          if (historyItem) {
            cartItem = Object.assign(cartItem, {
              quantity: cartItem.quantity + historyItem.quantity
            });
          }
          cartItem = Object.assign(cartItem, {
            currentAmount: currentUnitPrice * cartItem.quantity
          });
          // 如果之前该商品(同spu 同sku)加入过购物车，则直接替换原信息
          if (historyItemIdx > -1) {
            if (cartItem.goodsInfoFlag != 3) {
              cartDataCopy.splice(historyItemIdx, 1, cartItem);
            }
          } else {
            cartDataCopy.unshift(cartItem);
          }

          // 校验
          // 1 单个产品数量限制  indv不需要限制数量
          if (
            cartItem.quantity > skuLimitThreshold.skuMaxNum &&
            cartItem.goodsInfoFlag != 3
          ) {
            throw new Error(
              formatMessage(
                { id: 'cart.errorMaxInfo' },
                { val: skuLimitThreshold.skuMaxNum }
              )
            );
          }
        });
        if (cartItemList[0].goodsInfoFlag == 3) {
          //如果是indv商品，不需要校验下面的数量
          await this.setCartData(cartDataCopy);
          return;
        }
        // 校验
        // 2 所有产品数量限制
        // 3 所有产品种类限制
        if (
          cartDataCopy.reduce((pre, cur) => {
            return Number(pre) + Number(cur.quantity);
          }, 0) > skuLimitThreshold.totalMaxNum
        ) {
          throw new Error(
            formatMessage(
              { id: 'cart.errorAllProductNumLimit' },
              { val: skuLimitThreshold.totalMaxNum }
            )
          );
        }
        if (cartDataCopy.length > skuLimitThreshold.skuItemMaxNum) {
          throw new Error(
            formatMessage(
              { id: 'cart.errorMaxCate' },
              { val: skuLimitThreshold.skuItemMaxNum }
            )
          );
        }
        await this.updateUnloginCart({ cartData: cartDataCopy, intl });
        if (!isMobile) {
          stores.headerCartStore.show();
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            stores.headerCartStore.hide();
          }, 4000);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }

  @action
  setInstallMentParam(data) {
    this.installMentParam = data;
  }

  /**
   * 切换支付方式时，计算服务费/积分等价格
   * @param {*} param0 ;
   */
  @action
  async calculateServiceFeeAndLoyaltyPoints({
    subscriptionFlag,
    ownerId,
    paymentCode,
    loyaltyPoints
  }) {
    // 不包含任何服务费的总价，最初进入checkout页面的总价
    if (this.originTradePrice < 0) {
      this.originTradePrice = this.tradePrice;
    }
    const res = await calculateServiceFeeAndLoyaltyPoints({
      totalPrice: this.originTradePrice,
      totalPriceHaveNotShippingFee: this.totalPrice,
      deliveryPrice: this.deliveryPrice,
      discountPrice: this.discountPrice,
      taxFeePrice: this.taxFeePrice,
      couponCodeDiscount: this.couponCodeDiscount,
      paymentCode,
      loyaltyPoints,
      ownerId,
      subscriptionFlag,
      freeShippingDiscountPrice: this.freeShippingDiscountPrice
    });
    const {
      loyaltyPointsPrice,
      serviceFeePrice,
      totalPrice,
      allowed,
      loyaltyPointsEarned,
      loyaltyPointsMinimum,
      loyaltyPointsMaximum
    } = res?.context || {};

    this.setEarnedPoint(loyaltyPointsEarned);
    this.setLoyaltyPointsMinimum(loyaltyPointsMinimum);
    this.setLoyaltyPointsMaximum(loyaltyPointsMaximum);
    this.setIsCanUsePoint(allowed);

    this.setCartPrice(
      Object.assign({}, this.cartPrice, {
        tradePrice: totalPrice,
        serviceFeePrice,
        loyaltyPointsPrice
      })
    );
  }

  /**
   * 离开页面时，清空服务费和积分优惠
   */
  @action.bound
  resetPriceData() {
    this.setCartPrice(
      Object.assign({}, this.cartPrice, {
        serviceFeePrice: 0,
        loyaltyPointsPrice: 0
      })
    );
    this.originTradePrice = -1;
  }
}

export default CheckoutStore;
