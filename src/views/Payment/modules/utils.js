import find from 'lodash/find';
import { scrollIntoView } from '@/lib/scroll-to-utils';

/**
 * 查找下一个最近的未complete的panel
 * @param {Array} list
 * @param {String}  curKey
 */
export function searchNextConfirmPanel({ list, curKey }) {
  const targetObj = find(list, (ele) => ele.key === curKey);
  let nextConfirmPanel = null;

  const unCompletedPanelList = list
    .sort((a, b) => a.order - b.order)
    .filter((ele) => ele.order > targetObj.order && !ele.status.isCompleted);

  if (unCompletedPanelList.length) {
    nextConfirmPanel = unCompletedPanelList[0];
  }
  return nextConfirmPanel;
}

/**
 * 判断当前panel的前序是否全部ready
 * @param {Array} list
 * @param {String}  curKey
 */
export function isPrevReady({ list, curKey }) {
  const targetObj = find(list, (ele) => ele.key === curKey);
  let isReadyPrev = list
    .filter((ele) => ele.order < targetObj.order)
    .every((ele) => ele.status.isCompleted);
  return isReadyPrev;
}

export function scrollPaymentPanelIntoView() {
  scrollIntoView(document.querySelector(`#J_checkout_panel_paymentMethod`));
}

/**
 * 处理recomendation product参数
 * @param {Object} ele 产品item info
 * @returns
 */
export function handleRecoProductParamByItem(ele) {
  let recommendationInfos = {};
  if (ele.recommendationInfos && ele.recommendationInfos != 'null') {
    recommendationInfos =
      typeof ele.recommendationInfos == 'string'
        ? JSON.parse(ele.recommendationInfos)
        : ele.recommendationInfos;
  }
  const {
    recommendationName = '',
    recommendationId = '',
    referenceObject = '',
    recommenderId = '',
    referenceData = '',
    recommenderName = ''
  } = recommendationInfos;
  const referenceId = recommenderId || recommendationId;
  return {
    //shelter和breeder产品参数 start
    utmSource: ele.utmSource || '',
    utmMedium: ele.utmMedium || '',
    utmCampaign: ele.utmCampaign || '',
    prefixFn: ele.prefixFn || '',
    prefixBreed: ele.prefixBreed || '',
    //shelter和breeder产品参数 end
    referenceObject,
    recommenderId,
    referenceData,
    recommenderName,
    referenceId,
    recommendationId: recommendationId || ele.recommendationId || '', // 优先去取recommendationInfos里面的recommendationId
    recommendationName: recommendationName || ele.recommendationName || ''
  };
}
