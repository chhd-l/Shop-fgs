import React from "react"
import { FormattedMessage } from 'react-intl'
import { findIndex } from "lodash"
import Loading from "@/components/Loading"

export default class AddressBookEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormVisible: false,
      loading: false,
      successTipVisible: false,
      errorMsg: '',
      form: {
        address1: '',
        address2: '',
        country: "Mexico",
        city: '',
        postCode: '',
        phoneNumber: '',
        rfc: ''
      }
    }
  }
  componentDidMount () {
    const { data } = this.props
    this.setState({
      form: Object.assign({}, data)
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
    this.scrollToErrorMsg()
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      })
    }, 5000)
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
  }
  scrollToErrorMsg () {
    const widget = document.querySelector('.contactInfo')
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo(this.getElementToPageTop(widget), 0)
    }
  }
  handleCancel () {
    this.setState({
      editFormVisible: false,
      errorMsg: ''
    })
    this.scrollToErrorMsg()
  }
  async handleSave () {
    const { form } = this.state
    for (let key in form) {
      const value = form[key]
      if (!value && (key === 'address1' || key === 'address2' || key === 'country' || key === 'city')) {
        this.showErrMsg('Please complete the required items')
        return
      }
      if (key === 'postCode' && value && !(/\d{5}/.test(value))) {
        this.showErrMsg('Please enter the correct post code')
        return
      }
    }

    this.setState({ loading: true })
    setTimeout(() => {
      this.props.updateData(this.state.form)
      this.setState({
        editFormVisible: false,
        loading: false,
        successTipVisible: true
      })
      this.scrollToErrorMsg()
      setTimeout(() => {
        this.setState({
          successTipVisible: false
        })
      }, 2000)
    }, 2000)
  }
  render () {
    const { editFormVisible, form } = this.state
    const { data } = this.props
    return (
      <div>
        {this.state.loading ? <Loading positionAbsolute="true" /> : null}
        <div className="contactInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="account.TheAddressBook" />
            </h5>
            <FormattedMessage id="edit">
              {txt => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link ${editFormVisible ? 'hidden' : ''}`}
                  name="contactInformation"
                  id="contactInfoEditBtn"
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
                onClick={() => { this.setState({ errorMsg: '' }) }}
                aria-label="Close">
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successTipVisible ? '' : 'hidden'}`}
            role="alert">
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">Ваша информация была правильно сохранена</p>
          </aside>
          <div className={`row userContactInfo text-break ${editFormVisible ? 'hidden' : ''}`}>
            <div className="col-lg-6">
              <FormattedMessage id="payment.address1" />
            </div>
            <div className="col-lg-6">
              {data.address1}
            </div>
            <div className="col-lg-6">
              <FormattedMessage id="payment.address2" />
            </div>
            <div className="col-lg-6">
              {data.address2}
            </div>
            <div className="col-md-6">
              <FormattedMessage id="payment.country" />
            </div>
            <div className="col-md-6">
              {data.country}
            </div>
            <div className="col-md-6">
              <FormattedMessage id="payment.city" />
            </div>
            <div className="col-md-6">
              {data.city}
            </div>
            <div className="col-md-6">
              <FormattedMessage id="payment.postCode" />
            </div>
            <div className="col-md-6">
              {data.postCode}
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
        </div>
        <div className={`userContactInfoEdit ${editFormVisible ? '' : 'hidden'}`}>
          <div className="row">
            <div className="form-group col-lg-12 pull-left required">
              <label className="form-control-label rc-full-width" htmlFor="address1">
                <FormattedMessage id="payment.address1" />
              </label>
              <span className="rc-input rc-input--label rc-margin--none rc-input--full-width" input-setup="true">
                <input
                  type="text"
                  className="rc-input__control"
                  id="address1"
                  data-pattern-mismatch="Please match the requested format"
                  data-missing-error="Это поле обязательно для заполнения."
                  name="address1"
                  required=""
                  aria-required="true"
                  value={form.address1}
                  onChange={e => this.handleInputChange(e)}
                  onBlur={e => this.inputBlur(e)}
                  maxLength="50"
                  autoComplete="address-line1" />
                <label className="rc-input__label" htmlFor="address1"></label>
              </span>
              <div className="invalid-feedback" style={{ display: 'none' }}>
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: (
                      <FormattedMessage id="payment.address1" />
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pull-left required">
              <label className="form-control-label rc-full-width" htmlFor="address2">
                <FormattedMessage id="payment.address2" />
              </label>
              <span className="rc-input rc-input--label rc-margin--none rc-input--full-width" input-setup="true">
                <input
                  type="text"
                  className="rc-input__control"
                  id="address2"
                  data-pattern-mismatch="Please match the requested format"
                  data-missing-error="Это поле обязательно для заполнения."
                  name="address2"
                  required=""
                  aria-required="true"
                  value={form.address2}
                  onChange={e => this.handleInputChange(e)}
                  onBlur={e => this.inputBlur(e)}
                  maxLength="50"
                  autoComplete="address-line1" />
                <label className="rc-input__label" htmlFor="address2"></label>
              </span>
              <div className="invalid-feedback" style={{ display: 'none' }}>
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: (
                      <FormattedMessage id="payment.address2" />
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="form-group col-lg-12 pull-left no-padding required">
                <label className="form-control-label" htmlFor="country">
                  <FormattedMessage id="payment.country" />
                </label>
                <span className="rc-select rc-full-width rc-input--full-width rc-select-processed" data-loc="countrySelect">
                  <select
                    data-js-select=""
                    id="country"
                    value={form.country}
                    onChange={(e) => this.handleInputChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                    name="country"
                  >
                    <option>Mexico</option>
                  </select>
                </span>
                <div className="invalid-feedback"></div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="form-group col-lg-12 pull-left no-padding required">
                <label className="form-control-label" htmlFor="city">
                  <FormattedMessage id="payment.city" />
                </label>
                <div data-js-dynamicselect="city" data-template="shipping">
                  <span className="rc-select rc-full-width rc-input--full-width rc-select-processed" data-loc="citySelect">
                    <select
                      data-js-select=""
                      id="city"
                      value={form.city}
                      onChange={(e) => this.handleInputChange(e)}
                      onBlur={(e) => this.inputBlur(e)}
                      name="city"
                    >
                      <option value=""></option>
                      <option>Monterrey</option>
                      <option>Mexico City</option>
                    </select>
                  </span>
                </div>
                <div className="invalid-feedback"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <div className="no-padding">
                <label className="form-control-label rc-full-width" htmlFor="zipCode">
                  <FormattedMessage id="payment.postCode" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-input--label rc-margin-top--none rc-margin-right--none rc-margin-left--none rc-full-width"
                  data-js-validate=""
                  data-js-warning-message="*Post Code isn’t valid"
                  input-setup="true">
                  <input
                    type="text"
                    className="rc-input__control"
                    id="zipCode"
                    data-pattern-mismatch="Please match the requested format"
                    data-missing-error="Это поле обязательно для заполнения."
                    data-range-error="The postal code needs to be 6 characters"
                    name="postCode"
                    value={form.postCode}
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)}
                    maxLength="5"
                    minLength="5"
                    data-js-pattern="(^\d{5}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                    autoComplete="postal-code" />
                  <label className="rc-input__label" htmlFor="zipCode"></label>
                </span>
                {/* <div className="invalid-feedback">
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: (
                        <FormattedMessage id="payment.postCode" />
                      ),
                    }}
                  />
                </div> */}
                <div className="ui-lighter">
                  <FormattedMessage id="example" />: 02860
                </div>
              </div>
            </div>
            <div className="form-group col-6">
              <label className="form-control-label rc-full-width" htmlFor="phone">
                <FormattedMessage id="payment.phoneNumber" />
              </label>
              <span className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                <input
                  type="number"
                  className="rc-input__control input__phoneField"
                  id="phone"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={e => this.handleInputChange(e)}
                  onBlur={e => this.inputBlur(e)}
                  maxLength="20"
                  minLength="18" />
                <label className="rc-input__label" htmlFor="phone"></label>
              </span>
              {/* <div className="invalid-feedback">
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: (
                      <FormattedMessage id="payment.phoneNumber" />
                    ),
                  }}
                />
              </div> */}
              <span className="ui-lighter">
                <FormattedMessage id="example" />: +(52) 559 801 65
              </span>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
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
            </div>
          </div>
          <span className="rc-meta mandatoryField">
            <FormattedMessage id="account.requiredFields" />
          </span>
          <div className="text-right">
            <a
              className="rc-styled-link editPersonalInfoBtn"
              name="contactInformation"
              onClick={() => this.handleCancel()}>
              <FormattedMessage id="cancel" />
            </a>
            &nbsp;<FormattedMessage id="or" />&nbsp;
              <button
              className="rc-btn rc-btn--one submitBtn editAddress"
              data-sav="false"
              name="contactInformation"
              type="submit"
              onClick={() => this.handleSave()}>
              <FormattedMessage id="save" />
            </button>
          </div>

        </div>
      </div>
    )
  }
}