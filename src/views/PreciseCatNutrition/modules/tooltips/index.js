import React from 'react';
export default function Tooltips({ description }) {
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
      <i className="iconfont iconinfo" onClick={(e) => putId(e)}></i>
      <div className="question-tooltip">{description}</div>
    </span>
  );
}
