export { default as AddItemsVisitor } from './add-items-visitor';
export { default as AddItemMember } from './add-item-member';
export { default as AddItemsMember } from './add-items-member';

/**
 * 页面不显示产品详细信息，直接加入购物车方法: 参考src\views\Adoptions\index.js
 * 1. 商品详情接口返回数据(res)
 * 2. res.goodsInfos中设置selected字段
 * 3. 使用handleSizeList返回sizeList集合，设置res.sizeList
 * 4.1 调用AddCartItemsVisitor，传入res(游客)
 * 4.2 调用AddCartItemsMember(会员)
 */

/**
 * 根据购物车数据，加入游客购物车方法: 参考src\views\Cart\modules\unLoginCart.js
 * 1. 购物车接口返回数据(goodsList)
 * 2. goodsList的goodsInfos中设置selected字段
 * 3. 使用handleSizeList返回sizeList集合，设置goodsList的sizeList
 * 4 调用AddCartItemsVisitor，传入goodsList
 */

