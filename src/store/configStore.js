import { action, observable, computed } from "mobx";
import { getContactInfo } from '@/api/phone'

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

  @action.bound
  async queryConfig () {
    let res = await getContactInfo(process.env.REACT_APP_STOREID)
    this.info = res.context
    sessionStorage.setItem('storeContentInfo', JSON.stringify(this.info))
  }
}
export default ConfigStore;