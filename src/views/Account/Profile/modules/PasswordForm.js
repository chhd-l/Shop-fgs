import React from "react"
import { injectIntl, FormattedMessage } from 'react-intl'
import Loading from "@/components/Loading"
import { modifyPassword } from "@/api/login";

@injectIntl
class PasswordForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      passwordForm:{
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
      },
      loading:false,
      editFormVisible:false,
      errorMsg:''
    }
  }
  componentDidMount(){

  }
  handleInputChange (e) {
    const target = e.target
    const { passwordForm } = this.state
    passwordForm[target.name] = target.value
    this.setState({ passwordForm: passwordForm })
  }

  handleSave=()=>{
    const{passwordForm}=this.state
    if (!this.passwordVerify(passwordForm.newPassword)) {
      this.showErrorMsg(this.props.intl.messages.yourEmailNotVerified);
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      this.showErrorMsg(this.props.intl.messages.twoPasswordsYouTypedDoNotMatch);
      return false;
    }
    let params ={
      "confirmNewPassword": passwordForm.confirmPassword,
      "newPassword": passwordForm.newPassword,
      "oldPassword": passwordForm.oldPassword
    }
    
    modifyPassword(params).then(res=>{
      console.log(res);
      
    }).catch(err=>{
      this.showErrorMsg(this.props.intl.messages.systemError)
    })

  }

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      })
    }, 3000)
  }
  passwordVerify = (password) => {
    //匹配至少包含一个数字、一个大写字母 一个小写字母 8-20 位的密码
    let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\D]{8,20}$/;
    return reg.test(password)
  }

  render() {
    const { editFormVisible, passwordForm } = this.state
    return(
      <div>
        {this.state.loading ? <Loading positionAbsolute="true" /> : null}
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="changePassword" />
            </h5>
            <FormattedMessage id="edit">
              {txt => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${editFormVisible ? 'hidden' : ''}`}
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
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">Save successfullly</p>
          </aside>
          <div className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${editFormVisible ? 'hidden' : ''}`}>
            <div className="col-lg-6"><FormattedMessage id="passwordHide" /></div>
          </div>
          <div className={`${editFormVisible ? '' : 'hidden'}`}>
            <div className="row rc-margin-left--none rc-padding-left--none contactPreferenceContainer rc-margin-left--xs rc-padding-left--xs d-flex flex-column">
              <div className="rc-input rc-input--inline rc-margin-y--xs" >
                
                <input
                  type="text"
                  placeholder={this.props.intl.messages.oldPassword}
                  className="form-control password-input"
                  value={passwordForm.oldPassword}
                  onChange={event => this.handleInputChange(event)}
                  name="oldPassword"
                />
                <input
                  type="text"
                  placeholder={this.props.intl.messages.newPassword}
                  className="form-control password-input"
                  value={passwordForm.newPassword}
                  onChange={event => this.handleInputChange(event)}
                  name="newPassword"
                />
                <input
                  type="text"
                  placeholder={this.props.intl.messages.enterPasswordAgain}
                  className="form-control password-input"
                  value={passwordForm.confirmPassword}
                  onChange={event => this.handleInputChange(event)}
                  name="confirmPassword"
                />
                
              </div>
            </div>
            <div className="text-right">
              <a
                className="rc-styled-link"
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

export default injectIntl(PasswordForm);