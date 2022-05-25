import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { injectIntl } from 'react-intl-phraseapp';
import CATSPng from './images/CATS2@2x.jpg';
import catAndPhone from './images/catAndPhone.png';
import mockData from './mock.json';
import { funcUrl } from '@/lib/url-utils';
import './index.less';
import ProductCarousel from '@/components/ProductCarousel';
import Help from '../../SmartFeederSubscription/modules/Help';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';
const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('clinicStore')
@injectIntl
@seoHoc('Shelter landing page')
@observer
class ShelterPrescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: mockData.data.map((ele) =>
        Object.assign(ele, {
          goodsImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation/${ele.goodsImg}`
        })
      ),
      defalutList: Array(8).fill({})
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
    const { clinicStore } = this.props;

    const clinicId = funcUrl({ name: 'shelterID' });
    clinicStore.setLinkClinicId(clinicId);
    sessionItemRoyal.set('BreedOrShelterId', clinicId);
    clinicStore.setLinkClinicName('');
    clinicStore.setAuditAuthority(false);
  }
  render() {
    return (
      <div className="shelter-prescription">
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
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
                        Expert food and product recommendations
                      </div>
                      <div className="banner-benefits-li col-6">
                        Free shipping, with no minimum purchase
                      </div>
                      <div className="banner-benefits-li col-6">
                        5% off every autoship order
                      </div>
                      <div className="banner-benefits-li col-6">
                        Access to a Royal Canin Advisor
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
                      nutrition and support for your pet –– along with automatic
                      shipping and discounts. Your membership also includes
                      access to a Royal Canin Advisor (think of this person as
                      your coach): get breed-specific diet information and
                      nutrition advice, plus updates on Royal Canin products and
                      services –– including auto-ship frequency, registration
                      and transaction history.
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
            <ProductCarousel
              // targetType="_blank"
              goodsList={this.state.list}
              title={
                <h2 className="rc-gamma rc-text--center rc-margin-bottom--md">
                  Select your product from recommendations
                </h2>
              }
            />
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
            />
          </div>
          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            />
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
