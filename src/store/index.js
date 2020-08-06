import LoginStore from "./loginStore";
import CheckoutStore from "./checkoutStore";
import ClinicStore from "./clinicStore";
import FrequencyStore from "./frequencyStore";
import ConfigStore from "./configStore";

const stores = {
  loginStore: new LoginStore(),
  checkoutStore: new CheckoutStore(),
  clinicStore: new ClinicStore(),
  frequencyStore: new FrequencyStore(),
  configStore: new ConfigStore()
};
/// 默认导出接口
export default stores;