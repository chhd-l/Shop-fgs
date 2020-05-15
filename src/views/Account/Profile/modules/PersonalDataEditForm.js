import React from "react"
import { FormattedMessage } from 'react-intl'
import { findIndex } from "lodash"
import Loading from "@/components/Loading"

export default class PersonalDataEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormVisible: false,
      loading: false,
      successTipVisible: false,
      form: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: ''
      }
    }
  }
  componentDidMount () {
    const { data } = this.props
    this.setState({
      form: Object.assign({}, data)
    })

    // try {
    //   setTimeout(() => {
    //     const datePickerOptions = {
    //       i18n: {
    //         previousMonth: 'Poprzedni miesiąc',
    //         nextMonth: 'Następny miesiąc',
    //         months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    //         weekdays: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwaretk', 'Piątek', 'Sobota'],
    //         weekdaysShort: ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb']
    //       },
    //       maxDate: new Date
    //     };
    //     window.RCDL.features.Datepickers.init('.rc-input__date.rc-js-custom', null, datePickerOptions);
    //   }, 1000)
    // } catch (e) {
    //   console.log(e)
    // }
  }
  componentWillMount () {
    // window.addEventListener("load", function () {
    //   let e = {
    //     maxDate: new Date
    //   };
    //   window.webpackComplete ?
    //     document.querySelector(".rc-input__date.rc-js-custom").length && window.RCDL.features.Datepickers.init(".rc-input__date.rc-js-custom", null, e)
    //     : document.addEventListener("rc_webpack_done", function () {
    //       document.querySelector(".rc-input__date.rc-js-custom").length && (window.RCDL.features.Datepickers.init(".rc-input__date.rc-js-custom", null, e))
    //     })
    // })
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
        <div className="personalInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="account.personalData" />
            </h5>
            <FormattedMessage id="edit">
              {txt => (
                <button
                  className={['editPersonalInfoBtn', 'rc-styled-link', editFormVisible ? 'hidden' : ''].join(' ')}
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
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successTipVisible ? '' : 'hidden'}`}
            role="alert">
            <p class="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">Ваша информация была правильно сохранена</p>
          </aside>
          <div className={['userProfileInfo', 'address', editFormVisible ? 'hidden' : ''].join(' ')}>
            <span id="userFullName">{data.firstName + ' ' + data.lastName}</span>
            <span id="userBirthDate">{data.birthdate}</span>
            <span id="userEmail">{data.email}</span>
          </div>
          <div className={['userProfileInfoEdit', editFormVisible ? '' : 'hidden'].join(' ')}>
            <div className="row">
              <div className="form-group col-lg-6 pull-left required">
                <label className="form-control-label rc-full-width" for="firstName">
                  Name
                </label>
                <span className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                  <input
                    type="text"
                    className="rc-input__control"
                    id="firstName"
                    data-name="profile_personalInfo"
                    alt="Name"
                    data-pattern-mismatch="Please match the requested format"
                    data-missing-error="Это поле обязательно для заполнения."
                    name="firstName"
                    required=""
                    aria-required="true"
                    value={form.firstName}
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)}
                    maxlength="50" />
                  <label className="rc-input__label" for="firstName"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
              <div className="form-group col-lg-6 pull-left required">
                <label className="form-control-label rc-full-width" for="lastname">
                  Surname
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
                    maxlength="50" />
                  <label className="rc-input__label" for="lastname"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6 required">
                <label className="form-control-label rc-full-width" for="birthdate">
                  Date of Birth
              </label>
                <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
                  <input
                    className="rc-input__date rc-js-custom"
                    id="birthdate"
                    data-js-dateformat="DD/MM/YYYY"
                    name="birthdate"
                    type="date"
                    value={form.birthdate}
                    onChange={e => this.handleInputChange(e)}
                    onBlur={e => this.inputBlur(e)} />
                  <label className="rc-input__label" for="birthdate"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>This field is required.</div>
                <div className="invalid-birthdate invalid-feedback" style={{ display: 'none' }}>This field is required.</div>
              </div>
              <div className="form-group col-lg-6 required">
                <label className="form-control-label rc-full-width" for="email">
                  E-mail
              </label>
                <span className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
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
                    maxlength="50"
                    pattern="^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$" />
                  <label className="rc-input__label" for="email"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
            <span className="rc-meta mandatoryField">Required fields</span>
            <div className="text-right">
              <a
                className="rc-styled-link editPersonalInfoBtn"
                name="personalInformation"
                onClick={() => { this.setState({ editFormVisible: false }) }}>Cancel</a>
            &nbsp;or&nbsp;
            <button className="rc-btn rc-btn--one submitBtn" name="personalInformation" type="submit"
                onClick={() => this.handleSave()}>Save</button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}