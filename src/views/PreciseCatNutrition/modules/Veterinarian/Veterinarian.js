import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';
export default function Veterinarian({ getInit }) {
  let history = useHistory();
  return (
    <div className="Veterinarian">
      <img
        className="Veterinarian-img"
        src={require('../../../../assets/images/preciseCatNutrition/hos.png')}
      />
      <div className="Veterinarian-title">
        It seems that your cat may have a more complex weight concern, therefore
        we recommend you to visit your veterinarian to ensure that your cat will
        receive an optimal nutritional solution according to its specific needs.
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <button
          className="rc-btn rc-btn--one question-button"
          type="submit"
          onClick={() => {
            history.push('/where-to-buy/find-a-vet');
          }}
        >
          Find a vet
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
