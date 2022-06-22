import stores from '@/store';
import { createIntl, createIntlCache } from 'react-intl';
import { getDynamicLanguage } from '@/lang';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { toJS } from 'mobx';
import { getDeviceType } from '@/utils/utils';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';

let intl: any;
let timer: any;

async function initIntl() {
  const lang = await getDynamicLanguage();
  const cache = createIntlCache();
  intl = createIntl({ locale: 'en', messages: lang }, cache); //locale and message can come from Redux or regular import
}

initIntl();

interface Props {
  cartItemList: CART_ITEM_TYPE[];
  showPCMiniCartPop?: boolean; //Show PC mini cart at the top right-hand corner, when add products to cart successfully
}

interface CART_ITEM_TYPE {
  sizeList: any[];
  goodsInfo: any; //规格集合
  goodsId: string; //spu id
  goodsInfoId: string; //被选中的规格sku id
  quantity: number; //操作的数量
  goodsInfoFlag: any; //操作的购买方式
}

const addItems = async ({ cartItemList, showPCMiniCartPop = true }: Props) => {
  const { formatMessage } = intl;
  const {
    info: { skuLimitThreshold }
  } = stores.configStore;
  try {
    let cartDataCopy = cloneDeep(
      toJS(stores.checkoutStore.cartData).filter((el: any) => el)
    );
    let oldIndvIndex = cartDataCopy.findIndex(
      (item: any) => item.goodsInfoFlag == 3
    );
    oldIndvIndex > -1 && cartDataCopy.splice(oldIndvIndex, 1); //删除购物车已有的indv商品
    cartItemList.forEach((cartItem) => {
      // goodsInfo是规格集合
      const selectedGoodsInfo =
        find(cartItem.sizeList, (s: any) => s.selected) || cartItem.goodsInfo;
      debugger;
      cartItem.goodsInfoId = selectedGoodsInfo.goodsInfoId;
      // 删除selectedGoodsInfo的相关属性，否则最外层相关值会被覆盖
      delete selectedGoodsInfo.goods;
      delete selectedGoodsInfo.questionParams;
      delete selectedGoodsInfo.recommendationId;
      delete selectedGoodsInfo.recommendationName;
      delete selectedGoodsInfo.referenceData;
      delete selectedGoodsInfo.referenceObject;
      cartItem = Object.assign({}, cartItem, selectedGoodsInfo); //把选中的规则，平铺到了最外层吗，同会员购物车数据结构
      // 当前需要加入的产品，是否存在于原购物车中，goodsId-spu goodsInfoId-sku
      const historyItemIdx = findIndex(
        cartDataCopy,
        (c: any) =>
          c.goodsId === cartItem.goodsId &&
          c.goodsInfoId === selectedGoodsInfo.goodsInfoId
      );
      const historyItem = cartDataCopy[historyItemIdx];
      // 如果之前该商品(同spu 同sku)加入过购物车，则需取出其数量，进行累加
      if (historyItem) {
        cartItem = Object.assign(cartItem, {
          quantity: cartItem.quantity + historyItem.quantity
        });
      }
      cartItem = Object.assign({}, cartItem, { buyCount: cartItem.quantity });
      // 如果之前该商品(同spu 同sku)加入过购物车，删除原有位置数据，并向最前边插入
      // 否则，在最前边插入
      if (historyItemIdx > -1) {
        if (cartItem.goodsInfoFlag != 3) {
          cartDataCopy.splice(historyItemIdx, 1);
          cartDataCopy.unshift(cartItem);
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
      await stores.checkoutStore.setCartData(cartDataCopy);
      return;
    }
    // 校验
    // 2 所有产品数量限制
    // 3 所有产品种类限制
    if (
      cartDataCopy.reduce((pre: any, cur: any) => {
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
    // @ts-ignore
    await stores.checkoutStore.updateUnloginCart({ cartData: cartDataCopy });
    if (showPCMiniCartPop && !isMobile) {
      stores.headerCartStore.show();
      clearTimeout(timer);
      timer = setTimeout(() => {
        stores.headerCartStore.hide();
      }, 4000);
    }
  } catch (err) {
    throw new Error((err as any).message);
  }
};

export default addItems;
