import React, { Component } from "react";
import oxxo from "@/assets/images/oxxo.png";
import { injectIntl, FormattedMessage } from "react-intl";

class OxxoConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showReqiredInfo: false,
      errorMsg: "",
    };
  }

  goConfirmation() {
    if (!this.state.email) {
      this.setState({ showReqiredInfo: true });
      this.showErrorMsg(this.props.intl.messages.pleasecompleteTheRequiredItem);
      return;
    }
    if (
      !/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(
        this.state.email.replace(/\s*/g, "")
      )
    ) {
      this.showErrorMsg(this.props.intl.messages.pleaseEnterTheCorrectEmail);
      return;
    }
    this.props.history.push("/confirmation");
    sessionStorage.setItem("rc-payment-oxxo", true);
  }
  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message,
    });
    // this.scrollToPaymentComp();
    setTimeout(() => {
      this.setState({
        errorMsg: "",
      });
    }, 3000);
  };

  render() {
    return (
      <div>
        <div
          className="rc-border-all rc-border-colour--interface checkout--padding"
          style={{ marginBottom: "20px" }}
        >
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
              this.state.errorMsg ? "" : "hidden"
            }`}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
              role="alert"
            >
              <span>{this.state.errorMsg}</span>
              <button
                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ errorMsg: "" });
                }}
                aria-label="Close"
              >
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={oxxo} alt="" style={{ display: "inline-block" }} />
          </div>
          <h6>
            <p>
              <FormattedMessage id="payAtOxxO" />
            </p>
          </h6>
          <p>
            <FormattedMessage id="inputYourEmailReceivePayment" />
          </p>
          <div className="form-group required">
            <div className="row">
              <div className="col-md-1  col-sm-12">
                <label className="form-control-label">
                  <FormattedMessage id="payment.email" />
                </label>
              </div>
              <div className="col-md-8 col-sm-12">
                <input
                  type="email"
                  id="email"
                  name="email"
                  maxLength="254"
                  value={this.state.email}
                  onChange={(e) => this.emailChange(e)}
                  style={{ width: "100%" }}
                />
                {this.state.showReqiredInfo ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    <FormattedMessage id="payment.errorInfo2" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <p>
            <FormattedMessage id="remember48Hours" />
          </p>
        </div>
        <div className="place_order-btn card">
          <div className="next-step-button">
            <div className="rc-text--right">
              <button
                className="rc-btn rc-btn--one submit-payment"
                type="submit"
                name="submit"
                value="submit-shipping"
                onClick={() => this.goConfirmation()}
              >
                <FormattedMessage id="payment.further" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(OxxoConfirm);
