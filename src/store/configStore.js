import { action, observable, computed } from "mobx";
import { getConfig } from '@/api'

class ConfigStore {
  @observable info = sessionStorage.getItem('storeContentInfo')
    ? JSON.parse(sessionStorage.getItem('storeContentInfo'))
    : null

  @computed get storeContactPhoneNumber () {
    return this.info ? this.info.storeContactPhoneNumber : ''
  }

  @computed get privacyPolicyUrl () {
    return this.info ? this.info.privacyPolicyUrl : ''
  }

  @computed get cookiesUrl () {
    return this.info ? this.info.cookiesUrl : ''
  }

  @computed get legalTerms () {
    return this.info ? this.info.legalTerms : ''
  }

  @computed get contactTimePeriod () {
    return this.info ? this.info.contactTimePeriod : ''
  }

  @computed get contactUsUrl () {
    return this.info ? this.info.contactUsUrl : ''
  }

  @computed get storeContactEmail () {
    return this.info ? this.info.storeContactEmail : ''
  }

  // 显示profile payment method开关
  @computed get profilePaymentMethod () {
    return this.info && this.info.profilePaymentMethod === '1'
  }

  // 显示prescriber map开关
  @computed get prescriberMap () {
    return this.info && this.info.prescriberMap === '1'
  }

  @action.bound
  async queryConfig () {
    let res = await getConfig()
    this.info = res.context.storeVO
    sessionStorage.setItem('storeContentInfo', JSON.stringify(this.info))
  }
}
export default ConfigStore;