import { action, observable } from 'mobx';
import { getAddressList, saveAddress, editAddress } from '@/api/address';

class PaymentStore {
  @observable deliveryAddress = null;
  @observable billingAddress = null;
  @observable visitorDeliveryEmail = '';
  @observable visitorDeliveryPhone = '';
  @observable visitorDeliveryFristName = '';
  @observable visitorDeliveryLastName = '';

  @action.bound
  setDeliveryAddress(data) {
    debugger;
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
  updateVisitorDeliveryEmail(data) {
    this.visitorDeliveryEmail = data;
  }

  @action.bound
  updateVisitorDeliveryPhone(data) {
    this.visitorDeliveryPhone = data;
  }

  @action.bound
  updateVisitorDeliveryFirstName(data) {
    this.visitorDeliveryFristName = data;
  }

  @action.bound
  updateVisitorDeliveryLastName(data) {
    this.visitorDeliveryLastName = data;
  }
}
export default PaymentStore;
