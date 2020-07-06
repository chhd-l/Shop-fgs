import {FormattedMessage, injectIntl} from "react-intl";
import React from "react";
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import Rate from '@/components/Rate'
import './index.css'
import Skeleton from "react-skeleton-loader";
import {Link} from "react-router-dom";

@injectIntl
class ProductReview extends React.Component {

    constructor() {
        super();
    }

    render() {
        // const lang = this.props.intl.locale || 'en'
        const event = {
            page: {
                type: 'Account',
                theme: ''
            }
        }
        return (
            <div>
                <GoogleTagManager additionalEvents={event} />
                <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
                <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
                    <BreadCrumbs />
                    <div className="rc-padding--sm rc-max-width--xl">
                        <div className="rc-layout-container rc-five-column">
                            <SideMenu type="Orders" />
                            <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                                    <h4 className="rc-delta rc-margin--none pb-2">
                                        <FormattedMessage id="writeReview" />
                                    </h4>
                                </div>
                                {/*main*/}
                                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                                    <h4 className="rc-delta rc-margin--none pb-2">

                                        <div className="rc-layout-container rc-three-column">
                                            <div className="rc-column ">
                                                <div>
                                                    <FormattedMessage id="purchaseRating"></FormattedMessage>:
                                                    <Rate def={5} disabled={true}/>
                                                </div>
                                            </div>
                                            <div className="rc-column rc-double-width">
                                                <div>
                                                    <FormattedMessage id="purchaseRating"></FormattedMessage>:
                                                    <Rate def={5} disabled={true}/>
                                                </div>
                                            </div>
                                        </div>
                                    </h4>
                                </div>
                                <div className="rc-layout-container rc-three-column">
                                    <div className="rc-column ">
                                        <div className="rc-layout-container rc-five-column rc-padding-bottom--xs rc-border-colour--interface">
                                            <div className="rc-column">
                                                    <div className="rc-full-width">
                                                        <div className="d-flex justify-content-center ui-margin-top-1-md-down">
                                                            <div className="details-img-container">
                                                                <div>
                                                                    <img src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004291813187993.png"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className="rc-column padt20">
                                                    <div className="wrap-short-des">
                                                        <div className="rc-gamma ui-text-overflow-line2 text-break">
                                                            <h3>121212</h3>
                                                        </div>
                                                        <div className="text-break">
                                                            <span>sssssssssss</span>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="rc-layout-container rc-five-column rc-padding-bottom--xs rc-border-colour--interface">
                                            <div className="rc-column">
                                                <div className="rc-full-width">
                                                    <div className="d-flex justify-content-center ui-margin-top-1-md-down">
                                                        <div className="details-img-container">
                                                            <div>
                                                                <img src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004291813187993.png"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rc-column padt20">
                                                <div className="wrap-short-des">
                                                    <div className="rc-gamma ui-text-overflow-line2 text-break">
                                                        <h3>121212</h3>
                                                    </div>
                                                    <div className="text-break">
                                                        <span>sssssssssss</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rc-layout-container rc-five-column rc-padding-bottom--xs rc-border-colour--interface">
                                            <div className="rc-column">
                                                <div className="rc-full-width">
                                                    <div className="d-flex justify-content-center ui-margin-top-1-md-down">
                                                        <div className="details-img-container">
                                                            <div>
                                                                <img src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004291813187993.png"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rc-column padt20">
                                                <div className="wrap-short-des">
                                                    <div className="rc-gamma ui-text-overflow-line2 text-break">
                                                        <h3>121212</h3>
                                                    </div>
                                                    <div className="text-break">
                                                        <span>sssssssssss</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="rc-column rc-double-width">
                                        <div>
                                            <span><FormattedMessage id="productRating"/></span>
                                            <Rate def={4} disabled={true}></Rate>

                                            <span><FormattedMessage id="writeYourReview"/></span>
                                            <div>
                                                <span
                                                    className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                                    input-setup="true">
                                                    <FormattedMessage id="whatYouLike">
                                                        {
                                                            txt => (<textarea
                                                                className="rc-input__textarea noborder"
                                                                maxLength="50"
                                                                placeholder={txt}
                                                                 />)
                                                        }
                                                    </FormattedMessage>
                                                    {/*value={this.state.consumerComment}*/}
                                                    {/*onChange={(e) => this.handleConsumerCommentChange(e)}*/}
                                                </span>

                                            </div>

                                            <div className="rc-input rc-input--inline">
                                                <input className="rc-input__checkbox" id="id-checkbox-cat" value="Cat"
                                                       type="checkbox" name="checkbox-1"/>
                                                <label className="rc-input__label--inline"
                                                       htmlFor="id-checkbox-cat">
                                                    <FormattedMessage id="anonymousReview" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

export default ProductReview
