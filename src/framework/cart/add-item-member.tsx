import { addItemToBackendCart } from '@/api/cart';
import stores from '@/store';
import { getDeviceType } from '@/utils/utils';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';

let timer: any;

interface Props {
  param: SITEPURCHASE_PARAM;
  updateLoginCartParam?: any;
  showPCMiniCartPop?: boolean; //Show PC mini cart at the top right-hand corner, when add products to cart successfully
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
  goodsCategory?: string; //shelter or breeder product param
  utmSource?: string; //shelter or breeder product param
  utmMedium?: string; //shelter or breeder product param
  utmCampaign?: string; //shelter or breeder product param
  prefixFn?: string; //shelter or breeder product param
  prefixBreed?: string; //shelter or breeder product param
}

/**
 * 单个商品加入购物车
 * @param param0
 */
const addItem = async ({
  param,
  updateLoginCartParam = {},
  showPCMiniCartPop = true
}: Props) => {
  try {
    await addItemToBackendCart(param); // add product to backend cart data
    await stores.checkoutStore.updateLoginCart(updateLoginCartParam);
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

export default addItem;
