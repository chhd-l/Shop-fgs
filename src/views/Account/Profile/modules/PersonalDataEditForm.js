import React from "react"
import { injectIntl, FormattedMessage } from 'react-intl'
import { findIndex } from "lodash"
import Loading from "@/components/Loading"
import { getDictionary } from '@/utils/utils'
import { updateCustomerBaseInfo } from "@/api/user"
import Selection from '@/components/Selection'

class PersonalDataEditForm extends React.Component {
  constructor(props) {
    super(props)
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
        rfc: ''
      },
      countryList: []
    }
  }
  componentDidMount () {
    const { data } = this.props
    this.setState({
      form: Object.assign({}, data)
    })
    getDictionary({ type: 'country' })
      .then(res => {
        this.setState({
          countryList: res
        })
      })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.state.form) {
      this.setState({
        form: Object.assign({}, nextProps.data)
      })
    }
  }
  inputBlur (e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === "invalid-feedback";
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? "none" : "block";
    }
  }
  handleInputChange (e) {
    const target = e.target
    const { form } = this.state
    form[target.name] = target.value
    this.setState({ form: form })
    this.inputBlur(e);
  }
  showErrMsg (msg) {
    this.setState({
      errorMsg: msg
    })
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      })
    }, 5000)
  }
  handleCancel () {
    this.setState({
      editFormVisible: false,
      errorMsg: ''
    })
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  async handleSave () {
    const { form } = this.state
    for (let key in form) {
      const value = form[key]
      if (!value && (key !== 'birthdate'&& key !== 'rfc')) {
        this.showErrMsg(this.props.intl.messages.CompleteRequiredItems)
        return
      }
      if (key === 'email' && value && !(/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/.test(value))) {
        this.showErrMsg(this.props.intl.messages.EnterCorrectEmail)
        return
      }
    }

    this.setState({ loading: true })
    let param = Object.assign({}, this.props.originData, {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      birthDay: form.birthdate ? form.birthdate.split('/').join('-') : form.birthdate,
      countryId: form.country,
      contactPhone: form.phoneNumber,
      reference: form.rfc
    })
    try {
      await updateCustomerBaseInfo(param)
      this.props.updateData(this.state.form)
      this.setState({
        successTipVisible: true
      })
      setTimeout(() => {
        this.setState({
          successTipVisible: false
        })
      }, 2000)
    } catch (err) {
      this.setState({
        errorMsg: typeof err === 'object' ? err.toString() : err
      })
      setTimeout(() => {
        this.setState({
          errorMsg: ''
        })
      }, 5000)
    } finally {
      this.setState({
        editFormVisible: false,
        loading: false
      })
    }
  }
  getDictValue (list, id) {
    if (list && list.length > 0) {
      let item = list.find(item => {
        return item.id === id
      })
      if (item) {
        return item.name
      } else {
        return id
      }
    } else {
      return id
    }
  }
  computedList (key) {
    let tmp = this.state[`${key}List`].map(c => {
      return {
        value: c.id.toString(),
        name: c.name
      }
    })
    tmp.unshift({ value: '', name: '' })
    return tmp
  }
  handleSelectedItemChange (key, data) {
    const { form } = this.state
    form[key] = data.value
    this.setState({ form: form })
  }
  render () {
    const { editFormVisible, form } = this.state
    const { data } = this.props
    return (
      <div>
        {this.state.loading ? <Loading positionAbsolute="true" /> : null}
        <div className="personalInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="account.personalData" />
            </h5>
            <FormattedMessage id="edit">
              {txt => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${editFormVisible ? 'hidden' : ''}`}
                  name="personalInformation"
                  id="personalInfoEditBtn"
                  title={txt}
                  alt={txt}
                  onClick={() => { this.setState({ editFormVisible: true }) }}>
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
          <hr />
          <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? '' : 'hidden'}`}>
            <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
              <span>{this.state.errorMsg}</span>
              <button
                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                aria-label="Close"
                onClick={() => { this.setState({ errorMsg: '' }) }}>
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successTipVisible ? '' : 'hidden'}`}
            role="alert">
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none"><FormattedMessage id="saveSuccessfullly" /></p>
          </aside>
          <div className={`row userProfileInfo text-break ${editFormVisible ? 'hidden' : ''}`}>
            <div className="col-lg-6">
              <FormattedMessage id="payment.firstName" />
            </div>
            <div className="col-lg-6">
              {data.firstName}
            </div>
            <div className="col-lg-6">
              <FormattedMessage id="payment.lastName" />
            </div>
            <div className="col-lg-6">
              {data.lastName}
            </div>
            <div className="col-lg-6">
              <FormattedMessage id="account.birthDate" />
            </div>
            <div className="col-lg-6">
              {data.birthdate}
            </div>
            <div className="col-lg-6">
              <FormattedMessage id="account.Email" />
            </div>
            <div className="col-lg-6">
              {data.email}
            </div>
            <div className="col-md-6">
              <FormattedMessage id="payment.country" />
            </div>
            <div className="col-md-6">
              {this.getDictValue(this.state.countryList, data.country)}
            </div>
            <div className="col-md-6">
              <FormattedMessage id="payment.phoneNumber" />
            </div>
            <div className="col-md-6">
              {data.phoneNumber}
            </div>
            <div className="col-md-6">
              <FormattedMessage id="payment.rfc" />
            </div>
            <div className="col-md-6">
              {data.rfc}
            </div>
          </div>
          <div className={['userProfileInfoEdit', editFormVisible ? '' : 'hidden'].join(' ')}>
            <div className="row">
              <div className="form-group col-lg-6 pull-left required">
                <label className="form-control-label rc-full-width" htmlFor="firstName">
                  <FormattedMessage id="payment.firstName" />
                </label>
                <span className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
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
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)}
                    maxLength="50" />
                  <label className="rc-input__label" htmlFor="firstName"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
              <div className="form-group col-lg-6 pull-left required">
                <label className="form-control-label rc-full-width" htmlFor="lastname">
                  <FormattedMessage id="payment.lastName" />
                </label>
                <span className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                  <input
                    type="text"
                    className="rc-input__control"
                    id="lastname" data-name="profile_personalInfo"
                    alt="Фамилия"
                    data-pattern-mismatch="Please match the requested format"
                    data-missing-error="Это поле обязательно для заполнения."
                    name="lastName"
                    required=""
                    aria-required="true"
                    value={form.lastName}
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)}
                    maxLength="50" />
                  <label className="rc-input__label" htmlFor="lastname"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6">
                <label className="form-control-label rc-full-width" htmlFor="birthdate">
                  <FormattedMessage id="account.birthDate" />
                </label>
                <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
                  <input
                    className="rc-input__date rc-js-custom rc-input__control"
                    id="birthdate"
                    data-js-dateformat="YYYY/MM/DD"
                    name="birthdate"
                    type="date"
                    value={form.birthdate}
                    onBlur={e => this.handleInputChange(e)}
                    style={{ padding: '.95rem 0' }}
                  />
                  <label className="rc-input__label" htmlFor="birthdate"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
                <div className="invalid-birthdate invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
              <div className="form-group col-lg-6 required">
                <label className="form-control-label rc-full-width" htmlFor="email">
                  <FormattedMessage id="account.Email" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width"
                  input-setup="true"
                  style={{ opacity: .8 }}>
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
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)}
                    maxLength="50"
                    pattern="^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$"
                    disabled />
                  <label className="rc-input__label" htmlFor="email"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6 pull-left required">
                <label className="form-control-label" htmlFor="country">
                  <FormattedMessage id="payment.country" />
                </label>
                <span className="rc-select rc-full-width rc-input--full-width rc-select-processed mt-0" data-loc="countrySelect">
                  <Selection
                    key="1"
                    selectedItemChange={data => this.handleSelectedItemChange('country', data)}
                    optionList={this.computedList('country')}
                    selectedItemData={{
                      value: form.country
                    }} />
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
              <div className="form-group col-lg-6 pull-left required">
                <label className="form-control-label rc-full-width" htmlFor="phone">
                  <FormattedMessage id="payment.phoneNumber" />
                </label>
                <span className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                  <input
                    className="rc-input__control input__phoneField"
                    id="phone"
                    name="phoneNumber"
                    type="number"
                    value={form.phoneNumber}
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)}
                    maxLength="20"
                    minLength="18" />
                  <label className="rc-input__label" htmlFor="phone"></label>
                </span>
                <span className="ui-lighter">
                  <FormattedMessage id="example" />: +(52) 559 801 65
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6 pull-left">
                <label className="form-control-label rc-full-width" htmlFor="reference">
                  <FormattedMessage id="payment.rfc" />
                </label>
                <span className="rc-input rc-input--full-width rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                  <input
                    type="text"
                    className="rc-input__control input__phoneField"
                    id="reference"
                    name="rfc"
                    value={form.rfc}
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)}
                    maxLength="50" />
                  <label className="rc-input__label" htmlFor="reference"></label>
                </span>
                {/* <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div> */}
              </div>
            </div>
            <span className="rc-meta mandatoryField">
              * <FormattedMessage id="account.requiredFields" />
            </span>
            <div className="text-right">
              <a
                className="rc-styled-link editPersonalInfoBtn"
                name="personalInformation"
                onClick={() => this.handleCancel()}>
                <FormattedMessage id="cancel" />
              </a>
              &nbsp;<FormattedMessage id="or" />&nbsp;
              <button
                className="rc-btn rc-btn--one submitBtn"
                name="personalInformation"
                type="submit"
                onClick={() => this.handleSave()}>
                <FormattedMessage id="save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(PersonalDataEditForm)