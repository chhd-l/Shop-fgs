import React, { Component } from 'react';
import oxxo from '@/assets/images/oxxo.png';
import { injectIntl, FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
class OxxoConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }
  emailChange = (e) => {
    this.setState({ email: e.target.value }, () => {
      this.props.updateEmail(this.state.email);
    });
  };
  render() {
    const { billingJSX } = this.props;
    return (
      <>
        <div className="rounded mb-3">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <LazyLoad>
              <img src={oxxo} style={{ display: 'inline-block' }} alt="" />
            </LazyLoad>
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
              <div className="col-md-4 col-sm-12">
                <label className="form-control-label mt-0 mb-0">
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
                  onChange={this.emailChange}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
          <p>
            <FormattedMessage
              id="remember48Hours"
              values={{
                val: <span style={{ color: '#e2001a' }}>7:00</span>
              }}
            />
          </p>
        </div>
        {billingJSX}
      </>
    );
  }
}

export default injectIntl(OxxoConfirm);
