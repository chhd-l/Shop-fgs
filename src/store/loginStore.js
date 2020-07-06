import { action, observable } from "mobx";
class LoginStore {
  @observable isLogin = !!localStorage.getItem("rc-token")
  @observable loginModal = false

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
}
export default LoginStore;