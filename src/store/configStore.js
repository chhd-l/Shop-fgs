import { action, observable, computed } from 'mobx';
import { getConfig } from '@/api';

const sessionItemRoyal = window.__.sessionItemRoyal;

class ConfigStore {
  @observable info = sessionItemRoyal.get('storeContentInfo')
    ? JSON.parse(sessionItemRoyal.get('storeContentInfo'))
    : null;

  @computed get maxGoodsPrice() {
    return this.info ? this.info.maxGoodsPrice : 0;
  }

  @computed get storeContactPhoneNumber() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.storeContactPhoneNumber
      : '';
  }

  @computed get privacyPolicyUrl() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.privacyPolicyUrl
      : '';
  }

  @computed get legalTerms() {
    return this.info && this.info.storeVO ? this.info.storeVO.legalTerms : '';
  }

  @computed get contactTimePeriod() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.contactTimePeriod
      : '';
  }

  @computed get contactUsUrl() {
    return this.info && this.info.storeVO ? this.info.storeVO.contactUsUrl : '';
  }

  @computed get storeContactEmail() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.storeContactEmail
      : '';
  }

  @computed get ourValues() {
    return this.info && this.info.storeVO ? this.info.storeVO.ourValues : '';
  }

  @computed get qualityAndSafety() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.qualityAndSafety
      : '';
  }

  @computed get specificNutrition() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.specificNutrition
      : '';
  }

  @computed get informationForParents() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.informationForParents
      : '';
  }

  @computed get cookiesUrl() {
    return this.info && this.info.storeVO ? this.info.storeVO.cookiesUrl : '';
  }

  // 显示profile payment method开关
  @computed get profilePaymentMethod() {
    return true;
  }

  // 显示prescriber map开关
  @computed get prescriberMap() {
    return this.info && this.info.storeVO && this.info.prescriberMap === '1';
  }

  // 显示onePageCheckout样式
  @computed get isOnePageCheckout() {
    return (
      this.info &&
      this.info.storeVO &&
      this.info.storeVO.onePageCheckout === '1'
    );
  }

  @action.bound
  async queryConfig() {
    let res = await getConfig();
    this.info = res.context;
    sessionItemRoyal.set('storeContentInfo', JSON.stringify(this.info));
  }
}
export default ConfigStore;
