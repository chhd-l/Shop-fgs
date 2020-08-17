import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class KlarnaPayLater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    };
  }
  clickPay=()=>{
    var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if(pattern.test(this.state.text)){
      this.props.clickPay(this.state.text)
    }else{
      this.props.showErrorMsg(this.props.intl.messages.emailFormatFalse)
    }
       
  }
  handleChange=(e)=>{
    this.setState({
        text : e.target.value 
    });
  }
  render() {
    return (
      <div className="checkout--padding">
        <div class="customer-form">
            <div class="address">
                <form class="address-form" action="/destination" method="get">
                    <div class="address-line" id="addressLine2">
                        <div class="address-input full-width" id="street" style={{marginBottom:'18px'}}>
                        <label class="address-label" for="street">Email</label>
                        <input type="text" class="form-control" placeholder="Email" name="street" onChange={this.handleChange}/>
                        </div>
                    </div>
                </form>
                <div class="payment-container" style={{"max-width":'auto'}}>
                    <div id="klarna" class="payment">
                        <button className="adyen-checkout__button adyen-checkout__button--standalone adyen-checkout__button--pay" type="button" onClick={this.clickPay}>
                            <span className="adyen-checkout__button__content">
                                <span className="adyen-checkout__button__text">Continue to Pay later with Klarna.</span>
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

export default injectIntl(KlarnaPayLater);
