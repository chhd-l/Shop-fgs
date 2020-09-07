import { action, observable } from 'mobx';

class PaymentStore {
  @observable deliveryAddress = null;
  @observable billingAddress = null;

  @observable selectedDeliveryAddress = null;

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
}
export default PaymentStore;
