import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import CATSPng from './images/CATS2@2x.jpg';
import catAndPhone from './images/catAndPhone.png';
import { IMG_DEFAULT } from '@/utils/constant';
import videoPng from './images/video.png';
import expertisePng from './images/expertise.png';
import qualityPng from './images/quality.png';
import partnershipPng from './images/partnership.png';
import { getList } from '@/api/list';
import mockData from './mock.json';
import { formatMoney } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import './index.less';
import Slider from 'react-slick';
// import Rate from '@/components/Rate';
import Help from '../../SmartFeederSubscription/modules/Help';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;

@inject('clinicStore')
@injectIntl
@observer
class ShelterPrescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: mockData.data,
      defalutList: Array(8).fill({}),
      // list: [{}]
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      }
    };
    this.helpContentText = {
      title: this.props.intl.messages['recommendation.helpContentText.title'],
      des: this.props.intl.messages['recommendation.helpContentText.des'],
      emailTitle:
        this.props.intl.messages['recommendation.helpContentText.emailTitle'],
      emailDes:
        this.props.intl.messages['recommendation.helpContentText.emailDes'],
      emailLink:
        this.props.intl.messages['recommendation.helpContentText.emailLink'],
      phoneTitle:
        this.props.intl.messages['recommendation.helpContentText.phoneTitle'],
      phone: this.props.intl.messages['recommendation.helpContentText.phone'],
      email: this.props.intl.messages['recommendation.helpContentText.email'],
      phoneDes1: `<strong>${this.props.intl.messages['recommendation.helpContentText.phoneDes1']}</strong>`,
      phoneDes2:
        this.props.intl.messages['recommendation.helpContentText.phoneDes2']
      // title: "We're Here to Help",
      // emailLink: '/help/contact',
      // des:
      //   "As true pet lovers and experts in tailored nutrition, we're here to help you give your pet the healthiest life possible",
      // emailTitle: 'Email us',
      // emailDes: ' We will respond as soon as possible.',
      // phoneTitle: 'Call us',
      // phone: '1-844-673-3772',
      // email: 'Send us an email',
      // phoneDes: '<strong>Monday to Friday:</strong> 8:00 AM - 4:30  PM CT'
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
    setSeoConfig({
      pageName: 'Shelter landing page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });

    let clinicId = funcUrl({ name: 'shelterID' });
    this.props.clinicStore.setLinkClinicId(clinicId);
    this.props.clinicStore.setLinkClinicName('');
    this.props.clinicStore.setAuditAuthority(false);
    // this.getDefaultList();
  }
  getDefaultList() {
    let goodsIds = [
      '2c91808577d2c0dd0177d2ca8161016c',
      '2c91808577d2c0dd0177d2ca61580097',
      '2c918085768f3a4101768f3f464b0084',
      '2c918085768f3a4101768f3f053e0071',
      '2c91808577417a280177419f2c790000',
      '2c918085768f3a4101768f3f73c10093',
      '2c918085781fb64701781feace710003'
    ];
    // try {
    // //   res = await getList({ goodsIds });
    // // } catch (err) {
    // //   res = mockData;
    // }
    let res = mockData;
    let list = res.data;
    this.setState({ list });
    console.info('.....', list);
  }
  getListItem = (idx) => {
    let item = this.state.list[idx] || {};
    return (
      <Link
        target="_blank"
        to={{
          pathname: item
            ? `/${
                item.name
                  ? item.name
                      .toLowerCase()
                      .split(' ')
                      .join('-')
                      .replace('/', '')
                  : ''
              }-${item.goodsNo}`
            : ''
        }}
      >
        {/* <Link to="/"> */}
        <a className="rc-card__link rc-card--product">
          <article className="rc-card rc-card--b rc-outline-light slik-list-article">
            <picture className="rc-card__image">
              <img
                className="m-auto"
                style={{ maxHeight: '150px', maxWidth: '150px' }}
                alt={item.name}
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation/${item.goodsImg}`}
              />
            </picture>
            <div className="rc-card__body">
              <header>
                <h3
                  className="ui-text-overflow-line2 rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop"
                  // style={{ height: '64px' }}
                >
                  {item.name}
                </h3>
              </header>
              <div
                className="ui-text-overflow-line2"
                // style={{ height: '48px' }}
              >
                {item.goodsSubtitle}
              </div>
              {/* <div className="rc-btn-group">
                <Rate def={2} disabled={true} marginSize="smallRate" />
                <span
                  className="comments rc-margin-left--xs rc-text-colour--text"
                  style={{ marginTop: '3px' }}
                >
                  (12)
                </span>
              </div> */}
              {item.upperPrice ? (
                <div>from</div>
              ) : (
                <div style={{ color: '#fff' }}>from</div>
              )}
              <div className="price-item">{formatMoney(item.lowPrice)}</div>
            </div>
          </article>
        </a>
        {Boolean(window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW) && (
          <span className="warning_blank">Opens a new window</span>
        )}
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
    const settingsPC = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4
    };
    return (
      <div className="shelter-prescription">
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-layout-container rc-three-column">
            <div className=" row align-items-md-center rc-margin-x--none">
              <div className="col-12 col-lg-5 rc-padding-x--sm--desktop">
                <lazyLoad>
                  <img src={CATSPng} alt="cats image" />
                </lazyLoad>
              </div>
              <div className="col-12 col-lg-7">
                <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                  <h1 className="red rc-beta markup-text">
                    Shop Royal Canin®. Give Back To Your Shelter.
                  </h1>
                  <p>
                    Your local shelter staff works tirelessly to keep pets like
                    yours happy and healthy while they are waiting for their
                    forever home – this dedication includes feeding these pets
                    quality, precise nutrition. Now, when you buy Royal Canin®
                    pet food through this link, your pet gets the support of
                    tailored nutrition and{' '}
                    <strong>
                      10% of your purchase amount is credited back to your
                      shelter to feed the pets in their care.
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
                        Royal Canin Pet Advisor Live
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
          </div>
          <div className="rc-padding-top--xl--mobile rc-bg-colour--brand4">
            <div className="rc-layout-container rc-two-column rc-max-width--xl rc-padding-x--sm rc-padding-x--sm--mobile align-items-md-center">
              <div className="row align-items-md-center">
                <div className=" col-12 col-lg-6">
                  <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                    <h2 className="red rc-beta markup-text">
                      Join The Club. Get Big Perks.
                    </h2>
                    <p style={{ wordBreak: 'break-word' }}>
                      When you choose autoship, you’re automatically part of the
                      Royal Canin® Club. With your membership, you get tailored
                      nutrition and support for your pet – along with automatic
                      shipping and discounts. Your membership also includes
                      Royal Canin Pet Advisor Live, where you can chat with a
                      veterinarian around the clock about your pet’s health,
                      nutrition, behavior and more.
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
                <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                  <img src={catAndPhone} alt="cat and phone" />
                </div>
              </div>
            </div>
          </div>
          <div id="selectProduct" className="select-position"></div>
          <div className="rc-padding-top--md rc-padding-x--xl--desktop">
            <h2 className="rc-gamma rc-text--center rc-margin-bottom--md">
              Select your product from recommendations
            </h2>
            <div className=" rc-md-up">
              {/* <Slider {...settingsPC}>
                {this.state.defalutList.map((item, idx) => (
                  <div className={`swiper-slide`} key={idx}>
                    <div
                      style={{ padding: '0 0.5rem', boxSizing: 'border-box' }}
                    >
                      {this.getListItem(item)}
                    </div>
                  </div>
                ))}
              </Slider> */}
              <div
                className="rc-carousel rc-carousel--cards rc-match-heights"
                data-js-carousel=""
                data-rc-cards="true"
              >
                <div className="rc-carousel__card-gal product-list">
                  {this.state.defalutList.map((item, idx) => (
                    <div className="for-last-hidden">
                      {this.getListItem(idx)}
                    </div>
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
                      {this.getListItem(idx)}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="rc-padding-top--lg text-center">
            <Help
              isRecommendationPage={true}
              contentText={this.helpContentText}
              needReverse={false}
            />
          </div>
          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            ></div>
          </div>
          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            ></div>
          </div>
          <div className="rc-max-width--md text-center section-why text-center">
            <div className="rc-max-width--md text-center rc-margin-y--md">
              <div className="rc-beta inherit-fontsize">
                <h3 className="red">Why Royal Canin?</h3>
              </div>
              <div>
                {/* <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content"> */}
                <p style={{ wordBreak: 'break-word' }}>
                  We focus our attention on the unique needs of cats and dogs.
                  That obsession with detail is what makes it possible for us to
                  deliver precise, effective nutrition and help pets become
                  their magnificent best.
                </p>
              </div>
            </div>

            <div className="experience-component experience-assets-youtubeVideo">
              <div className="rc-max-width--md rc-padding-x--lg">
                <div className="rc-video-wrapper dog-video">
                  <iframe
                    allowfullscreen=""
                    frameborder="0"
                    id="video-dog"
                    className="optanon-category-4 "
                    src="https://www.youtube.com/embed/FYwO1fiYoa8"
                    title="making a better world for pets"
                  />
                </div>
              </div>
            </div>
            {/* <iframe
              allowfullscreen=""
              frameborder="0"
              id="video-cat"
              className="optanon-category-4 show-video"
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
          <Footer />
        </main>
      </div>
    );
  }
}
export default ShelterPrescription;
