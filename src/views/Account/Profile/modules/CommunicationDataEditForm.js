import React from "react"
import { FormattedMessage } from 'react-intl'
import Loading from "@/components/Loading"

export default class CommunicationDataEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormVisible: false,
      loading: false,
      successTipVisible: false,
      errorMsg: '',
      form: {
        phone: false,
        email: false
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
  handleInputChange (e) {
    const target = e.target
    const { form } = this.state
    form[target.name] = !form[target.name]
    this.setState({ form: form })
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
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="account.preferredMmethodsOfCommunication" />
            </h5>
            <FormattedMessage id="edit">
              {txt => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link ${editFormVisible ? 'hidden' : ''}`}
                  name="contactPreference"
                  id="contactPrefEditBtn"
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
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">Ваша информация была правильно сохранена</p>
          </aside>
          <span className="rc-meta">
            <b>
              <FormattedMessage id="account.preferredContactMethod" />
            </b>
          </span>
          <div className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${editFormVisible ? 'hidden' : ''}`}>
            <div className="rc-input rc-input--inline rc-margin-y--xs">
              <FormattedMessage id="phone">
                {txt => (
                  <input
                    className="rc-input__checkbox"
                    type="checkbox"
                    disabled="disabled"
                    alt={txt}
                    name="phone"
                    checked={data.phone}
                    readOnly
                  />
                )}
              </FormattedMessage>
              <label className="rc-input__label--inline">
                <FormattedMessage id="phone" />
              </label>
            </div>
            <div className="rc-input rc-input--inline rc-margin-y--xs">
              <FormattedMessage id="email">
                {txt => (
                  <input
                    className="rc-input__checkbox"
                    type="checkbox"
                    disabled="disabled"
                    alt={txt}
                    name="email"
                    checked={data.email}
                    readOnly
                  />
                )}
              </FormattedMessage>
              <label className="rc-input__label--inline">
                <FormattedMessage id="email" />
              </label>
            </div>
          </div>
          <div className={`${editFormVisible ? '' : 'hidden'}`}>
            <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column">
              <div className="rc-input rc-input--inline rc-margin-y--xs">
                <input
                  className="rc-input__checkbox"
                  id="optsmobile"
                  type="checkbox"
                  name="phone"
                  value="phone"
                  onChange={event => this.handleInputChange(event)}
                  checked={this.state.form.phone}
                />
                <label className="rc-input__label--inline" htmlFor="optsmobile">
                  <FormattedMessage id="phone" />
                </label>
              </div>
              <div className="rc-input rc-input--inline rc-margin-y--xs">
                <FormattedMessage id="email">
                  {txt => (
                    <input
                      className="rc-input__checkbox"
                      id="optsemail"
                      type="checkbox"
                      alt={txt}
                      name="email"
                      value="email"
                      onChange={event => this.handleInputChange(event)}
                      checked={this.state.form.email} />
                  )}
                </FormattedMessage>
                <label className="rc-input__label--inline" htmlFor="optsemail">
                  <FormattedMessage id="email" />
                </label>
              </div>
            </div>
            <div className="text-right contactPreferenceFormBtn">
              <a
                className="rc-styled-link editPersonalInfoBtn"
                name="contactPreference"
                onClick={() => { this.setState({ editFormVisible: false }) }}>
                <FormattedMessage id="cancel" />
              </a>
              &nbsp;<FormattedMessage id="or" />&nbsp;
                <button
                className="rc-btn rc-btn--one submitBtn"
                name="contactPreference"
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