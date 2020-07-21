import LoginStore from "./loginStore";
import CheckoutStore from "./checkoutStore";
import ClinicStore from "./clinicStore";

const stores = {
  loginStore: new LoginStore(),
  checkoutStore: new CheckoutStore(),
  clinicStore: new ClinicStore(),
};
/// 默认导出接口
export default stores;