import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.less';

const TopDesc = ({ text }) => {
  const [fold, setFold] = useState(false);
  const handleFold = (e) => {
    setFold(e.target.checked);
  };
  return (
    <div className="top-desc-wrap">
      <input
        id="exp1"
        className="exp"
        type="checkbox"
        onClick={handleFold}
        checked={fold}
        name="fold"
      />
      <div className="desc-text">
        <label className={`fold-btn ${fold ? 'is-exp' : ''}`} for="exp1">
          {fold ? (
            <FormattedMessage id="plp.reduce" />
          ) : (
            <FormattedMessage id="plp.readMore" />
          )}
        </label>
        {text}
      </div>
    </div>
  );
};

export default TopDesc;
