import { action, observable, computed } from 'mobx';
import { getConfig } from '@/api';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

class ConfigStore {
  @observable info = sessionItemRoyal.get('storeContentInfo')
    ? JSON.parse(sessionItemRoyal.get('storeContentInfo'))
    : null;

  //GA 全局变量 pet变量
  @observable pet = localItemRoyal.get(`rc-ga-pet`) || ''

  @computed get maxGoodsPrice() {
    return this.info ? this.info.maxGoodsPrice : 0;
  }

  @computed get customTaxSettingOpenFlag() {
    return this.info ? this.info.customTaxSettingOpenFlag : 0;
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
    return (
      this.info && this.info.storeVO && this.info.storeVO.prescriberMap === '1'
    );
  }

  // 显示onePageCheckout样式
  @computed get isOnePageCheckout() {
    return (
      this.info &&
      this.info.storeVO &&
      this.info.storeVO.onePageCheckout === '1'
    );
  }

  @computed get defaultPurchaseType() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.defaultPurchaseType
      : '';
  }

  @computed get defaultSubscriptionFrequencyId() {
    return this.info && this.info.storeVO
      ? this.info.storeVO.defaultSubscriptionFrequencyId
      : '';
  }

  @action.bound
  async queryConfig() {
    let res = this.info;
    if (!res) {
      res = await getConfig();
      res = res.context;
      console.log(' ----------- queryConfig: ',res);
    }
    this.info = res;
    sessionItemRoyal.set('storeContentInfo', JSON.stringify(this.info));
  }

  @action.bound
  setGAPet (data) {
    this.pet = data
    localItemRoyal.set(`rc-ga-pet`,data)
  }
}
export default ConfigStore;
