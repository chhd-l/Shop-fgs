import React from 'react';
import Steps from './Steps';
import bannerDog from '../img/banner_dog.png';
import bannerDogH5 from '../img/banner_dog_h5.png';
import bannerFood from '../img/banner_food.png';
import video from '../img/video.png';
import foodDispenserTitle from '../img/food_dispenser_title.png';
import foodDispenser1 from '../img/food_dispenser1.png';
import foodDispenser2 from '../img/food_dispenser2.png';
import foodDispenser3 from '../img/food_dispenser3.png';
import phoneImg from '../img/phone.png';
import step1Img from '../img/steps1.png';
import step2Img from '../img/steps2.png';
import step3Img from '../img/steps3.png';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';

const staticPage = (props) => {
  const stepsList = [
    {
      title: props.intl.formatMessage({
        id: 'smartFeederSubscription.stepTitl1'
      }),
      description: props.intl.formatMessage({
        id: 'smartFeederSubscription.stepDes1'
      })
    },
    {
      title: props.intl.formatMessage({
        id: 'smartFeederSubscription.stepTitl2'
      }),
      description: props.intl.formatMessage({
        id: 'smartFeederSubscription.stepDes2'
      })
    },
    {
      title: props.intl.formatMessage({
        id: 'smartFeederSubscription.stepTitl3'
      }),
      description: props.intl.formatMessage({
        id: 'smartFeederSubscription.stepDes3'
      })
    }
  ];
  const sectionList1 = [
    {
      img: step1Img,
      description: 'description'
    },
    {
      img: step2Img,
      description: 'description'
    },
    {
      img: step3Img,
      description: 'description'
    }
  ];
  const sectionList2 = [
    {
      img: foodDispenser1,
      title: props.intl.formatMessage({
        id: 'smartFeederSubscription.dispenser1Title'
      }),
      description: props.intl.formatMessage({
        id: 'smartFeederSubscription.dispenser1Des'
      })
    },
    {
      img: foodDispenser2,
      title: props.intl.formatMessage({
        id: 'smartFeederSubscription.dispenser2Title'
      }),
      description: props.intl.formatMessage({
        id: 'smartFeederSubscription.dispenser2Des'
      })
    },
    {
      img: foodDispenser3,
      title: props.intl.formatMessage({
        id: 'smartFeederSubscription.dispenser3Title'
      }),
      description: props.intl.formatMessage({
        id: 'smartFeederSubscription.dispenser3Des'
      })
    }
  ];
  return (
    <>
      <section className="banner">
        <div
          className="rc-layout-container rc-four-column"
          style={{ alignItems: 'center' }}
        >
          <div
            className="rc-column banner-img rc-triple-width"
            style={{ position: 'relative' }}
          >
            <img
              src={bannerDog}
              className="rc-md-up"
              style={{ width: '100%' }}
            />
            <img
              src={bannerDogH5}
              className="rc-md-down"
              style={{ width: '100%' }}
            />
            <img
              className="rc-md-up banner_food"
              style={{ maxHeight: '84%' }}
              src={bannerFood}
            />
          </div>
          <img className="rc-md-down m-auto" src={bannerFood} />
          <div className="rc-column rc-text--center">
            <div className="title">
              <FormattedMessage id="smartFeederSubscription.tabDes1" />
            </div>
            <div className=" money">
              <FormattedMessage id="smartFeederSubscription.tabDes2" />
            </div>
            <p>
              <FormattedMessage id="smartFeederSubscription.tabDes3" />
            </p>
            <button
              class="button192 rc-btn rc-btn--two"
              onClick={() => props.toScroll('learnMore')}
            >
              <FormattedMessage id="smartFeederSubscription.learnMore" />
            </button>
            <p></p>
            <button
              class="button192 rc-btn rc-btn--one"
              onClick={() => props.toScroll('step1')}
            >
              <FormattedMessage id="smartFeederSubscription.chooseYourProduct" />
            </button>
          </div>
        </div>
      </section>
      {/* <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"> */}
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <h2 className="smartfeedersubscription-title">
          <FormattedMessage id="smartFeederSubscription.titleWhy" />
        </h2>
        <div
          className="rc-layout-container rc-two-column"
          style={{ padding: 0, alignItems: 'center' }}
        >
          <div className="rc-column">
            <Steps stepsList={stepsList} />
          </div>
          <div className="rc-column">
            <img src={video} />
            {/* <video width="320" height="240" controls>
              <source
                src="https://d2cshop.blob.core.windows.net/stg/img/Petkit-with-subtitles-in-French.mp4"
                type="video/mp4"
              ></source>
            </video> */}
          </div>
        </div>
      </section>
      <p></p>
      <p></p>
      <p></p>

      {/* <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <div
          className="rc-layout-container rc-two-column rc-text--center"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <div className="rc-column">
            <span>full details in FAQ</span>
          </div>
          <div className="rc-column">
            <button className="rc-btn rc-btn--one">choose your product</button>
          </div>
        </div>
      </section> */}
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil introduction_food_dispenser">
        <div className="rc-layout-container rc-three-column pt-lg-5">
          <div className="rc-column title_special">
            <img
              src={foodDispenserTitle}
              className=""
              style={{ width: '90%' }}
            />
          </div>
          <div className="rc-column rc-double-width">
            <p>
              <FormattedMessage
                id="smartFeederSubscription.feederDes"
                values={{
                  val: (
                    <strong>
                      <FormattedMessage id="smartFeederSubscription.petDispenser" />
                    </strong>
                  )
                }}
                defaultMessage=" "
              />
            </p>
          </div>
        </div>
        <div className="rc-layout-container rc-three-column">
          {sectionList2.map((item) => {
            return (
              <div className="rc-column">
                <p className=" rc-text--center">
                  <img className="margin-auto wid100" src={item.img} />
                </p>
                <div className="">
                  <div className="des_title">{item.title}</div>
                  <p className="des_des">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* </section>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil"> */}
        <div
          className="rc-layout-container rc-two-column pt-md-4 phone_section"
          style={{ alignItems: 'center' }}
        >
          <div className="rc-column">
            {/* <span
              className="rc-md-up"
              style={{ width: '9rem', float: 'left', height: '100%' }}
            ></span> */}
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <div>
                <div style={{ fontSize: '1.5rem' }}>
                  <FormattedMessage id="smartFeederSubscription.dispenserWithPhoneTitle" />
                </div>
                <div style={{ paddingBottom: '.5rem' }}>
                  <FormattedMessage id="smartFeederSubscription.dispenserWithPhoneDes" />
                </div>
              </div>
            </div>
          </div>
          <div className="rc-column">
            <span
              className="rc-md-up"
              style={{ width: '5rem', float: 'left', height: '1px' }}
            ></span>
            <img src={phoneImg} className="rc-md-up" />
            <img src={phoneImg} className="rc-md-down m-auto" />
          </div>
        </div>
      </section>
      <div id="learnMore" className="scroll-position"></div>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil rc-padding-top--sm">
        <h2 className="smartfeedersubscription-title">
          <FormattedMessage id="smartFeederSubscription.titleHow" />
        </h2>
        {/* <p className="smartfeedersubscription-sub-title rc-text--center">
          smartfeedersubscription-sub-title
        </p> */}
        <div className="rc-layout-container rc-three-column margin12">
          {sectionList1.map((item) => {
            return (
              <div className="rc-column rc-text--center">
                <img className="margin-auto" src={item.img} />
                {/* <div className=""> {item.description} </div> */}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default injectIntl(staticPage);
