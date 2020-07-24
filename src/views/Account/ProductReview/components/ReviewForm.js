import {FormattedMessage, injectIntl} from "react-intl";
import React from "react";
import Rate from '@/components/Rate'
import ImgUpload from '@/components/ImgUpload'
import { findIndex } from "lodash"
import '../index.css'
@injectIntl
class ReviewForm extends React.Component {

    constructor() {
        super();
        this.state = {
            consumerComment: '',
            textErrorInfo: ''
            // productRate: 5
        }
        this.imgUploaderRef = React.createRef();
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
        // debugger
        // if(nextProps.isSubmit) {
        //     this.textarea.blur();
        // }
    }

    selectProductRate(rate) {
       this.props.selectProductRate(rate, this.props.product)
    }
    handleConsumerCommentChange(e) {
        this.setState({
            consumerComment: e.target.value
        })
        this.props.handleConsumerCommentChange(e, this.props.product)
        this.inputBlur(e)
    }
    handelImgChange() {
        if(this.imgUploaderRef) {
            this.props.handleImgChange(this.imgUploaderRef, this.props.product)
        }
    }

    inputBlur (e) {
        let validDom = Array.from(
            e.target.parentElement.parentElement.children
        ).filter((el) => {
            let i = findIndex(Array.from(el.classList), (classItem) => {
                return classItem === "invalid-feedback";
            });
            return i > -1;
        })[0];
        if (validDom) {
            if (!e.target.value) {
                validDom.style.display = "block"
                if(e.target.name==='whatYouLike') {
                    this.setState({
                        textErrorInfo: 'Review is required.'
                    })
                }
            } else {
                if(e.target.name==='whatYouLike') {
                    if (e.target.textLength < 500) {
                        validDom.style.display = "none"
                    } else {
                        validDom.style.display = "block"
                        this.setState({
                            textErrorInfo: 'Please enter less than 500 characters.'
                        })
                    }
                } else {
                    validDom.style.display = "none"
                }
            }
        }
    }

    render() {
        return (
            <div>
                <div className="rc-five-column rc-padding-bottom--xs rc-border-bottom rc-border-colour--interface">
                    <div className="rc-layout-container">
                        <div className="rc-column padb0 padt0">
                            <div className="">
                                <div className="rc-margin-top--xs">
                                    <span className="ui-text-overflow-line2 text-break">{this.props.product.skuName}</span>
                                </div>
                                <div className="rc-margin-top--xs">
                                    <span className="text-break">{this.props.product.goodsWeight} {this.props.product.specDetails}</span>
                                </div>
                                <div className="rc-margin-top--xs">
                                    <Rate def={0} disabled={false} selectRate={(rate) => this.selectProductRate(rate)}></Rate>
                                </div>
                            </div>
                        </div>
                        <div className="rc-column text-right padb0">
                            <div className="img-container"><img className="product-img"  src={this.props.product.pic}/></div>
                        </div>
                    </div>
                    <div className="">
                        <div className="rc-column padt0 padb0">
                            <FormattedMessage id="writeYourReview"/>
                            <div className="padt20">
                                <span
                                    className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                    input-setup="true">
                                    <FormattedMessage id="whatYouLike">
                                        {
                                            txt => (<textarea
                                                className="rc-input__textarea noborder"
                                                rows={2}
                                                ref={(textarea)=> this.textarea = textarea}
                                                name="whatYouLike"
                                                id="whatYouLike"
                                                required={true}
                                                placeholder={txt}
                                                value={this.state.consumerComment}
                                                onChange={(e) => this.handleConsumerCommentChange(e)}
                                                onBlur={e => this.inputBlur(e)}
                                            />)
                                        }
                                    </FormattedMessage>
                                </span>
                                <div className="invalid-feedback" style={{ display: 'none' }}>
                                    {
                                        this.state.textErrorInfo
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rc-layout-container rc-one-column padt0">
                        <div className="rc-column">
                            <ImgUpload ref={this.imgUploaderRef} tipVisible={false} handleChange={() => this.handelImgChange()} />
                        </div>
                    </div>
                    <div className="rc-layout-container rc-one-column padt0">
                        <div className="rc-column padt0">
                            <label>
                                <input
                                    name="isAnonymous"
                                    type="checkbox"
                                    checked={this.props.product.isAnonymous ? this.props.product.isAnonymous : false}
                                    onChange={(e)=>this.props.handleInputChange(e, this.props.product)} />
                                    <span className="rc-margin-left--xs"><FormattedMessage id="anonymousReview"/></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReviewForm
