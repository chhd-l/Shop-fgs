import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import ValidationAddressModal from '@/components/validationAddressModal';
import Loading from '@/components/Loading';
import { AddressForm } from '@/components/Address';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import { validData, handleDateForIos } from '@/utils/utils';
import { updateCustomerBaseInfo, getCustomerInfo } from '@/api/user';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import { withOktaAuth } from '@okta/okta-react';
import { myAccountActionPushEvent } from '@/utils/GA';
import { format } from 'date-fns';
@injectIntl
@inject('loginStore')
@observer
class PersonalDataEditForm extends React.Component {
  static defaultProps = {
    originData: null,
    editFormVisible: false,
    personalDataIsEdit: false,
    updateIsEditFlag: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      editFormVisible: false,
      loading: false,
      successTipVisible: false,
      errorMsg: '',
      successMsg: '',
      form: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        countryId: '',
        country: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        city: '',
        cityId: '',
        area: '',
        areaId: '',
        phoneNumber: '',
        rfc: '',
        address1: '',
        address2: '',
        postCode: ''
      },
      oldForm: {},
      provinceList: [], // 省份列表
      isValid: false,
      errMsgObj: {},
      formAddressValid: false,
      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress'
    };
    this.handleCommunicationCheckBoxChange =
      this.handleCommunicationCheckBoxChange.bind(this);
  }
  componentDidMount() {
    const { data, editFormVisible } = this.props;

    this.setState(
      {
        form: Object.assign({}, data),
        oldForm: Object.assign({}, data),
        editFormVisible
      },
      () => {
        this.validFormData();
      }
    );

    // 如果是编辑成功后返回，显示成功提示
    if (this.props.personalDataIsEdit) {
      this.showSuccessMsg();
    }
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    const { form } = this.state;
    if (name === 'postCode' || name === 'phoneNumber') {
      value = value.replace(/\s+/g, '');
    }
    if (name === 'phoneNumber' && window.__.env.REACT_APP_COUNTRY === 'fr') {
      value = value.replace(/^[0]/, '+(33)');
    }
    form[name] = value;
    this.setState({ form: form }, () => {
      this.validFormData();
    });
    this.inputBlur(e);
  };
  inputBlur = async (e) => {
    const { intl } = this.props;
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = PRESONAL_INFO_RULE.filter((e) => e.key === target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    try {
      await validData({
        rule: targetRule,
        data: { [target.name]: value },
        intl
      });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: ''
        })
      });
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: err.message
        })
      });
    }
  };
  // 错误消息
  showErrMsg(msg) {
    this.setState({
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  }
  // 成功消息
  showSuccessMsg() {
    this.setState({
      successTipVisible: true
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        successTipVisible: false
      });
      this.props.updateIsEditFlag(false);
    }, 5000);
  }
  // 取消编辑按钮
  handleCancel = () => {
    const { oldForm } = this.state;
    this.setState({
      form: Object.assign({}, oldForm),
      errorMsg: ''
    });
    this.changeEditFormVisible(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'My account' : '');
  };

  // 选择地址
  chooseValidationAddress = (e) => {
    this.setState({
      selectValidationOption: e.target.value
    });
  };
  // 获取地址验证查询到的数据
  getValidationData = async (data) => {
    if (data && data?.address1 != null) {
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
    const { form, selectValidationOption, validationAddress } = this.state;
    let oldForm = JSON.parse(JSON.stringify(form));
    let theform = [];
    if (selectValidationOption == 'suggestedAddress') {
      form.address1 = validationAddress.address1;
      form.city = validationAddress.city;
      form.postCode = validationAddress.postalCode;

      form.province = validationAddress.provinceCode;
      form.provinceId = validationAddress.provinceId
        ? validationAddress.provinceId
        : form.provinceId;

      // 地址校验返回参数
      form.validationResult = validationAddress.validationResult;
      theform = Object.assign({}, form);
    } else {
      theform = JSON.parse(JSON.stringify(oldForm));
    }
    this.setState(
      {
        form: Object.assign({}, theform)
      },
      () => {
        // 下一步
        this.showNextPanel();
      }
    );
  }
  // 保存数据
  handleSave = () => {
    // 不校验地址，进入下一步
    this.showNextPanel();
  };
  // 显示下一步操作
  showNextPanel = async () => {
    this.setState({
      validationModalVisible: false
    });
    try {
      const { form } = this.state;
      this.setState({ loading: true });
      const oktaTokenString = this.props.authState?.accessToken?.value || '';
      let oktaToken = 'Bearer ' + oktaTokenString;
      let mydata = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        birthDay: form.birthdate
          ? format(new Date(handleDateForIos(form.birthdate)), 'yyyy-MM-dd')
          : '',
        countryId: form.countryId,
        country: form.country,
        county: form?.county,
        contactPhone: form.phoneNumber,
        reference: form.rfc,
        address1: form.address1,
        address2: form.address2,
        postalCode: form.postCode,
        city: form.city,
        cityId: form.cityId,
        area: form.area,
        areaId: form.areaId,
        entrance: form.entrance,
        apartment: form.apartment,
        communicationEmail: form.communicationEmail,
        communicationPhone: form.communicationPhone,
        oktaToken: oktaToken
      };
      if (window.__.env.REACT_APP_COUNTRY === 'us') {
        mydata.province = form.province;
        mydata.provinceId = form.provinceId;
      }
      //日本
      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
        mydata.province = form.province;
        mydata.provinceId = form.provinceId;
        mydata.region = form.region;
        mydata.firstNameKatakana = form.firstNameKatakana;
        mydata.lastNameKatakana = form.lastNameKatakana;
      }
      let param = Object.assign({}, this.props.originData, mydata);

      await updateCustomerBaseInfo(param);

      const customerId = this.userInfo && this.userInfo.customerId;
      let res = await getCustomerInfo({ customerId });

      const context = res.context;
      this.props.loginStore.setUserInfo(context);

      this.props.updateData();
      this.changeEditFormVisible(false);
      this.props.updateIsEditFlag(true);
    } catch (err) {
      this.showErrMsg(err.message);
      this.setState({
        loading: false,
        validationModalVisible: false,
        validationLoading: false
      });
    } finally {
      this.setState({
        loading: false,
        validationModalVisible: false,
        validationLoading: false
      });
    }
  };
  // 表单验证
  validFormData = async () => {
    const { intl } = this.props;
    const { form } = this.state;
    try {
      // console.log('★★★★★★★★★ valiFormData: ', form);
      if (!form?.formRule || (form?.formRule).length <= 0) {
        return;
      }
      await validData({ rule: form.formRule, data: form, intl }); // 数据验证
      // await validData(PRESONAL_INFO_RULE, form);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    }
  };
  // 编辑个人信息
  handleClickEditBtn = async () => {
    myAccountActionPushEvent('Edit profile info');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.changeEditFormVisible(true);
    // todo
    await this.props.updateData();
    this.validFormData();
  };
  handleClickGoBack = () => {
    this.changeEditFormVisible(false);
  };
  handleCommunicationCheckBoxChange(item) {
    let { form } = this.state;
    form[item.type] = !+form[item.type] ? '1' : '0';
    this.setState({ form });
  }
  // form表单返回数据
  handleEditFormChange = (data) => {
    this.setState(
      {
        form: data
      },
      () => {
        this.validFormData();
      }
    );
  };
  // 俄罗斯地址校验flag，控制按钮是否可用
  getFormAddressValidFlag = (flag) => {
    console.log('666 >>> PersonalDataEditForm: ', flag);
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
    const {
      editFormVisible,
      form,
      isValid,
      formAddressValid,
      errorMsg,
      successTipVisible,
      errMsgObj,
      validationLoading,
      validationModalVisible,
      selectValidationOption
    } = this.state;
    const { data } = this.props;
    const curPageAtCover = !editFormVisible;
    return (
      <div className={classNames({ border: curPageAtCover })}>
        <div className="personalInfo">
          <div className="profileSubFormTitle pl-3 pr-3 pt-3">
            <h5
              className="mb-0 text-xl"
              style={{ display: curPageAtCover ? 'block' : 'none' }}
            >
              <img
                className="account-info-icon align-middle mr-3 ml-1 inline-block"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/account.svg`}
                alt="icons account"
              />
              <FormattedMessage id="account.myAccount" />
            </h5>
            <h5
              className="ui-cursor-pointer text-xl"
              style={{ display: curPageAtCover ? 'none' : 'block' }}
              onClick={this.handleClickGoBack}
            >
              <span>&larr; </span>
              {window.__.env.REACT_APP_COUNTRY === 'uk' ? (
                <FormattedMessage id="account.profile" />
              ) : (
                <FormattedMessage id="account.myAccount" />
              )}
            </h5>
            <FormattedMessage id="edit">
              {(txt) => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 pb-0 pb-0 ${
                    editFormVisible ? 'hidden' : ''
                  }`}
                  name="personalInformation"
                  title={txt}
                  alt={txt}
                  onClick={this.handleClickEditBtn}
                >
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
          <hr
            className={classNames('account-info-hr-border-color my-4', {
              'border-0': editFormVisible
            })}
          />
          <div className="pl-3 pr-3 pb-3">
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
                  aria-label="Close"
                  onClick={() => {
                    this.setState({ errorMsg: '' });
                  }}
                >
                  <span className="rc-screen-reader-text">
                    <FormattedMessage id="close" />
                  </span>
                </button>
              </aside>
            </div>
            <aside
              className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                successTipVisible ? '' : 'hidden'
              }`}
              role="alert"
            >
              <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                <FormattedMessage id="saveSuccessfullly2" />
              </p>
            </aside>

            {/* preview form */}
            {/* {JSON.stringify(data)} */}
            {data ? (
              <div
                className={`row userProfileInfo text-break ${
                  editFormVisible ? 'hidden' : ''
                }`}
              >
                {[
                  {
                    name: <FormattedMessage id="account.Email" />,
                    val: data.email
                  },
                  {
                    name: <FormattedMessage id="name" />,
                    val: [data.firstName, data.lastName]
                      .filter((el) => el)
                      .join(' ')
                  },
                  {
                    name:
                      window.__.env.REACT_APP_COUNTRY === 'us' ? null : (
                        <FormattedMessage id="payment.phoneNumber" />
                      ),
                    val:
                      window.__.env.REACT_APP_COUNTRY === 'us'
                        ? null
                        : data.phoneNumber
                  },
                  {
                    name:
                      window.__.env.REACT_APP_COUNTRY === 'us' ? null : (
                        <FormattedMessage id="payment.address1" />
                      ),
                    val:
                      window.__.env.REACT_APP_COUNTRY === 'us'
                        ? null
                        : data.address1
                  }
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="col-6 col-md-8">{item.name}</div>
                    <div className="col-6 col-md-4">{item.val}</div>
                  </React.Fragment>
                ))}
              </div>
            ) : null}

            {/* edit form */}
            <div
              className={classNames('userProfileInfoEdit', {
                hidden: !editFormVisible
              })}
            >
              {this.state.editFormVisible && (
                <AddressForm
                  initData={form}
                  isLogin={true}
                  personalData={true}
                  updateData={this.handleEditFormChange}
                  getFormAddressValidFlag={this.getFormAddressValidFlag}
                />
              )}

              <span
                className={`rc-meta mandatoryField ${isValid ? 'hidden' : ''}`}
              >
                * <FormattedMessage id="account.requiredFields2" />
              </span>
              <div className="text-right">
                <span
                  className="rc-styled-link editPersonalInfoBtn"
                  name="personalInformation"
                  onClick={this.handleCancel}
                >
                  <FormattedMessage id="cancel" />
                </span>
                &nbsp;
                <FormattedMessage id="or" />
                &nbsp;
                <button
                  className={classNames('rc-btn', 'rc-btn--one', 'submitBtn', {
                    'ui-btn-loading': this.state.loading
                  })}
                  name="personalInformation"
                  type="submit"
                  disabled={isValid && formAddressValid ? false : true}
                  onClick={this.handleSave}
                >
                  <FormattedMessage id="save" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {validationLoading && <Loading positionFixed="true" />}
        {validationModalVisible && (
          <ValidationAddressModal
            address={form}
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

export default withOktaAuth(PersonalDataEditForm);
