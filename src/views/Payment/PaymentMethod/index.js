import React from 'react';

export default class paymentMethod extends React.Component {
  render() {
    // 未勾选same as billing时，校验billing addr
    const validForBilling = !billingChecked && !validSts.billingAddr;

    return (
      <>
        <div className="d-flex justify-content-end mt-3 rc_btn_payment_method">
          <button
            className={`rc-btn rc-btn--one ${loading ? 'ui-btn-loading' : ''}`}
            disabled={1 || validForBilling}
            onClick={this.clickConfirmPaymentPanel}
          >
            <FormattedMessage id="yes2" />
          </button>
        </div>
      </>
    );
  }
}
