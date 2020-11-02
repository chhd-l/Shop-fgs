import { action, observable } from "mobx";

class HeaderCartStore {
  @observable visible = false
  @observable errMsg = ''
  @observable flag = 0

  @action.bound
  show () {
    this.flag = 1
    this.visible = true
  }

  @action.bound
  hide () {
    this.flag = 0
    setTimeout(() => {
      if (!this.flag) {
        this.visible = false
        this.errMsg = ''
      }
    }, 500)
  }

  @action.bound
  setErrMsg (data) {
    this.errMsg = data
  }
}
export default HeaderCartStore;