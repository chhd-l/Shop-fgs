import { action, observable, computed, toJS } from 'mobx';
import { addressValidation, queryOpenedApi } from '@/api/address';
import find from 'lodash/find';
const localItemRoyal = window.__.localItemRoyal;

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
      let apiType = '';
      let oat = await queryOpenedApi();
      if (oat?.context?.addressApiSettings) {
        let apiobj = oat?.context?.addressApiSettings;
        apiobj =
          find(
            apiobj,
            (e) => e.name == 'DQE' || e.name == 'DADATA' || e.name == 'FEDEX'
          ) || null;
        if (apiobj?.isOpen == 1 && apiobj?.addressApiType == 1)
          apiType = apiobj?.name; // DQE 、DADATA、FEDEX
      }
      const res = await addressValidation({
        city: address.city,
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID,
        deliveryAddress: address.address1,
        postCode: address.postCode,
        province: address.province,
        storeId: Number(window.__.env.REACT_APP_STOREID),
        addressApiType: apiType === 'FEDEX' ? 1 : 0 // 0: VERIFY(验证), 1: AUTOFILL(建议地址)
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
      return ret;
    } catch (err) {
      console.log(err);
      return ret;
    }
  }

  @action.bound
  switchSelectListValidationOption(val) {
    this.selectListValidationOption = val;
  }
}
export default addressStore;
