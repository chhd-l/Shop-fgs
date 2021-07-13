import { action, observable, computed, runInAction } from 'mobx';
import { purchases, sitePurchases, siteMiniPurchases } from '@/api/cart';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import locales from '@/lang';
import { toJS } from 'mobx';
import stores from './index';

const CURRENT_LANGFILE = locales;

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

class CheckoutStore {
  @observable cartData = localItemRoyal.get('rc-cart-data') || [];
  @observable AuditData = localItemRoyal.get('rc-audit-data') || [];
  @observable autoAuditFlag = localItemRoyal.get('rc-autoAuditFlag') || false;
  @observable petFlag = localItemRoyal.get('rc-petFlag') || false;
  @observable loginCartData = localItemRoyal.get('rc-cart-data-login') || []; // 商品列表
  @observable cartPrice = localItemRoyal.get('rc-totalInfo') || null; // 价格数据
  @observable goodsMarketingMap =
    localItemRoyal.get('goodsMarketingMap') || null; // promotion
  @observable loadingCartData = false;
  @observable outOfstockProNames = []; // 超出库存的商品
  @observable offShelvesProNames = []; // 下架的商品
  @observable deletedProNames = []; // 被删除的商品
  @observable notSeableProNames = []; // 不可销售的商品
  @observable promotionCode = localItemRoyal.get('rc-promotionCode') || '';
  // @observable clixRayPromotionCode = localItemRoyal.get('rc-clixRay-promotionCode')||'';// 是fr breeder的特殊code，需要主动默认填充
  @observable couponCodeFitFlag =
    localItemRoyal.get('rc-couponCodeFitFlag') || false;
  @observable pr_petsInfo = localItemRoyal.get('pr-petsInfo') || {};

  @observable installMentParam = null; // 分期参数

  @observable giftList = localItemRoyal.get('rc-giftList') || [];

  // @observable promotionDesc = localItemRoyal.get('rc-promotionDesc') || '';
  @observable GA_product = {};

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
  @computed get taxFeePrice() {
    return this?.cartPrice?.taxFeePrice || 0;
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
    return this?.cartPrice?.promotionVOList || [];
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
  }
  @action.bound
  removePromotionCode(data) {
    this.promotionCode = '';
    localItemRoyal.remove('rc-promotionCode');
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
    this.cartData = data;
    localItemRoyal.set('rc-cart-data', data);
  }

  @action.bound
  removeCartData() {
    this.cartData = [];
    localItemRoyal.remove('rc-cart-data');
  }

