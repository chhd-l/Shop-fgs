import React, { Component } from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { inject, observer } from 'mobx-react';
import logoAnimatedPng from "@/assets/images/logo--animated2.png";
import Skeleton from "react-skeleton-loader";
import "./index.css"
import { findUserConsentList, consentListDetail,userBindConsent,getStoreOpenConsentList} from "@/api/consent"
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
            isShowRequired:false,
            isLoading:true
        };
    }
    //属性变为true，time定时后变为false
    showAlert(attr,time){
        this.setState({
            [attr]: true
        },()=>{
            setTimeout(()=>{
                this.setState({
                    [attr]: false
                })
            },time)
        })
    }
    bindSubmitParam = (list)=>{
        let obj = {optionalList:[],requiredList:[]}
        list.filter(item=>!item.isRequired).forEach((item=>{
            obj.optionalList.push({id:item.id,selectedFlag:item.isChecked})
        }))
        list.filter(item=>item.isRequired).forEach((item=>{
            obj.requiredList.push({id:item.id,selectedFlag:true})
        }))

        return obj
    }
    //会员提交
    submitLogin = async () => {
        try{
            let lastPath = this.props.location.state.path
            if (lastPath === 'pay') {
                lastPath = '/payment/payment'
            }
            const isRequiredChecked = this.state.list.filter(item => item.isRequired).every(item => item.isChecked)
            if(isRequiredChecked){
                //组装submit参数
               let submitParam = this.bindSubmitParam(this.state.list)

               const result = await userBindConsent(submitParam)
               if (result.code === 'K-000000'){
                 this.props.history.push(lastPath)
               }
            }else{
                this.showAlert('isShowRequired',2000)
            } 
        }catch(err){
            console.log(err.message)
        }    
    }
    //游客提交
    submitUnLogin = () => {
        try{
            const isRequiredChecked = this.state.list.filter(item => item.isRequired).every(item => item.isChecked)
            if(isRequiredChecked){
                sessionItemRoyal.set('isRequiredChecked',true)
                this.props.history.push('/')
            }else{
                this.showAlert('isShowRequired',2000)
            } 
        }catch(err){
            console.log(err.message)
        }    
    }
    async componentDidMount () {
        document.getElementById('des').addEventListener('click',function(e){
            console.log(e.target.innerHTML)
        })
        if (localItemRoyal.get('isRefresh')) {
            localItemRoyal.remove('isRefresh');
            window.location.reload();
            return false;
          }


        this.setState({
            isLoading:true
        })
        // let lastPath = this.props.location.state.path
        // debugger

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
                    isRequired: false
                }
            })

            const requiredList = result.context.requiredList.map(item => {
                return {
                    id: item.id,
                    consentTitle: item.consentTitle,
                    isChecked: false,
                    isRequired: true
                }
            })

            //把非必填和必填的项目组装成一个数组list，用于渲染
            let list = this.state.list
            list = [...requiredList,...optioalList, ]
            this.setState({
                list
            })
            
            
  

            // const result2 = await consentListDetail(
            //     {
            //         "consentKey": 68,
            //         "contentTitle": "procesamiento"
            //     }
            // )
            // console.log(result2)
        } catch (err) {
            console.log(err.message)
        } finally{
            this.setState({
                isLoading:false
            })
        }
    }
    componentWillUnmount(){
        localItemRoyal.set('isRefresh', true);
    }
    render() {
        const createMarkup = (text) => ({ __html: text });
        return (
            <div className="required-wrap" id="des">
                {/* Logo */}
                <Link to="/" className="header__nav__brand logo-home pt-5">
                    <span className="rc-screen-reader-text"></span>
                    <img
                        alt="Royal Canin"
                        src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                        style={{ background: "url(" + logoAnimatedPng + ") no-repeat center center", width: '140px', height: '60px', backgroundSize: 'cover' }}
                    />
                </Link>
                {/* Header title */}
                <h2 className="rc-text-colour--brand1" style={{ marginTop: '190px', textAlign: 'center' }}>Welcome to ROYALCANIN® online store</h2>
                <p style={{ textAlign: 'center', color: '#5F5F5F', fontSize: '20px' }}>Complete log-in process</p>
                {/* 没有勾选完必填项的alert提示 */}
                {
                    this.state.isShowRequired
                        ?
                        <aside className="rc-alert rc-alert--error rc-alert--with-close" role="alert">
                            <span>Compruebe los elementos necesarios</span>
                        </aside>
                        : null
                }
                {/* checkbox组 */}
                <div className="required-checkbox" style={{ marginTop: '80px' }}>
                    {
                        this.state.isLoading
                        ?
                        <div className="pt-2 pb-2">
                            <Skeleton color="#f5f5f5" width="100%" count={4} />
                        </div>
                        :
                        this.state.list.map((item, index) => {
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
                                            let itemObj = Object.assign(item, {
                                                isChecked: !item.isChecked
                                            })
                                            let list = [...this.state.list]
                                            list.splice(index, 1, itemObj)
                                            this.setState({
                                                list
                                            });
                                            //替换属性end
                                        }}
                                        checked={item.isChecked}
                                    />
                                    <div className="d-flex">
                                        <div
                                            className="description"
                                            dangerouslySetInnerHTML={createMarkup(
                                                item.consentTitle
                                            )}
                                        ></div>
                                        {item.isRequired ? <span className="pl-2 rc-text-colour--brand1">*</span> : null}
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
                {/* Required fields */}
                <p className='pizhu'><span className="pl-2 pr-2 rc-text-colour--brand1">*</span>Required fields</p>
                {/* Continu按钮 */}
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
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

export default injectIntl(RegisterRequired);
