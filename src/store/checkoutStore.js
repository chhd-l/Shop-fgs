import { action, observable, computed, runInAction } from 'mobx';
import { purchases, sitePurchases, siteMiniPurchases } from '@/api/cart';
import find from 'lodash/find';
import { toJS } from 'mobx';

const localItemRoyal = window.__.localItemRoyal;

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
  @observable promotionCode = localItemRoyal.get('rc-promotionCode') || '';
  @observable couponCodeFitFlag = localItemRoyal.get('rc-couponCodeFitFlag') || false;
  
  // @observable promotionDesc = localItemRoyal.get('rc-promotionDesc') || '';

  @computed get tradePrice() {
    return this.cartPrice && this.cartPrice.tradePrice
      ? this.cartPrice.tradePrice
      : 0;
  }
  @computed get totalPrice() {
    return this.cartPrice && this.cartPrice.totalPrice
      ? this.cartPrice.totalPrice
      : 0;
  }
  @computed get discountPrice() {
    return this.cartPrice && this.cartPrice.discountPrice
      ? this.cartPrice.discountPrice
      : 0;
  }
  @computed get deliveryPrice() {
    return this.cartPrice && this.cartPrice.deliveryPrice
      ? this.cartPrice.deliveryPrice
      : 0;
  }
  @computed get subscriptionPrice() {
    return this.cartPrice && this.cartPrice.deliveryPrice
      ? this.cartPrice.subscriptionPrice
      : 0;
  }
  @computed get promotionDesc() {
    return this.cartPrice && this.cartPrice.promotionDesc
      ? this.cartPrice.promotionDesc
      : '';
  }
  @computed get promotionDiscount() {
    return this.cartPrice && this.cartPrice.promotionDiscount
      ? this.cartPrice.promotionDiscount
      : '';
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
    this.setPromotionCode(promotionCode);
    console.log(purchasesRes, 'purchasesRes');
    let backCode = purchasesRes.code;
    purchasesRes = purchasesRes.context;
    this.setGoodsMarketingMap(purchasesRes.goodsMarketingMap);
    this.setCartPrice({
      totalPrice: purchasesRes.totalPrice,
      tradePrice: purchasesRes.tradePrice,
      discountPrice: purchasesRes.discountPrice,
      deliveryPrice: purchasesRes.deliveryPrice,
      promotionDesc: purchasesRes.promotionDesc,
      promotionDiscount: purchasesRes.promotionDiscount,
      subscriptionPrice: purchasesRes.subscriptionPrice
    });
  }
  @action.bound
  async updateUnloginCart(data, promotionCode = this.promotionCode) {
    if (!data) {
      data = this.cartData;
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

    let purchasesRes = await purchases({
      goodsInfoDTOList: param,
      goodsInfoIds: [],
      goodsMarketingDTOList: [],
      promotionCode
    });
    let backCode = purchasesRes.code;
    purchasesRes = purchasesRes.context;
    this.setPromotionCode(promotionCode);
    this.setGoodsMarketingMap(purchasesRes.goodsMarketingMap);
    let params = {
      totalPrice: purchasesRes.totalPrice,
      tradePrice: purchasesRes.tradePrice,
      deliveryPrice: purchasesRes.deliveryPrice,
      promotionDesc: purchasesRes.promotionDesc,
      promotionDiscount: purchasesRes.promotionDiscount,
      subscriptionPrice: purchasesRes.subscriptionPrice
    };
    if (!promotionCode || !purchasesRes.promotionFlag || purchasesRes.couponCodeFlag) {
      if(purchasesRes.couponCodeFlag && !purchasesRes.couponCodeDiscount) {
        this.setCouponCodeFitFlag(false)
      }else {
        this.setCouponCodeFitFlag(true)
      }
      params.discountPrice = purchasesRes.discountPrice;
    } else {
      params.discountPrice = this.discountPrice;
    }
    this.setCartPrice(params);

    // 更新stock值
    let tmpOutOfstockProNames = [];
    let tmpOffShelvesProNames = [];
    let tmpDeletedProNames = [];

    Array.from(data, (item) => {
      item.sizeList.map((el) => {
        el.goodsInfoImg = el.goodsInfoImg || item.goodsImg;
        return el;
      });
      let selectedSize = find(item.sizeList, (s) => s.selected);
      console.log(toJS(item), toJS(selectedSize), 'selectedSize');
      const tmpObj = find(
        purchasesRes.goodsInfos,
        (l) =>
          l.goodsId === item.goodsId &&
          l.goodsInfoId === selectedSize.goodsInfoId
      );
      if (tmpObj) {
        item.addedFlag = tmpObj.addedFlag;
        item.goodsPromotion = tmpObj.goodsPromotion;
        selectedSize.stock = tmpObj.stock;
        const tmpName = tmpObj.goodsInfoName + ' ' + tmpObj.specText;
        // handle product off shelves logic
        if (!tmpObj.addedFlag) {
          tmpOffShelvesProNames.push(tmpName);
        }
        if (tmpObj.delFlag) {
          tmpDeletedProNames.push(tmpName);
        }
        if (item.quantity > selectedSize.stock) {
          console.log(tmpObj, tmpOutOfstockProNames, 'name');
          tmpOutOfstockProNames.push(tmpName);
        }
      }
      return item;
    });
    this.setCartData(data);
    this.offShelvesProNames = tmpOffShelvesProNames;
    this.outOfstockProNames = tmpOutOfstockProNames;
    this.deletedProNames = tmpDeletedProNames;
    return new Promise(function (resolve) {
      resolve({ backCode, context: purchasesRes });
    });
  }

  @action
  async updateLoginCart(
    promotionCode = this.promotionCode,
    subscriptionFlag = false
  ) {
    try {
      this.changeLoadingCartData(true);
      // 获取购物车列表
      let siteMiniPurchasesRes = await siteMiniPurchases();
      siteMiniPurchasesRes = siteMiniPurchasesRes.context;
      // 获取总价
      let sitePurchasesRes = await sitePurchases({
        goodsInfoIds: siteMiniPurchasesRes.goodsList.map(
          (ele) => ele.goodsInfoId
        ),
        promotionCode,
        subscriptionFlag
      });
      let backCode = sitePurchasesRes.code;
      sitePurchasesRes = sitePurchasesRes.context;
      this.setPromotionCode(promotionCode);
      runInAction(() => {
        let goodsList = siteMiniPurchasesRes.goodsList;

        for (let good of goodsList) {
          good.goodsInfoImg = good.goodsInfoImg
            ? good.goodsInfoImg
            : good.goods.goodsImg;
          const selectdSkuInfo = find(
            good.goodsInfos || [],
            (g) => g.goodsInfoId === good.goodsInfoId
          );
          let specList = good.goodsSpecs;
          let specDetailList = good.goodsSpecDetails;
          (specList || []).map((sItem) => {
            sItem.chidren = specDetailList.filter((sdItem) => {
              if (
                selectdSkuInfo &&
                selectdSkuInfo.mockSpecDetailIds &&
                selectdSkuInfo.mockSpecIds &&
                selectdSkuInfo.mockSpecDetailIds.includes(
                  sdItem.specDetailId
                ) &&
                selectdSkuInfo.mockSpecIds.includes(sdItem.specId)
              ) {
                sdItem.selected = true;
              }
              return sdItem.specId === sItem.specId;
            });
            return sItem;
          });
        }
        this.setLoginCartData(goodsList);
        let params = {
          totalPrice: sitePurchasesRes.totalPrice,
          tradePrice: sitePurchasesRes.tradePrice,
          // discountPrice: sitePurchasesRes.discountPrice,
          deliveryPrice: sitePurchasesRes.deliveryPrice,
          promotionDesc: sitePurchasesRes.promotionDesc,
          promotionDiscount: sitePurchasesRes.promotionDiscount,
          subscriptionPrice: sitePurchasesRes.subscriptionPrice
        };

        if (!promotionCode || !sitePurchasesRes.promotionFlag || sitePurchasesRes.couponCodeFlag) {
          if(sitePurchasesRes.couponCodeFlag && !sitePurchasesRes.couponCodeDiscount) {
            this.setCouponCodeFitFlag(false)
          }else {
            this.setCouponCodeFitFlag(true)
          }
          params.discountPrice = sitePurchasesRes.discountPrice;
        } else {
          params.discountPrice = this.discountPrice;
        }
        this.setCartPrice(params);

        this.offShelvesProNames = siteMiniPurchasesRes.goodsList
          .filter((ele) => !ele.addedFlag)
          .map((ele) => ele.goodsInfoName + ' ' + ele.specText);
        this.outOfstockProNames = siteMiniPurchasesRes.goodsList
          .filter((ele) => ele.buyCount > ele.stock)
          .map((ele) => ele.goodsInfoName + ' ' + ele.specText);
        this.deletedProNames = siteMiniPurchasesRes.goodsList
          .filter((ele) => ele.delFlag)
          .map((ele) => ele.goodsInfoName + ' ' + ele.specText);
        this.setGoodsMarketingMap(sitePurchasesRes.goodsMarketingMap);
        this.changeLoadingCartData(false);
      });
      return new Promise(function (resolve) {
        resolve({ backCode, context: sitePurchasesRes });
      });
    } catch (err) {
      this.changeLoadingCartData(false);
    }
  }

  @action
  changeLoadingCartData(data) {
    this.loadingCartData = data;
  }
}
export default CheckoutStore;
