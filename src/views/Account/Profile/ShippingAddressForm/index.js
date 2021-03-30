import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import CitySearchSelection from '@/components/CitySearchSelection';
import ValidationAddressModal from '@/components/validationAddressModal';
import EditForm from '@/components/Form';
import Loading from '@/components/Loading';
import './index.less';
import { saveAddress, getAddressById, editAddress } from '@/api/address';
import { queryCityNameById, getProvincesList } from '@/api';
import { getDictionary, validData, setSeoConfig } from '@/utils/utils';
// import { ADDRESS_RULE } from '@/utils/constant';
import Selection from '@/components/Selection';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { myAccountActionPushEvent } from '@/utils/GA';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

const addressType = ({ hideBillingAddr }) => {
  const defaultAddressType = [{ type: 'delivery', langKey: 'deliveryAddress' }];
  if (!hideBillingAddr) {
    defaultAddressType.push({ type: 'billing', langKey: 'billingAddress' });
  }
  return defaultAddressType;
};

@injectIntl
class ShippingAddressFrom extends React.Component {
  static defaultProps = {
    addressId: '',
    hideBillingAddr: false,
    upateSuccessMsg: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      loading: false,
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
        countryId: process.env.REACT_APP_DEFAULT_COUNTRYID,
        country: '',
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
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig().then((res) => {
      this.setState(
        {
          seoConfig: res
        },
        () => {
          this.setState({
            loading: false
          });
        }
      );
    });

    if (this.props.addressId) {
      this.getAddressById(this.props.addressId);
    }
  }
  getAddressById = async (id) => {
    this.setState({
      loading: true
    });
    try {
      let res = await getAddressById({ id });
      let data = res.context;
      let addressForm = {
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        address2: data.address2,
        countryId: data.countryId,
        country: data.country,
        cityId: data.cityId,
        city: data.city,
        postCode: data.postCode,
        phoneNumber: data.consigneeNumber,
        rfc: data.rfc,
        isDefalt: data.isDefaltAddress === 1 ? true : false,
        deliveryAddressId: data.deliveryAddressId,
        customerId: data.customerId,
        addressType: data.type,
        email: data.email
      };
      if (process.env.REACT_APP_LANG === 'en') {
        addressForm.provinceNo = data.provinceNo;
        addressForm.province = data.province;
        addressForm.provinceId = data.provinceId;
      }
      this.setState(
        {
          addressForm,
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
  isDefalt = () => {
    let data = this.state.addressForm;
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
    const {
      addressForm,
      selectValidationOption,
      validationAddress
    } = this.state;
    let oldAddressForm = JSON.parse(JSON.stringify(addressForm));
    if (selectValidationOption == 'suggestedAddress') {
      addressForm.address1 = validationAddress.address1;
      addressForm.address2 = validationAddress.address2;
      addressForm.city = validationAddress.city;

      addressForm.province = validationAddress.provinceCode;
      addressForm.provinceId =
        validationAddress.provinceId && validationAddress.provinceId != null
          ? validationAddress.provinceId
          : addressForm.provinceId;

      // 地址校验返回参数
      addressForm.validationResult = validationAddress.validationResult;
    } else {
      this.setState({
        addressForm: JSON.parse(JSON.stringify(oldAddressForm))
      });
    }
    this.showNextPanel();
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
      let params = {
        address1: data.address1,
        address2: data.address2,
        firstName: data.firstName,
        lastName: data.lastName,
        countryId: +data.countryId,
        country: +data.country,
        city: data.city,
        cityId: data.cityId,
        consigneeName: data.firstName + ' ' + data.lastName,
        consigneeNumber: data.phoneNumber,
        customerId: data.customerId,
        deliveryAddress: data.address1 + ' ' + data.address2,
        deliveryAddressId: data.deliveryAddressId,
        isDefaltAddress:
          data.addressType === 'DELIVERY' ? (data.isDefalt ? 1 : 0) : 0,
        postCode: data.postCode,
        rfc: data.rfc,
        email: data.email,
        type: curType.toUpperCase()
      };
      // if (params?.province && params?.province != null) {
      params.province = data.province;
      params.provinceId = data.provinceId;
      params.isValidated = data.validationResult;
      // }
      console.log('----------------------> handleSave params: ', params);

      let res = await (this.state.isAdd ? saveAddress : editAddress)(params);
      myAccountActionPushEvent('Add Address'); // GA
      this.handleCancel();
      // this.props.upateSuccessMsg(res?.message);
      this.props.upateSuccessMsg('Save successfullly');
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

  handleCancel = () => {
    this.props.hideMyself({ closeListPage: this.props.backPage === 'cover' });
  };

  validFormData = async () => {
    const { addressForm } = this.state;
    try {
      if (!addressForm?.formRule || (addressForm?.formRule).length <= 0) {
        return;
      }
      await validData(addressForm.formRule, addressForm); // 数据验证
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
    this.setState(
      {
        addressForm: data
      },
      () => {
        this.validFormData();
      }
    );
  };
  render() {
    const { hideBillingAddr } = this.props;
    const {
      addressForm,
      isValid,
      curType,
      successMsg,
      errorMsg,
      errMsgObj,
      validationLoading,
      validationModalVisible,
      selectValidationOption
    } = this.state;
    return (
      <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
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
                <div>
                  <EditForm
                    initData={addressForm}
                    isLogin={true}
                    updateData={this.handleEditFormChange}
                  />

                  {addressForm.addressType === 'DELIVERY' ? (
                    <div className="form-group col-12 col-md-6">
                      <div
                        className="rc-input rc-input--inline"
                        onClick={this.isDefalt}
                      >
                        <input
                          type="checkbox"
                          className="rc-input__checkbox"
                          value={addressForm.isDefalt}
                          checked={addressForm.isDefalt}
                        />
                        <label className="rc-input__label--inline text-break w-100">
                          <FormattedMessage id="setDefaultAddress" />
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
                <span className="rc-meta mandatoryField">
                  * <FormattedMessage id="account.requiredFields" />
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
                    disabled={!isValid}
                    onClick={this.handleSave}
                  >
                    <FormattedMessage id="save" />
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
