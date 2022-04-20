import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import Skeleton from 'react-skeleton-loader';
// import CitySearchSelection from '@/components/CitySearchSelection';
import ValidationAddressModal from '@/components/validationAddressModal';
import { AddressForm } from '@/components/Address';
import Loading from '@/components/Loading';
import './index.less';
import {
  saveAddress,
  getAddressById,
  editAddress,
  queryCityNameById,
  getProvincesList
} from '@/api/address';
import { validData, isCanVerifyBlacklistPostCode } from '@/utils/utils';
// import { ADDRESS_RULE } from '@/utils/constant';
// import Selection from '@/components/Selection';
import classNames from 'classnames';
import { myAccountActionPushEvent } from '@/utils/GA';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;

const addressType = ({ hideBillingAddr }) => {
  const defaultAddressType = [{ type: 'delivery', langKey: 'deliveryAddress' }];
  if (!hideBillingAddr) {
    defaultAddressType.push({ type: 'billing', langKey: 'billingAddress' });
  }
  return defaultAddressType;
};

@injectIntl
@seoHoc()
class ShippingAddressFrom extends React.Component {
  static defaultProps = {
    addressId: '',
    hideBillingAddr: false,
    upateSuccessMsg: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      formAddressValid: false,
      loading: true,
      saveLoading: false,
      showModal: false,
      isAdd: true,
      errorMsg: '',
      successMsg: '',
      addressForm: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        countryId: '',
        country: '',
        county: '',
        city: '',
        cityId: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        postCode: '',
        phoneNumber: '',
        rfc: '',
        isDefalt: false,
        deliveryAddressId: '',
        customerId: '',
        addressType: 'DELIVERY',
        email: ''
      },
      isValid: false,
      curType: 'delivery',
      errMsgObj: {},
      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress'
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  componentWillUnmount() {}
  componentDidMount() {
    // 根据addressId查询地址信息
    if (this.props.addressId) {
      this.setState({
        loading: true
      });
      this.getAddressById(this.props.addressId);
    } else {
      this.setState({
        loading: false
      });
    }
  }
  // 根据 address Id 查询地址信息
  getAddressById = async (id) => {
    try {
      let res = await getAddressById({ id });
      let data = res.context;
      let addinfo = Object.assign({}, data);
      addinfo.phoneNumber = data.consigneeNumber;
      addinfo.isDefalt = data.isDefaltAddress === 1 ? true : false;
      addinfo.addressType = data.type;
      if (addinfo.province) {
        addinfo.provinceNo = data.provinceNo;
        addinfo.province = data.province;
        addinfo.provinceId = data.provinceId;
      }
      this.setState(
        {
          addressForm: addinfo,
          showModal: true,
          isAdd: false,
          loading: false,
          curType: data.type === 'DELIVERY' ? 'delivery' : 'billing'
        },
        () => {
          this.validFormData();
        }
      );
    } catch (err) {
      this.showErrorMsg(err.message.toString());
      this.setState({ loading: false });
    } finally {
      this.setState({ loading: false });
    }
  };
  // 是否为默认地址
  isDefalt = (e) => {
    e.preventDefault();
    let data = { ...this.state.addressForm };
    data.isDefalt = !data.isDefalt;
    this.setState(
      {
        addressForm: data
      },
      () => {
        this.validFormData();
      }
    );
  };

