import { batchAdd } from '@/api/cart';
import stores from '@/store';

interface Props {
  paramList: SITEPURCHASE_PARAM[];
  orderSource?: string;
  doUpdateCart?: boolean; //whethe to update local cart data
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
  clinicId?: string;
}

/**
 * 多个商品批量加入购物车
 */
const addItems = async ({
  paramList,
  orderSource,
  doUpdateCart = true
}: Props) => {
  try {
    await batchAdd({
      goodsInfos: paramList.map((item) =>
        Object.assign(item, { verifyStock: false, buyCount: item.goodsNum })
      ),
      orderSource
    }); // add product to backend cart data
    if (doUpdateCart) await stores.checkoutStore.updateLoginCart();
  } catch (err) {
    throw new Error((err as any).message);
  }
};

export default addItems;
