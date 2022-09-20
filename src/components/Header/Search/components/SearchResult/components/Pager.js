import React, { useState } from 'react';
import './Pager.less';

const regNum = /^[1-9]\d*$/;

const Pager = ({ total, current, onChange }) => {
  const handleClick = (type) => {
    let pageNum = current;
    if (type === 'prev') {
      pageNum--;
    } else {
      pageNum++;
    }
    onChange?.(pageNum);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (!val) {
      return;
    }
    if (!regNum.test(val)) {
      return;
    }
    if (val > total) {
      return;
    }
    onChange?.(val);
  };

  if (!total) {
    return null;
  }

  return (
    <div className="search-result-pager-box">
      <button
        className="search-btn iconfont iconjiantouyou1 search-result-pager-prev disabled"
        disabled={current === 1}
        onClick={() => handleClick('prev')}
      />
      <div className="search-result-pager-info">
        <input type="text" value={current} onChange={handleChange} />
        of
        <div className="search-result-pager-all">{total}</div>
      </div>
      <button
        className="search-btn iconfont iconjiantouyou1 search-result-pager-next"
        disabled={current === total}
        onClick={() => handleClick('next')}
      />
    </div>
  );
};

export default Pager;