  // 选择地址
  chooseValidationAddress = (e) => {
    this.setState({
      selectValidationOption: e.target.value
    });
  };
  // 获取地址验证查询到的数据
  getValidationData = async (data) => {
    this.setState({
      validationLoading: false
    });
    if (data && data != null) {
      // 获取并设置地址校验返回的数据
      this.setState({
        validationAddress: data
      });
    } else {
      // 不校验地址，进入下一步
      this.showNextPanel();
    }
  };
  // 确认选择地址,切换到下一个最近的未complete的panel
  confirmValidationAddress() {
    const { addressForm, selectValidationOption, validationAddress } =
      this.state;
    let oldAddressForm = JSON.parse(JSON.stringify(addressForm));
    let theform = [];
    if (selectValidationOption == 'suggestedAddress') {
      addressForm.address1 = validationAddress.address1;
      addressForm.city = validationAddress.city;
      addressForm.postCode = validationAddress.postalCode;

      addressForm.province = validationAddress.provinceCode;
      addressForm.provinceId = validationAddress.provinceId
        ? validationAddress.provinceId
        : addressForm.provinceId;

      // 地址校验返回参数
      addressForm.validationResult = validationAddress.validationResult;
      theform = Object.assign({}, addressForm);
    } else {
      theform = JSON.parse(JSON.stringify(oldAddressForm));
    }
    this.setState(
      {
        addressForm: Object.assign({}, theform)
      },
      () => {
        this.showNextPanel();
      }
    );
  }
  // 保存
  handleSave = () => {
    // 地址验证
    this.setState({
      validationLoading: true
    });
    setTimeout(() => {
      this.setState({
        validationModalVisible: true
      });
    }, 800);
  };
  // 下一步
  showNextPanel = async () => {
    this.setState({
      validationModalVisible: false
    });
    try {
      const { curType, addressForm: data } = this.state;
      this.setState({
        saveLoading: true
      });
      // console.log('666 >>> data: ', data);
      let params = {
        address1: data.address1,
        address2: data.address2,
        areaId: data.areaId,
        firstName: data.firstName,
        lastName: data.lastName,
        countryId: data.countryId,
        country: data.country,
        county: data?.county,
        city: data.city,
        cityId: data.cityId,
        consigneeName: data.firstName + ' ' + data.lastName,
        consigneeNumber: data.phoneNumber,
        customerId: data.customerId,
        deliveryAddress: data.address1 + ' ' + data.address2,
        deliveryAddressId: data.deliveryAddressId,
        receiveType: 'HOME_DELIVERY', // HOME_DELIVERY , PICK_UP
        deliverWay: 1, // 1: HOMEDELIVERY , 2: PICKUP
        isDefaltAddress:
          data.addressType === 'DELIVERY' ? (data.isDefalt ? 1 : 0) : 0,
        postCode: data.postCode,
        rfc: data.rfc,
        email: data.email,
        comment: data?.comment,

        region: data.province, // DuData相关参数
        area: data.area,
        settlement: data.settlement,
        street: data.street,
        house: data.house,
        housing: data.housing,
        entrance: data.entrance,
        apartment: data.apartment,
        firstNameKatakana: data.firstNameKatakana, //日本
        lastNameKatakana: data.lastNameKatakana,

        type: curType.toUpperCase()
      };
      params.province = data.province;
      params.provinceId = data.provinceId;
      params.isValidated = data.validationResult;
      // console.log('----------------------> handleSave params: ', params);
      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
        //日本需求store portal用的是region字段，shop新增地址用area字段
        params.area = data.region;
      }

      let res = await (this.state.isAdd ? saveAddress : editAddress)(params);

      myAccountActionPushEvent('Add Address'); // GA
      this.handleCancel();
      // this.props.upateSuccessMsg(res?.message);
      this.props.upateSuccessMsg(this.props.intl.messages.saveSuccessfullly3);
      this.props.refreshList();
    } catch (err) {
      this.showErrorMsg(err.message);
      this.setState({
        saveLoading: false,
        validationModalVisible: false,
        validationLoading: false
      });
    } finally {
      this.setState({
        saveLoading: false,
        validationModalVisible: false,
        validationLoading: false
      });
    }
  };

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  };

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 2000);
  };

  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector('.content-asset');
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }

  // 取消添加或者编辑地址
  handleCancel = () => {
    this.props.cancelEditForm();
  };

  validFormData = async () => {
    const { intl } = this.props;
    const { addressForm } = this.state;
    try {
      if (!addressForm?.formRule || (addressForm?.formRule).length <= 0) {
        return;
      }
      await validData({ rule: addressForm.formRule, data: addressForm, intl }); // 数据验证
      // await validData(ADDRESS_RULE, addressForm);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    }
  };
  handleTypeChange = (item) => {
    this.setState({ curType: item.type });
  };
  // form表单返回数据
  handleEditFormChange = (data) => {
    const { addressForm } = this.state;
    this.setState(
      {
        addressForm: Object.assign(addressForm, data)
      },
      () => {
        this.validFormData();
      }
    );
  };
  // 俄罗斯地址校验flag，控制按钮是否可用
  getFormAddressValidFlag = (flag) => {
    console.log('666 >>> ShippingAddressForm: ', flag);
    this.setState(
      {
        formAddressValid: flag
      },
      () => {
        if (flag) {
          this.validFormData();
        }
      }
    );
  };
  render() {
    const { hideBillingAddr } = this.props;
    const {
      addressForm,
      isValid,
      formAddressValid,
      curType,
      successMsg,
      errorMsg,
      errMsgObj,
      validationLoading,
      validationModalVisible,
      selectValidationOption
    } = this.state;
    return (
      <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop px-0 md:px-4">
        <Canonical />
        <div className="content-asset">
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
              errorMsg ? '' : 'hidden'
            }`}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
              role="alert"
            >
              <span className="pl-0">{errorMsg}</span>
              <button
                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                onClick={() => {
                  this.setState({ errorMsg: '' });
                }}
                aria-label="Close"
              >
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
              successMsg ? '' : 'hidden'
            }`}
            role="alert"
          >
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
              {successMsg}
            </p>
          </aside>
          {this.state.loading ? (
            <>
              <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
            </>
          ) : (
            <>
              <div className={`userContactInfoEdit`}>
                {/* {addressType({ hideBillingAddr }).length > 1 && (
                  <div className="row">
                    {addressType({ hideBillingAddr }).map((item, i) => (
                      <div className="col-12 col-md-4" key={i}>
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id={`account-info-address-${item.type}-${i}`}
                            checked={curType === item.type}
                            type="radio"
                            disabled={!!this.props.addressId}
                            onChange={this.handleTypeChange.bind(this, item)}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor={`account-info-address-${item.type}-${i}`}
                          >
                            <FormattedMessage id={item.langKey} />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}

                <div>
                  <AddressForm
                    key={addressForm}
                    initData={addressForm}
                    isLogin={true}
                    updateData={this.handleEditFormChange}
                    getFormAddressValidFlag={this.getFormAddressValidFlag}
                  />

                  {addressForm.addressType === 'DELIVERY' ? (
                    <div className="form-group col-12 col-md-6 if_default_address">
                      <div
                        className="rc-input rc-input--inline"
                        onClick={this.isDefalt}
                      >
                        <input
                          type="checkbox"
                          id="rc-input__checkbox"
                          className="rc-input__checkbox"
                          value={addressForm.isDefalt}
                          checked={addressForm.isDefalt}
                        />
                        <label
                          className="rc-input__label--inline text-break w-100"
                          htmlFor="rc-input__checkbox"
                        >
                          <FormattedMessage id="setDefaultAddress" />
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
                <span className="rc-meta mandatoryField">
                  * <FormattedMessage id="account.requiredFields2" />
                </span>
                <div className="text-right">
                  <span
                    className="rc-styled-link editPersonalInfoBtn"
                    name="contactInformation"
                    onClick={this.handleCancel}
                  >
                    <FormattedMessage id="cancel" />
                  </span>
                  &nbsp;
                  <FormattedMessage id="or" />
                  &nbsp;
                  <button
                    className={classNames(
                      'rc-btn',
                      'rc-btn--one',
                      'editAddress',
                      {
                        'ui-btn-loading': this.state.saveLoading
                      }
                    )}
                    data-sav="false"
                    name="contactInformation"
                    type="submit"
                    disabled={isValid && formAddressValid ? false : true}
                    onClick={this.handleSave}
                  >
                    <FormattedMessage id="saveAddress" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {validationLoading && <Loading positionFixed="true" />}
        {validationModalVisible && (
          <ValidationAddressModal
            address={addressForm}
            updateValidationData={(res) => this.getValidationData(res)}
            selectValidationOption={selectValidationOption}
            handleChooseValidationAddress={(e) =>
              this.chooseValidationAddress(e)
            }
            hanldeClickConfirm={() => this.confirmValidationAddress()}
            validationModalVisible={validationModalVisible}
            close={() => {
              this.setState({
                validationModalVisible: false,
                validationLoading: false
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default ShippingAddressFrom;
