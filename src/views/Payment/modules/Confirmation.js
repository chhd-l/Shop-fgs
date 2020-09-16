import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('paymentStore')
@observer
class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [
        {
          label: (
            <FormattedMessage
              id="payment.confirmInfo3"
              values={{
                val1: (
                  <Link className="red" target="_blank" to="/privacypolicy">
                    Política de privacidad
                  </Link>
                ),
                val2: (
                  <Link className="red" target="_blank" to="/termuse">
                    la transferencia transfronteriza
                  </Link>
                )
              }}
            />
          ),
          warningLabel: <FormattedMessage id="payment.confirmInfo4" />,
          isRead: false
        },
        {
          label: <FormattedMessage id="payment.confirmInfo1" />,
          warningLabel: <FormattedMessage id="login.secondCheck" />,
          isRead: false
        }
      ],
      isValid: false
    };
  }
  componentDidMount() {
    this.validData();
  }
  get panelStatus() {
    return this.props.paymentStore.panelStatus.confirmation;
  }
  handleChange = (item) => {
    item.isRead = !item.isRead;
    this.setState(
      {
        terms: this.state.terms
      },
      () => {
        this.validData();
      }
    );
  };
  validData = () => {
    this.setState({
      isValid: this.state.terms.filter((n) => !n.isRead).length === 0
    });
  };
  clickPay = () => {
    if (!this.state.isValid) {
      return false;
    }
    this.props.clickPay();
  };
  render() {
    return (
      <>
        <div class="card-panel checkout--padding rc-bg-colour--brand3 rounded">
          <div className="card-header bg-transparent pt-0 pb-0">
            <h5
              className={`pull-left mb-0 ${
                this.panelStatus.isEdit ? 'red' : ''
              }`}
            >
              <em className="iconfont font-weight-bold">&#xe68c;</em>{' '}
              <FormattedMessage id="confirmation" />
            </h5>
          </div>
          {!this.panelStatus.isPrepare && (
            <div className="pt-3">
              {/* 条款 */}
              {this.state.terms.map((item, i) => (
                <div className="footerCheckbox ml-custom mr-custom" key={i}>
                  <input
                    className="form-check-input ui-cursor-pointer-pure"
                    id={`id-checkbox-term-${i}`}
                    value=""
                    type="checkbox"
                    name="checkbox-2"
                    onChange={() => this.handleChange(item)}
                    checked={item.isRead}
                  />
                  <label
                    htmlFor={`id-checkbox-term-${i}`}
                    className="rc-input__label--inline ui-cursor-pointer-pure"
                  >
                    {item.label}
                    {item.warningLabel && (
                      <div className={`warning hidden`}>
                        {item.warningLabel}
                      </div>
                    )}
                  </label>
                </div>
              ))}
              <div className="next-step-button">
                <div className="rc-text--right">
                  <button
                    className={`rc-btn rc-btn--one submit-payment`}
                    type="submit"
                    name="submit"
                    value="submit-shipping"
                    disabled={!this.state.isValid}
                    onClick={this.clickPay}
                  >
                    <FormattedMessage id="payment.further" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Confirmation;
