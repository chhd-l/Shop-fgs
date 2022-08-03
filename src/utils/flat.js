import { getSeoConfig, queryHeaderNavigations } from '@/api';
import { purchases, mergePurchase, addItemToBackendCart } from '@/api/cart';
import { findStoreCateList } from '@/api/home';
import intersection from 'lodash/intersection';
import { getDict, getAppointDict } from '@/api/dict';
import { findFilterList, findSortList } from '@/api/list';
import { getRation as getRation_api } from '@/api/pet';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import findIndex from 'lodash/findIndex';
import stores from '@/store';

const sessionItemRoyal = window.__.sessionItemRoyal;
const api = {
  carts: `/site/${window.__.env.REACT_APP_STOREID}/carts` // 单个商品加入后台购物车
};
/**
 * 数组扁平化
 * @param {Array} array - 数组
 */
export function flat(arr) {
  var res = [];
  for (let el of arr) {
    if (Array.isArray(el)) {
      res = res.concat(flat(el));
    } else {
      res.push(el);
    }
  }
  return res;
}