  @action
  setLoginCartData(data) {
    this.loginCartData = data;
    localItemRoyal.set('rc-cart-data-login', data);
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

  @action.bound
  async validCheckoutLimitRule({
    offShelvesProNames = this.offShelvesProNames,
    outOfstockProNames = this.outOfstockProNames,
    deletedProNames = this.deletedProNames,
    notSeableProNames = this.notSeableProNames,
    minimunAmountPrice = 0
  } = {}) {
    if (this.tradePrice < Number(window.__.env.REACT_APP_MINIMUM_AMOUNT)) {
      throw new Error(
        CURRENT_LANGFILE['cart.errorInfo3'].replace(/{.+}/, minimunAmountPrice)
      );
    }
    if (offShelvesProNames.length > 0) {
      throw new Error(
        CURRENT_LANGFILE['cart.errorInfo4'].replace(
          /{.+}/,
          offShelvesProNames.join('/')
        )
      );
    }
    if (outOfstockProNames.length > 0) {
      throw new Error(
        CURRENT_LANGFILE['cart.errorInfo2'].replace(
          /{.+}/,
          outOfstockProNames.join('/')
        )
      );
    }
    if (deletedProNames.length > 0) {
      throw new Error(
        CURRENT_LANGFILE['cart.errorInfo5'].replace(
          /{.+}/,
          deletedProNames.join('/')
        )
      );
    }
    if (notSeableProNames.length > 0) {
      throw new Error(
        CURRENT_LANGFILE['cart.errorInfo6'].replace(
          /{.+}/,
          notSeableProNames.join('/')
        )
      );
    }
  }

  // 游客
  @action.bound
  async updateUnloginCart({
    cartData: data,
    promotionCode = this.promotionCode,
    purchaseFlag,
    taxFeeData,
    guestEmail,
    minimunAmountPrice,
    isThrowErr,
    deliverWay,
    shippingFeeAddress
  } = {}) {
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
        await this.validCheckoutLimitRule({ minimunAmountPrice });
      }
      return new Promise(function (resolve) {
        resolve({ backCode, context: purchasesRes });
      });
    } catch (err) {
      if (isThrowErr) {
        throw new Error(err.message);
      }
    }
  }

  // 会员
  @action
  async updateLoginCart({
    promotionCode,
    subscriptionFlag = false,
    purchaseFlag,
    taxFeeData,
    minimunAmountPrice,
    isThrowErr = false,
    deliverWay,
    shippingFeeAddress
  } = {}) {
    try {
      this.changeLoadingCartData(true);
      if (!taxFeeData) {
        taxFeeData = nullTaxFeeData;
      }
      let promotionCodeNew =
        promotionCode === undefined ? this.promotionCode : promotionCode;

      // 获取购物车列表
      let siteMiniPurchasesRes = await siteMiniPurchases();
      siteMiniPurchasesRes = siteMiniPurchasesRes.context;

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
        shippingFeeAddress // DuData地址对象，俄罗斯计算运费用
      });
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
      this.changeLoadingCartData(false);
      // 抛出错误
      if (isThrowErr) {
        await this.validCheckoutLimitRule({ minimunAmountPrice });
      }
      return new Promise(function (resolve) {
        resolve({ backCode, context: sitePurchasesRes });
      });
    } catch (err) {
      this.changeLoadingCartData(false);
      if (isThrowErr) {
        throw new Error(err.message);
      }
    }
  }

  @action
  changeLoadingCartData(data) {
    this.loadingCartData = data;
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
    mobileSuccessModalButton,
    isMobile
  }) {
    if (valid) {
      try {
        let cartDataCopy = cloneDeep(toJS(this.cartData).filter((el) => el));
        cartItemList.forEach((cartItem) => {
          const selectedGoodsInfo =
            find(cartItem.sizeList, (s) => s.selected) || cartItem.goodsInfo;
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
            cartDataCopy.splice(historyItemIdx, 1, cartItem);
          } else {
            cartDataCopy.push(cartItem);
          }

          // 校验
          // 1 单个产品数量限制
          if (cartItem.quantity > +window.__.env.REACT_APP_LIMITED_NUM) {
            throw new Error(
              CURRENT_LANGFILE['cart.errorMaxInfo'].replace(
                /{.+}/,
                +window.__.env.REACT_APP_LIMITED_NUM
              )
            );
          }
        });

        // 校验
        // 2 所有产品数量限制
        // 3 所有产品种类限制
        if (
          cartDataCopy.reduce((pre, cur) => {
            return Number(pre) + Number(cur.quantity);
          }, 0) > +window.__.env.REACT_APP_LIMITED_NUM_ALL_PRODUCT
        ) {
          throw new Error(
            CURRENT_LANGFILE['cart.errorAllProductNumLimit'].replace(
              /{.+}/,
              +window.__.env.REACT_APP_LIMITED_NUM_ALL_PRODUCT
            )
          );
        }
        if (cartDataCopy.length >= +window.__.env.REACT_APP_LIMITED_CATE_NUM) {
          throw new Error(
            CURRENT_LANGFILE['cart.errorMaxCate'].replace(
              /{.+}/,
              +window.__.env.REACT_APP_LIMITED_CATE_NUM
            )
          );
        }
        await this.updateUnloginCart({ cartData: cartDataCopy });
        if (isMobile) {
          mobileSuccessModalButton.click();
        } else {
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
}
export default CheckoutStore;
