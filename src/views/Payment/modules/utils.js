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

// 滑动到视野区域内
// export function scrollIntoView(element) {
//   if (element) {
//     window.scrollTo({
//       top: getElementToPageTop(element) - 300,
//       behavior: 'smooth'
//     });
//   }
// }

function getElementToPageTop(el) {
  if (el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop;
  }
  return el.offsetTop;
}

function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

function scrollIntoView(element) {
  const headerElement = document.querySelector(`.rc-header__nav`);
  if (element && headerElement) {
    window.scroll({
      top: getElementTop(element) - headerElement.offsetHeight,
      behavior: 'smooth'
    });
  }
}

export function scrollPaymentPanelIntoView() {
  scrollIntoView(document.querySelector(`#J_checkout_panel_paymentMethod`));
}
