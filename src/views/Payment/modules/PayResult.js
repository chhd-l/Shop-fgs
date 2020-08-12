import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { adyenPaymentsDetails } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class AdyenPayResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  render() {
    return (
      <div className="checkout--padding">
  
      </div>
    );
  }
  async componentWillMount(){
    let redirectResult = this.props.location.search.split('=')[1]
    try{
        const res = await adyenPaymentsDetails({
            redirectResult,
            businessId: sessionStorage.getItem("orderNumber"),
            //businessId: 'O202008110927290237',
        })
        if(res.context.status=='SUCCEED'){
            this.props.history.push("/confirmation");
        }
    }catch(err){
        console.log(err)
    }
  }
}

export default injectIntl(AdyenPayResult);
