import { action, observable, computed } from 'mobx';
import { getConfig, getIsNeedPrescriber } from '@/api';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

class ConfigStore {
  @observable info = sessionItemRoyal.get('storeContentInfo')
    ? JSON.parse(sessionItemRoyal.get('storeContentInfo'))
    : null;

  @observable isNeedPrescriber = null;

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

  // 返回prescription页面是否需要显示用户选择绑定prescriber弹框 0:不显示 1：显示
  @computed get isShowPrescriberModal() {
    return this.isNeedPrescriber === 1;
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
      console.log(' ----------- queryConfig: ', res);
    }
    this.info = res;
    sessionItemRoyal.set('storeContentInfo', JSON.stringify(this.info));
  }

  //查询prescription页面是否需要显示用户选择绑定prescriber弹框
  @action.bound
  async getIsNeedPrescriber() {
    let res = await getIsNeedPrescriber();
    if (res.context) {
      res = res.context.find((item) => {
        return item.configType === 'if_prescriber_is_not_mandatory';
      });
      res = res ? res.status : null;
    } else {
      res = res.context;
    }
    console.log('是否显示prescriber弹框:', res);
    this.isNeedPrescriber = res;
  }
}
export default ConfigStore;
