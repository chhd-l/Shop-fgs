import React from 'react'
import GoogleTagManager from '@/components/GoogleTagManager'
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
import ImageMagnifier from "@/components/ImageMagnifier";
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip'
import './index.css'

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
      images: []
    }
  }

  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  async componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
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
    let details = JSON.parse(sessionStorage.getItem('detailsTemp'))
    let images = JSON.parse(sessionStorage.getItem('imagesTemp'))
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
              <button class="rc-btn rc-btn--one">View in cart</button>
            </p>
          </section>
          
          
          {/* <div class="rc-bg-colour--brand4 text-center" >
            <div class="rc-layout-container rc-content-h-middle">
              <div class="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs">
                <span class="rc-icon rc-icon rc-delivery--sm rc-brand1 rc-iconography"></span>
                <div class="d-flex align-items-center">
                  <span class="rc-margin-right--xs rc-margin-left--xs">
                    <font style={{verticalAlign: "inherit"}}>
                      <font style={{verticalAlign: "inherit"}}>FREE home delivery! </font>
                      <font style={{verticalAlign: "inherit"}}>(allow a delay of 5 to 7 days due to the exceptional context)</font>
                    </font>
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <section className="recommendProduct">
            <div className="recommendProductInner">
              <div className="left">
                <div style={{padding: '32px'}}>
                  Recommendation Package
                </div>
                <ul>
                  <li>
                    <img src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202007260439267294.png"/>
                    <span>Renal Dry</span>
                  </li>
                  <li></li>
                </ul>
              </div>
              <div className="right">
                <div className="main">
                  <div className="pic">
                    <ImageMagnifier
                      sizeList={details.sizeList}
                      video={details.goodsVideo}
                      images={images}
                      minImg={details.goodsImg}
                      maxImg={details.goodsImg}
                      config={false}
                    />
                  </div>
                  <div className="text">
                  <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
                    Renal + Hypoallergenic
                  </h2>
                  <h4>
                    From $15.99 to $40.99
                  </h4>
                  <p>
                    Renal + hypoallergenic is a complete dietetic food for adult dogs, formulated to support renal function during chronic kidney disease and intended for the reduction of intolerances to certain ingredients…
                  </p>
                  <p>
                    <button class="rc-btn rc-btn--one">View in cart</button>
                  </p>
                  </div>
                  
                </div>
                <div className="description">
                  <p style={{
                    // fontFamily: 'DINPro-Medium',
                    fontSize: '16px',
                    color: '#666666',
                    fontWeight: '500',
                    letterSpacing: '0'}}>Paragon Veterinary Group</p>
                  <p style={{
                    // fontFamily: 'DINPro-Medium',
                    fontSize: '12px',
                    // color: '#666666',
                    letterSpacing: '0'}}>House, Townhead Rd, Dalston, Carlisle CA5 7JF</p>
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
              <button class="rc-btn rc-btn--one" onClick={() => this.setState({isAddNewCard: true, paymentCompShow: true})}>View in Cart</button>
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
                                            {/* 800 024 77 64 */}
                                            {this.props.configStore.storeContactPhoneNumber}
                                          </p>
                                        </div>
                                        <div class="rc-margin-top--xs">
                                          <p style={{ color: "#00BCA3" }} class="rc-alpha rc-border--none rc-md-down">
                                            {/* 800 024 77 64 */}
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
                                            {/* contacto.mex@royalcanin.com */}
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
                              {/* <h1 class="rc-beta" style={{ margin: '0 0 0 1rem' }}>
                                <font style={{ verticalAlign: "inherit" }}>
                                  <Link className="rc-list__link" style={{ color: '#e2001a' }} to="/FAQ" role="menuitem">
                                    <FormattedMessage id="footer.FAQ" />
                                  </Link>
                                </font>
                              </h1> */}
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
            <p>
              <button class="rc-btn rc-btn--one">View in cart</button>
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
