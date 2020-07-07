import {FormattedMessage, injectIntl} from "react-intl";
import React from "react";
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import Rate from '@/components/Rate'
import ReviewForm from './components/ReviewForm'
import ReviewList from './components/ReviewList'
import ImgUpload from '@/components/ImgUpload'
import './index.css'
import Skeleton from "react-skeleton-loader";
import {Link} from "react-router-dom";

@injectIntl
class ProductReview extends React.Component {

    constructor() {
        super();
        this.state = {
            purchaseRate: 0,
            logisticsRate: 0,
            productRate: 0,
            current: 1
        }
        this.selectPurchaseRate = this.selectPurchaseRate.bind(this);
        this.selectLogisticsRate = this.selectLogisticsRate.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this)
        this.imgUploaderRef = React.createRef();
    }
    selectPurchaseRate(rate) {
        this.setState({
            purchaseRate: rate
        })
    }
    selectLogisticsRate(rate) {
        this.setState({
            logisticsRate: rate
        })
    }
    updateCurrent(id) {
        this.setState({
            current: id
        })
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
                                <div className="rc-border-bottom rc-border-colour--interface ">
                                    <div className="rc-margin--none pb-2">

                                        <div className="rc-layout-container rc-three-column">
                                            <div className="rc-column">
                                                <div>
                                                    <FormattedMessage id="purchaseRating"></FormattedMessage>
                                                    <Rate def={5} disabled={false} selectRate={this.selectPurchaseRate}/>
                                                </div>
                                            </div>
                                            <div className="rc-column rc-double-width">
                                                <div className="rc-margin-left--lg">
                                                    <FormattedMessage id="logisticsRating" ></FormattedMessage>
                                                    <Rate def={5} disabled={false} selectRate={this.selectLogisticsRate} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rc-layout-container rc-three-column">
                                    <div className="rc-column rc-triple-width pad-left0 pad-right0">
                                        <ReviewList update={this.updateCurrent} />
                                    </div>
                                    <div className="rc-padding-right--xs rc-bg-colour--brand4"></div>
                                    {/*rc-double-width*/}
                                    <div className="rc-column rc-double-width">
                                        <ReviewForm currentId={this.state.current}/>
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
