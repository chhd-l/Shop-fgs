import {FormattedMessage, injectIntl} from "react-intl";
import React from "react";
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import Rate from '@/components/Rate'
import ReviewForm from './components/ReviewForm'
import { getGoodsList,addGoodsEvaluate } from '@/api/review'
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
            orderId: 0,
            productList: [],
            purchaseRate: 0,
            logisticsRate: 0,
            productRate: 0,
            current: 1,
            reviewList: [],
            imgList: [],
            isSubmit: false
        }
        this.selectPurchaseRate = this.selectPurchaseRate.bind(this);
        this.selectLogisticsRate = this.selectLogisticsRate.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this)
        this.imgUploaderRef = React.createRef();
    }
    componentDidMount() {
        this.setState({
            orderId: this.props.match.params.tid
        },() => {
            this.getGoodsList(this.state.orderId)
        })
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
    async getGoodsList(orderId) {
        const res = await getGoodsList(orderId)
        if(res.code = "K-000000") {
            const productList = res.context
            console.log(productList, 'productlist--------------')
            const list = []
            if(productList.length > 0 ) {
                productList.forEach(item => {
                    let obj = {
                        id: item.skuId
                    }
                    list.push(obj)
                })
                console.log(productList, 'ddddddddddddddddd')
                this.setState({
                    productList: productList,
                    reviewList: list
                })
            }
        } else {
            console.log(res.message)
        }
    }

    async handleSubmit() {
        const list = this.state.reviewList
        let isFillInfo = true
        const goodsParams = []
        this.setState({
            isSubmit: true
        })
        if(list) {
            list.forEach(item => {
                if(!item.consumerComment || item.consumerComment.length > 500) {
                    isFillInfo = false
                }
                let obj = {
                    evaluateScore: item.productRate ? item.productRate : 0,
                    evaluateContent: item.consumerComment,
                    isAnonymous: item.isAnonymous ? 1 : 0,
                    orderNo: this.state.orderId,
                    goodsInfoId: item.id,
                    goodsEvaluateImageList: item.goodsEvaluateImageList ? item.goodsEvaluateImageList : []
                }
                goodsParams.push (obj)
            })
        }
        const params = {
            goodsEvaluateAddRequest: goodsParams,
            storeEvaluateAddRequestList: {
                orderNo: this.state.orderId,
                serverScore: this.state.purchaseRate,
                logisticsScore: this.state.logisticsRate
            }
        }
        console.log(params, 'ddddddddd=-----------')
        // if (isFillInfo) {
        //     let res = await addGoodsEvaluate(params)
        //     if(res.code === 'K-000000') {
        //         this.props.history.push('/account/orders')
        //     } else {
        //         console.log(res.message, '评价接口错误信息----------')
        //     }
        // } else {
        //     console.log('not fill info')
        // }
    }
    handleConsumerCommentChange(e, product) {
        const value = e.target.value
        const list = this.state.reviewList
        if(list.length > 0) {
            list.forEach(item => {
                if(item.id === product.skuId) {
                    item.consumerComment = value
                }
            })
        }
        // list[product.skuId].consumerComment = value
        this.setState({
            reviewList: list
        },()=>{
            console.log(this.state.reviewList, '-----------')
        })
    }

    handleInputChange(e,product) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const list = this.state.reviewList
        const list2 = this.state.productList
        if(list2.length > 0) {
            list2.forEach(item => {
                if(item.skuId === product.skuId) {
                    if (target.type === 'checkbox' ) {
                        item.isAnonymous = value
                    }

                }
            })
        }
        if(list.length > 0) {
            list.forEach(item => {
                if(item.id === product.skuId) {
                    if (target.type === 'checkbox' ) {
                        item.isAnonymous = value
                    }

                }
            })
        }
        this.setState({
            productList: list2,
            reviewList: list
        })
        // this.setState({
        //     [name]: value
        // });
    }

    selectProductRate(rate, product) {
        const list = this.state.reviewList
        if(list.length > 0) {
            list.forEach(item => {
                if(item.id === product.skuId) {
                    item.productRate = rate
                }
            })
        }
        this.setState({
            reviewList: list
        })
    }
    handleImgChange(imgRef, product) {
        const list = this.state.reviewList
        if(list.length > 0) {
            let imgsParam = []
            list.forEach(item => {
                if(item.id === product.skuId) {
                    imgRef.current.state.imgList.forEach((item, i) => {
                        let obj = {
                            uid: i + 1,
                            status: 'done',
                            artworkUrl: item
                        }
                        imgsParam.push(obj)
                    })
                    item.goodsEvaluateImageList = imgsParam
                }
            })
            this.setState({
                reviewList: list
            })
        }
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
                                <div className="rc-border-bottom rc-border-colour--interface">
                                    <h4 className="rc-delta rc-margin--none pb-2">
                                        <FormattedMessage id="writeReview" />
                                    </h4>
                                </div>
                                {/*main*/}
                                <div className="rc-border-bottom rc-border-colour--interface ">
                                    <div className="rc-margin--none">
                                        <div className="">
                                            <div className="rc-column">
                                                <div>
                                                    <span className=" rc-text-colour--text ui-text-overflow-line2 text-break">
                                                        <span className="rc-font-bold"><FormattedMessage id="purchaseRating"></FormattedMessage></span>
                                                    </span>
                                                    <div className="rc-margin-top--xs">
                                                        <Rate def={this.state.purchaseRate} disabled={false} selectRate={this.selectPurchaseRate}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rc-border-bottom rc-border-colour--interface ">
                                    <div className="rc-margin--none pb-2">
                                        {/*rc-layout-container rc-one-column*/}
                                        <div className="">
                                            <div className="rc-column">
                                                <div>
                                                    <span className=" rc-text-colour--text ui-text-overflow-line2 text-break">
                                                        <span className="rc-font-bold"><FormattedMessage id="logisticsRating"></FormattedMessage></span>
                                                    </span>
                                                    <div className="rc-margin-top--xs">
                                                        <Rate def={this.state.logisticsRate} disabled={false} selectRate={this.selectLogisticsRate}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rc-layout-container rc-three-column">
                                    {/*<div className="rc-column rc-triple-width pad-left0 pad-right0">*/}
                                    {/*    <ReviewList update={this.updateCurrent} />*/}
                                    {/*</div>*/}
                                    {/*<div className="rc-padding-right--xs rc-bg-colour--brand4"></div>*/}
                                    {/*rc-double-width*/}
                                    <div className="rc-column">
                                        <div className="rc-padding-top--xs">
                                                <span className=" rc-text-colour--text ui-text-overflow-line2 text-break">
                                                    <span className="rc-font-bold "><FormattedMessage id="productRating"/></span>
                                                </span>
                                        </div>
                                        {
                                            this.state.productList.length > 0 ?
                                                this.state.productList.map((item) => (
                                                        <ReviewForm currentId={this.state.current}
                                                                    product={item}
                                                                    handleImgChange={(imgRef, product)=>this.handleImgChange(imgRef, product)}
                                                                    selectProductRate={(rate,product) => this.selectProductRate(rate, product)}
                                                                    handleConsumerCommentChange={(e, product) => this.handleConsumerCommentChange(e, product)}
                                                                    handleInputChange={(e, product)=>this.handleInputChange(e, product)}
                                                        />
                                                        )
                                                )

                                                : null
                                        }
                                        {
                                            this.state.productList.length > 0 ?
                                            (
                                                <div className="rc-padding-top--sm">
                                                    <button
                                                        className="rc-btn rc-btn--sm rc-btn--two"
                                                        name="contactPreference"
                                                        type="submit"
                                                        onClick={() => this.handleSubmit()}>
                                                        <FormattedMessage id="submit" />
                                                    </button>
                                                </div>
                                            ): null
                                        }

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
