import React from 'react';
import { FormattedMessage } from 'react-intl';
import Idea from '../../images/idea.png';
export default function Tooltips({
  description,
  isArray = false,
  isIdea = false
}) {
  const putId = (e) => {
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    let getId = document.getElementById('question-tooltip');
    if (getId) {
      getId.removeAttribute('id');
    }
    e.target.setAttribute('id', 'question-tooltip');
  };
  document.onclick = function (e) {
    let getId = document.getElementById('question-tooltip');
    if (getId) {
      getId.removeAttribute('id');
    }
  };
  return (
    <span className="iconfont-box">
      {isIdea ? (
        <img
          src={Idea}
          width="18px"
          height="18px"
          style={{ display: 'block' }}
        />
      ) : (
        <i className="iconfont iconinfo" onClick={(e) => putId(e)}></i>
      )}

      {isArray ? (
        <div className="question-tooltip">
          <div>
            <FormattedMessage id="preciseNutrition.bscTip" />
          </div>
          <div>
            <FormattedMessage id="preciseNutrition.bscTip1" />
          </div>
          <div>
            <FormattedMessage id="preciseNutrition.bscTip2" />
          </div>
        </div>
      ) : (
        <div className="question-tooltip">{description}</div>
      )}
    </span>
  );
}
