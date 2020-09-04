import React, { Component } from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import logoAnimatedPng from "@/assets/images/logo--animated2.png";
import "./index.css"
import { findUserConsentList, consentListDetail } from "@/api/consent"
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class RegisterRequired extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }
    async componentDidMount() {
        try {
            const result = await findUserConsentList({})
            const optioalList = result.context.optioalList.map(item => {
                return {
                    id: item.id,
                    consentTitle: item.consentTitle,
                    isChecked: false,
                    isRequired: true
                }
            })

            const requiredList = result.context.requiredList.map(item => {
                return {
                    id: item.id,
                    consentTitle: item.consentTitle,
                    isChecked: false,
                    isRequired: false
                }
            })

            //把非必填和必填的项目组装成一个数组list，用于渲染
            let list = this.state.list
            list = [...optioalList, ...requiredList]
            this.setState({
                list
            })

            const result2 = await consentListDetail(
                {
                    "consentKey": 18,
                    "contentTitle": "privacy policy"
                }
            )
            console.log(sessionStorage.getItem('okta-redirectUrl'))
        } catch (err) {
            console.log(err.message)
        }
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
                <div className="required-checkbox" style={{ marginTop: '80px' }}>
                    {
                        this.state.list.map((item,index) => {
                            return (
                                <div className="footerCheckbox" key={index}>
                                    <input
                                        className="form-check-input ui-cursor-pointer-pure"
                                        id="id-checkbox-cat-2"
                                        value=""
                                        type="checkbox"
                                        name="checkbox-2"
                                        onChange={() => {
                                            //替换属性start
                                            let itemObj = Object.assign(item,{
                                                isChecked:!item.isChecked
                                            })
                                            let list = [...this.state.list]
                                            list.splice(index,1,itemObj) 
                                            this.setState({
                                                list
                                            });
                                            //替换属性end
                                        }}
                                        checked={item.isChecked}
                                    />
                                    {/* <label
                                        htmlFor="id-checkbox-cat-2"
                                        className="rc-input__label--inline ui-cursor-pointer-pure"
                                    >
                                        I accept <a className="terms-link" href="https://www.mars.com/privacy-policy-germany">privacy policy</a> and <a className="terms-link" href="https://www.mars.com/privacy-policy-germany">terms of use.</a>{item.isRequired?<span className="pl-2 rc-text-colour--brand1">*</span>:null}
                                    </label> */}
                                    
                                    {item.consentTitle}
                                </div>
                            )
                        })
                    }

                </div>
                {/* 注释 */}
                <p className='pizhu'><span className="pl-2 pr-2 rc-text-colour--brand1">*</span>Required fields</p>
                {/* 按钮 */}
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <button className="rc-btn rc-btn--lg rc-btn--one px-5">Continue</button>
                </div>
            </div>
        );
    }
}

export default injectIntl(RegisterRequired);
