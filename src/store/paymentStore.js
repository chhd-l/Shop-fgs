import { action, observable, computed, toJS } from 'mobx';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { isNewAccount } from "@/api/user"

const localItemRoyal = window.__.localItemRoyal;
const isHubGA = process.env.REACT_APP_HUB_GA

const checkoutDataLayerPushEvent = ({name,options}) => {
  dataLayer.push({
    'event' : 'checkoutStep',
    'checkoutStep' : {
    	name, //Following values possible : 'Email', 'Delivery', 'Payment', 'Confirmation'
    	options, //'Guest checkout', 'New account', 'Existing account'
    }
});
}

class PaymentStore {
  @observable isLogin = !!localItemRoyal.get("rc-token")
  @observable deliveryAddress = null;
  @observable billingAddress = null;
  @observable defaultCardDataFromAddr = null;
  @observable browserInfo = {}
  @observable md = '';//3ds参数

  @observable selectedCardId = null;
  @observable defaultCardDataFromAddr = null;
  @observable paymentStep = new Array(4);

  @observable panelStatus = [
    {
      key: 'clinic',
      order: 1,
      status: { isPrepare: false, isEdit: true, isCompleted: false }
    },
    {
      key: 'email',
      order: 2,
      status: { isPrepare: true, isEdit: true, isCompleted: false }
    },
    {
      key: 'deliveryAddr',
      order: 3,
      status: { isPrepare: true, isEdit: false, isCompleted: false }
    },
    {
      key: 'paymentMethod',
      order: 4,
      status: { isPrepare: true, isEdit: false, isCompleted: false }
    },
    {
      key: 'billingAddr',
      order: 5,
      status: { isPrepare: true, isEdit: false, isCompleted: false }
    },
    {
      key: 'confirmation',
      order: 6,
      status: { isPrepare: true, isEdit: false }
    }
  ];

  @observable firstSavedCardCvv = ''; //当前绑卡的cvv

  @computed get emailPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'email').status;
  }

  @computed get deliveryAddrPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'deliveryAddr').status;
  }

  @computed get billingAddrPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'billingAddr').status;
  }

  @computed get paymentMethodPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'paymentMethod').status;
  }

  @computed get confirmationPanelStatus() {
    return find(this.panelStatus, (ele) => ele.key === 'confirmation').status;
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
    }
  }


  @action.bound
  setStsToCompleted({ key, isFirstLoad }) {//isFirstLoad表示进入checkout页面直接执行,此时不需要push-event
    if (isHubGA) {
      switch (key) {
        //填完邮件
        case 'email':
          if (this.isLogin) {
            isNewAccount().then((res) => {
              if (res.code == 'K-000000' && res.context == 0) {
                checkoutDataLayerPushEvent({name:'Email',options:'New account'})
              } else {
                checkoutDataLayerPushEvent({name:'Email',options:'Existing account'})
              }
            })
          } else {
            checkoutDataLayerPushEvent({name:'Email',options:'Guest checkout'})
          }
          break;
        //填完地址
        case 'deliveryAddr':
          if (this.isLogin) {
            isNewAccount().then((res) => {
              if (res.code == 'K-000000' && res.context == 0) {
                checkoutDataLayerPushEvent({name:'Delivery',options:'New account'})
              } else {
                checkoutDataLayerPushEvent({name:'Delivery',options:'Existing account'})
              }
            })
          } else {
            checkoutDataLayerPushEvent({name:'Delivery',options:'Guest checkout'})
          }
          break;
        //填完支付信息
        case 'paymentMethod':
          if (this.isLogin) {
            isNewAccount().then((res) => {
              if (res.code == 'K-000000' && res.context == 0) {
                checkoutDataLayerPushEvent({name:'Payment',options:'New account'})
              } else {
                checkoutDataLayerPushEvent({name:'Payment',options:'Existing account'})
              }
            })
          } else {
            checkoutDataLayerPushEvent({name:'Payment',options:'Guest checkout'})
          }
          break;
      }
    } else {
      switch (key) {
        //填完邮件
        case 'email':
          dataLayer[0].checkout.step = 2
          dataLayer[0].checkout.option = 'guest checkout'
          let option = 'guest checkout'
          //特殊要求：会员需要查询是不是new account, SFCC只有在这一步骤的时候区分了是不是新账户
          if (this.isLogin) {
            isNewAccount().then((res) => {
              if (res.code == 'K-000000' && res.context == 0) {
                dataLayer[0].checkout.option = 'new account'
                option = 'new account'
              } else {
                dataLayer[0].checkout.option = 'account already created'
                option = 'account already created'
              }
            })
          }
          if (isFirstLoad) {
            const result = find(dataLayer, (ele) => ele.event === process.env.REACT_APP_GTM_SITE_ID + 'virtualPageView')
            result.checkout = {
              step: 2,
              option
            }
            result.page = {
              type: 'Checkout',
              virtualPageURL: '/checkout/shipping'
            }
          } else {
            dataLayer.push({
              checkout: {
                step: 2,
                option
              },
              event: process.env.REACT_APP_GTM_SITE_ID + 'virtualPageView',
              page: {
                type: 'Checkout',
                virtualPageURL: '/checkout/shipping'
              }
            })
          }

          break;
        //填完地址
        case 'deliveryAddr':
          dataLayer[0].checkout.step = 3;
          dataLayer[0].checkout.option = ''
          if (isFirstLoad) {
            const result = find(dataLayer, (ele) => ele.event === process.env.REACT_APP_GTM_SITE_ID + 'virtualPageView')
            result.checkout = {
              step: 3,
              option: 'shippingMethod'
            }
            result.page = {
              type: 'Checkout',
              virtualPageURL: '/checkout/billing'
            }
          } else {
            dataLayer.push({
              checkout: {
                step: 3,
                option: 'shippingMethod'
              },
              event: process.env.REACT_APP_GTM_SITE_ID + 'virtualPageView',
              page: {
                type: 'Checkout',
                virtualPageURL: '/checkout/billing'
              }
            })
          }
          break;
        //填完支付信息
        case 'paymentMethod':
          dataLayer[0].checkout.step = 4;
          dataLayer[0].checkout.option = ''
          if (isFirstLoad) {
            const result = find(dataLayer, (ele) => ele.event === process.env.REACT_APP_GTM_SITE_ID + 'virtualPageView')
            result.checkout = { step: 4, option: 'paymentMethod' }
            result.page = {
              type: 'Checkout',
              virtualPageURL: '/checkout/placeOrder'
            }
          } else {
            dataLayer.push({
              checkout: {
                step: 4,
                option: 'paymentMethod'
              },
              event: process.env.REACT_APP_GTM_SITE_ID + 'virtualPageView',
              page: {
                type: 'Checkout',
                virtualPageURL: '/checkout/placeOrder'
              }
            })
          }
          break;
      }
    }

    this.updatePanelStatus(key, {
      isPrepare: false,
      isEdit: false,
      isCompleted: true
    });
  }

  @action.bound
  setStsToEdit({ key, hideOthers = false }) {
    // 再次编辑时，把edit状态的置为prepare
    if (hideOthers) {
      const panelStatusJS = toJS(this.panelStatus);
      for (let tmpKey in panelStatusJS) {
        const tmpSts = this.panelStatus[tmpKey].status;
        if (tmpSts.isEdit) {
          tmpSts.isEdit = false;
          tmpSts.isPrepare = true;
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
    this.browserInfo = data
  }
}
export default PaymentStore;
