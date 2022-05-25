import { action, observable, computed, toJS } from 'mobx';
import { getConfig } from '@/api';
import { fetchAddressDisplaySetting } from '@/api/address';
import { getPaymentMethodV2 } from '@/api/payment';
import flatten from 'lodash/flatten';
import {
  PAYMENTAUTHORITY_ENUM,
  ENTERPRICETYPE_ENUM,
  PRESCRIBERSELECTTYPED_ENUM
} from '@/utils/enum';
import cloneDeep from 'lodash/cloneDeep';

const sessionItemRoyal = window.__.sessionItemRoyal;
const addressFormNull = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  region: '',
  postCode: '',
  entrance: '',
  apartment: '',
  phoneNumber: '',
  comment: ''
};

class ConfigStore {
  @observable info = sessionItemRoyal.get('storeContentInfo')
    ? JSON.parse(sessionItemRoyal.get('storeContentInfo'))
    : null;

  // 需要显示的 address form 地址字段
  @computed get localAddressForm() {
    return (
      this.info?.localAddressForm || { settings: [], fieldKeyEnableStatus: {} }
    );
  }

  // 1-会员，2-会员和游客
  @computed get paymentAuthority() {
    return PAYMENTAUTHORITY_ENUM[this.info?.orderConfig?.context || '2'];
  }

  @computed get maxGoodsPrice() {
    return this.info?.maxGoodsPrice || 0;
  }

  @computed get discountDisplayTypeInfo() {
    return this.info?.discountDisplayTypeInfo || '';
  }

  // 税额开关 0: 开, 1: 关
  @computed get customTaxSettingOpenFlag() {
    return this.info?.customTaxSettingOpenFlag === 0;
  }

  // homeDelivery 开关
  @computed get isHomeDeliveryOpen() {
    return this.info?.deliveryConfig?.HOME_DELIVERY;
  }

  // pickup 开关
  @computed get isPickupOpen() {
    return this.info?.deliveryConfig?.PICK_UP;
  }

  // 买入价格开关 0：含税，1：不含税
  @computed get enterPriceType() {
    return ENTERPRICETYPE_ENUM[
      Number(
        (this.info?.systemTaxSetting?.configVOList &&
          this.info?.systemTaxSetting?.configVOList[1]?.context) ||
          0
      )
    ];
  }

  @computed get storeContactPhoneNumber() {
    return this.info?.storeVO?.storeContactPhoneNumber || '';
  }

  @computed get contactTimePeriod() {
    return this.info?.storeVO?.contactTimePeriod || '';
  }

  @computed get storeContactEmail() {
    return this.info?.storeVO?.storeContactEmail || '';
  }

  // 返回prescription页面是否需要显示用户选择绑定prescriber弹框 0:不显示 1：显示
  @computed get isShowPrescriberModal() {
    const isNeedPrescriber = (this.info?.auditOrderConfigList || []).find(
      (item) => {
        return item.configType === 'if_prescriber_is_not_mandatory';
      }
    )?.status;
    return isNeedPrescriber === 1;
  }

  // 返回prescriber select Type:0:Prescriber Map / 1:Recommendation Code
  @computed get prescriberSelectTyped() {
    const prescriberSelectType = (this.info?.auditOrderConfigList || []).find(
      (item) => {
        return item.configType === 'selection_type';
      }
    )?.status;
    return PRESCRIBERSELECTTYPED_ENUM[prescriberSelectType];
  }

  @computed get defaultPurchaseType() {
    return this.info?.storeVO?.defaultPurchaseType || '';
  }

  @computed get defaultSubscriptionFrequencyId() {
    return this.info?.storeVO?.defaultSubscriptionFrequencyId || '';
  }

  @action.bound
  async queryConfig() {
    let res = this.info;
    if (!res?.auditOrderConfigList) {
      res = await getConfig();
      res = res.context;
      this.updateInfo(res);
    }
  }

  // 1.查询form表单配置开关（自己接口: MANUALLY，自动填充: AUTOMATICALLY） 2.查询表单数据
  @action.bound
  async getSystemFormConfig() {
    let localAddressForm = this.localAddressForm;
    if (localAddressForm?.settings.length) {
      return;
    }

    let addressForm = addressFormNull;
    try {
      const res1 = await fetchAddressDisplaySetting();
      let addressSettings = res1?.context?.addressDisplaySettings;
      if (addressSettings) {
        let fieldKeyEnableStatus = {};
        // 标记可用字段
        addressSettings.forEach((item) => {
          fieldKeyEnableStatus[item.fieldKey] = item.enableFlag === 1;
        });
        // 拼接json
        addressForm = {
          settings: addressSettings,
          formType: res1?.context?.addressInputType, //当前地址表单类型 MANUALLY：手动填写 、 AUTOMATICALLY：自动填充
          fieldKeyEnableStatus
        };

        this.updateInfo({ localAddressForm: addressForm });
      } else {
        console.error('★ 地址表单接口返回空，找后端配置。');
      }
    } catch (err) {
      console.log(err);
    }
  }

  @action.bound
  async queryPaymentMethodCfg() {
    let pmlogos = this.info?.paymentMethodList;
    if (pmlogos) {
      return pmlogos;
    }
    const {
      context: {
        codPaymentMethodList,
        offlinePaymentMethodList,
        onlinePaymentMethodList
      }
    } = await getPaymentMethodV2();
    const ret = flatten([
      codPaymentMethodList,
      offlinePaymentMethodList,
      onlinePaymentMethodList
    ])
      .filter((f) => f?.isOpen)
      .map((f) => ({ imgUrl: f?.imgUrl }));

    this.updateInfo({ paymentMethodList: ret });
    return this.info?.paymentMethodList;
  }

  @action.bound
  updateInfo(info) {
    const ret = cloneDeep(toJS(Object.assign(this.info || {}, info || {})));
    this.info = ret;
    sessionItemRoyal.set('storeContentInfo', JSON.stringify(ret));
  }
}
export default ConfigStore;
