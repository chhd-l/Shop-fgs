import { action, observable, runInAction } from "mobx";
import store from 'storejs'
import { sitePurchases, siteMiniPurchases } from '@/api/cart'

class CheckoutStore {
  @observable cartData = store.get('rc-cart-data') || []
  @observable loginCartData = store.get('rc-cart-data-login') || [] // 商品列表
  @observable loginCartPrice = store.get('rc-totalInfo') || null // 价格数据
  @observable goodsMarketingMap = store.get('goodsMarketingMap') || null // promotion
  @observable loadingCartData = false // todo loading无效，不会更新到header里

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

  @action.bound
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
  setLoginCartPrice (data) {
    this.loginCartPrice = data
    store.set('rc-totalInfo', data)
  }

  @action.bound
  setGoodsMarketingMap (data) {
    this.goodsMarketingMap = data
    store.set('goodsMarketingMap', data)
  }

  @action.bound
  async updateLoginCart () {
    this.changeLoadingCartData(true)
    // 获取购物车列表
    let siteMiniPurchasesRes = await siteMiniPurchases();
    siteMiniPurchasesRes = siteMiniPurchasesRes.context;
    // 获取总价
    let sitePurchasesRes = await sitePurchases({
      goodsInfoIds: siteMiniPurchasesRes.goodsList.map(ele => ele.goodsInfoId)
    });
    sitePurchasesRes = sitePurchasesRes.context;
    this.setLoginCartData(siteMiniPurchasesRes.goodsList)
    this.setLoginCartPrice({
      totalPrice: sitePurchasesRes.totalPrice,
      tradePrice: sitePurchasesRes.tradePrice,
      discountPrice: sitePurchasesRes.discountPrice
    })
    this.setGoodsMarketingMap(sitePurchasesRes.goodsMarketingMap)
    this.changeLoadingCartData(false)
  }

  @action.bound
  changeLoadingCartData (data) {
    this.loadingCartData = data
  }
}
export default CheckoutStore;