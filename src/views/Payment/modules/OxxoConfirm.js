import React, { Component } from "react";
import oxxo from "@/assets/images/oxxo.png";
import { injectIntl, FormattedMessage } from "react-intl";

export default class OxxoConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goConfirmation () {
    this.props.history.push("/confirmation");
    sessionStorage.setItem("rc-payment-oxxo",true);
  }

  render() {
    return (
      <div>
        <div
          className="rc-border-all rc-border-colour--interface checkout--padding"
          style={{ marginBottom: "20px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={oxxo} alt="" style={{ display: "inline-block" }} />
          </div>
          <p>
            <h6><FormattedMessage id="payAtOxxO" /></h6>
          </p>
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
              <div className="col-md-7 col-sm-12">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    maxLength="254"
                    style={{ width: '100%' }}
                  />
                <div className="invalid-feedback">
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
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
