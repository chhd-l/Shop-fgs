import LoginStore from "./loginStore";
import CheckoutStore from "./checkoutStore";
import ClinicStore from "./clinicStore";
import FrequencyStore from "./frequencyStore";

const stores = {
  loginStore: new LoginStore(),
  checkoutStore: new CheckoutStore(),
  clinicStore: new ClinicStore(),
  frequencyStore: new FrequencyStore(),
};
/// 默认导出接口
export default stores;