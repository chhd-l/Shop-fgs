import { action, observable, computed, toJS } from 'mobx';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { isNewAccount } from '@/api/user';
import { checkoutDataLayerPushEvent } from '@/utils/GA';
import { forceVisible } from 'react-lazyload';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const isHubGA = window.__.env.REACT_APP_HUB_GA;

const initPanelStatus = [
  {
    key: 'clinic',
    order: 1,
    status: {
      isPrepare: true,
      isEdit: false,
      isCompleted: false,
      hasCompleted: false // 是否曾completed过
    }
  },
  {
    key: 'email',
    order: 2,
    status: {
      isPrepare: true,
      isEdit: false,
      isCompleted: false,
      hasCompleted: false
    }
  },
  {
    key: 'deliveryAddr',
    order: 3,
    status: {
      isPrepare: true,
      isEdit: false,
      isCompleted: false,
      hasCompleted: false
    }
  },
  {
    key: 'bindPet',
    order: 4,
    status: {
      isPrepare: true,
      isEdit: false,
      isCompleted: false,
      hasCompleted: false
    }
  },
  {
    key: 'paymentMethod',
    order: 5,
    status: {
      isPrepare: true,
      isEdit: false,
      isCompleted: false,
      hasCompleted: false
    }
  },
  {
    key: 'billingAddr',
    order: 6,
    status: {
      isPrepare: true,
      isEdit: false,
      isCompleted: false,
      hasCompleted: false
    }
  },
  {
    key: 'confirmation',
    order: 7,
    status: { isPrepare: true, isEdit: false, hasCompleted: false }
  }
];

class PaymentStore {
  @observable isLogin = !!localItemRoyal.get('rc-token');
  @observable deliveryAddress = null;
  @observable billingAddress = null;
  @observable defaultCardDataFromAddr = null;
  @observable browserInfo = {};
  @observable md = ''; //3ds参数

  @observable selectedCardId = null;

  @observable panelStatus = initPanelStatus;

  @observable firstSavedCardCvv = ''; //当前绑卡的cvv

  @observable supportPaymentMethods = []; //当前支付方式所支持的卡类型

  @observable currentCardTypeInfo = null; //当前卡类型信息(cardLength:18，imgUrl,cvvLength: 3 ...)

  @observable fullScreenModalA = false;
  @observable fullScreenModalB = false;
  @observable fullScreenModalC = false;
  @observable fullScreenModalD = false;
  @observable fullScreenModalOptEmail = false;
  @observable fullScreenModalTC = false;
  @observable fullScreenModalPM = false;
  @observable guestEmail = '';

