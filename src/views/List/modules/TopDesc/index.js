import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.less';

const TopDesc = ({ text }) => {
  const [fold, setFold] = useState(false);
  const handleFold = (e) => {
    setFold(e.target.checked);
  };
  return (
    <div class="top-desc-wrap">
      <input
        id="exp1"
        class="exp"
        type="checkbox"
        onClick={handleFold}
        checked={fold}
        name="fold"
      />
      <div class="desc-text">
        <label class="fold-btn" for="exp1">
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
