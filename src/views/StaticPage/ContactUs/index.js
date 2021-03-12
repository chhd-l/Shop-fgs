import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Selection from '@/components/Selection';
import Loading from '@/components/Loading';
import { ADDRESS_RULE } from './utils/constant';
import { backSpacerUP, backSpacerDOWN } from "./utils/usPhone"
import { validData } from '@/utils/utils';
import successImg from '@/assets/images/credit-cards/success.png';
import "./index.less"
import { submitContactUsInfo } from '@/api/contactUs';

class ContactUs extends Component {
    constructor(props) {
        super(props)
        // 创建一个ref去储存textInput DOM元素
        this.textInput = React.createRef();

        this.state = {
            address: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                orderNumber: '',
                question: '1001',
                request: '',
            },
            questionList: [
                { value: '1001', name: 'General Information' },
                { value: '1002', name: 'Order Status' },
                { value: '1003', name: 'My Account' },
                { value: '1004', name: 'Other' },
            ],
            countryList: [],
            errMsgObj: {},
            mail:"qhx717@qq.com",
            isLoading: false,
            isFinished: false
        }
    }


    deliveryInputChange = (e) => {
        const { address } = this.state;
        const target = e.target;
        let value = target.value;
        const name = target.name;
        address[name] = value;
        this.setState({ address });
        this.inputBlur(e);
    };
    inputBlur = async (e) => {
        const { errMsgObj } = this.state;
        const target = e.target;
        const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
        const value = target.value;
        try {
            await validData(targetRule, { [target.name]: value });
            this.setState({
                errMsgObj: Object.assign({}, errMsgObj, {
                    [target.name]: ''
                })
            });
        } catch (err) {
            this.setState({
                errMsgObj: Object.assign({}, errMsgObj, {
                    [target.name]: err.message
                })
            });
        }
    };
    handleSelectedItemChange(key, data) {
        const { address } = this.state;
        address[key] = data.value;
        this.setState({ address });
    }
    allRequiredChecked = () => {
        const { firstName, lastName, email, request } = this.state.address
        if (firstName && lastName && email && request) return true
    }
    submitEvent = async ()=> {
        this.setState({isLoading:true})
        const { address } = this.state;
        address.phoneNumber = this.textInput.current.value
      //contact us请求接口调用
      await submitContactUsInfo({
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        phoneNumber: address.phoneNumber,
        orderNumber: address.orderNumber,
        question: address.question,
        request: address.request,
      }).then((res) => {
          if (res.code=="K-000000") {
            //接口返回提交成功
            this.setState({mail:address.email});
            this.setState({isLoading:false,isFinished:true})
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }else{
            //接口返回提交失败状态及原因
            this.setState({isLoading:false,isFinished:false})
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        })
        .catch((err) => {
          console.log(err);
          window.scrollTo(0, 0);
          this.setState({ isLoading:false,isFinished:false });
        });
    }

    firstNameJSX = () => {
        const { address, errMsgObj } = this.state
        return (
            <div className="form-group required">
                <label className="form-control-label" htmlFor="shippingFirstName">
                    <FormattedMessage id="payment.firstName" />
                </label>
                <span
                    className={["rc-input", "rc-input--inline", "rc-full-width", "rc-input--full-width", errMsgObj.firstName ? "rc-input--error" : ""].join(" ")}
                    input-setup="true"
                >
                    <input
                        className="rc-input__control"
                        id="shippingFirstName"
                        type="text"
                        value={address.firstName}
                        onChange={this.deliveryInputChange}
                        onBlur={this.inputBlur}
                        name="firstName"
                        maxLength="50"
                    />
                    <label className="rc-input__label" htmlFor="id-text1" />
                </span>
                {errMsgObj.firstName && (
                    <div className="text-danger-2">{errMsgObj.firstName}</div>
                )}
            </div>
        )
    }
    lastNameJSX = () => {
        const { address, errMsgObj } = this.state;
        return (
            <div className="form-group required">
                <label className="form-control-label" htmlFor="shippingLastName">
                    <FormattedMessage id="payment.lastName" />
                </label>
                <span
                    className={["rc-input", "rc-input--inline", "rc-full-width", "rc-input--full-width", errMsgObj.lastName ? "rc-input--error" : ""].join(" ")}
                    input-setup="true"
                >
                    <input
                        className="rc-input__control"
                        id="shippingLastName"
                        type="text"
                        value={address.lastName}
                        onChange={this.deliveryInputChange}
                        onBlur={this.inputBlur}
                        name="lastName"
                        maxLength="50"
                    />
                    <label className="rc-input__label" htmlFor="id-text1" />
                </span>
                {errMsgObj.lastName && (
                    <div className="text-danger-2">{errMsgObj.lastName}</div>
                )}
            </div>
        )
    }
    emailPanelJSX = () => {
        const { address, errMsgObj } = this.state;
        return (
            <div className="form-group required">
                <label className="form-control-label" htmlFor="shippingEmail">
                    <FormattedMessage id="email" />
                </label>
                <span
                    className={["rc-input", "rc-input--inline", "rc-full-width", "rc-input--full-width", errMsgObj.email ? "rc-input--error" : ""].join(" ")}
                    input-setup="true"
                >
                    <input
                        type="email"
                        className="rc-input__control"
                        id="shippingEmail"
                        value={address.email}
                        onChange={this.deliveryInputChange}
                        onBlur={this.inputBlur}
                        name="email"
                        maxLength="254"
                    />
                    <label className="rc-input__label" htmlFor="shippingEmail" />
                </span>
                {errMsgObj.email && (
                    <div className="text-danger-2">{errMsgObj.email}</div>
                )}
            </div>
        );
    };
    phonePanelJSX = () => {
        const { address, errMsgObj } = this.state;
        return (
            <div className="form-group">
                {' '}
                <label className="form-control-label" htmlFor="shippingPhoneNumber">
                    <FormattedMessage id="payment.phoneNumber2" />
                </label>
                <span
                    className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                    input-setup="true"
                >
                    <input
                        ref={this.textInput}
                        type="tel"
                        className="rc-input__control"
                        id="shippingPhoneNumber"
                        //value={address.phoneNumber} //加了这个值输入的时候有bug，先去掉的
                        onChange={this.deliveryInputChange}
                        onBlur={this.inputBlur}
                        name="phoneNumber"
                        maxLength="12"
                        onKeyUp={backSpacerUP.bind(this)}
                        onKeyDown={backSpacerDOWN.bind(this)}
                    />
                    <label className="rc-input__label" htmlFor="shippingPhoneNumber" />
                </span>
                {errMsgObj.phoneNumber && (
                    <div className="text-danger-2">{errMsgObj.phoneNumber}</div>
                )}
            </div>
        );
    };
    orderNumberJSX = () => {
        const { address } = this.state;
        return (
            <div className="form-group">
                <label className="form-control-label" htmlFor="contactUsOrderNumber">
                    <FormattedMessage id="contactUs.orderNumber" />
                </label>
                <span
                    className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                    input-setup="true"
                >
                    <input
                        type="text"
                        className="rc-input__control"
                        id="contactUsOrderNumber"
                        value={address.orderNumber}
                        onChange={this.deliveryInputChange}
                        onBlur={this.inputBlur}
                        name="orderNumber"
                        maxLength="254"
                    />
                    <label className="rc-input__label" htmlFor="contactUsOrderNumber" />
                </span>
            </div>
        );
    };
    myQuestionJSX = () => {
        const { address, errMsgObj } = this.state;
        return (
            <div className="form-group required">
                <label className="form-control-label">
                    <FormattedMessage id="contactUs.myQuestion" />
                </label>
                <span className="rc-select rc-full-width rc-input--full-width rc-select-processed" style={{ marginTop: 0 }}>
                    <Selection
                        selectedItemChange={(data) =>
                            this.handleSelectedItemChange('question', data)
                        }
                        optionList={this.state.questionList}
                        selectedItemData={{
                            value: address.question
                        }}
                        key={address.question}
                    />
                </span>
            </div>
        )
    }
    requestJSX = () => {
        const { address, errMsgObj } = this.state;
        return (
            <div className="form-group required">
                <label className="form-control-label" htmlFor="contactUsOrderNumber">
                    <FormattedMessage id="contactUs.request" />
                </label>
                <span class={["rc-input", errMsgObj.request ? "rc-input--error" : ""].join(" ")} style={{ maxWidth: "480px" }}>
                    <textarea
                        class="rc-input__textarea"
                        id="id-textarea"
                        value={address.request}
                        onChange={this.deliveryInputChange}
                        onBlur={this.inputBlur}
                        name="request"
                        maxLength="254"
                    ></textarea>
                </span>
                {errMsgObj.request && (
                    <div className="text-danger-2">{errMsgObj.request}</div>
                )}
            </div>
        )
    }

    submitBtn = () => {
        return (
            <button onClick={this.submitEvent} className="rc-btn rc-btn--one" name="send" style={{ width: '200px'}}>Submit</button>
        )
    }

    disabledBtn = () => {
        return (
            <button class="rc-btn rc-btn--one" disabled style={{ width: '200px' }}>Submit</button>
        )
    }

    allFormJSX = () => {
        return (
            <div className="FAQ__section rc-padding--md">
                <div className="contact__form">
                    <h1>Contact Us</h1>
                    {this.firstNameJSX()}
                    {this.lastNameJSX()}
                    {this.emailPanelJSX()}
                    {this.phonePanelJSX()}
                    {this.orderNumberJSX()}
                    {this.myQuestionJSX()}
                    {this.requestJSX()}
                    <div className="form-group">
                        <div className="content-asset">
                            <p>
                                <em>The personal data submitted via this form will be retained only for the purpose of responding to your question or concern, and will not be used for marketing purposes.<br /></em>
                                <em>You must be 13 years old or older to submit a form.</em>
                            </p>
                        </div>
                    </div>
                    {
                        this.allRequiredChecked()?this.submitBtn():this.disabledBtn()
                    }
                </div>
            </div>
        )
    }
    successContent = () => {
        return (
            <div className="FAQ__section rc-padding--md">
                <div className="FAQ-header">
                    <div className="confirmation-message">
                        <img src={successImg}></img>
                        <h2>Thank You For Contacting Us!</h2>
                        <p className="order-thank-you-email-msg">A copy of your message has also been sent to {this.state.mail}.</p>
                        <p className="order-thank-you-email-msg">One of our pet experts will be in touch with you soon.</p>
                    </div>
                </div>
            </div>
        )
    }



    render() {
        return (
            <div className="contactUs">
                {this.state.isLoading ? <Loading bgColor={'#fff'} /> : null}
                <Header
                    showMiniIcons={true}
                    showUserIcon={true}
                    location={this.props.location}
                    history={this.props.history}
                    match={this.props.match}
                />
                <div className="rc-content--fixed-header rc-bg-colour--brand3" style={{ background: '#f6f6f6' }}>
                    <div className="contact-us-form talk-to-us">
                        <p>
                            <i>
                                A message to our valued customers regarding COVID-19: Royal Canin’s top priority is the health and wellness of our Associates, partners, and cats and dogs we serve. While we are doing our best to maintain the level of service you have come to expect, you may experience slight delays. We appreciate your patience during this time.
                            </i>
                        </p>
                        <h2 className="rc-text-colour--brand1">
                            Talk to us
                        </h2>
                        <div className="rc-intro">
                            <p>To learn more about the science behind Royal Canin diets, to get a diet recommendation, or to ask a nutritional question, please contact a Royal Canin Nutritional Advisor below.</p>
                            <p>
                                <strong>Monday - Friday:</strong>
                                &nbsp;8:00 AM - 4:30 PM CT
                            </p>
                        </div>
                        <div className="d-flex">
                            <icon className="rc-icon rc-info rc-iconography"></icon>
                            <a href="tel:+(844) 673-3772" className="rc-styled-link--cta rc-gamma">(844) 673-3772</a>
                        </div>
                    </div>
                    {this.state.isFinished ? this.successContent():this.allFormJSX()}
                </div>
                <Footer />
            </div>
        )
    }
}
export default ContactUs
