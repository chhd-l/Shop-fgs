import React from "react"
import { FormattedMessage } from 'react-intl'
import { findIndex } from "lodash"
import Loading from "@/components/Loading"

export default class AddressBookEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormVisible: true,
      loading: false,
      successTipVisible: false,
      form: {
        street: '',
        country: "Mexico",
        city: '',
        house: '',
        caseBuilding: '',
        porch: '',
        flat: '',
        postCode: '',
        phone: '',
        phone2: ''
      }
    }
  }
  componentDidMount () {
    const { data } = this.props
    this.setState({
      form: Object.assign({}, data)
    })
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
  async handleSave () {
    this.setState({ loading: true })
    setTimeout(() => {
      this.props.updateData(this.state.form)
      this.setState({
        editFormVisible: false,
        loading: false,
        successTipVisible: true
      })
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
                  className="editPersonalInfoBtn rc-styled-link"
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
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successTipVisible ? '' : 'hidden'}`}
            role="alert">
            <p class="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">Ваша информация была правильно сохранена</p>
          </aside>
          <div className={`row userContactInfo ${editFormVisible ? 'hidden' : ''}`}>
            <div className="col-lg-6 address">
              <span className="rc-meta"><b><FormattedMessage id="address" /></b></span>
              <span id="userAdd1" data-address2="false">{data.street}</span>
              <span id="userCountryDist">{[data.country, data.region].join(' ')}</span>
              <span id="userCityRegion">{[data.city, data.area].join(' ')}</span>
              <span id="userHouseHousing">{[data.house, data.caseBuilding].join(' ')}</span>
              <span id="userEntAppartment">{[data.porch, data.flat].join(' ')}</span>
              <span id="userZipcode">{data.postCode}</span>
            </div>
            <div className="col-lg-6 address">
              <span className="rc-meta"><b><FormattedMessage id="phone" /></b></span>
              <span>{data.phone}</span>
              <span>{data.phone2}</span>
            </div>
          </div>
        </div>
        <div className={`userContactInfoEdit ${editFormVisible ? '' : 'hidden'}`}>
          <div class="row">
            <div class="form-group col-lg-12 pull-left required">
              <label class="form-control-label rc-full-width" for="address1">
                Street
              </label>
              <span class="rc-input rc-input--label rc-margin--none rc-input--full-width" input-setup="true">
                <input
                  type="text"
                  class="rc-input__control"
                  id="address1"
                  data-name="profile_contactInfo"
                  alt="Улица"
                  data-pattern-mismatch="Please match the requested format"
                  data-missing-error="Это поле обязательно для заполнения."
                  name="street"
                  required="" aria-required="true"
                  value={form.street}
                  onChange={e => this.handleInputChange(e)}
                  onBlur={e => this.inputBlur(e)}
                  maxlength="50"
                  autocomplete="address-line1" />
                <label class="rc-input__label" for="address1"></label>
              </span>
              <div class="invalid-feedback" style={{ display: 'none' }}>
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <div class="form-group col-lg-12 pull-left no-padding required">
                <label class="form-control-label" for="country">
                  Country
                </label>
                <span class="rc-select rc-full-width rc-input--full-width rc-select-processed" data-loc="countrySelect">
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
                <div class="invalid-feedback"></div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="form-group col-lg-12 pull-left no-padding required">
                <label class="form-control-label" for="city">
                  City
                </label>
                <div data-js-dynamicselect="city" data-template="shipping">
                  <span class="rc-select rc-full-width rc-input--full-width rc-select-processed" data-loc="citySelect">
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
                <div class="invalid-feedback"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-6 required">
              <div class="no-padding required">
                <label class="form-control-label rc-full-width" for="zipCode">
                  Index
                </label>
                <span class="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                  <input type="text" class="rc-input__control" id="zipCode" data-name="profile_contactInfo" alt="Index" data-pattern-mismatch="Please match the requested format" data-missing-error="Это поле обязательно для заполнения." data-range-error="The postal code needs to be 6 characters" name="dwfrm_profile_address_zipcode" required="" aria-required="true" value="123444" maxlength="6" minlength="6" autocomplete="postal-code" />
                  <label class="rc-input__label" for="zipCode"></label>
                </span>
                <div class="invalid-feedback"></div>
                <a class="rc-styled-link" href="https://www.pochta.ru/post-index" target="_blank" title="Will open in a new tab" alt="Get zip code" aria-describedby="newTabText">
                  Get zip code
                </a>
              </div>
            </div>
            <div class="form-group col-6 required">
              <label class="form-control-label rc-full-width" for="phone">
                Phone
              </label>
              <span class="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                <input type="text" class="rc-input__control input__phoneField" id="phone" data-name="profile_contactInfo" alt="Phone" data-inputmask="'mask': '+7 (999) 999-99-99'" data-pattern-mismatch="Please match the requested format" data-missing-error="Это поле обязательно для заполнения." name="dwfrm_profile_customer_phone" required="" aria-required="true" value="+7 (923) 456-78-90" maxlength="20" minlength="10" inputmode="text" />
                <label class="rc-input__label" for="phone">
                </label>
              </span>
              <div class="invalid-feedback"></div>
              <span>Example: +7 (923) 456 78 90</span>
            </div>
            <div class="form-group col-6">
              <label class="form-control-label rc-full-width" for="mobile">
                Phone
              </label>
              <span class="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                <input type="text" class="rc-input__control input__phoneField" id="mobile" data-name="profile_contactInfo" alt="Phone" data-inputmask="'mask': '+7 (999) 999-99-99'" data-pattern-mismatch="Please match the requested format" data-missing-error="Это поле обязательно для заполнения." name="dwfrm_profile_customer_mobile" value="+7 (923) 456-78-91" maxlength="20" minlength="10" inputmode="text" />
                <label class="rc-input__label" for="mobile">
                </label>
              </span>
              <div class="invalid-feedback"></div>
              <span>Example: +7 (923) 456 78 90</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}