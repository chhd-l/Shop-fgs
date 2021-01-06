import { action, observable, computed, toJS } from 'mobx';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

const localItemRoyal = window.__.localItemRoyal;

class PaymentStore {
  @observable isLogin = !!localItemRoyal.get("rc-token")
  @observable deliveryAddress = null;
  @observable billingAddress = null;

  @observable selectedDeliveryAddress = null;
  @observable selectedBillingAddress = null;
  @observable selectedCardId = null;

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
  setStsToCompleted({ key }) {
    switch (key) {
      case 'email':
        dataLayer[0].checkout.step = 2
        dataLayer[0].checkout.option = 'guest checkout'
        if(!this.isLogin){
          dataLayer.push({
            checkout:{
              step:2,
              option: 'guest checkout'
            },
            event:process.env.REACT_APP_GTM_SITE_ID+'virtualPageView',
            page:{
              type:'Checkout',
              virtualPageURL:'/checkout/shipping'
            }
          })
        }else{
          const result = find(dataLayer, (ele) => ele.event === process.env.REACT_APP_GTM_SITE_ID+'virtualPageView')
          result.checkout = {
            step:2,
            option: 'guest checkout'
          }
          result.page = {
            type:'Checkout',
              virtualPageURL:'/checkout/shipping'
          }
        }
        break;
      case 'deliveryAddr':
        dataLayer[0].checkout.step = 3;
        dataLayer[0].checkout.option = ''
        if(!this.isLogin){
          dataLayer.push({
            checkout:{
              step:3,
              option: 'shippingMethod'
            },
            event:process.env.REACT_APP_GTM_SITE_ID+'virtualPageView',
            page:{
              type:'Checkout',
              virtualPageURL:'/checkout/billing'
            }
          })
        }else{
          const result = find(dataLayer, (ele) => ele.event === process.env.REACT_APP_GTM_SITE_ID+'virtualPageView')
          result.checkout = {
            step:3,
            option: 'shippingMethod'
          }
          result.page = {
            type:'Checkout',
              virtualPageURL:'/checkout/billing'
          }
        }
        break;
      case 'paymentMethod':
        dataLayer[0].checkout.step = 4;
        dataLayer[0].checkout.option = ''
        if(!this.isLogin){
          dataLayer.push({
            checkout:{
              step:4,
              option: 'paymentMethod'
            },
            event:process.env.REACT_APP_GTM_SITE_ID+'virtualPageView',
            page:{
              type:'Checkout',
              virtualPageURL:'/checkout/placeOrder'
            }
          })
        }else{
          const result = find(dataLayer, (ele) => ele.event === process.env.REACT_APP_GTM_SITE_ID+'virtualPageView')
          result.checkout = {
            step:4,
            option: 'paymentMethod'
          }
          result.page = {
            type:'Checkout',
              virtualPageURL:'/checkout/placeOrder'
          }
        }
        break;
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

  @action.bound
  updateSelectedDeliveryAddress(data) {
    let tmpData = data;
    if (data && data.consigneeNumber) {
      tmpData = Object.assign(data, { phoneNumber: data.consigneeNumber });
    }
    this.selectedDeliveryAddress = tmpData;
  }

  @action.bound
  updateSelectedBillingAddress(data) {
    let tmpData = data;
    if (data && data.consigneeNumber) {
      tmpData = Object.assign(data, { phoneNumber: data.consigneeNumber });
    }
    this.selectedBillingAddress = tmpData;
  }

  @action
  updateFirstSavedCardCvv(data) {
    this.firstSavedCardCvv = data;
  }

  @action.bound
  updateSelectedCardId(id) {
    this.selectedCardId = id;
  }
}
export default PaymentStore;
