import {FormattedMessage, injectIntl} from "react-intl";
import React from "react";
import Rate from '@/components/Rate'
import ImgUpload from '@/components/ImgUpload'

@injectIntl
class ReviewForm extends React.Component {

    constructor() {
        super();
        this.state = {
            consumerComment: '',
            isAnonymous: false
        }
        this.selectProductRate = this.selectProductRate.bind(this);
        this.imgUploaderRef = React.createRef();
    }

    handleSubmit() {
        let imgsParam = this.imgUploaderRef.current.state.imgList.map((item, i) => {
            return JSON.stringify({
                uid: i + 1,
                status: 'done',
                url: item
            })
        })
        let parmas = {
            id: this.props.currentId,
            productRate: this.state.productRate,
            consumerComment: this.state.consumerComment,
            images: imgsParam,
            isAnonymous: this.state.isAnonymous
        }

        console.log(parmas, 'ddddddddd=-----------')
    }
    isSelectAnonymous(e) {
        this.setState({
            isAnonymous: e.target.checked
        })
    }
    selectProductRate(rate) {
        this.setState({
            productRate: rate
        })
    }
    handleConsumerCommentChange(e) {
        this.setState({
            consumerComment: e.target.value
        })
    }
    render() {
        return (
            <div className="rc-margin-left--lg">
                <div className="rc-padding-top--sm font-18"><FormattedMessage id="productRating"/></div>
                <Rate def={4} disabled={false} selectRate={this.selectProductRate}></Rate>

                <div className="rc-padding-top--xs"><FormattedMessage id="writeYourReview"/></div>
                <div className="rc-padding-top--xs">
                                                <span
                                                    className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                                    input-setup="true">
                                                    <FormattedMessage id="whatYouLike">
                                                        {
                                                            txt => (<textarea
                                                                className="rc-input__textarea noborder"
                                                                maxLength="50"
                                                                placeholder={txt}
                                                                value={this.state.consumerComment}
                                                                onChange={(e) => this.handleConsumerCommentChange(e)}
                                                            />)
                                                        }
                                                    </FormattedMessage>

                                                </span>

                </div>

                <div className="rc-padding-top--sm">
                    <ImgUpload ref={this.imgUploaderRef} />
                </div>
                <div className="rc-input rc-input--inline rc-padding-top--xs">
                    <input className="rc-input__checkbox" id="id-checkbox-cat"
                           value='isAnonymous'
                           onChange={(e) => this.isSelectAnonymous(e)}
                           type="checkbox" name="checkbox-1"/>
                    />
                    <label className="rc-input__label--inline"
                           htmlFor="id-checkbox-cat">
                        <FormattedMessage id="anonymousReview" />
                    </label>
                </div>
                <div className="rc-padding-top--sm">
                    <button
                        className="rc-btn rc-btn--sm rc-btn--two"
                        name="contactPreference"
                        type="submit"
                        onClick={() => this.handleSubmit()}>
                        <FormattedMessage id="submit" />
                    </button>
                </div>
            </div>
        )
    }
}

export default ReviewForm
