import { action, observable, computed, runInAction } from "mobx";
import store from 'storejs'
import { purchases, sitePurchases, siteMiniPurchases } from '@/api/cart'
import { find } from 'lodash'

class CheckoutStore {
  @observable cartData = store.get('rc-cart-data') || []
  @observable loginCartData = store.get('rc-cart-data-login') || [] // 商品列表
  @observable cartPrice = store.get('rc-totalInfo') || null // 价格数据
  @observable goodsMarketingMap = store.get('goodsMarketingMap') || null // promotion
  @observable loadingCartData = false
  @observable outOfstockProNames = []
  @observable offShelvesProNames = []

  @computed get tradePrice () {
    return this.cartPrice && this.cartPrice.tradePrice ? this.cartPrice.tradePrice : 0
  }
  @computed get totalPrice () {
    return this.cartPrice && this.cartPrice.totalPrice ? this.cartPrice.totalPrice : 0
  }
  @computed get discountPrice () {
    return this.cartPrice && this.cartPrice.discountPrice ? this.cartPrice.discountPrice : 0
  }
  @computed get deliveryPrice () {
    return this.cartPrice && this.cartPrice.deliveryPrice ? this.cartPrice.deliveryPrice : 0
  }
  @computed get subscriptionPrice () {
    return this.cartPrice && this.cartPrice.deliveryPrice ? this.cartPrice.subscriptionPrice : 0
  }
  @computed get promotionDesc () {
    return this.cartPrice && this.cartPrice.promotionDesc ? this.cartPrice.promotionDesc : ''
  }
  @computed get promotionDiscount () {
    return this.cartPrice && this.cartPrice.promotionDiscount ? this.cartPrice.promotionDiscount : ''
  }

  @action.bound
  setCartData (data) {
    this.cartData = data
    store.set('rc-cart-data', data)
  }

  @action.bound
  removeCartData () {
    this.cartData = []
    store.remove('rc-cart-data')
  }

  @action
  setLoginCartData (data) {
    this.loginCartData = data
    store.set('rc-cart-data-login', data)
  }

  @action.bound
  removeLoginCartData () {
    this.loginCartData = []
    store.remove('rc-cart-data-login')
  }

  @action.bound
  setCartPrice (data) {
    this.cartPrice = data
    store.set('rc-totalInfo', data)
  }

  @action.bound
  setGoodsMarketingMap (data) {
    this.goodsMarketingMap = data
    store.set('goodsMarketingMap', data)
  }

  @action.bound
  async updateUnloginCart (data, promotionCode = "") {
    if (!data) {
      data = this.cartData
    }
    let param = data.filter(ele => ele.selected).map(ele => {
      return {
        goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
        goodsNum: ele.quantity,
        invalid: false
      }
    })

    let purchasesRes = await purchases({
      goodsInfoDTOList: param,
      goodsInfoIds: [],
      goodsMarketingDTOList: [],
      promotionCode
    })
    let backCode = purchasesRes.code
    purchasesRes = purchasesRes.context

    this.setGoodsMarketingMap(purchasesRes.goodsMarketingMap)
    this.setCartPrice({
      totalPrice: purchasesRes.totalPrice,
      tradePrice: purchasesRes.tradePrice,
      discountPrice: purchasesRes.discountPrice,
      deliveryPrice: purchasesRes.deliveryPrice,
      promotionDesc: purchasesRes.promotionDesc,
      promotionDiscount: purchasesRes.promotionDiscount,
      subscriptionPrice: purchasesRes.subscriptionPrice
    })
    // 更新stock值
    let tmpOutOfstockProNames = []
    let tmpOffShelvesProNames = []

    Array.from(data, item => {
      let selectedSize = find(item.sizeList, s => s.selected)
      const tmpObj = find(purchasesRes.goodsInfos, l => l.goodsId === item.goodsId && l.goodsInfoId === selectedSize.goodsInfoId)
      if (tmpObj) {
        item.addedFlag = tmpObj.addedFlag
        item.goodsPromotion = tmpObj.goodsPromotion
        selectedSize.stock = tmpObj.stock
        const tmpName = tmpObj.goodsInfoName + ' ' + tmpObj.specText
        // handle product off shelves logic
        if (!tmpObj.addedFlag) {
          tmpOffShelvesProNames.push(tmpName)
        }
        if (item.quantity > selectedSize.stock) {
          tmpOutOfstockProNames.push(tmpName)
        }
      }
    })
    this.setCartData(data)
    this.offShelvesProNames = tmpOffShelvesProNames
    this.outOfstockProNames = tmpOutOfstockProNames
    return new Promise(function (resolve) {
      resolve({ backCode, context: purchasesRes })
    })
  }

  @action
  async updateLoginCart (promotionCode = "", subscriptionFlag = false) {
    this.changeLoadingCartData(true)
    // 获取购物车列表
    let siteMiniPurchasesRes = await siteMiniPurchases();
    siteMiniPurchasesRes = siteMiniPurchasesRes.context;
    // 获取总价
    sitePurchases({
      goodsInfoIds: siteMiniPurchasesRes.goodsList.map(ele => ele.goodsInfoId),
      promotionCode,
      subscriptionFlag
    }).then(sitePurchasesRes => {
      let backCode = sitePurchasesRes.code
      sitePurchasesRes = sitePurchasesRes.context;
      this.setCartPrice({
        totalPrice: sitePurchasesRes.totalPrice,
        tradePrice: sitePurchasesRes.tradePrice,
        discountPrice: sitePurchasesRes.discountPrice,
        deliveryPrice: sitePurchasesRes.deliveryPrice,
        promotionDesc: sitePurchasesRes.promotionDesc,
        promotionDiscount: sitePurchasesRes.promotionDiscount,
        subscriptionPrice: sitePurchasesRes.subscriptionPrice
      })
      this.setGoodsMarketingMap(sitePurchasesRes.goodsMarketingMap)
      return new Promise(function (resolve) {
        resolve({ backCode, context: sitePurchasesRes })
      })
    })
    runInAction(() => {
      let goodsList = siteMiniPurchasesRes.goodsList

      for (let good of goodsList) {
        const selectdSkuInfo = find(good.goodsInfos || [], g => g.goodsInfoId === good.goodsInfoId)
        let specList = good.goodsSpecs;
        let specDetailList = good.goodsSpecDetails;
        specList.map((sItem) => {
          sItem.chidren = specDetailList.filter(
            (sdItem) => {
              if (selectdSkuInfo.mockSpecDetailIds && selectdSkuInfo.mockSpecIds && selectdSkuInfo.mockSpecDetailIds.includes(sdItem.specDetailId) && selectdSkuInfo.mockSpecIds.includes(sdItem.specId)) {
                sdItem.selected = true
              }
              return sdItem.specId === sItem.specId
            }
          )
        });
      }

      this.setLoginCartData(goodsList)

      this.offShelvesProNames = siteMiniPurchasesRes.goodsList.filter(ele => !ele.addedFlag).map(ele => ele.goodsInfoName + ' ' + ele.specText)
      this.outOfstockProNames = siteMiniPurchasesRes.goodsList.filter(ele => ele.buyCount > ele.stock).map(ele => ele.goodsInfoName + ' ' + ele.specText)
      this.changeLoadingCartData(false)
    })
  }

  @action
  changeLoadingCartData (data) {
    this.loadingCartData = data
  }
}
export default CheckoutStore;