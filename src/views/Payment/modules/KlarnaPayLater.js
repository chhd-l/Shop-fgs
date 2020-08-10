import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class KlarnaPayLater extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <div className="checkout--padding">
        KlarnaPayLater2
      </div>
    );
  }
}

export default injectIntl(KlarnaPayLater);
