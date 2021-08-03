import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';
export default function Fgs({ getInit }) {
  let history = useHistory();
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
        <button
          className="rc-btn rc-btn--one question-button"
          type="submit"
          onClick={() => {
            history.push('/product-finder');
          }}
        >
          Discover
        </button>
        <div
          style={{ textAlign: 'center', marginTop: 20, cursor: 'pointer' }}
          onClick={() => getInit()}
        >
          Start again
        </div>
      </div>
    </div>
  );
}
