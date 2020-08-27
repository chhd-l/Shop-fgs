import React, { Component } from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import logoAnimatedPng from "@/assets/images/logo--animated2.png";
import "./index.css"
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class RegisterRequired extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReadPrivacyPolicy: false,
            isShipTracking: false,
            isNewsLetter: false
        };
    }
    render() {
        return (
            <div className="required-wrap">
                <Link to="/" className="header__nav__brand logo-home pt-5">
                    <span className="rc-screen-reader-text"></span>
                    <img
                        alt="Royal Canin"
                        src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                        style={{ background: "url(" + logoAnimatedPng + ") no-repeat center center", width: '140px', height: '60px', backgroundSize: 'cover' }}
                    />
                </Link>
                <h2 className="rc-text-colour--brand1" style={{ marginTop: '190px', textAlign: 'center' }}>Register in ROYALCANIN® online store</h2>
                <p style={{ textAlign: 'center', color: '#5F5F5F', fontSize: '20px' }}>Complete registeration</p>
                {/* checkbox */}
                <div className="required-checkbox" style={{marginTop:'80px'}}>
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
                                });
                            }}
                            checked={this.state.isReadPrivacyPolicy}
                        />
                        <label
                            htmlFor="id-checkbox-cat-2"
                            className="rc-input__label--inline ui-cursor-pointer-pure"
                        >
                            I accept <a className="terms-link" href="https://www.mars.com/privacy-policy-germany">privacy policy</a> and <a className="terms-link" href="https://www.mars.com/privacy-policy-germany">terms of use.</a><span className="pl-2 rc-text-colour--brand1">*</span>
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
                                    isShipTracking: !this.state.isShipTracking,
                                });
                            }}
                            checked={this.state.isShipTracking}
                        />
                        <label
                            htmlFor="id-checkbox-cat-1"
                            className="rc-input__label--inline ui-cursor-pointer-pure"
                        >
                            I am over 18 years old.<span className="pl-2 rc-text-colour--brand1">*</span>
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
                                this.setState({
                                    isNewsLetter: !this.state.isNewsLetter,
                                });
                            }}
                            checked={this.state.isNewsLetter}
                        />
                        <label
                            htmlFor="id-checkbox-cat-3"
                            className="rc-input__label--inline ui-cursor-pointer-pure"
                        >
                            I agree to accept the marketing email.
                    </label>
                    </div>
                </div>
                {/* 注释 */}
                <p className='pizhu'><span className="pl-2 pr-2 rc-text-colour--brand1">*</span>Required fields</p>
                {/* 按钮 */}
                <div style={{textAlign:'center',marginTop:'60px'}}>
                    <button className="rc-btn rc-btn--lg rc-btn--one px-5">Continue</button>
                </div>             
            </div>
        );
    }
}

export default injectIntl(RegisterRequired);
