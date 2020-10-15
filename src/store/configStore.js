import { action, observable, computed } from 'mobx';
import { getConfig } from '@/api';

const sessionItemRoyal = window.__.sessionItemRoyal;

class ConfigStore {
  @observable info = sessionItemRoyal.get('storeContentInfo')
    ? JSON.parse(sessionItemRoyal.get('storeContentInfo'))
    : null;

  @computed get storeContactPhoneNumber() {
    return this.info ? this.info.storeContactPhoneNumber : '';
  }

  @computed get privacyPolicyUrl() {
    return this.info ? this.info.privacyPolicyUrl : '';
  }

  @computed get legalTerms() {
    return this.info ? this.info.legalTerms : '';
  }

  @computed get contactTimePeriod() {
    return this.info ? this.info.contactTimePeriod : '';
  }

  @computed get contactUsUrl() {
    return this.info ? this.info.contactUsUrl : '';
  }

  @computed get storeContactEmail() {
    return this.info ? this.info.storeContactEmail : '';
  }

  @computed get ourValues() {
    return this.info ? this.info.ourValues : '';
  }

  @computed get qualityAndSafety() {
    return this.info ? this.info.qualityAndSafety : '';
  }

  @computed get specificNutrition() {
    return this.info ? this.info.specificNutrition : '';
  }

  @computed get informationForParents() {
    return this.info ? this.info.informationForParents : '';
  }

  @computed get cookiesUrl() {
    return this.info ? this.info.cookiesUrl : '';
  }

  // 显示profile payment method开关
  @computed get profilePaymentMethod() {
    return true
    return this.info && this.info.profilePaymentMethod === '1';
  }

  // 显示prescriber map开关
  @computed get prescriberMap() {
    return this.info && this.info.prescriberMap === '1';
  }

  // 显示onePageCheckout样式
  @computed get isOnePageCheckout() {
    return this.info && this.info.onePageCheckout === '1';
  }

  @action.bound
  async queryConfig() {
    let res = await getConfig();
    this.info = res.context.storeVO;
    sessionItemRoyal.set('storeContentInfo', JSON.stringify(this.info));
  }
}
export default ConfigStore;
