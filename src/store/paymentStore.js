import { action, observable } from 'mobx';

class PaymentStore {
  @observable deliveryAddress = null;
  @observable billingAddress = null;

  @observable selectedDeliveryAddress = null;
  @observable bookingProgress = [
    'clinic',
    'delivery address',
    'billing address',
    'payment method'
  ];
  @observable currentProgressIndex = 0;

  @observable panelStatus = {
    clinic: { isPrepare: false, isEdit: true, isCompleted: false },
    deliveryAddr: { isPrepare: true, isEdit: false, isCompleted: false },
    billingAddr: { isPrepare: true, isEdit: false, isCompleted: false },
    paymentMethod: { isPrepare: true, isEdit: false, isCompleted: false }
  };

  @action.bound
  updatePanelStatus(
    key,
    { isPrepare = 'default', isEdit = 'default', isCompleted = 'default' }
  ) {
    if (isPrepare !== 'default') {
      this.panelStatus[key].isPrepare = isPrepare;
    }
    if (isEdit !== 'default') {
      this.panelStatus[key].isEdit = isEdit;
    }
    if (isCompleted !== 'default') {
      this.panelStatus[key].isCompleted = isCompleted;
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
  // 保存或编辑时，把地址更新为当前的
  async saveAddress(interfaceName, params) {
    await [interfaceName](params);
    // 此时设置地址
    //
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
  updateCurrentProgressIndex(i) {
    this.currentProgressIndex = i;
  }
}
export default PaymentStore;
