import { action, observable, computed, runInAction } from 'mobx';
import { purchases, sitePurchases, siteMiniPurchases } from '@/api/cart';
import { find } from 'lodash';
import { toJS } from 'mobx';

const localItemRoyal = window.__.localItemRoyal;

class CheckoutStore {
  @observable cartData = localItemRoyal.get('rc-cart-data') || [];
  @observable loginCartData = localItemRoyal.get('rc-cart-data-login') || []; // 商品列表
  @observable cartPrice = localItemRoyal.get('rc-totalInfo') || null; // 价格数据
  @observable goodsMarketingMap =
    localItemRoyal.get('goodsMarketingMap') || null; // promotion
  @observable loadingCartData = false;
  @observable outOfstockProNames = [];
  @observable offShelvesProNames = [];

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
  async updatePromotionFiled(data, promotionCode = '') {
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
  async updateUnloginCart(data, promotionCode = '') {
    if (!data) {
      data = this.cartData;
    }
    let param = data
      .filter((ele) => ele.selected)
      .map((ele) => {
        return {
          goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
          goodsNum: ele.quantity,
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
    // 更新stock值
    let tmpOutOfstockProNames = [];
    let tmpOffShelvesProNames = [];

    Array.from(data, (item) => {
      item.sizeList.map((el) => {
        el.goodsInfoImg = el.goodsInfoImg || item.goodsImg;
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
        if (item.quantity > selectedSize.stock) {
          console.log(tmpObj, tmpOutOfstockProNames, 'name');
          tmpOutOfstockProNames.push(tmpName);
        }
      }
    });
    console.log(tmpOutOfstockProNames, 'nameaaaa');
    this.setCartData(data);
    this.offShelvesProNames = tmpOffShelvesProNames;
    this.outOfstockProNames = tmpOutOfstockProNames;
    return new Promise(function (resolve) {
      resolve({ backCode, context: purchasesRes });
    });
  }

  @action
  async updateLoginCart(promotionCode = '', subscriptionFlag = false) {
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
          });
        }
        this.setLoginCartData(goodsList);
        this.setCartPrice({
          totalPrice: sitePurchasesRes.totalPrice,
          tradePrice: sitePurchasesRes.tradePrice,
          discountPrice: sitePurchasesRes.discountPrice,
          deliveryPrice: sitePurchasesRes.deliveryPrice,
          promotionDesc: sitePurchasesRes.promotionDesc,
          promotionDiscount: sitePurchasesRes.promotionDiscount,
          subscriptionPrice: sitePurchasesRes.subscriptionPrice
        });
        this.offShelvesProNames = siteMiniPurchasesRes.goodsList
          .filter((ele) => !ele.addedFlag)
          .map((ele) => ele.goodsInfoName + ' ' + ele.specText);
        this.outOfstockProNames = siteMiniPurchasesRes.goodsList
          .filter((ele) => ele.buyCount > ele.stock)
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
