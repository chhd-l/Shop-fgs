import React from 'react';
import './index.less';
import DistributeHubLinkOrATag from '../../../../components/DistributeHubLinkOrATag';
export default function Fgs({ getInit }) {
  return (
    <div className="Veterinarian">
      <img
        className="Veterinarian-img"
        src={require('../../../../assets/images/preciseCatNutrition/recomment.jpg')}
      />
      <div className="Veterinarian-title">
        It seems that your cat does not have any weight related concerns, this
        offer is therefore not suited for him. But you can still discover the
        most adapted product for your cat from our complete range of formulas
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <DistributeHubLinkOrATag to="/product-finder">
          <button className="rc-btn rc-btn--one question-button" type="submit">
            Discover
          </button>
        </DistributeHubLinkOrATag>

        <div
          style={{ textAlign: 'center', marginTop: '20px' }}
          onClick={() => getInit(true)}
        >
          <span className="back-btn">Start again</span>
        </div>
      </div>
    </div>
  );
}
