import React, { Component } from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { inject, observer } from 'mobx-react';
import logoAnimatedPng from "@/assets/images/logo--animated2.png";
import "./index.css"
import { findUserConsentList, userBindConsent, getStoreOpenConsentList } from "@/api/consent"
import Consent from "@/components/Consent"
import { withOktaAuth } from '@okta/okta-react';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;


@inject('loginStore')
class RegisterRequired extends Component {
    get isLogin() {
        return this.props.loginStore.isLogin;
    }
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isShowRequired: false,
            isLoading: true,
            innerHtml: '',
            width: '',
            zoom: '',
            fontZoom: '',
        };
    }
    //属性变为true，time定时后变为false
    showAlert(attr, time) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.setState({
            [attr]: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    [attr]: false
                })
            }, time)
        })
    }
    bindSubmitParam = (list) => {
        let obj = { optionalList: [], requiredList: [] }
        list.filter(item => !item.isRequired).forEach((item => {
            obj.optionalList.push({ id: item.id, selectedFlag: item.isChecked })
        }))
        list.filter(item => item.isRequired).forEach((item => {
            obj.requiredList.push({ id: item.id, selectedFlag: true })
        }))

        return obj
    }
    //会员提交
    submitLogin = async () => {
        let oktaToken = 'Bearer '+ this.props.authState.accessToken
        try {
            let lastPath = this.props.location.state.path
            if (lastPath === 'pay') {
                lastPath = '/payment/payment'
            }
            const isRequiredChecked = this.state.list.filter(item => item.isRequired).every(item => item.isChecked)
            if (isRequiredChecked) {
                //组装submit参数
                let submitParam = this.bindSubmitParam(this.state.list)

                const result = await userBindConsent({...submitParam,...{oktaToken}})
                console.log(result)
                debugger
                if (result.code === 'K-000000') {
                    this.props.history.push(lastPath)
                }
            } else {
                this.showAlert('isShowRequired', 2000)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    //游客提交
    submitUnLogin = () => {
        try {
            const isRequiredChecked = this.state.list.filter(item => item.isRequired).every(item => item.isChecked)
            if (isRequiredChecked) {
                sessionItemRoyal.set('isRequiredChecked', true)
                this.props.history.push('/')
            } else {
                this.showAlert('isShowRequired', 2000)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    //从子组件传回
    sendList = (list)=>{
        this.setState({list})
    }
    async componentDidMount() {

        //定义变量获取屏幕视口宽度
        var windowWidth = document.body.clientWidth
        if(windowWidth < 640){
            this.setState({
                width: 300,
                zoom: '120%',
                fontZoom: '100%'
            })
        }
        if(windowWidth >= 640){
            this.setState({
                width: 500,
                zoom: '150%',
                fontZoom: '120%'
            })
        }
        document.getElementById('wrap').addEventListener('click', (e) => {
            if (e.target.localName === 'span') {
                let keyWords = e.target.innerText
                let index = Number(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id)
                let arr = this.state.list[index].detailList.filter(item => {
                    return item.contentTitle == keyWords
                })

                let tempArr = [...this.state.list]
                tempArr[index].innerHtml = tempArr[index].innerHtml ? '' : arr[0] ? arr[0].contentBody : ''

                this.setState({ list: tempArr })
            }
        })
        if (localItemRoyal.get('isRefresh')) {
            localItemRoyal.remove('isRefresh');
            window.location.reload();
            return false;
        }


        this.setState({
            isLoading: true
        })

        try {
            let result

            this.isLogin
                ?
                result = await findUserConsentList({})
                :
                result = await getStoreOpenConsentList({})


            // lastPath 
            // 1:pay(专指从在payment点击支付时的跳转) 
            // 2:其他页面


            const optioalList = result.context.optionalList.map(item => {
                return {
                    id: item.id,
                    consentTitle: item.consentTitle,
                    isChecked: false,
                    isRequired: false,
                    detailList: item.detailList
                }
            })

            const requiredList = result.context.requiredList.map(item => {
                return {
                    id: item.id,
                    consentTitle: item.consentTitle,
                    isChecked: false,
                    isRequired: true,
                    detailList: item.detailList
                }
            })

            //把非必填和必填的项目组装成一个数组list，用于渲染
            let list = this.state.list
            list = [...requiredList, ...optioalList,]
            this.setState({
                list
            })

            console.log(this.state.list)

        } catch (err) {
            console.log(err.message)
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }
    componentWillUnmount() {
        localItemRoyal.set('isRefresh', true);
    }
    render() {
        const url = this.props.match.url
        return (
            <div className="required-wrap" id="wrap" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                {/* Logo */}
                <Link to="/" className="header__nav__brand logo-home pt-5">
                    <span className="rc-screen-reader-text"></span>
                    <img
                        alt="Royal Canin"
                        src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                        style={{ background: "url(" + logoAnimatedPng + ") no-repeat center center", width: '180px', height: '80px', backgroundSize: 'cover' }}
                    />
                </Link>
                {/* Header title */}
                <h2 className="rc-text-colour--brand1" style={{fontSize:'2.3rem', marginTop: '190px', textAlign: 'center' }}>Welcome to ROYALCANIN® online store</h2>
                <p style={{ textAlign: 'center', color: '#5F5F5F', fontSize: '1.3rem' }}>Complete log-in process</p>
                {/* 没有勾选完必填项的alert提示 */}
                {
                    this.state.isShowRequired
                        ?
                        <aside className="rc-alert rc-alert--error rc-alert--with-close" role="alert">
                            <span>Compruebe los elementos necesarios</span>
                        </aside>
                        : null
                }
                <div style={{ marginTop: '80px' }}>
                    <div class="rc-layout-container rc-one-column">
                        <div class="rc-column">
                            {/* checkbox组 */}
                            <Consent url={url} list={this.state.list} sendList={this.sendList} width={this.state.width} zoom={this.state.zoom} fontZoom={this.state.fontZoom} auto={true}/>
                        </div>
                    </div>
                   
                </div>

                {/* Required fields */}
                <p className='pizhu'><span className="pl-2 pr-2 rc-text-colour--brand1">*</span>Required fields</p>
                {/* Continu按钮 */}
                <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '30px' }}>
                    {
                        this.isLogin ?
                            <button className="rc-btn rc-btn--lg rc-btn--one px-5" onClick={this.submitLogin}>Continue</button>
                            :
                            <button className="rc-btn rc-btn--lg rc-btn--one px-5" onClick={this.submitUnLogin}>Continue</button>
                    }

                </div>
            </div>
        );
    }
}
export default withOktaAuth(RegisterRequired);
