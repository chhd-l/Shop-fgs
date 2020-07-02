import React from "react"
import { injectIntl, FormattedMessage } from 'react-intl'
import { findIndex } from "lodash"
import Loading from "@/components/Loading"
import { updateCustomerBaseInfo } from "@/api/user"
import { getDictionary } from '@/utils/utils'
import Selection from '@/components/Selection'

class AddressBookEditForm extends React.Component {
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
        country: '',
        city: '',
        postCode: '',
        phoneNumber: '',
        rfc: ''
      },
      cityList: [],
      countryList: []
    }
    this.timer = null
  }
  componentDidMount () {
    const { data } = this.props
    this.setState({
      form: Object.assign({}, data)
    })
    getDictionary({ type: 'city' })
      .then(res => {
        this.setState({
          cityList: res
        })
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
    const name = target.name
    let value = target.value
    if (name === 'postCode') {
      value = value.replace(/\s+/g, "")
    }
    form[name] = value
    this.setState({ form: form })
    this.inputBlur(e);
  }
  showErrMsg (msg) {
    this.setState({
      errorMsg: msg
    })
    this.scrollToErrorMsg()
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
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
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget) - 600,
        behavior: "smooth"
      })
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
      if (!value && (key === 'address1' || key === 'address2' || key === 'country' || key === 'city' || key === 'postCode' || key === 'phoneNumber')) {
        this.showErrMsg(this.props.intl.messages.CompleteRequiredItems)
        return
      }
      if (key === 'postCode' && value && !(/\d{5}/.test(value))) {
        this.showErrMsg(this.props.intl.messages.EnterCorrectPostCode)
        return
      }
    }

    this.setState({ loading: true })
    let param = Object.assign({}, this.props.originData, {
      house: form.address1,
      housing: form.address2,
      countryId: form.country,
      cityId: form.city,
      postCode: form.postCode,
      contactPhone: form.phoneNumber,
      reference: form.rfc
    })
    try {
      await updateCustomerBaseInfo(param)
      this.props.updateData(this.state.form)
      this.setState({
        successTipVisible: true
      })
      this.scrollToErrorMsg()
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({
          successTipVisible: false
        })
      }, 2000)
    } catch (err) {
      this.setState({
        errorMsg: typeof err === 'object' ? err.toString() : err
      })
      this.scrollToErrorMsg()
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
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
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${editFormVisible ? 'hidden' : ''}`}
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
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none"><FormattedMessage id="saveSuccessfullly" /></p>
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
              {this.getDictValue(this.state.countryList, data.country)}
            </div>
            <div className="col-md-6">
              <FormattedMessage id="payment.city" />
            </div>
            <div className="col-md-6">
              {this.getDictValue(this.state.cityList, data.city)}
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
              <label className="form-control-label rc-full-width" htmlFor="address">
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
                  autoComplete="address-line" />
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
              <label className="form-control-label rc-full-width" htmlFor="address">
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
                  autoComplete="address-line" />
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
                  <Selection
                    key="1"
                    selectedItemChange={data => this.handleSelectedItemChange('country', data)}
                    optionList={this.computedList('country')}
                    selectedItemData={{
                      value: form.country
                    }} />
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
                    <Selection
                      key="2"
                      selectedItemChange={data => this.handleSelectedItemChange('city', data)}
                      optionList={this.computedList('city')}
                      selectedItemData={{
                        value: form.city
                      }} />
                  </span>
                </div>
                <div className="invalid-feedback"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6 required">
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
                    // maxLength="5"
                    // minLength="5"
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
            <div className="form-group col-6 required">
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
            * <FormattedMessage id="account.requiredFields" />
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

export default injectIntl(AddressBookEditForm)