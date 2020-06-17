import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./index.css";
import Loading from "@/components/Loading";
import { login } from "@/api/login";
import { getCustomerInfo } from "@/api/user"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: "0",
      loginForm: {
        customerAccount: "",
        customerPassword: "",
      },
      loginPasswordType:'password',
      registerPwdType:'password',
      registerConfirmPwdType:'password',

      registerForm:{
        firstName:'',
        lastName:'',
        country:'',
        email:'',
        password:'',
        confirmPassword:''
      },
      countryList:[{
        id:1,
        name:'Mexico'
      }]
    };
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  loginFormChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { loginForm } = this.state;
    loginForm[name] = value;
    // this.inputBlur(e);
    this.setState({ loginForm: loginForm });
  }
  registerFormChange (e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    const { registerForm } = this.state;
    registerForm[name] = value;
    this.setState({ registerForm: registerForm });
  }
  async loginClick () {
    const { history } = this.props;
    let res = await login(this.state.loginForm);
    console.log(this.state.loginForm, res, "haha");
    if (res.code === "K-000000") {
      sessionStorage.setItem("is-login", true);
      sessionStorage.setItem("rc-token", res.context.token);
      let userinfo = res.context.customerDetail
      userinfo.customerAccount = res.context.accountName
      sessionStorage.setItem("rc-userinfo", JSON.stringify(userinfo));
      try {
        let customerInfoRes = await getCustomerInfo()
        const context = customerInfoRes.context
        sessionStorage.setItem('rc-clinics-id', (context.defaultClinics && context.defaultClinics.clinicsId) || '')
        sessionStorage.setItem('rc-clinics-name', (context.defaultClinics && context.defaultClinics.clinicsName) || '')
      } catch (err) {
        console.log(err)
      } finally {
        history.push((this.props.location.state && this.props.location.state.redirectUrl) || '/account')
      }
    }
  }
  render () {
    return (
      <div>
        <div id="embedded-container" className="miaa miaa-wrapper miaa-embedded">
          <div
            id="signIn"
            className="miaa-screen janrain-capture-ui capture-ui-content capture_screen_container"
            role="document"
            data-capturescreenname="signIn"
            data-captureventadded="true"
            style={{ display: "block" }}
          >
            <div className="miaa-content">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                    ×
                </span>
              </button>
              <div className="miaa-header">
                <div className="miaa-inner-content">
                  <div className="miaa-brand-logo mb-5"></div>
                </div>
              </div>
              <div className="miaa-toggle-wrapper">
                <div className="miaa-inner-content">
                  <div className="row no-gutters">
                    <a
                      className={`col d-flex justify-content-center align-items-center miaa-toggle-signin ${
                        this.state.tabIndex === "0" ? "active" : ""
                        }`}
                      onClick={() => {
                        this.setState({ tabIndex: "0" });
                      }}
                    >
                      <div>
                        <span data-i18n="toggleSignInRegister_SignIn">
                            Log in
                        </span>
                      </div>
                    </a>
                    <a
                      className={`col d-flex justify-content-center align-items-center miaa-toggle-signin ${
                        this.state.tabIndex === "1" ? "active" : ""
                        }`}
                      onClick={() => {
                        this.setState({ tabIndex: "1" });
                      }}
                    >
                      <div>
                        <span data-i18n="toggleSignInRegister_Register">
                            Create a personal account
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                id="capture_signIn_signInForm"
                name="signInForm"
                data-capturefield="signInForm"
                // action="https://royalcanin.eu.janraincapture.com/widget/traditional_signin.jsonp"
                className="capture_form capture_signInForm"
                // method="POST"
                noValidate="novalidate"
                data-transactionid="u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                target="captureIFrame_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                acceptCharset="UTF-8"
                next='{"noop":""}'
              >
                
                <div className="miaa-body">
                  <div
                    className="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex === "0" ? "block" : "none",
                    }}
                  >
                    <p className="text-center miaa-greeting-followup pt-3">
                      <span data-i18n="signIn_GreetingText">
                        
                          
                            To connect to the ROYAL CANIN® service,
                            authorization is required.{" "}
                          
                          
                            If you do not have a personal account, you can
                            register now.
                          
                        
                      </span>
                    </p>
                    <div className="mt-2">
                      <div className="capture_signin">
                        <div
                          className="miaa_input required "
                        >
                          <input
                            type="email"
                            className="capture_signInEmailAddress capture_required capture_text_input form-control"
                            placeholder="Email Address *"
                            name="customerAccount"
                            value={this.state.loginForm.customerAccount}
                            onChange={(e) => this.loginFormChange(e)}
                          />
            
                        </div>{" "}
                        <div className="miaa_input required ">
                          <div className="input-append input-group">
                            <input
                              id="capture_signIn_currentPassword"
                              data-capturefield="currentPassword"
                              type={this.state.loginPasswordType}
                              className="capture_currentPassword capture_required capture_text_input form-control"
                              placeholder="Password *"
                              name="customerPassword"
                              value={this.state.loginForm.customerPassword}
                              onChange={(e) => this.loginFormChange(e)}
                            />
                            <span
                              tabindex="100"
                              title="Show / hide password"
                              className="add-on input-group-addon"
                              style={{ cursor: "pointer" }}
                              onClick={()=>{
                                let type = this.state.loginPasswordType==='password'?'text':'password'
                                this.setState({
                                  loginPasswordType:type
                                })
                              }}
                            >
                              <i className="icon-eye-open fa fa-eye"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <a
                          href="#"
                          className="text-muted small-medium"
                        >
                          <span data-i18n="signIn_ForgotPassword">
                            
                              Forgot your password?
                            
                          </span>
                        </a>

                        <div className="text-center">
                          <button
                            className="btn btn-primary"
                            onClick={() => this.loginClick()}
                          >
                            Log in
                          </button>
                        </div>

                        
                          <Link to={(this.props.location.state&&
                            this.props.location.state.redirectUrl==='/cart')? 
                            "/prescription":"/"} 
                            className="click-hover" 
                            style={{textDecoration:'underline',color: '#4b5257' }}>
                            Continue with a guest
                          </Link>

                      </div>
                    </div>
                  </div>
                  <div
                    className="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex === "1" ? "block" : "none",
                    }}
                  >
                    <div className="row">
                      <div className="col">
                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_firstName"
                            data-capturefield="firstName"
                            type="text"
                            className="capture_firstName capture_required capture_text_input form-control"
                            placeholder="First Name *"
                            name="firstName"
                          />
                        </div>
                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_lastName"
                            data-capturefield="lastName"
                            type="text"
                            className="capture_firstName capture_required capture_text_input form-control"
                            placeholder="Last Name *"
                            name="lastName"
                          />
                        </div>
                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_emailAddress"
                            data-capturefield="emailAddress"
                            type="email"
                            className="capture_emailAddress capture_required capture_text_input form-control"
                            placeholder="Email Address *"
                            name="emailAddress"
                          />
                        </div>
                        

                        <div className="miaa_input required country_select">
                          <select
                            data-js-select=""
                            id="country"
                            // value={addressForm.country}
                            placeholder="Country *"
                            // onChange={(e) => this.handleInputChange(e)}
                            // onBlur={(e) => this.inputBlur(e)}
                            name="country"
                          >
                            <option value=""></option>
                            {
                              this.state.countryList.map(item => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="input-append input-group miaa_input required">
                          <input
                            autoComplete="off"
                            data-capturefield="newPassword"
                            type="password"
                            className="capture_newPassword capture_required capture_text_input form-control"
                            placeholder="Password *"
                            name="newPassword"
                          />
                          <span
                            tabIndex="100"
                            title="Show / hide password"
                            className="add-on input-group-addon"
                            style={{ cursor: "pointer" }}
                          >
                            <i className="icon-eye-open fa fa-eye"></i>
                          </span>
                          
                        </div>
                        <p style={{marginTop: '-20px'}}>8-20 characters and include at least 1 number and 1 letter</p>

                        <div className="input-append input-group miaa_input required">
                          <input
                            autoComplete="off"
                            data-capturefield="confirmPassword"
                            type="password"
                            className="capture_newPassword capture_required capture_text_input form-control"
                            placeholder="Confirm Password *"
                            name="confirmPassword"
                          />
                          <span
                            tabindex="100"
                            title="Show / hide password"
                            className="add-on input-group-addon"
                            style={{ cursor: "pointer" }}
                          >
                            <i className="icon-eye-open fa fa-eye"></i>
                          </span>
                        </div>


                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <label
                          htmlFor="capture_traditionalRegistration_privacyAndTermsStatus"
                          className="form-check-label"
                        >
                          <input
                            id="capture_traditionalRegistration_privacyAndTermsStatus"
                            data-capturefield="privacyAndTermsStatus"
                            value="true"
                            type="checkbox"
                            className="capture_privacyAndTermsStatus capture_required capture_input_checkbox form-check-input"
                            name="privacyAndTermsStatus"
                            placeholder="undefined *"
                          />
                            I have read the 
                          <a
                            href="https://www.shop.royal-canin.ru/ru/general-terms-conditions.html/"
                            target="_blank" rel='noreferrer'
                          >
                            <font> User Agreement </font>
                          </a>
                              and the 
                          <a
                            href="https://www.mars.com/global/policies/privacy/pp-russian/"
                            target="_blank" rel='noreferrer'
                          >
                              <font> Privacy Policy </font>
                          </a>
                              {" "}
                              and give my consent to the processing of
                              personal data, including cross-border transfer
                        </label>
                      </div>
                      <div className="col-lg-12">
                        <label
                          htmlFor="capture_traditionalRegistration_ageIndicator"
                          className="form-check-label"
                        >
                          <input
                            id="capture_traditionalRegistration_ageIndicator"
                            data-capturefield="ageIndicator"
                            value="true"
                            type="checkbox"
                            className="capture_ageIndicator capture_required capture_input_checkbox form-check-input"
                            name="ageIndicator"
                            placeholder="undefined *"
                          />
                          
                          <font> I confirm that I am 18 years old </font>
                          
                        </label>
                      </div>
                      <div className="col-lg-12">
                        <label
                          htmlFor="capture_traditionalRegistration_optEmail"
                          className="form-check-label"
                        >
                          <input
                            id="capture_traditionalRegistration_optEmail"
                            data-capturefield="optEmail"
                            value="true"
                            type="checkbox"
                            className="capture_optEmail capture_input_checkbox form-check-input"
                            name="optEmail"
                          />
                              <font> I agree to receive the marketing newsletter </font>
                        </label>
                      </div>
                      <div>
                        <span data-i18n="traditionalRegistration_RequiredFields">
                          * Required fields
                        </span>
                      </div>
                    </div>
                       
                  </div>
                </div>
              </div>
            </div>
            <div className="miaa-footer">
              <div
                className="miaa-inner-content"
                style={{
                  display: this.state.tabIndex === "1" ? "block" : "none",
                }}
              >
                <div className="row">
                  <div className="col">
                    <button
                      id="traditionalRegistrationSubmit"
                      type="submit"
                      className="btn btn-primary capture_btn"
                    >
                      <span data-i18n="traditionalRegistration_CreateAccount">
                        Save
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
          );
  }
}

export default Login;
