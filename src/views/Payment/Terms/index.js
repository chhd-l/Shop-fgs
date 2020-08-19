// 条款组件
import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isReadPrivacyPolicyInit: true,
        isEighteenInit: true,
        isReadPrivacyPolicy: false,
        isEighteen: false,
    };
  }
  render() {
    return (
      <div>
        {/* 条款 */}
        <div className="footerCheckbox rc-margin-top--sm mt-3">
            <input
            className="form-check-input ui-cursor-pointer-pure"
            id="id-checkbox-cat-2"
            value=""
            type="checkbox"
            name="checkbox-2"
            onChange={() => {
                this.setState({
                isReadPrivacyPolicy: !this.state.isReadPrivacyPolicy,
                isReadPrivacyPolicyInit: false
                },()=>{
                    this.props.sendIsReadPrivacyPolicy(this.state.isReadPrivacyPolicy)
                });
            }}
            checked={this.state.isReadPrivacyPolicy}
            />
            <label
            htmlFor="id-checkbox-cat-2"
            className="rc-input__label--inline ui-cursor-pointer-pure"
            >
            <FormattedMessage
                id="payment.confirmInfo3"
                values={{
                val1: (
                    <Link
                    className="red"
                    target="_blank"
                    to="/privacypolicy"
                    >
                    Política de privacidad
                    </Link>
                ),
                val2: (
                    <Link
                    className="red"
                    target="_blank"
                    to="/termuse"
                    >
                    la transferencia transfronteriza
                    </Link>
                ),
                }}
            />
            <div className={`warning ${this.state.isReadPrivacyPolicy || this.state.isReadPrivacyPolicyInit ? 'hidden' : ''}`}>
                <FormattedMessage id="payment.confirmInfo4" />
            </div>
            </label>
        </div>
        <div className="footerCheckbox">
            <input
            className="form-check-input ui-cursor-pointer-pure"
            id="id-checkbox-cat-1"
            value="Cat"
            type="checkbox"
            name="checkbox-2"
            onChange={() => {
                this.setState({
                isEighteen: !this.state.isEighteen,
                isEighteenInit: false
                },()=>{
                    this.props.sendIsEighteen(this.state.isEighteen)
                });
            }}
            checked={this.state.isEighteen}
            />
            <label
            htmlFor="id-checkbox-cat-1"
            className="rc-input__label--inline ui-cursor-pointer-pure"
            >
            <FormattedMessage id="payment.confirmInfo1" />
            <div className={`warning ${this.state.isEighteen || this.state.isEighteenInit ? 'hidden' : ''}`}>
                <FormattedMessage id="login.secondCheck" />
            </div>
            </label>
        </div>
      </div>
    );
  }
}

export default injectIntl(Terms);
