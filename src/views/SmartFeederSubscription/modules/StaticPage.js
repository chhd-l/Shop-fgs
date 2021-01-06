import React from 'react';
import Steps from './Steps';
const staticPage = () => {
  const stepsList = [
    {
      title: 'title',
      description: 'description'
    },
    {
      title: 'title',
      description: 'description'
    },
    {
      title: 'title',
      description: 'description'
    }
  ];
  const sectionList1 = [
    {
      img: 'http://iph.href.lu/200x200',
      description: 'description'
    },
    {
      img: 'http://iph.href.lu/200x200',
      description: 'description'
    },
    {
      img: 'http://iph.href.lu/200x200',
      description: 'description'
    }
  ];
  const sectionList2 = [
    {
      img: 'http://iph.href.lu/200x200',
      title: 'title',
      description: 'description'
    },
    {
      img: 'http://iph.href.lu/200x200',
      title: 'title',
      description: 'description'
    },
    {
      img: 'http://iph.href.lu/200x200',
      title: 'title',
      description: 'description'
    }
  ];
  return (
    <>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <div className="rc-layout-container rc-four-column">
          <div className="rc-column rc-triple-width">test</div>
          <div className="rc-column">tets</div>
        </div>
      </section>
      {/* <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"> */}
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <h2 className="smartfeedersubscription-title">
          why choose the Smart Feeder Subscription?
        </h2>
        <div className="rc-layout-container rc-two-column">
          <div className="rc-column">
            <Steps stepsList={stepsList} />
          </div>
          <div className="rc-column">
            <img src="http://iph.href.lu/200x200" />
          </div>
        </div>
      </section>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <h2 className="smartfeedersubscription-title">
          how the Smart Feeder Subscription works?
        </h2>
        <p className="smartfeedersubscription-sub-title rc-text--center">
          smartfeedersubscription-sub-title
        </p>
        <div className="rc-layout-container rc-three-column">
          {sectionList1.map((item) => {
            return (
              <div className="rc-column rc-text--center">
                <img className="margin-auto" src={item.img} />
                <div className=""> {item.description} </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
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
      </section>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <div className="rc-layout-container rc-three-column">
          <div className="rc-column">test</div>
          <div className="rc-column rc-double-width">tets</div>
        </div>
      </section>
      <section className="rc-max-width--xl rc-padding-x--sm rc-className-x--xl--mobil">
        <div className="rc-layout-container rc-three-column">
          {sectionList2.map((item) => {
            return (
              <div className="rc-column rc-text--center">
                <img className="margin-auto" src={item.img} />
                <div className="">
                  <em>{item.title}</em>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
        <div className="rc-layout-container rc-two-column">
          <div className="rc-column">
            <h1> 1 / 2 </h1>
          </div>
          <div className="rc-column">
            <h1> 1 / 2 </h1>
          </div>
        </div>
      </section>
    </>
  );
};
export default staticPage;
