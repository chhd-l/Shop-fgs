import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import Terms from "../Terms/index"

class Sofort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadPrivacyPolicy:false,
      isEighteen:false
    };
  }
   //是否勾选私人政策
   isTestPolicy(){
    if(!this.state.isReadPrivacyPolicy){
      throw new Error(this.props.intl.messages.policyFalse)
    }
  }
    
  //是否勾选满足18岁 
  isOverEighteen(){
    if(!this.state.isEighteen){
      throw new Error(this.props.intl.messages.eightTeenFalse)
    }
  }

  clickPay=()=>{
    try{
      this.isTestPolicy()
      this.isOverEighteen()
      this.props.clickPay(this.state.text)
    }catch(err){
      this.props.showErrorMsg(err.message)
    }
     
  }
  sendIsReadPrivacyPolicy=(e)=>{
    this.setState({
      isReadPrivacyPolicy:e
    })
  }
  sendIsEighteen=(e)=>{
    this.setState({
      isEighteen:e
    })
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
        <Terms sendIsReadPrivacyPolicy={this.sendIsReadPrivacyPolicy} sendIsEighteen={this.sendIsEighteen}/>
      </div>
    );
  }
}

export default injectIntl(Sofort);
