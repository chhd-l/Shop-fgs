// 条款组件
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import "./index.css"
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacy:{
        isCheck:false,
        isShowDetail:false
      },
      shipTracking:{
        isCheck:false,
        isShowDetail:false
      },
      newsLetter:{
        isCheck:false,
        isShowDetail:false
      }
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
              let data = Object.assign({}, this.state.privacy, {
                isCheck: !this.state.privacy.isCheck
              })
              this.setState(
                {
                  privacy: data,
                },
                () => {
                  this.props.sendIsReadPrivacyPolicy(
                    this.state.privacy.isCheck
                  );
                }
              );
            }}
            checked={this.state.privacy.isCheck}
          />
          <label
            htmlFor="id-checkbox-cat-2"
            className="rc-input__label--inline ui-cursor-pointer-pure"
            style={{ fontWeight: 'bold' }}
          >
            <span className="rc-text-colour--brand1 pr-1">*</span>
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
                !this.state.isReadPrivacyPolicy
                  ? 'hidden'
                  : 'terms-detail'
              }`}
              style={{
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
               //更改isCheck属性
              let data = Object.assign({}, this.state.shipTracking, {
                isCheck: !this.state.shipTracking.isCheck
              })
              this.setState(
                {
                  shipTracking: data,
                },
                () => {
                  this.props.sendIsShipTracking(this.state.shipTracking.isCheck);
                }
              );
            }}
            checked={this.state.shipTracking.isCheck}
          />
          <label
            htmlFor="id-checkbox-cat-1"
            className="rc-input__label--inline ui-cursor-pointer-pure"
            style={{ fontWeight: 'bold' }}
          >
            <span className="rc-text-colour--brand1 pr-1">*</span>
            <FormattedMessage id="payment.terms2.header" /> <span onClick={()=>{
              //更改isShowDetail属性
               let data = Object.assign({}, this.state.shipTracking, {
                isShowDetail: !this.state.shipTracking.isShowDetail
              })
              this.setState(
                {
                  shipTracking: data,
                }
              );
            }}>{this.state.shipTracking.isShowDetail?<FormattedMessage id="lessDetail" />:<FormattedMessage id="detail" />}</span>
            <div
              className={`${
                !this.state.shipTracking.isShowDetail
                  ? 'hidden'
                  : 'terms-detail'
              }`}
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
              //更改isCheck属性
              let data = Object.assign({}, this.state.newsLetter, {
                isCheck: !this.state.newsLetter.isCheck
              })
              this.setState(
                {
                  newsLetter: data,
                },
                () => {
                  this.props.sendIsNewsLetter(this.state.newsLetter.isCheck);
                }
              );
            }}
            checked={this.state.newsLetter.isCheck}
          />
          <label
            className="rc-input__label--inline ui-cursor-pointer-pure"
            style={{ fontWeight: 'bold' }}
          >
            <FormattedMessage id="payment.terms3.header" /> <span onClick={()=>{
               //更改isShowDetail属性
               let data = Object.assign({}, this.state.newsLetter, {
                isShowDetail: !this.state.newsLetter.isShowDetail
              })
              this.setState(
                {
                  newsLetter: data,
                }
              );
            }}>{this.state.newsLetter.isShowDetail?<FormattedMessage id="lessDetail" />:<FormattedMessage id="detail" />}</span>
            <div
              className={`${
                !this.state.newsLetter.isShowDetail
                  ? 'hidden'
                  : 'terms-detail'
              }`}
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
