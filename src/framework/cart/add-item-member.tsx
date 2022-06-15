import { addItemToBackendCart } from '@/api/cart';
import stores from '@/store';

interface Props {
  param: SITEPURCHASE_PARAM;
}

interface SITEPURCHASE_PARAM {
  goodsInfoId: string; //goods skuId or goodsInfoId
  goodsNum: string; //the num of product that needs to add to cart
  goodsInfoFlag: string; //the buy type of this product, 1-none 0-single 1-autoship 2-club
  periodTypeId?: string; //
  petsId?: string; //the pet id that binded on the product
  petsType?: string; //the pet type that binded on the product
  questionParams?: string; // the question params of product finder, which can create pet when checkout
  recommendationId?: string; //the prescriber id that binded on the product
  recommendationName?: string; //the prescriber name that binded on the product
  recommendationInfos?: string;
  goodsCategory?: string;
}

/**
 * 单个商品加入购物车
 * @param param0
 */
const addItem = async ({ param }: Props) => {
  try {
    await addItemToBackendCart(param); // add product to backend cart data
    await stores.checkoutStore.updateLoginCart();
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default addItem;
