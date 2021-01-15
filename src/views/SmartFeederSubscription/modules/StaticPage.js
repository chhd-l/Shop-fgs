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

const staticPage = () => {
  const stepsList = [
    {
      title: 'Feed your dog with precision',
      description:
        'Thanks to the PetKit Dispenser your pet will always get the right amount of food at the right time'
    },
    {
      title: 'Free automatic delivery',
      description:
        'Make your life easier with free automatic delivery to your door'
    },
    {
      title: 'PetKit Dispenser for 1.50 € more/refill',
      description:
        'Receive the PetKit Dispenser for just 1.50 € more/refill compared to our standard Autoship price'
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
      title: 'A Double “Fresh Lock” System',
      description:
        'A food-grade Soft Silicone Sealing Ring and a desiccant box ensures your pet’s food stays fresh.'
    },
    {
      img: foodDispenser2,
      title: 'Dispensing Mechanism',
      description:
        'Your feeder will never get stuck dispensing food thanks to a self-adapting system.'
    },
    {
      img: foodDispenser3,
      title: 'Easy Maintenance',
      description:
        'Easily detach and attach the machine to clean it with a damp cloth.'
    }
  ];
  return (
    <>
      <section className="banner">
        <div className="rc-layout-container rc-four-column" style={{alignItems: 'center'}}>
          <div className="rc-column rc-triple-width" style={{position:'relative'}}>
            <img src={bannerDog} className="rc-md-up" style={{ width: '100%' }} />
            <img src={bannerDogH5} className="rc-md-down" style={{ width: '100%' }} />
            <img className="rc-md-up banner_food" style={{maxHeight: '84%'}} src={bannerFood} />
          </div>
          <img className="rc-md-down" src={bannerFood} />
          <div className="rc-column rc-text--center">
            <div className="title">With automatic shipment to your door</div>
            <div className=" money">for 26,50 € per refill*</div>
            <p>*12 shipments engagement</p>
              <button class="button192 rc-btn rc-btn--two">Learn more</button>
              <p></p>
            <button class="button192 rc-btn rc-btn--one">Choose your product</button>
          </div>
        </div>
      </section>
      {/* <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"> */}
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <h2 className="smartfeedersubscription-title">
        Why choose the Smart Feeder Subscription?
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
            <img src={foodDispenserTitle} className="" style={{width: '90%'}}/>
          </div>
          <div className="rc-column rc-double-width">
            <p>
              <strong>The PetKit Dispenser</strong> is an automatic feeder
              designed to ensure your pet gets the right amount of food at the
              right time, even when you’re not home.
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
        <div className="rc-layout-container rc-two-column pt-md-4 phone_section" style={{alignItems: 'center'}}>
          <div className="rc-column">
            {/* <span
              className="rc-md-up"
              style={{ width: '9rem', float: 'left', height: '100%' }}
            ></span> */}
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <div>
                <div style={{ fontSize: '1.5rem' }}>
                  Control the Petkit Dispenser Remotely from your Phone
                </div>
                <div style={{paddingBottom: '.5rem'}}>
                  With app control technology, you can set feeding times to
                  automatically feed your pet or choose to feed them manually.
                  Simply download the app, add your device and you’re set!
                </div>
              </div>
            </div>
          </div>
          <div className="rc-column">
            <span
              className="rc-md-up"
              style={{ width: '5rem', float: 'left', height: '1px' }}
            ></span>
            <img src={phoneImg} className="rc-md-up"/>
            <img src={phoneImg} className="rc-md-down m-auto"/>
          </div>
        </div>
      </section>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil rc-padding-top--sm">
        <h2 className="smartfeedersubscription-title">
          how the Smart Feeder Subscription works?
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
export default staticPage;
