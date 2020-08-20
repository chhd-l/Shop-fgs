import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import "./index.less"

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <div>
        <h1>ROYAL CANIN® Bestellbestätigung</h1>
        <div>Sehr geehrter Herr X,/Sehr geehrte Frau X,</div>
        <div>Vielen Dank für Ihre Bestellung bei ROYAL CANIN®. Diese ist bei uns eingegangen und wurde bestätigt. </div>
        <div>Bestellzusammenfassung:</div>
        <div>
            <dl>
                <dt>Lieferadresse</dt>
                <dd>Luyu Mandy</dd>
                <dd>qingbo Garden</dd>
                <dd></dd>
            </dl>
            <dl>
                <dt></dt>
                <dd></dd>
                <dd></dd>
                <dd></dd>
            </dl>
        </div>
      </div>
    );
  }
}

export default injectIntl(Email);
