import { action, observable } from 'mobx';
import { forceVisible } from 'react-lazyload';

class HeaderCartStore {
  @observable visible = false;
  @observable errMsg = '';
  @observable flag = 0;

  @action.bound
  show() {
    this.flag = 1;
    this.visible = true;
    forceVisible();
  }

  @action.bound
  hide() {
    this.flag = 0;
    setTimeout(() => {
      if (!this.flag) {
        this.visible = false;
        this.errMsg = '';
      }
    }, 500);
  }

  @action.bound
  setErrMsg(data) {
    this.errMsg = data;
  }
}
export default HeaderCartStore;