  @observable deliveryAddressInfo = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    phoneNumber: '',
    consigneeNumber: ''
  };
  @observable billingAddressInfo = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    phoneNumber: '',
    consigneeNumber: ''
  };
  @observable petList = [];
  @observable petSelectedIds = [];

  @observable isRreshList = false;
  @observable payWayNameArr = sessionItemRoyal.get('rc-payWayNameArr')
    ? JSON.parse(sessionItemRoyal.get('rc-payWayNameArr'))
    : []; //当前店铺支持的支付方式集合
  @observable curPayWayVal = '';
  @observable addCardDirectToPayFlag = false; //是否新增卡直接下单

  @computed get clinicPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'clinic').status;
  }

  @computed get emailPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'email').status;
  }

  @computed get deliveryAddrPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'deliveryAddr').status;
  }

  @computed get billingAddrPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'billingAddr').status;
  }

  @computed get bindPetPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'bindPet').status;
  }

  @computed get paymentMethodPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'paymentMethod').status;
  }

  @computed get confirmationPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'confirmation').status;
  }

  @computed get curPayWayInfo() {
    return this.payWayNameArr.filter(
      (p) => this.curPayWayVal && p.code === this.curPayWayVal
    )[0];
  }

  @action.bound
  updatePanelStatus(
    key,
    { isPrepare = 'default', isEdit = 'default', isCompleted = 'default' }
  ) {
    let idx = findIndex(this.panelStatus, (ele) => ele.key === key);
    let tmpStatus = this.panelStatus[idx].status;
    if (isPrepare !== 'default') {
      tmpStatus.isPrepare = isPrepare;
    }
    if (isEdit !== 'default') {
      tmpStatus.isEdit = isEdit;
    }
    if (isCompleted !== 'default') {
      tmpStatus.isCompleted = isCompleted;
      if (isCompleted) {
        tmpStatus.hasCompleted = true;
      }
    }
    //console.log(toJS(this.panelStatus))
  }

  @action.bound
  setStsToCompleted({ key, isFirstLoad }) {
    // this.isLogin在某些情况下为false,因此判断不对，例如在cart页面登录再进checkout页面。
    const isLoginIng = localItemRoyal.get('rc-token');
    console.log(this.isLogin, 'ISLOGIN==', isLoginIng, 'FJKLDS');
    //isFirstLoad表示进入checkout页面直接执行,此时不需要push-event
    if (isHubGA) {
      switch (key) {
        //填完邮件
        case 'email':
          if (isLoginIng) {
            isNewAccount().then((res) => {
              if (res.context == 0) {
                checkoutDataLayerPushEvent({
                  name: 'Delivery',
                  options: 'New account'
                });
              } else {
                checkoutDataLayerPushEvent({
                  name: 'Delivery',
                  options: 'Existing account'
                });
              }
            });
          } else {
            checkoutDataLayerPushEvent({
              name: 'Delivery',
              options: 'Guest checkout'
            });
          }
          break;
        //填完地址
        case 'deliveryAddr':
          if (isLoginIng) {
            isNewAccount().then((res) => {
              if (res.context == 0) {
                checkoutDataLayerPushEvent({
                  name: 'Payment',
                  options: 'New account'
                });
              } else {
                checkoutDataLayerPushEvent({
                  name: 'Payment',
                  options: 'Existing account'
                });
              }
            });
          } else {
            checkoutDataLayerPushEvent({
              name: 'Payment',
              options: 'Guest checkout'
            });
          }
          break;
        //填完支付信息
        case 'paymentMethod':
          if (isLoginIng) {
            isNewAccount().then((res) => {
              if (res.context == 0) {
                checkoutDataLayerPushEvent({
                  name: 'Confirmation',
                  options: 'New account'
                });
              } else {
                checkoutDataLayerPushEvent({
                  name: 'Confirmation',
                  options: 'Existing account'
                });
              }
            });
          } else {
            checkoutDataLayerPushEvent({
              name: 'Confirmation',
              options: 'Guest checkout'
            });
          }
          break;
      }
    } else {
      switch (key) {
        //填完邮件
        case 'email':
          if (window?.dataLayer && dataLayer[0] && dataLayer[0].checkout) {
            dataLayer[0].checkout.step = 2;
            dataLayer[0].checkout.option = 'guest checkout';

            let option = 'guest checkout';
            //特殊要求：会员需要查询是不是new account, SFCC只有在这一步骤的时候区分了是不是新账户
            if (isLoginIng) {
              isNewAccount().then((res) => {
                if (res.context == 0) {
                  dataLayer[0].checkout.option = 'new account';
                  option = 'new account';
                } else {
                  dataLayer[0].checkout.option = 'account already created';
                  option = 'account already created';
                }
              });
            }

            if (isFirstLoad) {
              const result = find(
                dataLayer,
                (ele) =>
                  ele.event ===
                  window.__.env.REACT_APP_GTM_SITE_ID + 'virtualPageView'
              );
              if (result) {
                result.checkout = {
                  step: 2,
                  option
                };
                result.page = {
                  type: 'Checkout',
                  virtualPageURL: '/checkout/shipping'
                };
              }
            } else {
              window?.dataLayer?.push({
                checkout: {
                  step: 2,
                  option
                },
                event: window.__.env.REACT_APP_GTM_SITE_ID + 'virtualPageView',
                page: {
                  type: 'Checkout',
                  virtualPageURL: '/checkout/shipping'
                }
              });
            }
          }
          break;
        //填完地址
        case 'deliveryAddr':
          if (window?.dataLayer && dataLayer[0] && dataLayer[0].checkout) {
            dataLayer[0].checkout.step = 3;
            dataLayer[0].checkout.option = '';
          }

          if (isFirstLoad) {
            const result =
              find(
                dataLayer,
                (ele) =>
                  ele.event ===
                  window.__.env.REACT_APP_GTM_SITE_ID + 'virtualPageView'
              ) || {};
            result.checkout = {
              step: 3,
              option: 'shippingMethod'
            };
            result.page = {
              type: 'Checkout',
              virtualPageURL: '/checkout/billing'
            };
          } else {
            window?.dataLayer?.push({
              checkout: {
                step: 3,
                option: 'shippingMethod'
              },
              event: window.__.env.REACT_APP_GTM_SITE_ID + 'virtualPageView',
              page: {
                type: 'Checkout',
                virtualPageURL: '/checkout/billing'
              }
            });
          }
          break;
        //填完支付信息
        case 'paymentMethod':
          if (window?.dataLayer && dataLayer[0] && dataLayer[0].checkout) {
            dataLayer[0].checkout.step = 4;
            dataLayer[0].checkout.option = '';
          }

          if (isFirstLoad) {
            const result = find(
              dataLayer,
              (ele) =>
                ele.event ===
                window.__.env.REACT_APP_GTM_SITE_ID + 'virtualPageView'
            );
            result.checkout = { step: 4, option: 'paymentMethod' };
            result.page = {
              type: 'Checkout',
              virtualPageURL: '/checkout/placeOrder'
            };
          } else {
            window?.dataLayer?.push({
              checkout: {
                step: 4,
                option: 'paymentMethod'
              },
              event: window.__.env.REACT_APP_GTM_SITE_ID + 'virtualPageView',
              page: {
                type: 'Checkout',
                virtualPageURL: '/checkout/placeOrder'
              }
            });
          }
          break;
      }
    }

    this.updatePanelStatus(key, {
      isPrepare: false,
      isEdit: false,
      isCompleted: true
    });
    forceVisible();
  }

  @action.bound
  setStsToEdit({ key, hideOthers = false }) {
    // 再次编辑时，把edit状态的置为prepare
    if (hideOthers) {
      const panelStatusJS = toJS(this.panelStatus);
      for (let tmpKey in panelStatusJS) {
        const tmpSts = this.panelStatus[tmpKey].status;
        // 当前是edit状态的，如果已经complete过，则isCompleted=true，否则isPrepare=true
        if (tmpSts.isEdit) {
          tmpSts.isEdit = false;
          if (tmpSts.hasCompleted) {
            tmpSts.isCompleted = true;
          } else {
            tmpSts.isPrepare = true;
          }
        }
      }
    }

    this.updatePanelStatus(key, {
      isPrepare: false,
      isEdit: true,
      isCompleted: false
    });
  }

  @action.bound
  setStsToPrepare({ key }) {
    this.updatePanelStatus(key, {
      isPrepare: true,
      isEdit: false,
      isCompleted: false
    });
  }

  @action.bound
  releaseCompletedPanel() {
    const panelStatusJS = toJS(this.panelStatus);
    for (let tmpKey in panelStatusJS) {
      const tmpSts = this.panelStatus[tmpKey].status;
      if (tmpSts.isPrepare && tmpSts.isCompleted) {
        tmpSts.isPrepare = false;
      }
    }
  }

  @action.bound
  setDeliveryAddress(data) {
    this.deliveryAddress = data;
  }

  @action.bound
  setBillingAddress(data) {
    this.deliveryAddress = data;
  }

  @action
  updateFirstSavedCardCvv(data) {
    this.firstSavedCardCvv = data;
  }

  @action.bound
  setDefaultCardDataFromAddr(data) {
    let tmpData = data;
    if (data && data.consigneeNumber) {
      tmpData = Object.assign(data, { phoneNumber: data.consigneeNumber });
    }
    this.defaultCardDataFromAddr = Object.assign(
      {},
      this.defaultCardDataFromAddr,
      tmpData
    );
  }

  @action.bound
  setBrowserInfo(data) {
    this.browserInfo = data;
  }

  @action.bound
  setSupportPaymentMethods(list) {
    this.supportPaymentMethods = list;
  }

  @action.bound
  setCurrentCardTypeInfo(data) {
    this.currentCardTypeInfo = data;
  }

  @action.bound
  setTrConsentModal(type, data) {
    this[type] = data;
  }

  @action.bound
  saveDeliveryAddressInfo(form) {
    this.deliveryAddressInfo = form;
  }

  @action.bound
  saveBillingAddressInfo(form) {
    this.billingAddressInfo = form;
  }

  @action.bound
  setGuestEmail(param) {
    this.guestEmail = param;
  }
  @action.bound
  setRreshCardList(bool) {
    this.isRreshList = bool;
  }

  @action.bound
  setPayWayNameArr(list) {
    sessionItemRoyal.set('rc-payWayNameArr', JSON.stringify(list));
    this.payWayNameArr = list;
  }

  @action.bound
  serCurPayWayVal(val) {
    this.curPayWayVal = val;
  }

  @action.bound
  setAddCardDirectToPayFlag(status) {
    this.addCardDirectToPayFlag = status;
  }

  @action.bound
  resetPanelStatus() {
    this.panelStatus = initPanelStatus;
  }

  @action.bound
  setPetList(data) {
    this.petList = data;
  }

  @action.bound
  setPetSelectedIds(data) {
    this.petSelectedIds = data;
  }
}
export default PaymentStore;
