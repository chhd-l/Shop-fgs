import { action, observable } from "mobx";
import stores from './index'
import store from 'storejs'

class LoginStore {
  @observable isLogin = !!localStorage.getItem("rc-token")
  @observable loginModal = false
  @observable userInfo = store.get('rc-userinfo') || null

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
    store.set('rc-userinfo', data)
  }
  @action.bound
  removeUserInfo () {
    this.userInfo = null
    store.remove('rc-userinfo')
  }
}
export default LoginStore;