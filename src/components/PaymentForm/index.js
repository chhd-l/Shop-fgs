import React from 'react'
import { FormattedMessage } from 'react-intl'
import Selection from '@/components/Selection';
class PaymentForm extends React.Component {
  static defaultProps = {
    form:{
      cardNumber: '',
      month: null,
      year: null,
      cardholderName: '',
      codeSecure: '',
      isChecked: false
    },
    monthList: [],
    yearList: []
  };

  render () {
    const { form } = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group required">
              <label className="form-control-label">
                <FormattedMessage id="payment.cardNumber" />
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
              >
                        <input
                          type="cardNumber"
                          className="rc-input__control email"
                          id="cardNumber"
                          value={form.cardNumber}
                          onChange={this.props.handleInputChange}
                          onBlur={this.props.inputBlur}
                          name="cardNumber"
                          maxLength="254"
                          placeholder="Card Number"
                        />
                        <label className="rc-input__label" htmlFor="cardNumber" />
                      </span>
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group required">
              <label className="form-control-label" htmlFor="month">
                <FormattedMessage id="payment.EXPMonth" />
              </label>
              <span
                className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
                data-loc="countrySelect"
              >
                    <Selection
                      key={form.month}
                      selectedItemChange={(data) =>
                        this.props.handleSelectedItemChange('month', data)
                      }
                      optionList={this.props.monthList}
                      selectedItemData={{
                        value: form.month
                      }}
                    />
                  </span>
              <div className="invalid-feedback" style={{ display: 'none' }}>
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group required">
              <label
                className="form-control-label"
                htmlFor="year"
              >
                <FormattedMessage id="payment.EXPYear" />
              </label>
              <span
                className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
                data-loc="countrySelect"
              >
                    <Selection
                      key={form.year}
                      selectedItemChange={(data) =>
                        this.props.handleSelectedItemChange('year', data)
                      }
                      optionList={this.props.yearList}
                      selectedItemData={{
                        value: form.year
                      }}
                    />
                  </span>
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group required">
              <label className="form-control-label">
                {/*<FormattedMessage id="payment.cardNumber" />*/}
                Cardholder Name (as it appears on your credit card)
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
              >
                        <input
                          type="cardholderName"
                          className="rc-input__control email"
                          id="cardNumber"
                          value={form.cardholderName}
                          onChange={this.props.handleInputChange}
                          onBlur={this.props.inputBlur}
                          name="cardholderName"
                          maxLength="254"
                        />
                        <label className="rc-input__label" htmlFor="cardholderName" />
                      </span>
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group required">
              <label className="form-control-label" htmlFor="month">
                <FormattedMessage id="payment.codeSecure" />
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
              >
                        <input
                          type="codeSecure"
                          className="rc-input__control email"
                          id="codeSecure"
                          value={form.codeSecure}
                          onChange={this.props.handleInputChange}
                          onBlur={this.props.inputBlur}
                          name="codeSecure"
                          maxLength="254"
                        />
                        <label className="rc-input__label" htmlFor="codeSecure" />
                      </span>
              <div className="invalid-feedback" style={{ display: 'none' }}>
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="rc-input rc-input--inline"
                 onClick={this.props.handelCheckboxChange}>

              {form.isChecked ? (
                <input
                  type="checkbox"
                  className="rc-input__checkbox"
                  value={form.isChecked}
                  key="1"
                  checked
                />
              ) : (
                <input
                  type="checkbox"
                  className="rc-input__checkbox"
                  value={form.isChecked}
                  key="2"
                />
              )}
              <label className="rc-input__label--inline text-break">
                <FormattedMessage id="payment.saveFor" />
              </label>
              <div className="red-text"><FormattedMessage id="payment.theBox" /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PaymentForm
