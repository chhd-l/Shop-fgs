import { action, observable, computed, toJS } from 'mobx';
import { addressValidation } from '@/api/address';

class addressStore {
  @observable modalVisible = false;
  @observable originAddress = null;
  @observable suggestedAddress = null;
  @observable modalConfirmBtnLoading = false;
  @observable selectListValidationOption = 'suggestedAddress';

  @computed get validationAddress() {
    return this.selectListValidationOption === 'originalAddress'
      ? this.originAddress
      : this.suggestedAddress;
  }

  @action.bound
  setModalVisible(data) {
    this.modalVisible = data;
  }

  @action.bound
  setOriginAddress(data) {
    this.originAddress = data;
  }

  @action.bound
  setSuggestedAddress(data) {
    this.suggestedAddress = data;
  }

  @action.bound
  setModalConfirmBtnLoading(data) {
    this.modalConfirmBtnLoading = data;
  }

  @action.bound
  async validAddr({ data: address }) {
    // this.setModalConfirmBtnLoading(true);
    this.setOriginAddress(address);
    let ret = null;
    let valaddFlag = false; // 是否返回地址校验数据
    try {
      const res = await addressValidation({
        city: address.city,
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID,
        deliveryAddress: address.address1,
        postCode: address.postCode,
        province: address.province,
        storeId: Number(window.__.env.REACT_APP_STOREID)
      });
      if (res.context && res.context != null) {
        ret = Object.assign(res.context.suggestionAddress, {
          validationResult: res.context.validationResult
        });
        valaddFlag = true;
        this.setSuggestedAddress(ret);
      }
      // 是否地址验证保存本地
      localItemRoyal.set('rc-address-validation-flag', valaddFlag);
    } catch (err) {
    } finally {
      // this.setModalConfirmBtnLoading(false);
      return ret;
    }
  }

  @action.bound
  switchSelectListValidationOption(val) {
    this.selectListValidationOption = val;
  }
}
export default addressStore;
