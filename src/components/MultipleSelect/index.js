import React, { useEffect, useState } from 'react';
import './selectMultip';
import './index.less';

const MultipleSelect = (props) => {
  useEffect(() => {
    selectMultip.register();
  }, []);
  useEffect(() => {
    let data = [];
    for (let i = 0; i < props.optionList.length; i++) {
      let obj = {};
      obj.value = props.optionList[i].value;
      obj.text = props.optionList[i].name;
      data.push(obj);
    }
    selectMultip.reload(props.id, data);
    console.log(props.id, 'props.id');
    // selectMultip.setVal(props.id, "Weight Loss Support,Calming & Stress Support eee")
  }, [props.optionList]);

  const { id } = props;

  return (
    <div className="multiple-select-container">
      <select id={id} data-multip></select>
      <span
        className={`iconfont font-weight-bold icon-arrow ${
          false ? 'active' : ''
        }`}
      >
        &#xe6fa;
      </span>
    </div>
  );
};

export default MultipleSelect;
