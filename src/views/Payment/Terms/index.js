// 条款组件
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadPrivacyPolicyInit: true,
      isShipTrackingInit: true,
      isNewsLetterInit: true,
      isReadPrivacyPolicy: false,
      isShipTracking: false,
      isNewsLetter: false
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
              this.setState(
                {
                  isReadPrivacyPolicy: !this.state.isReadPrivacyPolicy,
                  isReadPrivacyPolicyInit: false
                },
                () => {
                  this.props.sendIsReadPrivacyPolicy(
                    this.state.isReadPrivacyPolicy
                  );
                }
              );
            }}
            checked={this.state.isReadPrivacyPolicy}
          />
          <label
            htmlFor="id-checkbox-cat-2"
            className="rc-input__label--inline ui-cursor-pointer-pure"
            style={{ fontWeight: 'bold' }}
          >
            <FormattedMessage
              id="payment.terms1"
              values={{
                val1: (
                  <Link className="red" target="_blank" to="/privacypolicy">
                    AGB
                  </Link>
                ),
                val2: (
                  <a
                    className="red"
                    href="https://www.mars.com/privacy-policy-germany"
                  >
                    Datenschutzerklärung
                  </a>
                )
              }}
            />
            <div
              className={`${
                this.state.isReadPrivacyPolicy ||
                this.state.isReadPrivacyPolicyInit
                  ? 'hidden'
                  : ''
              }`}
              style={{
                color: '#666',
                fontSize: '12px',
                fontWeight: 'normal',
                display: 'none'
              }}
            >
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
              this.setState(
                {
                  isShipTracking: !this.state.isShipTracking,
                  isShipTrackingInit: false
                },
                () => {
                  this.props.sendIsShipTracking(this.state.isShipTracking);
                }
              );
            }}
            checked={this.state.isShipTracking}
          />
          <label
            htmlFor="id-checkbox-cat-1"
            className="rc-input__label--inline ui-cursor-pointer-pure"
            style={{ fontWeight: 'bold' }}
          >
            <FormattedMessage id="payment.terms2.header" />
            <div
              className={`${
                this.state.isShipTracking || this.state.isShipTrackingInit
                  ? 'hidden'
                  : ''
              }`}
              style={{ color: '#666', fontSize: '12px', fontWeight: 'normal' }}
            >
              <FormattedMessage
                id="payment.terms2"
                values={{
                  val1: (
                    <a
                      className="red"
                      style={{ textDecoration: 'underline' }}
                      href="info.de@royalcanin.com"
                    >
                      info.de@royalcanin.com
                    </a>
                  )
                }}
              />
            </div>
          </label>
        </div>
        <div className="footerCheckbox">
          <input
            className="form-check-input ui-cursor-pointer-pure"
            id="id-checkbox-cat-3"
            value="Cat"
            type="checkbox"
            name="checkbox-2"
            onChange={() => {
              this.setState(
                {
                  isNewsLetter: !this.state.isNewsLetter,
                  isNewsLetterInit: false
                },
                () => {
                  this.props.sendIsNewsLetter(this.state.isNewsLetter);
                }
              );
            }}
            checked={this.state.isNewsLetter}
          />
          <label
            htmlFor="id-checkbox-cat-3"
            className="rc-input__label--inline ui-cursor-pointer-pure"
            style={{ fontWeight: 'bold' }}
          >
            <FormattedMessage id="payment.terms3.header" />
            <div
              className={`${
                this.state.isNewsLetter || this.state.isNewsLetterInit
                  ? 'hidden'
                  : ''
              }`}
              style={{ color: '#666', fontSize: '12px', fontWeight: 'normal' }}
            >
              <FormattedMessage
                id="payment.terms3"
                values={{
                  val1: (
                    <a
                      className="red"
                      style={{ textDecoration: 'underline' }}
                      href="info.de@royalcanin.com"
                    >
                      info.de@royalcanin.com
                    </a>
                  ),
                  val2: (
                    <a
                      className="red"
                      href="https://www.mars.com/privacy-policy-germany"
                    >
                      Datenschutzerklärung
                    </a>
                  )
                }}
              />
            </div>
          </label>
        </div>
      </div>
    );
  }
}

export default injectIntl(Terms);
