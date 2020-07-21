import {FormattedMessage, injectIntl} from "react-intl";
import React from "react";
import Rate from '@/components/Rate'
import ImgUpload from '@/components/ImgUpload'
import '../index.css'
@injectIntl
class ReviewForm extends React.Component {

    constructor() {
        super();
        this.state = {
            consumerComment: ''
            // productRate: 5
        }
        this.imgUploaderRef = React.createRef();
    }
    selectProductRate(rate) {
       this.props.selectProductRate(rate, this.props.product)
    }
    handleConsumerCommentChange(e) {
        this.setState({
            consumerComment: e.target.value
        })
        this.props.handleConsumerCommentChange(e, this.props.product)
    }
    handelImgChange() {
        if(this.imgUploaderRef) {
            this.props.handleImgChange(this.imgUploaderRef, this.props.product)
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
                                    <span className="ui-text-overflow-line2 text-break weight200 font-18">{this.props.product.skuName}</span>
                                </div>
                                <div className="rc-margin-top--xs">
                                    <span className="text-break">{this.props.product.goodsWeight} {this.props.product.unit}</span>
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
                        <div className="rc-column padt0">
                            <FormattedMessage id="writeYourReview"/>
                            <div className="rc-margin-top--xs">
                                <span
                                    className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                    input-setup="true">
                                    <FormattedMessage id="whatYouLike">
                                        {
                                            txt => (<textarea
                                                className="rc-input__textarea noborder"
                                                rows={2}
                                                id="whatYouLike"
                                                placeholder={txt}
                                                value={this.state.consumerComment}
                                                onChange={(e) => this.handleConsumerCommentChange(e)}
                                            />)
                                        }
                                    </FormattedMessage>
                                </span>
                                {/*<div className="invalid-feedback">*/}
                                {/*    error info.*/}
                                {/*</div>*/}

                            </div>
                        </div>
                    </div>

                    <div className="rc-padding-top--xs rc-layout-container rc-one-column">
                        <div className="rc-column">
                            <ImgUpload ref={this.imgUploaderRef} tipVisible={false} handleChange={() => this.handelImgChange()} />
                        </div>
                    </div>
                    <div className="rc-padding-top--xs rc-layout-container rc-one-column">
                        <div className="rc-column">
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
