import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import findIndex from 'lodash/findIndex';
import CitySearchSelection from '@/components/CitySearchSelection';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import { getDictionary, validData, datePickerConfig } from '@/utils/utils';
import { updateCustomerBaseInfo } from '@/api/user';
import Selection from '@/components/Selection';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import classNames from 'classnames';
import { withOktaAuth } from '@okta/okta-react';
import { myAccountActionPushEvent } from '@/utils/GA';

@injectIntl
class PersonalDataEditForm extends React.Component {
  static defaultProps = {
    originData: null
  };
  constructor(props) {
    super(props);
    this.state = {
      editFormVisible: false,
      loading: false,
      successTipVisible: false,
      errorMsg: '',
      form: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        country: '',
        phoneNumber: '',
        rfc: '',
        address1: '',
        address2: '',
        postCode: '',
        city: ''
      },
      oldForm: {},
      countryList: [],
      isValid: false,
      errMsgObj: {}
    };
    this.handleCommunicationCheckBoxChange = this.handleCommunicationCheckBoxChange.bind(
      this
    );
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState(
      {
        form: Object.assign({}, data, {
          birthdate: format(new Date(), 'yyyy-MM-dd')
        }),
        oldForm: Object.assign({}, data)
      },
      () => {
        this.validFormData();
      }
    );
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    const { form } = this.state;
    if (name === 'postCode' || name === 'phoneNumber') {
      value = value.replace(/\s+/g, '');
    }
    if (name === 'phoneNumber' && process.env.REACT_APP_LANG === 'fr') {
      value = value.replace(/^[0]/, '+(33)');
    }
    form[name] = value;
    this.setState({ form: form }, () => {
      this.validFormData();
    });
    this.inputBlur(e);
  };
  inputBlur = async (e) => {
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = PRESONAL_INFO_RULE.filter((e) => e.key === target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    try {
      await validData(targetRule, { [target.name]: value });
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
  handleSave = async () => {
    try {
      const { form } = this.state;
      this.setState({ loading: true });
      const oktaTokenString = this.props.authState && this.props.authState.accessToken ? this.props.authState.accessToken.value : '';
      let oktaToken = 'Bearer ' + oktaTokenString;
      let param = Object.assign({}, this.props.originData, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        birthDay: form.birthdate
          ? form.birthdate.split('/').join('-')
          : form.birthdate,
        countryId: form.country,
        contactPhone: form.phoneNumber,
        reference: form.rfc,
        address1: form.address1,
        address2: form.address2,
        postalCode: form.postCode,
        cityId: form.city,
        communicationEmail: form.communicationEmail,
        communicationPhone: form.communicationPhone,
        oktaToken: oktaToken
      });

      await updateCustomerBaseInfo(param);
      
      this.props.updateData();
      this.changeEditFormVisible(false);
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  // 表单验证
  validFormData = async () => {
    try {
      // console.log('★★★★★★★★★ validFormData: ',this.state.isValid);
      await validData(PRESONAL_INFO_RULE, this.state.form);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    }
  };
  onDateChange(date) {
    const { form } = this.state;
    form['birthdate'] = format(date, 'yyyy-MM-dd');
    this.setState({ form }, () => {
      this.validFormData();
    });
  }
  computedList(key) {
    let tmp = this.state[`${key}List`].map((c) => {
      return {
        value: c.id.toString(),
        name: c.name
      };
    });
    tmp.unshift({ value: '', name: '' });
    return tmp;
  }
  handleSelectedItemChange(key, data) {
    const { form } = this.state;
    form[key] = data.value;
    this.setState({ form: form }, () => {
      this.validFormData();
    });
  }
  handleClickEditBtn = () => {
    myAccountActionPushEvent('Edit profile info')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.changeEditFormVisible(true);
    this.validFormData();
  };
  handleClickGoBack = () => {
    this.changeEditFormVisible(false);
  };
  handleCityInputChange = (data) => {
    const { form } = this.state;
    form.city = data.id;
    form.cityName = data.cityName;
    this.setState({ form });
  };
  handleCommunicationCheckBoxChange(item) {
    let { form } = this.state;
    form[item.type] = !+form[item.type] ? '1' : '0';
    this.setState({ form });
  }
  render() {
    const {
      editFormVisible,
      form,
      isValid,
      errorMsg,
      successTipVisible,
      errMsgObj
    } = this.state;
    const { data } = this.props;
    const curPageAtCover = !editFormVisible;
    return (
      <div className={classNames({ border: curPageAtCover })}>
        {/* {this.state.loading ? (
          <Loading positionAbsolute="true" customStyle={{ zIndex: 9 }} />
        ) : null} */}
        <div className="personalInfo">
          <div className="profileSubFormTitle pl-3 pr-3 pt-3">
            {curPageAtCover ? (
              <h5 className="mb-0">
                <svg
                  className="svg-icon account-info-icon align-middle mr-3 ml-1"
                  aria-hidden="true"
                >
                  <use xlinkHref="#iconaccount"></use>
                </svg>
                <FormattedMessage id="account.myAccount" />
              </h5>
            ) : (
              <h5
                className="ui-cursor-pointer"
                onClick={this.handleClickGoBack}
              >
                <span>&larr; </span>
                <FormattedMessage id="account.myAccount" />
              </h5>
            )}
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
            className={classNames('account-info-hr-border-color', {
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
                <FormattedMessage id="saveSuccessfullly" />
              </p>
            </aside>

            {/* preview form */}
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
                    name: <FormattedMessage id="payment.phoneNumber" />,
                    val: data.phoneNumber
                  },
                  {
                    name: <FormattedMessage id="payment.address1" />,
                    val: data.address1
                  }
                ].map((item, i) => (
                  <>
                    <div className="col-6 col-md-9">{item.name}</div>
                    <div className="col-6 col-md-3">{item.val}</div>
                  </>
                ))}
              </div>
            ) : null}
            {/* edit form */}
            <div
              className={classNames('userProfileInfoEdit', {
                hidden: !editFormVisible
              })}
            >
              <div className="row">
                <div className="form-group col-lg-6 required">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="firstName"
                  >
                    <FormattedMessage id="payment.firstName" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                  >
                    <input
                      type="text"
                      className="rc-input__control"
                      id="firstName"
                      data-name="profile_personalInfo"
                      alt="Name"
                      name="firstName"
                      required=""
                      aria-required="true"
                      value={form.firstName}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      maxLength="50"
                    />
                    <label className="rc-input__label" htmlFor="firstName" />
                  </span>
                  {errMsgObj.firstName && (
                    <div className="text-danger-2">{errMsgObj.firstName}</div>
                  )}
                </div>
                <div className="form-group col-lg-6 required">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="lastname"
                  >
                    <FormattedMessage id="payment.lastName" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                  >
                    <input
                      type="text"
                      className="rc-input__control"
                      id="lastname"
                      data-name="profile_personalInfo"
                      alt="Фамилия"
                      data-pattern-mismatch="Please match the requested format"
                      data-missing-error="Это поле обязательно для заполнения."
                      name="lastName"
                      required=""
                      aria-required="true"
                      value={form.lastName}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      maxLength="50"
                    />
                    <label className="rc-input__label" htmlFor="lastname" />
                  </span>
                  {errMsgObj.lastName && (
                    <div className="text-danger-2">{errMsgObj.lastName}</div>
                  )}
                </div>
                <div className="form-group col-lg-6 required">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="email"
                  >
                    <FormattedMessage id="account.Email" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                    style={{ opacity: 0.8 }}
                  >
                    <input
                      type="email"
                      className="rc-input__control"
                      id="email"
                      data-name="profile_personalInfo"
                      alt="E-mail"
                      data-pattern-mismatch="Please match the requested format"
                      data-missing-error="Это поле обязательно для заполнения."
                      name="email"
                      required=""
                      aria-required="true"
                      value={form.email}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      maxLength="50"
                      pattern="^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$"
                      disabled
                    />
                    <label className="rc-input__label" htmlFor="email" />
                  </span>
                  {errMsgObj.email && (
                    <div className="text-danger-2">{errMsgObj.email}</div>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="birthdate"
                  >
                    <FormattedMessage id="account.birthDate" />
                  </label>
                  <DatePicker
                    className="receiveDate"
                    style={{ padding: '.95rem 0' }}
                    placeholder="Select Date"
                    dateFormat={datePickerConfig.format}
                    locale={datePickerConfig.locale}
                    maxDate={new Date()}
                    selected={
                      form.birthdate ? new Date(form.birthdate) : new Date()
                    }
                    onChange={(date) => this.onDateChange(date)}
                  />
                  <div className="invalid-feedback" style={{ display: 'none' }}>
                    <FormattedMessage id="payment.errorInfo2" />
                  </div>
                  <div
                    className="invalid-birthdate invalid-feedback"
                    style={{ display: 'none' }}
                  >
                    <FormattedMessage id="payment.errorInfo2" />
                  </div>
                </div>

                <div className="form-group col-lg-6 required">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="address1"
                  >
                    <FormattedMessage id="payment.address1" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                  >
                    <input
                      type="text"
                      className="rc-input__control"
                      id="address1"
                      data-name="profile_personalInfo"
                      alt="address1"
                      name="address1"
                      required=""
                      aria-required="true"
                      value={form.address1}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      maxLength="50"
                    />
                    <label className="rc-input__label" htmlFor="address1" />
                  </span>
                  {errMsgObj.address1 && (
                    <div className="text-danger-2">{errMsgObj.address1}</div>
                  )}
                </div>
                <div className="form-group col-lg-6 pull-left">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="address1"
                  >
                    <FormattedMessage id="payment.address2" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                  >
                    <input
                      type="text"
                      className="rc-input__control"
                      id="address2"
                      data-name="profile_personalInfo"
                      alt="address2"
                      name="address2"
                      required=""
                      aria-required="true"
                      value={form.address2}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      maxLength="50"
                    />
                    <label className="rc-input__label" htmlFor="address2" />
                  </span>
                  {errMsgObj.address2 && (
                    <div className="text-danger-2">{errMsgObj.address2}</div>
                  )}
                </div>
                <div className="form-group col-lg-6 required">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="postCode"
                  >
                    <FormattedMessage id="payment.postCode" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                  >
                    <input
                      type="text"
                      className="rc-input__control"
                      id="postCode"
                      data-name="profile_personalInfo"
                      alt="postCode"
                      name="postCode"
                      required=""
                      aria-required="true"
                      value={form.postCode}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      data-js-pattern="(*.*)"
                    />
                    <label className="rc-input__label" htmlFor="postCode" />
                  </span>
                  {errMsgObj.postCode && (
                    <div className="text-danger-2">{errMsgObj.postCode}</div>
                  )}
                  <div className="ui-lighter">
                    <FormattedMessage id="example" />:{' '}
                    <FormattedMessage id="examplePostCode" />
                  </div>
                </div>
                <div className="form-group col-lg-6 required">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="basicInfoCity"
                  >
                    <FormattedMessage id="payment.city" />
                  </label>
                  <span className="rc-select rc-full-width rc-input--full-width rc-select-processed mt-0">
                    <CitySearchSelection
                      defaultValue={form.cityName}
                      key={form.cityName}
                      onChange={this.handleCityInputChange}
                    />
                  </span>
                  <div className="invalid-feedback" style={{ display: 'none' }}>
                    <FormattedMessage id="payment.errorInfo2" />
                  </div>
                </div>

                <div className="form-group col-lg-6 required">
                  <label className="form-control-label" htmlFor="country">
                    <FormattedMessage id="payment.country" />
                  </label>
                  <span
                    className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
                    data-loc="countrySelect"
                  >
                    <Selection
                      key={form.country}
                      selectedItemChange={(data) =>
                        this.handleSelectedItemChange('country', data)
                      }
                      optionList={this.computedList('country')}
                      selectedItemData={{
                        value: form.country
                      }}
                    />
                  </span>
                  <div className="invalid-feedback" style={{ display: 'none' }}>
                    <FormattedMessage id="payment.errorInfo2" />
                  </div>
                </div>
                <div
                  className={[
                    'form-group',
                    'col-lg-6',
                    process.env.REACT_APP_LANG == 'de' ? '' : 'required'
                  ].join(' ')}
                >
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="phone"
                  >
                    <FormattedMessage id="payment.phoneNumber" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                  >
                    <input
                      className="rc-input__control input__phoneField"
                      id="phone"
                      name="phoneNumber"
                      type="text"
                      value={form.phoneNumber}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      maxLength="20"
                      minLength="18"
                    />
                    <label className="rc-input__label" htmlFor="phone" />
                  </span>
                  <br />
                  <span className="ui-lighter">
                    <FormattedMessage id="example" />:{' '}
                    <FormattedMessage id="examplePhone" />
                  </span>
                  {errMsgObj.phoneNumber && (
                    <div className="text-danger-2">{errMsgObj.phoneNumber}</div>
                  )}
                </div>

                {/* <div className="form-group col-lg-6">
                  <label className="form-control-label rc-input--full-width w-100">
                    <FormattedMessage id="account.preferredMethodOfCommunication" />
                  </label>
                  {[
                    { type: 'communicationPhone', langKey: 'phone' },
                    { type: 'communicationEmail', langKey: 'email' }
                  ].map((ele, idx) => (
                    <div className="rc-input rc-input--inline" key={idx}>
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        id={`basicinfo-communication-checkbox-${ele.type}`}
                        onChange={this.handleCommunicationCheckBoxChange.bind(
                          this,
                          ele
                        )}
                        checked={+form[ele.type]}
                      />
                      <label
                        className="rc-input__label--inline text-break"
                        htmlFor={`basicinfo-communication-checkbox-${ele.type}`}
                      >
                        <FormattedMessage id={ele.langKey} />
                      </label>
                    </div>
                  ))}
                </div>
                 */}
                {/* <div className="form-group col-lg-6 pull-left">
                  <label
                    className="form-control-label rc-input--full-width w-100"
                    htmlFor="reference"
                  >
                    <FormattedMessage id="payment.rfc" />
                  </label>
                  <span
                    className="rc-input rc-input--full-width rc-input--inline rc-input--label rc-margin--none rc-input--full-width w-100"
                    input-setup="true"
                  >
                    <input
                      type="text"
                      className="rc-input__control input__phoneField"
                      id="reference"
                      name="rfc"
                      value={form.rfc}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      maxLength="50"
                    />
                    <label className="rc-input__label" htmlFor="reference" />
                  </span>
                </div> */}
              </div>
              <span
                className={`rc-meta mandatoryField ${isValid ? 'hidden' : ''}`}
              >
                * <FormattedMessage id="account.requiredFields" />
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
                  disabled={!isValid}
                  onClick={this.handleSave}
                >
                  <FormattedMessage id="save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default  withOktaAuth(PersonalDataEditForm);
