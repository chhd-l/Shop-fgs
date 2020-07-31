import React, { Component } from "react";
import oxxo from "@/assets/images/oxxo.png";
import { injectIntl, FormattedMessage } from "react-intl";
import { confirmAndCommit } from "@/api/payment";
import store from "storejs";

class OxxoConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showReqiredInfo: false,
      errorMsg: "",
    };
  }

  async goConfirmation () {
    try {
      this.props.startLoading();
      if (!this.state.email) {
        this.setState({ showReqiredInfo: true });
        this.showErrorMsg(
          this.props.intl.messages.pleasecompleteTheRequiredItem
        );
        return;
      }
      this.setState({ showReqiredInfo: false });
      if (
        !/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(
          this.state.email.replace(/\s*/g, "")
        )
      ) {
        this.showErrorMsg(this.props.intl.messages.pleaseEnterTheCorrectEmail);
        return;
      }
      var addressParameter = await this.props.getParameter();
      var parameters = Object.assign(addressParameter, {
        payChannelItem: "payuoxxo",
        email: this.state.email,
        country: "MEX",
      });
      let res = await confirmAndCommit(parameters);
      if (res.code === "K-000000") {
        var oxxoContent = res.context[0];
        var oxxoArgs = oxxoContent.args;
        var orderNumber = oxxoContent.tid;
        var subNumber = oxxoContent.subscribeId;
        sessionStorage.setItem("orderNumber", orderNumber);
        store.set("subNumber", subNumber);
        if (
          oxxoArgs &&
          oxxoArgs.additionalDetails &&
          oxxoArgs.additionalDetails.object &&
          oxxoArgs.additionalDetails.object.data[0]
        ) {
          var url = oxxoArgs.additionalDetails.object.data[0].href;
          sessionStorage.setItem("oxxoPayUrl", url);
          this.props.history.push("/confirmation");
        }
      }
    } catch (e) {
      this.showErrorMsg(e.message ? e.message.toString() : e.toString());
      this.props.endLoading();
    }
  }
  emailChange (e) {
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

  render () {
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
              <div className="col-md-3  col-sm-12">
                <label className="form-control-label">
                  <FormattedMessage id="payment.email" />
                </label>
              </div>
              <div className="col-md-8 col-sm-12" style={{ paddingLeft: '0px' }}>
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
            <FormattedMessage
              id="remember48Hours"
              values={{
                val: (
                  <span style={{ color: "#e2001a" }}>
                    {this.props.intl.messages.rememberHours}
                  </span>
                ),
              }}
            />
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
