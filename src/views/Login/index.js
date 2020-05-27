import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./index.css";
import Loading from "@/components/Loading";
import { login } from "@/api/login";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: "0",
      loginForm: {
        customerAccount: "",
        customerPassword: "",
      },
    };
  }
  loginFormChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { loginForm } = this.state;
    loginForm[name] = value;
    // this.inputBlur(e);
    this.setState({ loginForm: loginForm });
  }
  async loginClick() {
    const { history } = this.props;
    let res = await login(this.state.loginForm);
    console.log(this.state.loginForm, res, "haha");
    if (res.code === "K-000000") {
      sessionStorage.setItem("is-login", true);
      sessionStorage.setItem("rc-token", res.context.token);
      history.push('/account')
    }
  }
  render() {
    return (
      <div>
        <div id="embedded-container" class="miaa miaa-wrapper miaa-embedded">
          <div
            id="signIn"
            class="miaa-screen janrain-capture-ui capture-ui-content capture_screen_container"
            role="document"
            data-capturescreenname="signIn"
            data-captureventadded="true"
            style={{ display: "block" }}
          >
            <div class="miaa-content">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <font>
                    <font>×</font>
                  </font>
                </span>
              </button>
              <div class="miaa-header">
                <div class="miaa-inner-content">
                  <div class="miaa-brand-logo mb-5"></div>
                </div>
              </div>
              <div class="miaa-toggle-wrapper">
                <div class="miaa-inner-content">
                  <div class="row no-gutters">
                    <a
                      className={`col d-flex justify-content-center align-items-center miaa-toggle-signin ${
                        this.state.tabIndex == "0" ? "active" : ""
                      }`}
                      onClick={() => {
                        this.setState({ tabIndex: "0" });
                      }}
                    >
                      <div>
                        <span data-i18n="toggleSignInRegister_SignIn">
                          <font>
                            <font>Log in</font>
                          </font>
                        </span>
                      </div>
                    </a>
                    <a
                      className={`col d-flex justify-content-center align-items-center miaa-toggle-signin ${
                        this.state.tabIndex == "1" ? "active" : ""
                      }`}
                      onClick={() => {
                        this.setState({ tabIndex: "1" });
                      }}
                    >
                      <div>
                        <span data-i18n="toggleSignInRegister_Register">
                          <font>
                            <font>Create a personal account</font>
                          </font>
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
                class="capture_form capture_signInForm"
                // method="POST"
                novalidate="novalidate"
                data-transactionid="u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                target="captureIFrame_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                accept-charset="UTF-8"
                next='{"noop":""}'
              >
                <div id="capture_signIn_signInForm_defaultSavedProfileMessage"></div>
                <div id="capture_signIn_signInForm_errorMessages"></div>
                <input
                  id="capture_signIn_utf8"
                  data-capturefield="undefined"
                  value="✓"
                  type="hidden"
                  class="capture_utf8"
                  name="utf8"
                />
                <input
                  id="capture_signIn_screen_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="signIn"
                  type="hidden"
                  class="capture_screen_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="capture_screen"
                />
                <input
                  id="capture_signIn_js_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="d445bf4"
                  type="hidden"
                  class="capture_js_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="js_version"
                />
                <input
                  id="capture_signIn_transactionId_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  type="hidden"
                  class="capture_transactionId_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="capture_transactionId"
                />
                <input
                  id="capture_signIn_form_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="signInForm"
                  type="hidden"
                  class="capture_form_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="form"
                />
                <input
                  id="capture_signIn_flow_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="flagshipstore"
                  type="hidden"
                  class="capture_flow_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="flow"
                />
                <input
                  id="capture_signIn_client_id_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="2h77msethh4fzpsnj9b95yesh384mrwt"
                  type="hidden"
                  class="capture_client_id_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="client_id"
                />
                <input
                  id="capture_signIn_redirect_uri_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="https://as-royru4juaqporg.miaaguard.com/interaction/v1/bd6ad9ef-eb68-4ab2-8662-06802f078a6b"
                  type="hidden"
                  class="capture_redirect_uri_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="redirect_uri"
                />
                <input
                  id="capture_signIn_response_type_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="code"
                  type="hidden"
                  class="capture_response_type_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="response_type"
                />
                <input
                  id="capture_signIn_flow_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="20200120090524479014"
                  type="hidden"
                  class="capture_flow_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="flow_version"
                />
                <input
                  id="capture_signIn_settings_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  type="hidden"
                  class="capture_settings_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="settings_version"
                />
                <input
                  id="capture_signIn_locale_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="ru-RU"
                  type="hidden"
                  class="capture_locale_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="locale"
                />
                <input
                  id="capture_signIn_recaptcha_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  data-capturefield="undefined"
                  value="1"
                  type="hidden"
                  class="capture_recaptcha_version_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                  name="recaptchaVersion"
                />
                <div class="miaa-body">
                  <div
                    class="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex == "0" ? "block" : "none",
                    }}
                  >
                    <p class="text-center miaa-greeting-followup pt-3">
                      <span data-i18n="signIn_GreetingText">
                        <font>
                          <font>
                            To connect to the ROYAL CANIN® service,
                            authorization is required.{" "}
                          </font>
                          <font>
                            If you do not have a personal account, you can
                            register now.
                          </font>
                        </font>
                      </span>
                    </p>
                    <div class="mt-2">
                      <div class="capture_signin">
                        <div
                          id="capture_signIn_form_item_signInEmailAddress"
                          class="miaa_input required capture_form_item capture_email capture_form_item_signInEmailAddress no-gutters form-group row align-items-center"
                          data-capturefield="undefined"
                        >
                          <label for="capture_signIn_signInEmailAddress">
                            <font>
                              <font>Email address</font>
                            </font>
                          </label>
                          <input
                            id="capture_signIn_signInEmailAddress"
                            data-capturefield="signInEmailAddress"
                            type="email"
                            class="capture_signInEmailAddress capture_required capture_text_input form-control"
                            placeholder="Email Address *"
                            name="customerAccount"
                            value={this.state.loginForm.customerAccount}
                            onChange={(e) => this.loginFormChange(e)}
                          />
                          <div
                            class="capture_tip_validating"
                            data-elementname="signInEmailAddress"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="signInEmailAddress"
                          ></div>
                        </div>{" "}
                        <div
                          id="capture_signIn_form_item_currentPassword"
                          class="miaa_input required capture_form_item capture_password capture_form_item_currentPassword no-gutters form-group row align-items-center"
                          data-capturefield="undefined"
                        >
                          <label for="capture_signIn_currentPassword">
                            <font>
                              <font>Password</font>
                            </font>
                          </label>
                          <div class="input-append input-group">
                            <input
                              id="capture_signIn_currentPassword"
                              data-capturefield="currentPassword"
                              type="password"
                              class="capture_currentPassword capture_required capture_text_input form-control"
                              placeholder="Password *"
                              name="customerPassword"
                              value={this.state.loginForm.customerPassword}
                              onChange={(e) => this.loginFormChange(e)}
                            />
                            <span
                              tabindex="100"
                              title="Show / hide password"
                              class="add-on input-group-addon"
                              style={{ cursor: "pointer" }}
                            >
                              <i class="icon-eye-open fa fa-eye"></i>
                            </span>
                          </div>
                          <div
                            class="capture_tip_validating"
                            data-elementname="currentPassword"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="currentPassword"
                          ></div>
                        </div>
                      </div>
                      <div class="text-center">
                        <a
                          href="#"
                          onclick="miaa.showScreen('forgotPassword')"
                          class="text-muted small-medium"
                        >
                          <span data-i18n="signIn_ForgotPassword">
                            <font>
                              <font>Forgot your password?</font>
                            </font>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    class="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex == "1" ? "block" : "none",
                    }}
                  >
                    <div class="row">
                      <div class="col">
                        <div
                          id="capture_traditionalRegistration_form_item_emailAddress"
                          class="miaa_input required capture_form_item capture_email capture_form_item_emailAddress form-group row align-items-center no-gutters"
                          data-capturefield="undefined"
                        >
                          <label for="capture_traditionalRegistration_emailAddress">
                            <font>
                              <font>Email address</font>
                            </font>
                          </label>
                          <input
                            id="capture_traditionalRegistration_emailAddress"
                            data-capturefield="emailAddress"
                            type="email"
                            class="capture_emailAddress capture_required capture_text_input form-control"
                            placeholder="Email Address *"
                            name="emailAddress"
                          />
                          <div
                            class="capture_tip_validating"
                            data-elementname="emailAddress"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="emailAddress"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_newPassword"
                          class="miaa_input required capture_form_item capture_password capture_form_item_newPassword form-group row align-items-center no-gutters"
                          data-capturefield="undefined"
                        >
                          <label for="capture_traditionalRegistration_newPassword">
                            <font>
                              <font>Password</font>
                            </font>
                          </label>
                          <div class="input-append input-group">
                            <input
                              id="capture_traditionalRegistration_newPassword"
                              autocomplete="off"
                              data-capturefield="newPassword"
                              type="password"
                              class="capture_newPassword capture_required capture_text_input form-control"
                              placeholder="Password *"
                              name="newPassword"
                            />
                            <span
                              tabindex="100"
                              title="Show / hide password"
                              class="add-on input-group-addon"
                              style={{ cursor: "pointer" }}
                            >
                              <i class="icon-eye-open fa fa-eye"></i>
                            </span>
                          </div>
                          <div
                            class="capture_tip_validating"
                            data-elementname="newPassword"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="newPassword"
                          ></div>
                        </div>
                        <div class="password-validation-rules">
                          <div class="password-validation-rule min-length">
                            <i
                              class="fa fa-check-circle-o"
                              aria-hidden="true"
                            ></i>
                            <span
                              class="rule-text"
                              data-i18n="newPasswordComplexity_MinLength"
                            >
                              <font>
                                <font>
                                  Password must contain at least 8 characters.
                                </font>
                              </font>
                            </span>
                          </div>
                          <div class="password-validation-rule min-number">
                            <i
                              class="fa fa-check-circle-o"
                              aria-hidden="true"
                            ></i>
                            <span
                              class="rule-text"
                              data-i18n="newPasswordComplexity_MinNumbers"
                            >
                              <font>
                                <font>Password must include 1 digit.</font>
                              </font>
                            </span>
                          </div>
                          <div class="password-validation-rule min-letter">
                            <i
                              class="fa fa-check-circle-o"
                              aria-hidden="true"
                            ></i>
                            <span
                              class="rule-text"
                              data-i18n="newPasswordComplexity_MinLetters"
                            >
                              <font>
                                <font>Password must include 1 letter.</font>
                              </font>
                            </span>
                          </div>
                          <div class="password-validation-rule min-special">
                            <i
                              class="fa fa-check-circle-o"
                              aria-hidden="true"
                            ></i>
                            <span
                              class="rule-text"
                              data-i18n="newPasswordComplexity_MinSpecial"
                            >
                              <font>
                                <font>
                                  Password must include 1 special character.
                                </font>
                              </font>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-3">
                        <div
                          id="capture_traditionalRegistration_form_collection_salutation"
                          class="miaa_radio required capture_form_collection capture_elementCollection capture_form_collection_salutation form-group row align-items-center no-gutters"
                          data-capturefield="undefined"
                        >
                          <div
                            class="capture_tip_validating"
                            data-elementname="salutation"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="salutation"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_firstName"
                          class="miaa_input required capture_form_item capture_text capture_form_item_firstName form-group row align-items-center no-gutters"
                          data-capturefield="undefined"
                        >
                          <input
                            id="capture_traditionalRegistration_firstName"
                            data-capturefield="firstName"
                            type="text"
                            class="capture_firstName capture_required capture_text_input form-control"
                            placeholder="Name *"
                            name="firstName"
                          />
                          <div
                            class="capture_tip_validating"
                            data-elementname="firstName"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="firstName"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_lastName"
                          class="miaa_input required capture_form_item capture_text capture_form_item_lastName form-group row align-items-center no-gutters"
                          data-capturefield="undefined"
                        >
                          <label for="capture_traditionalRegistration_lastName">
                            <font>
                              <font>Surname</font>
                            </font>
                          </label>
                          <input
                            id="capture_traditionalRegistration_lastName"
                            data-capturefield="lastName"
                            type="text"
                            class="capture_lastName capture_required capture_text_input form-control"
                            placeholder="Surname *"
                            name="lastName"
                          />
                          <div
                            class="capture_tip_validating"
                            data-elementname="lastName"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="lastName"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_firstName"
                          class="miaa_input required capture_form_item capture_text capture_form_item_firstName form-group row align-items-center no-gutters"
                          data-capturefield="undefined"
                        >
                          <input
                            id="capture_traditionalRegistration_firstName"
                            data-capturefield="firstName"
                            type="text"
                            class="capture_firstName capture_required capture_text_input form-control"
                            placeholder="Phone *"
                            name="firstName"
                          />
                          <div
                            class="capture_tip_validating"
                            data-elementname="firstName"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="firstName"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_primaryAddressCountry"
                          class="miaa_input required capture_form_item capture_text capture_form_item_primaryAddressCountry form-group row align-items-center no-gutters"
                          data-capturefield="undefined"
                        >
                          <label for="capture_traditionalRegistration_primaryAddressCountry-selectized">
                            Country
                          </label>
                          <div class="selectize-control capture_primaryAddressCountry capture_required capture_text_input form-control single">
                            <div class="selectize-input items not-full has-options">
                              <input
                                type="text"
                                autocomplete="off"
                                tabindex=""
                                disabled
                                id="capture_traditionalRegistration_primaryAddressCountry-selectized"
                                placeholder="Country *"
                                style={{ width: "100%" }}
                              />
                            </div>
                          </div>
                          <div
                            class="capture_tip_validating"
                            data-elementname="primaryAddressCountry"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="primaryAddressCountry"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_privacyAndTermsStatus"
                          class="miaa_check form-check required capture_form_item capture_form_item_privacyAndTermsStatus form-group"
                          data-capturefield="undefined"
                        >
                          <div
                            id="capture_traditionalRegistration_form_item_inner_privacyAndTermsStatus"
                            class="capture_checkbox capture_form_item_inner_privacyAndTermsStatus form-check"
                            data-capturefield="undefined"
                          >
                            <label
                              for="capture_traditionalRegistration_privacyAndTermsStatus"
                              class="form-check-label"
                            >
                              <input
                                id="capture_traditionalRegistration_privacyAndTermsStatus"
                                data-capturefield="privacyAndTermsStatus"
                                value="true"
                                type="checkbox"
                                class="capture_privacyAndTermsStatus capture_required capture_input_checkbox form-check-input"
                                name="privacyAndTermsStatus"
                                placeholder="undefined *"
                              />
                              <font>
                                <font>I have read the </font>
                              </font>
                              <a
                                href="https://www.shop.royal-canin.ru/ru/general-terms-conditions.html/"
                                target="_blank"
                              >
                                <font>
                                  <font>User Agreement</font>
                                </font>
                              </a>
                              <font>
                                <font> and the </font>
                              </font>
                              <a
                                href="https://www.mars.com/global/policies/privacy/pp-russian/"
                                target="_blank"
                              >
                                <font>
                                  <font>Privacy Policy</font>
                                </font>
                              </a>
                              <font>
                                <font>
                                  {" "}
                                  and give my consent to the processing of
                                  personal data, including cross-border transfer
                                </font>
                              </font>
                            </label>
                          </div>
                          <div
                            class="capture_tip_validating"
                            data-elementname="privacyAndTermsStatus"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="privacyAndTermsStatus"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_ageIndicator"
                          class="miaa_check form-check required capture_form_item capture_form_item_ageIndicator form-group"
                          data-capturefield="undefined"
                        >
                          <div
                            id="capture_traditionalRegistration_form_item_inner_ageIndicator"
                            class="capture_checkbox capture_form_item_inner_ageIndicator form-check"
                            data-capturefield="undefined"
                          >
                            <label
                              for="capture_traditionalRegistration_ageIndicator"
                              class="form-check-label"
                            >
                              <input
                                id="capture_traditionalRegistration_ageIndicator"
                                data-capturefield="ageIndicator"
                                value="true"
                                type="checkbox"
                                class="capture_ageIndicator capture_required capture_input_checkbox form-check-input"
                                name="ageIndicator"
                                placeholder="undefined *"
                              />
                              <font>
                                <font>I confirm that I am 18 years old</font>
                              </font>
                            </label>
                          </div>
                          <div
                            class="capture_tip_validating"
                            data-elementname="ageIndicator"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="ageIndicator"
                          ></div>
                        </div>
                        <div
                          id="capture_traditionalRegistration_form_item_optEmail"
                          class="miaa_check form-check capture_form_item capture_form_item_optEmail form-group"
                          data-capturefield="undefined"
                        >
                          <div
                            id="capture_traditionalRegistration_form_item_inner_optEmail"
                            class="capture_checkbox capture_form_item_inner_optEmail form-check"
                            data-capturefield="undefined"
                          >
                            <label
                              for="capture_traditionalRegistration_optEmail"
                              class="form-check-label"
                            >
                              <input
                                id="capture_traditionalRegistration_optEmail"
                                data-capturefield="optEmail"
                                value="true"
                                type="checkbox"
                                class="capture_optEmail capture_input_checkbox form-check-input"
                                name="optEmail"
                              />
                              <font>
                                <font>
                                  I agree to receive the marketing newsletter
                                </font>
                              </font>
                            </label>
                          </div>
                          <div
                            class="capture_tip_validating"
                            data-elementname="optEmail"
                          >
                            <font>
                              <font>Check</font>
                            </font>
                          </div>
                          <div
                            class="capture_tip_error"
                            data-elementname="optEmail"
                          ></div>
                        </div>
                        <div class="hidden">
                          <div
                            id="capture_traditionalRegistration_form_item_qualificationsCode"
                            class="miaa_select required capture_form_item capture_form_item_qualificationsCode form-group row align-items-center no-gutters"
                            data-capturefield="undefined"
                          >
                            <label for="capture_traditionalRegistration_qualificationsCode">
                              <font>
                                <font>Occupation</font>
                              </font>
                            </label>
                            <select
                              id="capture_traditionalRegistration_qualificationsCode"
                              class="capture_qualificationsCode capture_select form-control"
                              data-capturefield="qualificationsCode"
                              name="qualificationsCode"
                              placeholder="undefined *"
                            >
                              <option value="PET_OWNER" selected="selected">
                                Animal owner
                              </option>
                              <option disabled="true">Occupation</option>
                              <option value="BREEDER">Breeder</option>
                              <option value="VETERINARIAN" disabled="true">
                                Veterinarian
                              </option>
                              <option value="PET_SHOP_STAFF" disabled="true">
                                Pet shop staff
                              </option>
                              <option value="PET_HOTEL_STAFF" disabled="true">
                                Hotel staff for animals
                              </option>
                              <option value="EMPLOYEE" disabled="true">
                                Employee
                              </option>
                              <option value="OTHER" disabled="true">
                                Other
                              </option>
                            </select>
                            <div
                              class="capture_tip_validating"
                              data-elementname="qualificationsCode"
                            >
                              <font>
                                <font>Check</font>
                              </font>
                            </div>
                            <div
                              class="capture_tip_error"
                              data-elementname="qualificationsCode"
                            ></div>
                          </div>
                        </div>
                        <div class="mt-2">
                          <span data-i18n="traditionalRegistration_RequiredFields">
                            <font>
                              <font>* Required fields</font>
                            </font>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="miaa-footer">
                  <div
                    class="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex == "1" ? "block" : "none",
                    }}
                  >
                    <div class="row">
                      <div class="col">
                        <button
                          id="traditionalRegistrationSubmit"
                          type="submit"
                          class="btn btn-primary capture_btn"
                        >
                          <span data-i18n="traditionalRegistration_CreateAccount">
                            Save
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex == "0" ? "block" : "none",
                    }}
                  >
                    <div class="text-center">
                      <button
                        // id="signInSubmit"
                        class="btn btn-primary"
                        // type="submit"
                        // disabled="disabled"
                        onClick={() => this.loginClick()}
                      >
                        Log in
                      </button>
                    </div>
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
