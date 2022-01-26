import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import Carousel from './components/carousel';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import hero from './images/hero.png';
import Bracelet from './images/Bracelet.png';
import eatingFood from './images/eating-food.png';
import dog from './images/dog.png';
import enjoyTraining from './images/enjoy-training.png';
import poster from './images/poster.png';
import group1 from './images/group1.png';
import group2 from './images/group2.png';
import group3 from './images/group3.png';
import packshotWf from './images/packshot-wf.png';
import './index.less';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class Whistlefit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      email: '',
      isChecked: false
      //intl: this.props.intl.messages
    };
  }
  componentDidMount() {
    setSeoConfig({ pageName: 'Whistlefit' }).then((res) => {
      this.setState({ seoConfig: res });
    });
  }
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changeConsent = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };
  //滚动到底部
  scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
  render(h) {
    const event = {
      page: {
        type: 'landingPage',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    //const { history, match, location } = this.props;
    const { seoConfig } = this.state;

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{seoConfig.title}</title>
          <meta name="description" content={seoConfig.metaDescription} />
          <meta name="keywords" content={seoConfig.metaKeywords} />
        </Helmet>
        <Header showMiniIcons={true} showUserIcon={true} {...this.props} />
        <main className="smartCollar rc-content--fixed-header rc-bg-colour--brand3">
          <div className="max-w-full px-0 md:px-36">
            <div className="flex flex-col md:flex-row">
              <LazyLoad className="w-full md:w-1/2">
                <img src={hero} alt="hero" />
              </LazyLoad>
              <div className="w-full md:w-1/2 flex flex-col justify-center ml-0 md:ml-5 items-center md:items-start">
                <div
                  className="tracking-normal md:tracking-tighter text-2xl md:text-4xl text-center md:text-left leading-tight md:leading-normal mt-5 md:mt-0 mb-5 md:mb-10 ml-5 md:ml-0 mr-5 font-normal"
                  style={{ color: '#E2001A' }}
                >
                  The Smart collar that gives you the ultimate insight into your
                  dog’s wellbeing
                </div>
                <div className="mb-5 md:mb-0">
                  <button
                    className="rc-btn rc-btn--one text-xs md:text-sm"
                    onClick={this.scrollToBottom}
                  >
                    Keep me udpadted on Whistle Fit availability
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-full px-0 md:px-36">
            <div>
              <div
                className="text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl my-6 md:my-12 leading-tight md:leading-normal font-normal"
                style={{ color: '#E2001A' }}
              >
                Look after your dog’s health with Whistle Fit
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="w-full md:w-1/2 text-lg px-4 md:px-0">
                  Your dog can’t tell you whether they are in good health, but
                  the Whistle Fit smart collar can help you find out. Alongside
                  Royal Canin’s 50+ years of knowledge, this clever device gives
                  you a unique window into your pet’s wellness so you can
                  discover the best ways to care for them.
                </div>
                <LazyLoad className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={Bracelet}
                    alt="Bracelet"
                    className="w-32 md:w-48 ml-0 md:ml-32"
                  />
                </LazyLoad>
              </div>
              <div className="w-full px-4 md:px-48 font-normal text-center text-2xl md:text-3xl my-4 md:my-12 leading-tight md:leading-normal">
                Whistle Fit is a smart device that easily attaches to your dog’s
                collar, so it helps you making sure that:
              </div>
              <div className="w-full flex justify-between flex-wrap mt-6 md:mt-0">
                <div className="w-full md:w-auto flex flex-col items-center">
                  <LazyLoad className="w-12 md:w-16">
                    <img src={enjoyTraining} alt="enjoyTraining" />
                  </LazyLoad>
                  <div className="h4 w-72 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                    They are getting enough exercise
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center">
                  <LazyLoad className="w-12 md:w-16">
                    <img src={eatingFood} alt="eatingFood" />
                  </LazyLoad>
                  <div className="h4 w-96 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                    They are eating the right amount of food
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center">
                  <LazyLoad className="w-12 md:w-16">
                    <img src={dog} alt="dog" />
                  </LazyLoad>
                  <div className="w-80 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                    They are in good health and displaying normal behaviour
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center my-10">
                <button
                  className="rc-btn rc-btn--one text-xs md:text-sm"
                  onClick={this.scrollToBottom}
                >
                  Keep me udpadted on Whistle Fit availability
                </button>
              </div>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="max-w-full px-0 md:px-36">
            <div
              className="w-full px-4 md:px-48 font-normal text-center text-2xl md:text-3xl my-4 md:my-12 leading-tight md:leading-normal"
              style={{ color: '#E2001A' }}
            >
              Monitor your pet's health daily
            </div>
            <div className="w-full flex justify-between flex-wrap mt-6 md:mt-0">
              <div className="w-full md:w-auto flex flex-col items-center">
                <LazyLoad className="w-48 md:w-64">
                  <img src={group1} alt="group1" />
                </LazyLoad>
                <div className="h4 w-72 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                  Monitor behavior
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col items-center">
                <LazyLoad className="w-48 md:w-64">
                  <img src={group2} alt="group2" />
                </LazyLoad>
                <div className="h4 w-96 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                  Monitor activities
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col items-center">
                <LazyLoad className="w-48 md:w-64">
                  <img src={group3} alt="group3" />
                </LazyLoad>
                <div className="h4 w-80 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                  Tele-vet
                </div>
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
            <div className="w-full flex justify-center my-10">
              <button
                className="rc-btn rc-btn--one text-xs md:text-sm"
                onClick={this.scrollToBottom}
              >
                Keep me udpadted on Whistle Fit availability
              </button>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="max-w-full px-0 md:px-36">
            <div
              className="px-4 md:px-0 text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl mt-6 mb-3 leading-tight md:leading-normal font-normal"
              style={{ color: '#E2001A' }}
            >
              They loved it!
            </div>
            <div className="experience-component experience-layouts-herocarousel">
              <Carousel history={history} />
            </div>
            <div className="w-full flex justify-center mt-5 md:mt-10 mb-5 md:mb-10">
              <button
                className="rc-btn rc-btn--one text-xs md:text-sm"
                onClick={this.scrollToBottom}
              >
                Keep me udpadted on Whistle Fit availability
              </button>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="max-w-full px-0 md:px-36">
            <div className="flex justify-center">
              <div
                className="w-full md:w-1/2 px-4 md:px-0 text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl my-6 md:my-12 leading-tight md:leading-normal font-normal"
                style={{ color: '#E2001A' }}
              >
                Combine Royal Canin and Whistle Fit for a healthy routine
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-start">
              <LazyLoad className="w-full md:w-1/2 flex justify-center">
                <img
                  src={packshotWf}
                  alt="Bracelet"
                  className="w-48 md:w-96 mr-0 md:mr-64"
                />
              </LazyLoad>
              <div className="w-full md:w-1/2 text-sm md:text-lg px-4 md:px-0 leading-loose mt-0 md:mt-10">
                At Royal Canin, we’ve spent more than 50 years supporting pet
                health through our innovative nutritional solutions and expert
                healthcare advice. When paired with our extensive expert
                knowledge of cats and dogs, the Whistle Fit device not only
                gives you pet health reports and fitness tracking, but also
                personalised advice based on your dog’s unique health needs.
                <br />
                <br />
                Combine Whistle Fit with Royal Canin nutrition for a healthy
                routine.
              </div>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="max-w-full px-0 md:px-36" id="bottom">
            <div className="flex justify-center">
              <div
                className="w-full md:w-2/3 px-4 md:px-0 text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl mt-6 md:mt-12 mb-3 leading-tight md:leading-normal font-normal"
                style={{ color: '#E2001A' }}
              >
                Enter yout e-mail address and we’ll let your know as soon as
                this offer becomes available
              </div>
            </div>
            <div className="flex justify-center">
              <span className="rc-input rc-input--inline rc-input--label">
                <input
                  className="rc-input__control"
                  id="id-text2"
                  type="text"
                  name="text"
                  value={this.state.email}
                  onChange={this.changeEmail}
                />
                <label className="rc-input__label" for="id-text2">
                  <span className="rc-input__label-text">
                    Your email address
                  </span>
                </label>
              </span>
            </div>
            <div className="w-full flex justify-center mt-5 md:mt-10 mb-5 md:mb-10">
              <button className="rc-btn rc-btn--one text-xs md:text-sm">
                I am interested, keep me updated!
              </button>
            </div>
            <div className="flex justify-center justify-items-start mb-10 px-4 md:px-4">
              <div className="max-w-xl rc-input rc-input--inline">
                <input
                  className="rc-input__checkbox"
                  id="id-checkbox-cat"
                  checked={this.state.isChecked}
                  type="checkbox"
                  name="checkbox-1"
                  onChange={this.changeConsent}
                />
                <label
                  className="text-sm rc-input__label--inline"
                  for="id-checkbox-cat"
                >
                  check box data privacy policy. Your email will be used only
                  for this purpose, nothing else
                </label>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Whistlefit;
