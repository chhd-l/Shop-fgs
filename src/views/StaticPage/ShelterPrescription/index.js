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
import './index.less';
import Slider from 'react-slick';
// import Rate from '@/components/Rate';
import Help from '../../SmartFeederSubscription/modules/Help';

class ShelterPrescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  getList = () => {
    return (
      <a className="rc-card__link">
        <article className="rc-card rc-card--b">
          <picture className="rc-card__image">
            <img
              style={{ maxHeight: '12rem' }}
              alt="alt text"
              src="https://d2cstgstorage.z13.web.core.windows.net/202101070635420744.jpg"
            />
          </picture>
          <div className="rc-card__body">
            <header>
              <h1 className="rc-card__title" style={{ height: '2em' }}>
                Mother & Babycat
              </h1>
              <div>Canned Cat Food</div>
              {/* <div className="rc-btn-group">
                <Rate def={2} disabled={true} marginSize="smallRate" />
                <span
                  className="comments rc-margin-left--xs rc-text-colour--text"
                  style={{ marginTop: '3px' }}
                >
                  (12)
                </span>
              </div> */}
              <div>Start from</div>
              <div className="price-item">$21.99</div>
            </header>
          </div>
        </article>
      </a>
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
            <div class="rc-column">
              <img src={CATSPng} />
            </div>
            <div class="rc-column  rc-double-width d-flex colom-direction rc-content-v-middle">
              <h4 className="red">
                SHOP ROYAL CANIN®. GIVE BACK TO YOUR SHELTER.
              </h4>
              <div style={{ paddingBottom: '0.5rem' }}>
                Your local shelter staff works tirelessly to keep pets like
                yours happy and healthy while they are waiting for their forever
                home – this dedication includes feeding these pets quality,
                precise nutrition. Now, when you buy Royal Canin® pet food
                through this link, your pet gets the support of tailored
                nutrition and 10% of your purchase amount is credited back to
                your shelter to feed the pets in their care.
              </div>
              <div className="banner-benefits">
                <h6 className="red">
                  Sign up for autoship to become a member of the Royal Canin
                  Club and you’ll receive these benefits:
                </h6>
                <div className="rc-layout-container rc-two-column banner-benefits-box">
                  <div class="rc-column no-padding-bottom">
                    <div className="banner-benefits-li">
                      30% off your first purchase
                    </div>
                    <div className="banner-benefits-li">
                      5% off every autoship purchase
                    </div>
                  </div>
                  <div class="rc-column">
                    <div className="banner-benefits-li">
                      Royal Canin Pet Advisor Live App
                    </div>
                    <div className="banner-benefits-li">
                      Free shipping right to your home
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => this.toScroll('selectProduct')}
                    className="rc-btn rc-btn--sm rc-btn--one"
                  >
                    Shop Recommended Formulas
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="gray-for-pc rc-padding-top--xl--mobile">
            <div class="rc-layout-container rc-two-column rc-max-width--xl rc-padding-x--sm rc-padding-x--sm--mobile">
              <div class="rc-column no-padding-bottom  d-flex colom-direction rc-content-v-middle">
                <div className="max-width475">
                  <h5 className="red">JOIN THE CLUB. GET BIG PERKS.</h5>
                  <p>
                    When you choose autoship, you’re automatically part of the
                    Royal Canin® Club. With your membership, you get tailored
                    nutrition and support for your pet – along with automatic
                    shipping and discounts. Your membership also includes Royal
                    Canin Pet Advisor Live, where you can chat with a
                    veterinarian around the clock about your pet’s health,
                    nutrition and behavior; track your pet’s growth; and more.
                  </p>
                </div>
                <p>
                  <Link href="/subscription-landing">
                    <button className="rc-btn rc-btn--sm rc-btn--two">
                      Join the Club
                    </button>
                  </Link>
                </p>
              </div>
              <div class="rc-column no-padding-bottom">
                <img src={catAndPhone} />
              </div>
            </div>
          </div>
          <div id="selectProduct" className="select-position"></div>
          <div className="rc-max-width--xl">
            <h3 className="red rc-padding-y--sm text-center">
              Select your product from recommendations
            </h3>
            <div class=" rc-md-up">
              <div
                className="rc-carousel rc-carousel--cards rc-match-heights"
                data-js-carousel=""
                data-rc-cards="true"
              >
                <div className="rc-carousel__card-gal product-list">
                  {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                    <div>{this.getList()}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rc-md-down rc-padding-x--lg">
              <Slider {...settings}>
                {[1, 2, 3, 4, 5, 6].map((item, idx) => (
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
                      {this.getList()}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <Help contentText={this.helpContentText} needReverse={false} />
          <div class="section-why text-center">
            <h4 className="red">Why Royal Canin?</h4>
            <p>
              We focus our attention on the unique needs of cats and dogs. That
              obsession with detail is what makes it possible for us to deliver
              precise, effective nutrition and help pets become their
              magnificent best.
            </p>
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
          <div className="rc-padding-top--xl--desktop rc-max-width--lg rc-padding-x--md  rc-padding-x--xl--mobile  rc-layout-container rc-three-column">
            <div className="rc-column">
              <img src={expertisePng} />
            </div>
            <div className="rc-column">
              <img src={partnershipPng} />
            </div>
            <div className="rc-column">
              <img src={qualityPng} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
export default ShelterPrescription;
