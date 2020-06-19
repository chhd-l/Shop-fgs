import React from 'react'
import { FormattedMessage } from "react-intl";
import './index.css'

export default class ForgetPassword extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      errorMsg:'',
      successMsg:''
    }
  }
  sendEmail =()=>{
    debugger
    if(!this.emailVerify(this.state.email)){
      this.showErrorMsg('Your email has not been verified!')
      return false
    }
    console.log(this.state.email);
    
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
  emailVerify = (email) => {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(email)
  };
  emailChange=(email)=>{
    this.setState({
      email:email
    })
    
  }
  backToLogin(){
    const { history } = this.props;
    history.push("/login");
  }
  render(h) {
    return(
      <div className="miaa-content">
        <div className="miaa-header">
          <h4 className="miaa-title mb-3" style={{  fontWeight: 700}}>
            <FormattedMessage id='forgetPassword.createNewPassword'/>
          </h4>
        </div>
        <div className="miaa-body">
          <div className="miaa-inner-content">
            <div className="text-gray info-text">
              <FormattedMessage id='forgetPassword.forgetPasswordTip'/> 
            </div>

            <div className="message-tip">
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
                className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successMsg ? '' : 'hidden'}`}
                role="alert">
                <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">{this.state.successMsg}</p>
              </aside>
            </div>

            <div className="miaa_input required">
              <input
                id="capture_traditionalRegistration_email"
                data-capturefield="email"
                type="email"
                className="capture_email capture_required capture_text_input form-control"
                placeholder="Email Address *"
                name="email"
                onChange={(e) => {
                  const value = (e.target).value;
                  this.emailChange(value);
                }}
              />
            </div>
            
          </div> 
        </div>
        <div className="miaa-footer">
          <div className="miaa-inner-content">
            <div className="row">
              <div className="col">
                <button  type="submit" className="capture_btn btn btn-primary" onClick={()=>this.sendEmail()}>
                  <FormattedMessage id='submit'/> 
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-secondary" onClick={()=>this.backToLogin()}>
                  <FormattedMessage id='forgetPassword.back'/> 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}