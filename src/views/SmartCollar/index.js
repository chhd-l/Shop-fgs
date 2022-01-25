import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { seoHoc } from '@/framework/common';
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

@injectIntl
@seoHoc('About Us Page')
class SmartCollar extends React.Component {
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
        </Helmet>
        <Header showMiniIcons={true} showUserIcon={true} {...this.props} />
        <main className="smartCollar rc-content--fixed-header rc-bg-colour--brand3">
          <div className="max-w-full px-0 md:px-36">
            <div className="flex flex-col md:flex-row">
              <img src={hero} alt="hero" className="w-full md:w-1/2" />
              <div className="w-full md:w-1/2 flex flex-col justify-center ml-0 md:ml-5 items-center md:items-start">
                <div
                  className="tracking-normal md:tracking-tighter text-2xl md:text-4xl text-center md:text-left leading-tight md:leading-normal mt-5 md:mt-0 mb-5 md:mb-10 ml-5 md:ml-0 mr-5 font-normal"
                  style={{ color: '#E2001A' }}
                >
                  The Smart collar that gives you the ultimate insight into your
                  dog’s wellbeing
                </div>
                <div className="mb-5 md:mb-0">
                  <button className="rc-btn rc-btn--one text-xs md:text-sm">
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
                <div className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={Bracelet}
                    alt="Bracelet"
                    className="w-32 md:w-48 ml-0 md:ml-32"
                  />
                </div>
              </div>
              <div className="w-full px-4 md:px-48 font-normal text-center text-2xl md:text-3xl my-4 md:my-12 leading-tight md:leading-normal">
                Whistle Fit is a smart device that easily attaches to your dog’s
                collar, so it helps you making sure that:
              </div>
              <div className="w-full flex justify-between flex-wrap mt-6 md:mt-0">
                <div className="w-full md:w-auto flex flex-col items-center">
                  <img
                    src={enjoyTraining}
                    alt="enjoyTraining"
                    className="w-12 md:w-16"
                  />
                  <div className="h4 w-72 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                    They are getting enough exercise
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center">
                  <img
                    src={eatingFood}
                    alt="eatingFood"
                    className="w-12 md:w-16"
                  />
                  <div className="h4 w-96 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                    They are eating the right amount of food
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center">
                  <img src={dog} alt="dog" className="w-12 md:w-16" />
                  <div className="w-80 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                    They are in good health and displaying normal behaviour
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center my-10">
                <button className="rc-btn rc-btn--one text-xs md:text-sm">
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
                <img src={group1} alt="group1" className="w-48 md:w-64" />
                <div className="h4 w-72 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                  Monitor behavior
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col items-center">
                <img src={group2} alt="group2" className="w-48 md:w-64" />
                <div className="h4 w-96 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                  Monitor activities
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col items-center">
                <img src={group3} alt="group3" className="w-48 md:w-64" />
                <div className="h4 w-80 text-center text-xl md:text-2xl font-normal mt-3 md:mt-6 mb-6">
                  Tele-vet
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center my-10">
              <button className="rc-btn rc-btn--one text-xs md:text-sm">
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
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={packshotWf}
                  alt="Bracelet"
                  className="w-48 md:w-96 mr-0 md:mr-64"
                />
              </div>
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
          <div className="max-w-full px-0 md:px-36">
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
                Keep me udpadted on Whistle Fit availability
              </button>
            </div>
            <div className="flex justify-center justify-items-start mb-10 px-4 md:px-4">
              <div className="max-w-xl rc-input rc-input--inline">
                <input
                  className="rc-input__checkbox"
                  id="id-checkbox-cat"
                  value="Cat"
                  type="checkbox"
                  name="checkbox-1"
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

export default SmartCollar;
