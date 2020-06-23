import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./index.css";
import Loading from "@/components/Loading";
import { login,getQuestions,register } from "@/api/login";
import { getCustomerInfo } from "@/api/user"
import { getDictionary } from '@/utils/utils'
// import cat from "@/assets/images/login/login_cat.png"
// import dog from "@/assets/images/login/login_dog.png"
import bg1 from "@/assets/images/login-bg1.png";
import bg2 from "@/assets/images/login-bg2.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: "0",
      loginForm: {
        customerAccount: "",
        customerPassword: "",
      },
      loginPasswordType: "password",
      registerPwdType: "password",
      registerConfirmPwdType: "password",

      registerForm: {
        firstName: "",
        lastName: "",
        country: 6,
        email: "",
        password: "",
        confirmPassword: "",
        securityQuestion: "",
        answer: "",
        firstChecked: false,
        // secondChecked: false,
        // thirdChecked: false,
      },
      countryList: [{
        id: 6,
        name: 'Mexico'
      }],
      errorMsg: '',
      successMsg: '',
      questionList:[],
      type: 'login'
    };
  }
  componentWillUnmount() {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount() {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }
    getDictionary({ type: "country" })
      .then((res) => {
        this.setState({
          countryList: res,
        });
      })
    getQuestions().then(res=>{
      if(res.code==='K-000000'){

        this.setState({
          questionList:res.context
        })
      }
      else{
        this.showErrorMsg(res.message || 'get data failed')
      }
    }).catch(err=>{
      this.showErrorMsg(err.toString() || 'get data failed')
    })
  }
  // getQuestions=()=>{
    
  // }
  // loginFormChange (e) {
  //     .catch((err) => {
  //       this.showErrorMsg(err.toString() || "get data failed");
  //     });
  // }
  loginFormChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { loginForm } = this.state;
    loginForm[name] = value;
    // this.inputBlur(e);
    this.setState({ loginForm: loginForm });
  }

  registerFormChange = ({ field, value }) => {
    const { registerForm } = this.state;
    registerForm[field] = value;
    this.setState({
      registerForm: registerForm,
    });
  };
  async loginClick() {
    const { history } = this.props;
    let res = await login(this.state.loginForm);
    console.log(this.state.loginForm, res, "haha");
    localStorage.setItem("rc-token", res.context.token);
    let userinfo = res.context.customerDetail;
    userinfo.customerAccount = res.context.accountName;

    let customerInfoRes = await getCustomerInfo();
    const context = customerInfoRes.context;
    userinfo.defaultClinics = customerInfoRes.context.defaultClinics;
    localStorage.setItem("rc-userinfo", JSON.stringify(userinfo));

    history.push(
      (this.props.location.state && this.props.location.state.redirectUrl) ||
        "/account"
    );
  }
  register = () => {
    const { registerForm } = this.state;
    const objKeys = Object.keys(registerForm);
    let requiredVerify = true;
    for (let i = 0; i < objKeys.length; i++) {
      if (!registerForm[objKeys[i]]) {
        requiredVerify = false;
      }
    }
    if (!requiredVerify) {
      this.showErrorMsg("You have mandatory fields not filled out!");
      return false;
    }
    if (
      !(
        this.nameVerify(registerForm.firstName) &&
        this.nameVerify(registerForm.lastName)
      )
    ) {
      this.showErrorMsg("First Name or Last Name cannot exceed 50 characters!");
      return false;
    }
    if (!this.emailVerify(registerForm.email)) {
      this.showErrorMsg("Your email has not been verified!");
      return false;
    }
    if (!this.passwordVerify(registerForm.password)) {
      this.showErrorMsg("Your password has not been verified!");
      return false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      this.showErrorMsg("The two passwords you typed do not match.!");
      return false;
    }

    let params = {
      "answer": registerForm.answer,
      "confirmPassword": registerForm.confirmPassword,
      "country": registerForm.country,
      "customerPassword": registerForm.password,
      "email": registerForm.email,
      "firstName": registerForm.firstName,
      "lastName": registerForm.lastName,
      "questionId": registerForm.securityQuestion,
    }

    console.log(params);

    register(params).then(res=>{
      console.log(res)
    }).catch(err=>{
      this.showErrorMsg(err.toString() || 'Register failed')
    })



  }

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message,
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: "",
      });
    }, 3000);
  };

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message,
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: "",
      });
    }, 2000);
  };

  emailVerify = (email) => {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(email);
  };
  passwordVerify = (password) => {
    //匹配至少包含一个数字、一个字母 8-20 位的密码
    let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\D]{8,20}$/;
    return reg.test(password)
  }
  nameVerify = (name) => {
    if (name.length > 50) return false;
    else return true;
  };

  render() {
    const { registerForm } = this.state;
    return (
      <div>
        <div
          id="embedded-container"
          className="miaa miaa-wrapper miaa-embedded"
        >
          <div
            id="signIn"
            className="miaa-screen janrain-capture-ui capture-ui-content capture_screen_container"
            role="document"
            data-capturescreenname="signIn"
            data-captureventadded="true"
            style={{ display: "block" }}
          >
            <div className="miaa-content">
              {/* <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  ×
                </span>
              </button> */}
              {/* <div className="miaa-header">
                <div className="miaa-inner-content">
                  <div className="miaa-brand-logo mb-5"></div>
                </div>
              </div> */}
              <div
                style={{
                  width: "120px",
                  height: "45px",
                  margin: "60px auto 40px",
                }}
              >
                <object
                  id="main-logo"
                  class="rc-logo-svg rc-logo--primary"
                  data="https://d1a19ys8w1wkc1.cloudfront.net/logo--primary.svg?v=8-9-5"
                  type="image/svg+xml"
                >
                  <img
                    src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-9-5"
                    width="150"
                    height="100"
                    alt="Royal Canin logo"
                    style={{
                      backgroundImage:
                        "url(https://d1a19ys8w1wkc1.cloudfront.net/logo--primary.png?v=8-9-5)",
                    }}
                  />
                </object>
              </div>
              <div class="rc-layout-container rc-two-column" style={{display: this.state.type === 'login'?'block': 'none'}}>
                <div class="rc-column">
                  <h1 class="rc-espilon">
                    <img
                      src={bg1}
                      style={{ display: "inline", width: "30%" }}
                    />
                    <img
                      src={bg2}
                      style={{ display: "inline", width: "70%" }}
                    />
                  </h1>
                </div>

                <div class="rc-column">
                  <h1 class="rc-espilon">
                    <h3><span style={{color: '#666'}}>Welcome to</span> Royal Canin</h3>
                    <div style={{ width: '70%' }}>
                    <div style={{ marginTop: "40px" }}>
                      <div className="miaa_input required ">
                        <input
                          type="email"
                          className="capture_signInEmailAddress capture_required capture_text_input form-control"
                          placeholder="Email Address *"
                          name="customerAccount"
                          value={this.state.loginForm.customerAccount}
                          onChange={(e) => this.loginFormChange(e)}
                        />
                      </div>
                      {/* <span
                        class="rc-input rc-input--inline rc-input--label"
                        style={{ width: "100%" }}
                      >
                        <input
                          class="rc-input__control"
                          id="email"
                          type="text"
                          name="text"
                        />
                        <label class="rc-input__label" for="email">
                          <span class="rc-input__label-text">
                            Email Address
                          </span>
                        </label>
                      </span> */}
                    </div>
                    <div style={{ marginTop: "40px" }}>
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
                            tabIndex="100"
                            title="Show / hide password"
                            className="add-on input-group-addon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let type =
                                this.state.loginPasswordType === "password"
                                  ? "text"
                                  : "password";
                              this.setState({
                                loginPasswordType: type,
                              });
                            }}
                          >
                            <i className="icon-eye-open fa fa-eye"></i>
                          </span>
                        </div>
                      </div>
                      {/* <span
                        class="rc-input rc-input--inline rc-input--label"
                        style={{ width: "100%" }}
                      >
                        <input
                          class="rc-input__control"
                          id="password"
                          type="text"
                          name="text"
                        />
                        <label class="rc-input__label" for="password">
                          <span class="rc-input__label-text">Password</span>
                        </label>
                      </span> */}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "60px",
                        marginTop: "10px",
                      }}
                    >
                      <div
                        class="rc-input rc-input--inline"
                        style={{ float: "left" }}
                      >
                        <input
                          class="rc-input__checkbox"
                          id="id-checkbox-cat"
                          value="Cat"
                          type="checkbox"
                          name="checkbox-1"
                        />
                        <label
                          class="rc-input__label--inline"
                          for="id-checkbox-cat"
                          style={{ color: "#666", fontSize: "14px" }}
                        >
                          Remember Me
                        </label>
                      </div>

                      <p style={{ float: "right" }}>
                        <a
                          class="rc-styled-link"
                          href="#/"
                          style={{ color: "#666", fontSize: "14px" }}
                        >
                          Forget password?
                        </a>
                      </p>
                    </div>
                    <div
                      class="rc-layout-container rc-two-column"
                      style={{ width: "100%" }}
                    >
                      <div class="rc-column" style={{ textAlign: "center" }}>
                        <button
                          class="rc-btn rc-btn--one"
                          style={{ width: "100%" }}
                          onClick={() => {
                            this.setState({type: 'register'})
                          }}
                        >
                          Create an account
                        </button>
                      </div>
                      <div class="rc-column" style={{ textAlign: "center" }}>
                        <button
                          class="rc-btn rc-btn--two"
                          style={{ width: "100%" }}
                          onClick={() => this.loginClick()}
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                    <a
                      class="rc-styled-link"
                      href="#/"
                      style={{ color: "#666", fontSize: "14px" }}
                      onClick={() => {
                        window.location.href = this.props.location.state &&
                        this.props.location.state.redirectUrl === '/cart' ?
                        "/prescription" : "/"
                      }
                        
                      }
                    >
                      Continue with a guest>
                    </a>
                    </div>
                  </h1>
                </div>
              </div>
              <div style={{display: this.state.type === 'register'?'block': 'none'}} className="register">
              <h3 style={{textAlign: 'center', color: '#e2001a'}}><span style={{color: '#666'}}>Welcome to</span> Royal Canin</h3>
              <div style={{ width: "50%", margin: "0 auto" }}>
                <div class="rc-layout-container rc-two-column">
                  <div class="rc-column">
                    <div className="miaa_input required">
                      <input
                        id="capture_traditionalRegistration_firstName"
                        data-capturefield="firstName"
                        type="text"
                        className="capture_firstName capture_required capture_text_input form-control"
                        placeholder="First Name *"
                        name="firstName"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.registerFormChange({
                            field: "firstName",
                            value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="rc-column">
                    <div className="miaa_input required">
                      <input
                        id="capture_traditionalRegistration_lastName"
                        data-capturefield="lastName"
                        type="text"
                        className="capture_lastName capture_required capture_text_input form-control"
                        placeholder="Last Name *"
                        name="lastName"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.registerFormChange({
                            field: "lastName",
                            value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="rc-layout-container rc-two-column">
                  <div class="rc-column">
                    <div className="miaa_input required">
                      <input
                        id="capture_traditionalRegistration_email"
                        data-capturefield="email"
                        type="email"
                        className="capture_email capture_required capture_text_input form-control"
                        placeholder="Email Address *"
                        name="email"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.registerFormChange({
                            field: "email",
                            value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="rc-column">
                    <div className="miaa_input required country_select">
                      <select
                        data-js-select=""
                        id="country"
                        value={registerForm.country}
                        placeholder="Country *"
                        name="country"
                        onChange={(e) => {
                          const value = e.target.value;
                          // value = value === '' ? null : value;
                          this.registerFormChange({
                            field: "country",
                            value,
                          });
                        }}
                      >
                        {this.state.countryList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="rc-layout-container rc-two-column">
                  <div class="rc-column">
                    <div className="input-append input-group miaa_input required">
                      <input
                        autoComplete="off"
                        data-capturefield="password"
                        type={this.state.registerPwdType}
                        className="capture_password capture_required capture_text_input form-control"
                        placeholder="Password *"
                        name="password"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.registerFormChange({
                            field: "password",
                            value,
                          });
                        }}
                      />
                      <span
                        tabIndex="100"
                        title="Show / hide password"
                        className="add-on input-group-addon"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let type =
                            this.state.registerPwdType === "password"
                              ? "text"
                              : "password";
                          this.setState({
                            registerPwdType: type,
                          });
                        }}
                      >
                        <i className="icon-eye-open fa fa-eye"></i>
                      </span>
                    </div>
                    <p style={{ marginTop: "-20px" }}>
                      {" "}
                      <FormattedMessage id="login.passwordTip" />{" "}
                    </p>
                  </div>
                  <div class="rc-column">
                    <div className="input-append input-group miaa_input required">
                      <input
                        autoComplete="off"
                        data-capturefield="confirmPassword"
                        type={this.state.registerConfirmPwdType}
                        className="capture_password capture_required capture_text_input form-control"
                        placeholder="Confirm Password *"
                        name="confirmPassword"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.registerFormChange({
                            field: "confirmPassword",
                            value,
                          });
                        }}
                      />
                      <span
                        tabIndex="100"
                        title="Show / hide password"
                        className="add-on input-group-addon"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let type =
                            this.state.registerConfirmPwdType === "password"
                              ? "text"
                              : "password";
                          this.setState({
                            registerConfirmPwdType: type,
                          });
                        }}
                      >
                        <i className="icon-eye-open fa fa-eye"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="rc-layout-container rc-two-column">
                  <div class="rc-column">
                    <div className="miaa_input required country_select">
                      <select
                        data-js-select=""
                        id="securityQuestion"
                        value={registerForm.securityQuestion}
                        name="securityQuestion"
                        onChange={(e) => {
                          const value = e.target.value;
                          // value = value === '' ? null : value;
                          this.registerFormChange({
                            field: "securityQuestion",
                            value,
                          });
                        }}
                      >
                        <option value="" disabled>
                          Security Question *
                        </option>
                        {this.state.countryList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="rc-column">
                    <div className="miaa_input required">
                      <input
                        id="capture_traditionalRegistration_firstName"
                        data-capturefield="answer"
                        type="text"
                        className="capture_firstName capture_required capture_text_input form-control"
                        placeholder="Answer *"
                        name="answer"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.registerFormChange({
                            field: "answer",
                            value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                {/* <div class="rc-input rc-input--inline">
                  <input
                    class="rc-input__checkbox"
                    id="id-checkbox-cat"
                    value="Cat"
                    type="checkbox"
                    name="checkbox-1"
                  />
                  <label
                    class="rc-input__label--inline"
                    for="id-checkbox-cat"
                    style={{ color: "#666", fontSize: "14px" }}
                  >
                    Remember Me
                  </label>
                </div> */}
                <label
                          htmlFor="capture_traditionalRegistration_privacyAndTermsStatus"
                          className="form-check-label"
                        >
                          <input
                            id="capture_traditionalRegistration_privacyAndTermsStatus"
                            data-capturefield="privacyAndTermsStatus"
                            value={registerForm.firstChecked}
                            type="checkbox"
                            className="capture_privacyAndTermsStatus capture_required capture_input_checkbox form-check-input"
                            name="firstChecked"
                            onChange={(e) => {
                              let value = (e.target).value === 'false' ? true : false;
                              this.registerFormChange({
                                field: 'firstChecked',
                                value
                              });
                            }}
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
                              and give my consent to the processing of
                              personal data, including cross-border transfer
                        </label>
              </div>
              <p style={{ textAlign: "center" }}>
                <button class="rc-btn rc-btn--two" onClick={() => this.register()}>Create an account</button>
                or
                <a class="rc-styled-link" onClick={(e) => {
                            e.preventDefault()
                            this.setState({type: 'login'})
                          }}>
                  Log in
                </a>
              </p>
              </div>
              {/* <div className="miaa-toggle-wrapper">
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
                        <FormattedMessage id="login" />
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
                        <FormattedMessage id="login.register" />
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
                      <FormattedMessage id="login.loginTip" />
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

                        </div>
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
                              tabIndex="100"
                              title="Show / hide password"
                              className="add-on input-group-addon"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                let type = this.state.loginPasswordType === 'password' ? 'text' : 'password'
                                this.setState({
                                  loginPasswordType: type
                                })
                              }}
                            >
                              <i className="icon-eye-open fa fa-eye"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link to="/forgetPassword" className="text-muted small-medium">
                          <FormattedMessage id="login.forgetPassword" />  
                        </Link>

                        <div className="text-center">
                          <button
                            className="btn btn-primary"
                            onClick={() => this.loginClick()}
                          >
                            <FormattedMessage id="login" />
                          </button>
                        </div>


                        <Link to={(this.props.location.state &&
                          this.props.location.state.redirectUrl === '/cart') ?
                          "/prescription" : "/"}
                          className="click-hover"
                          style={{ textDecoration: 'underline', color: '#4b5257' }}>

                          <FormattedMessage id="login.guestContinue" />

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
                            id="capture_traditionalRegistration_firstName"
                            data-capturefield="firstName"
                            type="text"
                            className="capture_firstName capture_required capture_text_input form-control"
                            placeholder="First Name *"
                            name="firstName"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'firstName',
                                value
                              });
                            }}
                          />
                        </div>
                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_lastName"
                            data-capturefield="lastName"
                            type="text"
                            className="capture_lastName capture_required capture_text_input form-control"
                            placeholder="Last Name *"
                            name="lastName"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'lastName',
                                value
                              });
                            }}
                          />
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
                              this.registerFormChange({
                                field: 'email',
                                value
                              });
                            }}
                          />
                        </div>



                        <div className="miaa_input required country_select">
                          <select
                            data-js-select=""
                            id="country"
                            value={registerForm.country}
                            placeholder="Country *"
                            name="country"
                            onChange={(e) => {
                              const value = (e.target).value;
                              // value = value === '' ? null : value;
                              this.registerFormChange({
                                field: 'country',
                                value
                              });
                            }}
                          >
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
                            data-capturefield="password"
                            type={this.state.registerPwdType}
                            className="capture_password capture_required capture_text_input form-control"
                            placeholder="Password *"
                            name="password"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'password',
                                value
                              });
                            }}
                          />
                          <span
                            tabIndex="100"
                            title="Show / hide password"
                            className="add-on input-group-addon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let type = this.state.registerPwdType === 'password' ? 'text' : 'password'
                              this.setState({
                                registerPwdType: type
                              })
                            }}
                          >
                            <i className="icon-eye-open fa fa-eye"></i>
                          </span>

                        </div>
                        <p style={{ marginTop: '-20px' }}>  <FormattedMessage id="login.passwordTip" /> </p>

                        <div className="input-append input-group miaa_input required">
                          <input
                            autoComplete="off"
                            data-capturefield="confirmPassword"
                            type={this.state.registerConfirmPwdType}
                            className="capture_password capture_required capture_text_input form-control"
                            placeholder="Confirm Password *"
                            name="confirmPassword"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'confirmPassword',
                                value
                              });
                            }}
                          />
                          <span
                            tabIndex="100"
                            title="Show / hide password"
                            className="add-on input-group-addon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let type = this.state.registerConfirmPwdType === 'password' ? 'text' : 'password'
                              this.setState({
                                registerConfirmPwdType: type
                              })
                            }}
                          >
                            <i className="icon-eye-open fa fa-eye"></i>
                          </span>
                        </div>

                        <div className="miaa_input required country_select">
                          <select
                            data-js-select=""
                            id="securityQuestion"
                            value={registerForm.securityQuestion}
                            name="securityQuestion"
                            onChange={(e) => {
                              const value = (e.target).value;
                              // value = value === '' ? null : value;
                              this.registerFormChange({
                                field: 'securityQuestion',
                                value
                              });
                            }}
                          >

                            <option value="" disabled>Security Question *</option>
                            {
                              this.state.questionList.map(item => (
                                <option value={item.id} key={item.id}>{item.question}</option>
                              ))
                            }
                          </select>
                        </div>

                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_firstName"
                            data-capturefield="answer"
                            type="text"
                            className="capture_firstName capture_required capture_text_input form-control"
                            placeholder="Answer *"
                            name="answer"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'answer',
                                value
                              });
                            }}
                          />
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
                            value={registerForm.firstChecked}
                            type="checkbox"
                            className="capture_privacyAndTermsStatus capture_required capture_input_checkbox form-check-input"
                            name="firstChecked"
                            onChange={(e) => {
                              let value = (e.target).value === 'false' ? true : false;
                              this.registerFormChange({
                                field: 'firstChecked',
                                value
                              });
                            }}
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
                            value={registerForm.secondChecked}
                            type="checkbox"
                            className="capture_ageIndicator capture_required capture_input_checkbox form-check-input"
                            name="secondChecked"
                            onChange={(e) => {
                              let value = (e.target).value === 'false' ? true : false;
                              this.registerFormChange({
                                field: 'secondChecked',
                                value
                              });
                            }}
                          />
                          <FormattedMessage id="login.secondCheck" />

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
                            value={registerForm.thirdChecked}
                            type="checkbox"
                            className="capture_optEmail capture_input_checkbox form-check-input"
                            name="thirdChecked"
                            onChange={(e) => {
                              let value = (e.target).value === 'false' ? true : false;
                              this.registerFormChange({
                                field: 'thirdChecked',
                                value
                              });
                            }}
                          />
                          <FormattedMessage id="login.thirdCheck" />

                        </label>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <FormattedMessage id="requiredFields" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary capture_btn"
                      disabled={!(registerForm.firstChecked && registerForm.secondChecked && registerForm.thirdChecked)}
                      onClick={() => this.register()}
                    >
                      <FormattedMessage id="save" />

                    </button>

                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
