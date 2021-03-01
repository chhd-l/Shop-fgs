import React from 'react';
import { Link } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import CATSPng from './images/CATS@2x.png';
import catAndPhone from './images/catAndPhone.png';
import videoPng from './images/video.png';
import expertisePng from './images/expertise.png';
import qualityPng from './images/quality.png';
import partnershipPng from './images/partnership.png';
import { getList } from '@/api/list';
import { formatMoney } from '@/utils/utils';
import './index.less';
import Slider from 'react-slick';
// import Rate from '@/components/Rate';
import Help from '../../SmartFeederSubscription/modules/Help';

class ShelterPrescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.helpContentText = {
      title: "We're Here to Help",
      des:
        "As true pet lovers and experts in tailored nutrition, we're here to help you give your pet the healthiest life possible",
      emailTitle: 'Email us',
      emailDes: ' We will respond as soon as possible.',
      phoneTitle: 'Call us',
      phone: '1-844-673-3772',
      email: 'Send us an Email',
      phoneDes: 'Monday trought Friday:8:00 AM - 4:30  PM CT'
    };
  }
  toScroll = (anchorName) => {
    let anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  };
  componentDidMount() {
    this.getDefaultList();
  }
  async getDefaultList() {
    let goodsIds = [
      '2c91808577d2c0dd0177d2ca8161016c',
      '2c91808577d2c0dd0177d2ca61580097',
      '2c918085768f3a4101768f3f464b0084',
      '2c918085768f3a4101768f3f053e0071',
      '2c91808577417a280177419f2c790000',
      '2c918085768f3a4101768f3f73c10093'
    ];
    let res = await getList({ goodsIds });
    let list = res.context?.goodsList;
    this.setState({ list });
    console.info('.....', res);
  }
  getList = (item) => {
    return (
      <Link to='/'>
       <a className="rc-card__link">
        <article className="rc-card rc-card--b">
          <picture className="rc-card__image">
            <img
              style={{ maxHeight: '12rem' }}
              alt={item.goodsName}
              src={item.goodsImg}
            />
          </picture>
          <div className="rc-card__body">
            <header>
              <h1 className="rc-card__title" style={{ height: '2em' }}>
                {item.goodsName}
              </h1>
              <div className="ui-text-overflow-line2">{item.goodsSubtitle}</div>
              {/* <div className="rc-btn-group">
                <Rate def={2} disabled={true} marginSize="smallRate" />
                <span
                  className="comments rc-margin-left--xs rc-text-colour--text"
                  style={{ marginTop: '3px' }}
                >
                  (12)
                </span>
              </div> */}
              {/* <div>Start from</div> */}
              <div className="price-item">
                {formatMoney(item.minMarketPrice)}
              </div>
            </header>
          </div>
        </article>
      </a>
   </Link>
      );
  };
  render() {
    const { match, history, location } = this.props;
    let slideWidth = (document.body.clientWidth - 48) / 1.5;
    const settings = {
      className: 'slider variable-width',
      // dots: true,
      // infinite: true,
      // centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      variableWidth: true
    };
    return (
      <div className="shelter-prescription">
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--sm--mobile rc-layout-container rc-three-column">
            <div class="col-12 col-lg-5 rc-padding-x--sm--desktop">
              <img src={CATSPng} />
            </div>
            <div class="col-12 col-lg-7">
              <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                <h1 className="red rc-beta markup-text">
                  Shop Royal Canin®. Give Back To Your Shelter.
                </h1>
                <p>
                  Your local shelter staff works tirelessly to keep pets like
                  yours happy and healthy while they are waiting for their
                  forever home – this dedication includes feeding these pets
                  quality, precise nutrition. Now, when you buy Royal Canin® pet
                  food through this link, your pet gets the support of tailored
                  nutrition and{' '}
                  <strong>
                    10% of your purchase amount is credited back to your shelter
                    to feed the pets in their care.
                  </strong>
                </p>
                <div className="banner-benefits">
                  <h6 className="rc-delta markup-text red">
                    Sign up for autoship to become a member of the Royal Canin
                    Club and you’ll receive these benefits:
                  </h6>
                  <div className="rc-layout-container rc-two-column banner-benefits-box red-dot-list row rc-margin-bottom--sm rc-margin-bottom--md--mobile text-left">
                    <div className="banner-benefits-li col-6">
                      30% off your first purchase
                    </div>
                    <div className="banner-benefits-li col-6">
                      5% off every autoship purchase
                    </div>
                    <div className="banner-benefits-li col-6">
                      Royal Canin Pet Advisor Live App
                    </div>
                    <div className="banner-benefits-li col-6">
                      Free shipping right to your home
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => this.toScroll('selectProduct')}
                      className="rc-btn rc-btn--one gtm-content-block-btn "
                    >
                      Shop Recommended Formulas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gray-for-pc rc-padding-top--xl--mobile">
            <div class="rc-layout-container rc-two-column rc-max-width--xl rc-padding-x--sm rc-padding-x--sm--mobile">
              <div className=" col-12 col-lg-6">
                <div class=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                  <h2 className="red rc-beta markup-text">
                    Join The Club. Get Big Perks.
                  </h2>
                  <p>
                    When you choose autoship, you’re automatically part of the
                    Royal Canin® Club. With your membership, you get tailored
                    nutrition and support for your pet – along with automatic
                    shipping and discounts. Your membership also includes Royal
                    Canin Pet Advisor Live, where you can chat with a
                    veterinarian around the clock about your pet’s health,
                    nutrition and behavior; track your pet’s growth; and more.
                  </p>
                  <p>
                    <Link to="/subscription-landing">
                      <button className="rc-btn rc-btn--two gtm-content-block-btn ">
                        JOIN THE CLUB
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
              <div class=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                <img src={catAndPhone} />
              </div>
            </div>
          </div>
          <div id="selectProduct" className="select-position"></div>
          <div className="rc-padding-top--md rc-padding-x--xl--desktop">
            <h2 className="rc-gamma rc-text--center rc-margin-bottom--md">
              Select your product from recommendations
            </h2>
            <div class=" rc-md-up">
              <div
                className="rc-carousel rc-carousel--cards rc-match-heights"
                data-js-carousel=""
                data-rc-cards="true"
              >
                <div className="rc-carousel__card-gal product-list">
                  {this.state.list.map((item, idx) => (
                    <div>{this.getList(item)}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rc-md-down rc-padding-x--lg">
              <Slider {...settings}>
                {this.state.list.map((item, idx) => (
                  <div
                    style={{
                      width: slideWidth
                    }}
                    className={`swiper-slide`}
                    key={idx}
                  >
                    <div
                      style={{ padding: '0 0.5rem', boxSizing: 'border-box' }}
                    >
                      {this.getList(item)}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="rc-padding-top--lg text-center rc-column ">
            <Help contentText={this.helpContentText} needReverse={false} />
          </div>
          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            ></div>
          </div>
          <div class="rc-max-width--md text-center rc-margin-y--md section-why text-center">
            <h4 className="red">Why Royal Canin?</h4>
            <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
              We focus our attention on the unique needs of cats and dogs. That
              obsession with detail is what makes it possible for us to deliver
              precise, effective nutrition and help pets become their
              magnificent best.
            </div>
            <div class="experience-component experience-assets-youtubeVideo">
              <div class="rc-max-width--md rc-padding-x--lg">
                <div class="rc-video-wrapper dog-video">
                  <iframe
                    allowfullscreen=""
                    frameborder="0"
                    id="video-dog"
                    class="optanon-category-4 "
                    src="https://www.youtube.com/embed/FYwO1fiYoa8"
                  ></iframe>
                </div>
              </div>
            </div>
            {/* <iframe
              allowfullscreen=""
              frameborder="0"
              id="video-cat"
              class="optanon-category-4 show-video"
              src="https://www.youtube.com/watch?v=FYwO1fiYoa8&feature=emb_logo&ab_channel=ROYALCANIN"
            ></iframe> */}
          </div>
          {/* <div className="rc-padding-top--xl--desktop rc-max-width--lg rc-padding-x--md  rc-padding-x--xl--mobile  rc-layout-container rc-three-column">
            <div className="rc-column">
              <img src={expertisePng} />
            </div>
            <div className="rc-column">
              <img src={partnershipPng} />
            </div>
            <div className="rc-column">
              <img src={qualityPng} />
            </div>
          </div> */}
        </main>
        <Footer />
      </div>
    );
  }
}
export default ShelterPrescription;
