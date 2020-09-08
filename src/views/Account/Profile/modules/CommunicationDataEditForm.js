import React from 'react';
import { FormattedMessage } from 'react-intl';
import Loading from '@/components/Loading';
import { updateCustomerBaseInfo } from '@/api/user';

export default class CommunicationDataEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormVisible: false,
      loading: false,
      successTipVisible: false,
      errorMsg: '',
      form: {
        contactMethod: ''
      },
      oldForm: {}
    };
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState({
      form: Object.assign({}, data),
      oldForm: Object.assign({}, data)
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.form) {
      this.setState({
        form: Object.assign({}, nextProps.data),
        oldForm: Object.assign({}, nextProps.data)
      });
    }
  }
  handleInputChange(e) {
    const target = e.target;
    const { form } = this.state;
    if (target.name === 'contactMethod') {
      form[target.name] = form[target.name] ? '' : 'email';
    } else {
      form[target.name] = target.value;
    }

    this.setState({ form: form });
  }
  async handleSave() {
    const { form } = this.state;
    this.setState({ loading: true });
    try {
      await updateCustomerBaseInfo(
        Object.assign({}, this.props.originData, {
          contactMethod: form.contactMethod
        })
      );
      this.props.updateData(this.state.form);
      this.setState({
        successTipVisible: true
      });
      setTimeout(() => {
        this.setState({
          successTipVisible: false
        });
      }, 2000);
    } catch (err) {
      this.setState({
        errorMsg: typeof err === 'object' ? err.toString() : err
      });
      setTimeout(() => {
        this.setState({
          errorMsg: ''
        });
      }, 5000);
    } finally {
      this.setState({
        editFormVisible: false,
        loading: false
      });
    }
  }
  handleCancel = () => {
    const { oldForm } = this.state;
    this.setState({
      editFormVisible: false,
      form: Object.assign({}, oldForm)
    });
  };

  render() {
    const { editFormVisible, form } = this.state;
    return (
      <div>
        {this.state.loading ? <Loading positionAbsolute="true" /> : null}
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="account.preferredMmethodsOfCommunication" />
            </h5>
            <FormattedMessage id="edit">
              {(txt) => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${
                    editFormVisible ? 'hidden' : ''
                  }`}
                  name="contactPreference"
                  id="contactPrefEditBtn"
                  title={txt}
                  alt={txt}
                  onClick={() => {
                    this.setState({ editFormVisible: true });
                  }}
                >
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
          <hr />
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
              this.state.errorMsg ? '' : 'hidden'
            }`}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
              role="alert"
            >
              <span className="pl-0">{this.state.errorMsg}</span>
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
              this.state.successTipVisible ? '' : 'hidden'
            }`}
            role="alert"
          >
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
              <FormattedMessage id="saveSuccessfullly" />
            </p>
          </aside>
          <span className="rc-meta">
            <b>
              {/* <FormattedMessage id="account.preferredContactMethod" /> */}
              <FormattedMessage id="account.emailCommunication" />
            </b>
          </span>

          {/* <div class="rc-input rc-input--stacked">
            <input class="rc-input__checkbox" id="id-checkbox-cat-2" value="Cat" type="checkbox" name="checkbox-2" />
            <label class="rc-input__label--inline" for="id-checkbox-cat-2">Cat</label>
          </div> */}
          <div
            className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${
              editFormVisible ? 'hidden' : ''
            }`}
          >
            {/* <div className="rc-input rc-input--inline rc-margin-y--xs">
              <FormattedMessage id="phone">
                {txt => (
                  <input
                    className="rc-input__checkbox"
                    type="checkbox"
                    disabled="disabled"
                    alt={txt}
                    name="phone"
                    checked={form.contactMethod === 'phone'}
                    readOnly
                  />
                )}
              </FormattedMessage>
              <label className="rc-input__label--inline outline-none">
                <FormattedMessage id="phone" />
              </label>
            </div> */}
            <div className="rc-input rc-input--inline rc-margin-y--xs">
              <FormattedMessage id="profile.emailChoose">
                {(txt) => (
                  <input
                    className="rc-input__checkbox"
                    type="checkbox"
                    disabled="disabled"
                    alt={txt}
                    name="email"
                    checked={form.contactMethod === 'email'}
                    readOnly
                  />
                )}
              </FormattedMessage>
              <label className="rc-input__label--inline outline-none">
                <FormattedMessage id="profile.emailChoose" values={{ val1: <a style={{color:'#EC2E5E',textDecoration:'underline'}} href="info.de@royalcanin.com">info.de@royalcanin.com</a> }} />
              </label>
            </div>
          </div>
          <div className={`${editFormVisible ? '' : 'hidden'}`}>
            <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column">
              {/* <div className="rc-input rc-input--inline rc-margin-y--xs">
                <input
                  className="rc-input__checkbox"
                  id="optsmobile"
                  type="checkbox"
                  name="contactMethod"
                  value="phone"
                  onChange={event => this.handleInputChange(event)}
                  checked={this.state.form.contactMethod === 'phone'}
                />
                <label className="rc-input__label--inline outline-none" htmlFor="optsmobile">
                  <FormattedMessage id="phone" />
                </label>
              </div> */}
              <div className="rc-input rc-input--inline rc-margin-y--xs">
                <FormattedMessage id="profile.emailChoose">
                  {(txt) => (
                    <input
                      className="rc-input__checkbox"
                      id="optsemail"
                      type="checkbox"
                      alt={txt}
                      name="contactMethod"
                      value="email"
                      onChange={(event) => this.handleInputChange(event)}
                      checked={this.state.form.contactMethod === 'email'}
                    />
                  )}
                </FormattedMessage>
                <label
                  className="rc-input__label--inline outline-none"
                  htmlFor="optsemail"
                >
                  <FormattedMessage id="profile.emailChoose" />
                </label>
              </div>
            </div>
            <div className="text-right contactPreferenceFormBtn">
              <a
                className="rc-styled-link editPersonalInfoBtn"
                name="contactPreference"
                onClick={() => this.handleCancel()}
              >
                <FormattedMessage id="cancel" />
              </a>
              &nbsp;
              <FormattedMessage id="or" />
              &nbsp;
              <button
                className="rc-btn rc-btn--one submitBtn"
                name="contactPreference"
                type="submit"
                onClick={() => this.handleSave()}
              >
                <FormattedMessage id="save" />
              </button>
            </div>
          </div>
          {/* <div className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${editFormVisible ? 'hidden' : ''}`}>
            <div className="rc-input rc-input--inline rc-margin-y--xs">
              <FormattedMessage id="phone">
                {txt => (
                  <input
                    className="rc-input__radio"
                    type="checkbox"
                    disabled="disabled"
                    alt={txt}
                    name="phone"
                    checked={form.contactMethod === 'phone'}
                    readOnly
                  />
                )}
              </FormattedMessage>
              <label className="rc-input__label--inline outline-none">
                <FormattedMessage id="phone" />
              </label>
            </div>
            <div className="rc-input rc-input--inline rc-margin-y--xs">
              <FormattedMessage id="email">
                {txt => (
                  <input
                    className="rc-input__radio"
                    type="checkbox"
                    disabled="disabled"
                    alt={txt}
                    name="email"
                    checked={form.contactMethod === 'email'}
                    readOnly
                  />
                )}
              </FormattedMessage>
              <label className="rc-input__label--inline outline-none">
                <FormattedMessage id="email" />
              </label>
            </div>
          </div>
          <div className={`${editFormVisible ? '' : 'hidden'}`}>
            <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column">
              <div className="rc-input rc-input--inline rc-margin-y--xs">
                <input
                  className="rc-input__radio"
                  id="optsmobile"
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  onChange={event => this.handleInputChange(event)}
                  checked={this.state.form.contactMethod === 'phone'}
                />
                <label className="rc-input__label--inline outline-none" htmlFor="optsmobile">
                  <FormattedMessage id="phone" />
                </label>
              </div>
              <div className="rc-input rc-input--inline rc-margin-y--xs">
                <FormattedMessage id="email">
                  {txt => (
                    <input
                      className="rc-input__radio"
                      id="optsemail"
                      type="radio"
                      alt={txt}
                      name="contactMethod"
                      value="email"
                      onChange={event => this.handleInputChange(event)}
                      checked={this.state.form.contactMethod === 'email'} />
                  )}
                </FormattedMessage>
                <label className="rc-input__label--inline outline-none" htmlFor="optsemail">
                  <FormattedMessage id="email" />
                </label>
              </div>
            </div>
            <div className="text-right contactPreferenceFormBtn">
              <a
                className="rc-styled-link editPersonalInfoBtn"
                name="contactPreference"
                onClick={()=>this.handleCancel()}>
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
          </div> */}
        </div>
      </div>
    );
  }
}
