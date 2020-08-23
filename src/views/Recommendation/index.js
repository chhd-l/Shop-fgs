import React from 'react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Skeleton from "react-skeleton-loader";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import emailImg from "@/assets/images/emailus_icon@1x.jpg"
import callImg from "@/assets/images/customer-service@2x.jpg"
import helpImg from "@/assets/images/slider-img-help.jpg"
import recommendation1 from "@/assets/images/recommendation1.png"
import recommendation2 from "@/assets/images/recommendation2.png"
import recommendation3 from "@/assets/images/recommendation3.png"
import recommendation4 from "@/assets/images/recommendation4.png"
import storeLogo from "@/assets/images/storeLogo.png"
import ImageMagnifier from "@/components/ImageMagnifier";
import { formatMoney } from '@/utils/utils'
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip'
import { getRecommendationList } from '@/api/recommendation'
import { getPrescriptionById } from '@/api/clinic'
import { sitePurchase } from "@/api/cart";
import './index.css'

@inject("checkoutStore", "loginStore", "clinicStore")
@inject("configStore")
@observer
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        id: "",
        goodsName: "",
        goodsImg:
          "https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004142026536251.jpg",
        goodsDescription: "",
        sizeList: [],
        images: [],
        goodsCategory: "",
        goodsSpecDetails: [],
        goodsSpecs: [],
      },
      productList: [],
      currentDetail: {},
      images: [],
      activeIndex: 0,
      prescriberInfo: {},
      loading: false,
      buttonLoading: false
    }
  }

  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  async componentDidMount () {
    this.setState({loading: true})
    // console.log(window.location, 'location', this.props)
    getRecommendationList(this.props.match.params.id).then(res => {
      console.log(res, 'aaa')
      this.setState({productList: res.context.recommendationGoodsInfoRels})
      // getPrescriptionById({id: res.context.prescriberId}).then(res => {
      getPrescriptionById({id: '2304'}).then(res => {
        console.log(res, 'bbb')
        this.setState({prescriberInfo: res.context, loading: false})
      })
    })
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  async hanldeLoginAddToCart() {
    let { productList } = this.state
    this.setState({buttonLoading: true})
    try{
      for(let i = 0; i < productList.length; i++) {
        await sitePurchase({
          goodsInfoId: productList[i].goodsInfo.goodsInfoId,
          goodsNum: productList[i].recommendationNumber,
          goodsCategory: ''
        });
        await this.props.checkoutStore.updateLoginCart();
      }
      this.props.history.push('/cart')
    }catch(e) {
      this.setState({buttonLoading: false})
    }
    
  }
  async buyNow() {
    let { productList } = this.state
    this.setState({buttonLoading: true})
    try {
      for(let i = 0; i < productList.length; i++) {
        await sitePurchase({
          goodsInfoId: productList[i].goodsInfo.goodsInfoId,
          goodsNum: productList[i].recommendationNumber,
          goodsCategory: ''
        });
        await this.props.checkoutStore.updateLoginCart();
      }
      this.props.history.push("/prescription");
    }catch(e) {
      this.setState({buttonLoading: false})
    }
  }
  render (h) {
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    }
    // const { details, images } = this.state
    console.log('props',this.props)
    let details = JSON.parse(sessionStorage.getItem('detailsTemp'))
    let images = JSON.parse(sessionStorage.getItem('imagesTemp'))
    let  { productList, activeIndex, prescriberInfo} = this.state
    return (
      <div className="recommendation">
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3" >
          <BannerTip />
          <section style={{textAlign: 'center'}}>
            <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
              Discover your personally-selected nutrition recommendation below.
            </h2>
            <p>
              Click to get started now for your shopping, or continue reading to find out more about the benefits of veterinary health nutrition.
            </p>
            <p>
              <button class={`rc-btn rc-btn--one ${this.state.buttonLoading?'ui-btn-loading': ''}`} onClick={() => this.hanldeLoginAddToCart()}>View in cart</button>
            </p>
          </section>
          <section className="recommendProduct">
            {
              this.state.loading?(
                <Skeleton
                  color="#f5f5f5"
                  width="100%"
                  height="100%"
                />
              ): (
                productList.length && (
                <div className="recommendProductInner">
                  <div className="left">
                    <div style={{padding: '32px', textAlign: 'center', fontWeight: '500'}}>
                      Recommendation Package
                    </div>
                    <ul>
                      {
                        productList.map((el, i) => (
                          <li onClick={() => this.setState({activeIndex: i})} className={`${i === activeIndex?'active': ''}`}>
                            <img src={el.goodsInfo.goodsInfoImg || el.goodsInfo.goods.goodsImg}/>
                            <span className="proName">{el.goodsInfo.goodsInfoName}</span>
                            <span>X {el.recommendationNumber}</span>
                          </li>
                        ))
                      }
                      <p style={{marginTop: '60px'}}>
                      <button class={`rc-btn rc-btn--one ${this.state.buttonLoading?'ui-btn-loading': ''}`} onClick={() => this.buyNow()}>Buy now</button>
                      </p>
                      {
                        !this.props.loginStore.isLogin && (
                          <p>
                          <button
                            className={`rc-styled-link color-999`}
                          >
                            <FormattedMessage id="Buy as a guest" />
                          </button>
                          </p>
                        )
                      }
                      
                    </ul>
                  </div>
                  <div className="right">
                    <div className="main">
                      <div className="pic">
                        <ImageMagnifier
                          sizeList={[productList[activeIndex].goodsInfo]}
                          // video={details.goodsVideo}
                          images={[productList[activeIndex].goodsInfo]}
                          minImg={productList[activeIndex].goodsInfo.goodsInfoImg}
                          maxImg={productList[activeIndex].goodsInfo.goodsInfoImg}
                          config={false}
                        />
                      </div>
                      
                         
                          <div className="text">
                          <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
                            { productList[activeIndex].goodsInfo.goodsInfoName}
                          </h2>
                          <h4>
                            From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))} to {formatMoney(Math.max.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}
                          </h4>
                          <p style={{width: '350px'}}>
                            { productList[activeIndex].goodsInfo.goods.goodsDescription || 'none'}
                          </p>
                          <p>
                            <button class="rc-btn rc-btn--two" onClick={() => {
                              this.props.history.push('/details/' + productList[activeIndex].goodsInfo.goodsInfoId)
                            }}>View Detail</button>
                          </p>
                          </div>
                    
                      {/* <div className="text">
                      <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
                        { productList[activeIndex].goodsInfo.goodsInfoName}
                      </h2>
                      <h4>
                        From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}} to $40.99
                      </h4>
                      <p>
                        Renal + hypoallergenic is a complete dietetic food for adult dogs, formulated to support renal function during chronic kidney disease and intended for the reduction of intolerances to certain ingredients…
                      </p>
                      <p>
                        <button class="rc-btn rc-btn--two">View Detail</button>
                      </p>
                      </div> */}
                      
                    </div>
                    <div className="description">
                      <img src={storeLogo} style={{float: 'left', width: '40px', marginRight: '20px'}}/>
                      <p style={{
                        // fontFamily: 'DINPro-Medium',
                        fontSize: '16px',
                        color: '#666666',
                        fontWeight: '500',
                        letterSpacing: '0'}}>{prescriberInfo.prescriberName}</p>
                      <p style={{
                        // fontFamily: 'DINPro-Medium',
                        fontSize: '12px',
                        // color: '#666666',
                      letterSpacing: '0'}}>{prescriberInfo.primaryCity}</p>
                    </div>
                    <p style={{
                      textAlign: 'center',
                        // fontFamily: 'DINPro-Medium',
                        fontSize: '12px',
                        color: '#ccc',
                        marginBottom: '60px',
                        letterSpacing: '0'}}>Royal Canin’s feeding guidelines can also be found on the product packaging.</p>
                  </div>
                </div>
                )
              )
            }
          
            
          </section>

          <div class="rc-layout-container rc-two-column" style={{padding: '68px'}}>
            <div class="rc-column" style={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
              <div>
              <h2 style={{ color: '#E2001A'}}>
              Veterinary health nutrition
            </h2>
              <p>
              At Royal Canin, we believe that nutrition plays a key role in supporting the health and well-being of cats and dogs. This is why we have designed ROYAL CANIN® Veterinary diets around proven nutritional science in order to address specific pet conditions.
Follow your veterinarian's nutritional recommendation here below.
              </p>
              {/* <button class="rc-btn rc-btn--one" onClick={() => this.setState({isAddNewCard: true, paymentCompShow: true})}>View in Cart</button> */}
              </div>
            </div>
            <div class="rc-column">
              <img src={recommendation1} style={{width: '100%'}}/>
            </div>
          </div>
          <div class="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{textAlign: 'center'}}>
              <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
                Our pet experts are here to help you
              </h2>
              <p>
                We're pet lovers and experts in cat and dog nutrition and we're ready to to help you with any questions you might have.
              </p>
              
            </section>
            <div class="experience-region experience-main">
              <div class="experience-region experience-main">
                <div class="experience-component experience-layouts-1column">
                  <div class="row rc-margin-x--none">
                    <div class="rc-full-width">
                      <div class="experience-component experience-assets-contactUsBlock">
                        <div class="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div class="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile">
                          
                            {/* <div class="rc-padding-bottom--none--mobile" style={{ width: '40%' }}>
                              <h1 class="rc-beta" style={{ margin: '0 0 0 1rem' }}>
                                <font style={{ verticalAlign: "inherit" }}>
                                  <font style={{ verticalAlign: "inherit" }}><FormattedMessage id="help.needHelp" /></font>
                                </font>
                              </h1>
                            </div>
                            <div style={{ width: '60%' }}>
                              <div class="rc-large-body inherit-fontsize children-nomargin">
                                <p>
                                  <FormattedMessage id="help.tip1" /><br /><FormattedMessage id="help.tip4" />
                                </p>
                              </div>
                            </div> */}
                          </div>
                          <div class="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                            <div class="rc-column rc-double-width rc-padding--none">
                              <article class="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div class="rc-border-all rc-border-colour--interface fullHeight">
                                  <div class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div class="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div class="w-100">
                                        <b style={{ color: "#00BCA3" }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>
                                          {this.props.configStore.contactTimePeriod}
                                        </p>
                                        <div class="rc-margin-top--xs">
                                          <p style={{ color: "#00BCA3" }} class="rc-numeric rc-md-up">
                                            {this.props.configStore.storeContactPhoneNumber}
                                          </p>
                                        </div>
                                        <div class="rc-margin-top--xs">
                                          <p style={{ color: "#00BCA3" }} class="rc-alpha rc-border--none rc-md-down">
                                            {this.props.configStore.storeContactPhoneNumber}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="rc-column rc-content-v-middle">
                                      <img class="align-self-center widthAuto" src={callImg} alt="By telephone" title="By telephone" />
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article class="rc-full-width rc-column">
                                <div class="rc-border-all rc-border-colour--interface fullHeight">
                                  <div class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div class="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div class="w-100">
                                        <b style={{ color: "#0087BD" }}><font style={{ verticalAlign: "inherit" }}><font style={{ verticalAlign: "inherit" }}><FormattedMessage id="help.byEmail" /></font></font></b>
                                        <p>
                                          <span style={{ color: "rgb(0, 0, 0)" }}>
                                            <font style={{ verticalAlign: "inherit" }}>
                                              <font style={{ verticalAlign: "inherit" }}><FormattedMessage id="help.tip3" /></font>
                                            </font>
                                          </span>
                                        </p>
                                        <div class="rc-margin-top--xs">
                                          <p class="rc-numeric rc-md-up" style={{ color: "rgb(0, 135, 189)" }}>
                                            {this.props.configStore.storeContactEmail}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="rc-column rc-content-v-middle">
                                      <img class="align-self-center widthAuto" src={emailImg} alt="By email" title="By email" />
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                            <div class="rc-column rc-triple-width">
                              <div class="background-cover" style={{ backgroundImage: `url(${require("@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png")})` }}>
                                <picture class="rc-card__image">
                                  <img src={helpImg} alt=" " title=" " />
                                </picture>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <section style={{textAlign: 'center'}}>
            <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
              Why Royal Canin?
            </h2>
            <p>
              Your pet means the world to you, and their health and happiness means the world to us ! 
            </p>
          </section>
          <section className="picList" style={{textAlign: 'center', display: 'flex'}}>
            <li><img src={recommendation2}/></li>
            <li><img src={recommendation3}/></li>
            <li><img src={recommendation4}/></li>
          </section>
          <section style={{padding: '40px 68px', background: '#f6f6f6'}}>
            <p>
              Donec nec ornare risus. Nunc id interdum eros, a pellentesque turpis. Nullam tellus metus, rutrum ut tortor at, bibendum molestie nulla. Donec commodo pretium urna. Morbi arcu turpis, feugiat vel luctus in, placerat in leo. Fusce tincidunt dui ac dui ultricies, dictum sagittis est venenatis. Nullam imperdiet fermentum scelerisque. Etiam ante magna, maximus eleifend gravida ut, venenatis nec justo. Donec eu tincidunt erat. Suspendisse vehicula nibh a metus vestibulum, quis maximus turpis scelerisque. Maecenas ac lectus justo. Sed id justo id orci consectetur tempor. Cras ut diam in quam tempor volutpat ut a enim. Vivamus lacinia mauris sed accumsan dapibus.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    )
  }
}

export default Help
