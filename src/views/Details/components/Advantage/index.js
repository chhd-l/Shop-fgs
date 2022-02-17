import React from 'react';

const Advantage = () => {
  const defaultIconList = [
    {
      icon: <span className="rc-icon rc-vet--sm rc-brand1 rc-iconography" />,
      text: 'Expert food and product recommendations'
    },
    {
      icon: (
        <span className="rc-icon rc-delivery--sm rc-brand1 rc-iconography" />
      ),
      text: '5% off every autoship order + free shipping, with no minimum purchase'
    },
    {
      icon: <span className="rc-brand1 rc-icon rc-friendly rc-iconography" />,
      text: 'A Royal Canin Advisor to answer all your pet questions'
    }
  ];
  const iconList =
    { us: defaultIconList }[window.__.env.REACT_APP_COUNTRY] || [];
  return iconList.length > 0 ? (
    <div className="rc-bg-colour--brand4">
      <div className="reassurance-banner rc-max-width--xl rc-padding-x--sm rc-margin-bottom--sm">
        <div className="rc-layout-container rc-four-column rc-text--center rc-content-h-middle">
          {iconList.map((ele, i) => (
            <div className="rc-column rc-padding-y--xs" key={i}>
              <div className="reassurance-banner__item rc-text--left">
                <span className="rc-header-with-icon rc-header-with-icon--gamma">
                  {ele.icon}
                  {ele.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default Advantage;
