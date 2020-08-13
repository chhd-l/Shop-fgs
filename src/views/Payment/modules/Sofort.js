import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class Sofort extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }
  clickPay=()=>{
    this.props.clickPay()
  }
  render() {
    return (
      <div className="checkout--padding">
        <div class="customer-form">
            <div class="address">
                <div class="payment-container">
                    <div id="klarna" class="payment">
                        <button  className="adyen-checkout__button adyen-checkout__button--standalone adyen-checkout__button--pay" type="button" onClick={this.clickPay}>
                            <span className="adyen-checkout__button__content">
                                <span className="adyen-checkout__button__text">Sofort.</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
  }
}

export default injectIntl(Sofort);
