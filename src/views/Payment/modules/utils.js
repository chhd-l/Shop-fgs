import find from 'lodash/find';

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
