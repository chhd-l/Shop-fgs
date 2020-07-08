import LoginStore from "./loginStore";
import CheckoutStore from "./checkoutStore";

const stores = {
  loginStore: new LoginStore(),
  checkoutStore: new CheckoutStore()
};
/// 默认导出接口
export default stores;