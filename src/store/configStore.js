import { action, observable, computed } from 'mobx';
import { getConfig, getPrescriberSettingInfo } from '@/api';
import { getAddressSetting, getSystemConfig } from '@/api/address';
import { getPaymentMethodV2 } from '@/api/payment';
import flatten from 'lodash/flatten';

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

  @observable prescriberSettingInfo = sessionItemRoyal.get(
    'prescriberSettingInfo'
  )
    ? JSON.parse(sessionItemRoyal.get('prescriberSettingInfo'))
    : null; //prescriber Setting相关配置信息

  // 需要显示的 address form 地址字段
  @observable localAddressForm = sessionItemRoyal.get('rc-address-form')
    ? JSON.parse(sessionItemRoyal.get('rc-address-form'))
    : addressFormNull;

  // 1-会员，2-会员和游客
  @computed get paymentAuthority() {
    const paymentAuthorityEnum = { 1: 'MEMBER', 2: 'MEMBER_AND_VISITOR' };
    return paymentAuthorityEnum[this.info?.orderConfig?.context || '2'];
  }

  // 当前地址表单类型
  @computed get addressFormType() {
    let form = sessionItemRoyal.get('rc-address-form')
      ? JSON.parse(sessionItemRoyal.get('rc-address-form'))
      : addressFormNull;
    return form?.formType?.type ? form.formType.type : 'MANUALLY';
  }

  @computed get maxGoodsPrice() {
    return this.info?.maxGoodsPrice || 0;
  }

  @computed get discountDisplayTypeInfo() {
    return this.info?.discountDisplayTypeInfo || '';
  }

  // 税额开关 0: 开, 1: 关
  @computed get customTaxSettingOpenFlag() {
    return this.info?.customTaxSettingOpenFlag;
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
    return Number(
      (this.info?.systemTaxSetting?.configVOList &&
        this.info?.systemTaxSetting?.configVOList[1]?.context) ||
        0
    );
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
    return (
      this.prescriberSettingInfo &&
      this.prescriberSettingInfo.isNeedPrescriber === 1
    );
  }

  // 返回prescriber select Type:0:Prescriber Map / 1:Recommendation Code
  @computed get prescriberSelectTyped() {
    return this.prescriberSettingInfo
      ? this.prescriberSettingInfo.prescriberSelectType
      : '';
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
    if (!res) {
      res = await getConfig();
      res = res.context;
      this.updateInfo(res);
    }
  }

  //查询prescriber Setting相关配置信息
  @action.bound
  async getPrescriberSettingInfo() {
    let ret = this.prescriberSettingInfo;
    if (!ret) {
      let res = await getPrescriberSettingInfo();
      let isNeedPrescriber = null;
      let prescriberSelectType = null;
      if (res.context) {
        isNeedPrescriber = res.context.find((item) => {
          return item.configType === 'if_prescriber_is_not_mandatory';
        });
        prescriberSelectType = res.context.find((item) => {
          return item.configType === 'selection_type';
        });
        isNeedPrescriber = isNeedPrescriber ? isNeedPrescriber.status : null;
        prescriberSelectType = prescriberSelectType
          ? prescriberSelectType.status
          : null;
      }
      ret = {
        isNeedPrescriber: isNeedPrescriber,
        prescriberSelectType: prescriberSelectType || '',
        isShowPrescriberModal: isNeedPrescriber === 1,
        prescriberSelectTyped: prescriberSelectType || ''
      };
      sessionItemRoyal.set('prescriberSettingInfo', JSON.stringify(ret));
      this.prescriberSettingInfo = ret;
    }

    return ret;
  }

  // 1、查询form表单配置开关
  @action.bound
  async getSystemFormConfig() {
    let addressForm = this.localAddressForm;
    if (addressForm?.settings) {
      return;
    }
    try {
      const res = await getSystemConfig({ configType: 'address_input_type' });
      if (res?.context?.configVOList) {
        let manually = '',
          automatically = '';
        let robj = res.context.configVOList;
        robj.forEach((item) => {
          if (item.configKey == 'address_input_type_manually') {
            manually = item.context;
          } else if (item.configKey == 'address_input_type_automatically') {
            automatically = item.context;
          }
        });
        // 根据接口类型查询表单数据
        this.getAddressSettingByApi(manually, automatically);
      } else {
        console.error('地址表单接口返回空，找后端配置。');
        sessionItemRoyal.set(
          'rc-address-form',
          JSON.stringify(addressFormNull)
        );
      }
    } catch (err) {
      console.log(err);
      sessionItemRoyal.set('rc-address-form', JSON.stringify(addressFormNull));
    }
  }

  // 2、根据接口类型（自己接口: MANUALLY，自动填充: AUTOMATICALLY）查询表单数据
  @action.bound
  async getAddressSettingByApi(manually, automatically) {
    let addressForm = addressFormNull;
    try {
      let formSettingSwitch =
        manually == 1 && automatically == 0 ? 'MANUALLY' : 'AUTOMATICALLY';
      const res = await getAddressSetting({
        addressApiType: formSettingSwitch
      });
      if (res?.context?.addressDisplaySettings) {
        let addressSettings = res.context.addressDisplaySettings;
        // 拼接json
        addressForm = {
          settings: addressSettings,
          formType: {
            type: formSettingSwitch,
            manually: manually,
            automatically: automatically
          }
        };
        // 标记可用字段
        addressSettings.forEach((item) => {
          if (item.enableFlag == 1) {
            addressForm[item.fieldKey] = item.fieldKey;
          } else {
            addressForm[item.fieldKey] = '';
          }
        });
        // 把查询到的address配置存到 session
        this.localAddressForm = addressForm;
        sessionItemRoyal.set('rc-address-form', JSON.stringify(addressForm));
      } else {
        console.error('★ 地址表单接口返回空，找后端配置。');
        sessionItemRoyal.set('rc-address-form', JSON.stringify(addressForm));
      }
    } catch (err) {
      console.log(err);
      sessionItemRoyal.set('rc-address-form', JSON.stringify(addressForm));
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
    const ret = Object.assign(this.info || {}, info || {});
    this.info = ret;
    sessionItemRoyal.set('storeContentInfo', JSON.stringify(ret));
  }
}
export default ConfigStore;
