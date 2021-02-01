import { action, observable } from "mobx";
import stores from './index'

const localItemRoyal = window.__.localItemRoyal;

class LoginStore {
  @observable isLogin = !!localItemRoyal.get("rc-token")
  @observable loginModal = false
  @observable userInfo = localItemRoyal.get('rc-userinfo') || null

  @action.bound
  changeIsLogin (param) {
    if (typeof param === 'boolean') {
      this.isLogin = param
    }
  }
  @action.bound
  changeLoginModal (param) {
    if (typeof param === 'boolean') {
      this.loginModal = param
    }
  }
  @action.bound
  setUserInfo (data) {
    this.userInfo = data
    stores.clinicStore.setDefaultClinicId(data.defaultClinics ? data.defaultClinics.clinicsId : '')
    stores.clinicStore.setDefaultClinicName(data.defaultClinics ? data.defaultClinics.clinicsName : '')
    localItemRoyal.set('rc-userinfo', data)
  }
  @action.bound
  removeUserInfo () {
    this.userInfo = null
    localItemRoyal.remove('rc-userinfo')
  }
}
export default LoginStore;