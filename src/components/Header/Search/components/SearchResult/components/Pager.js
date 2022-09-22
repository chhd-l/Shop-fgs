import React, { useState } from 'react';
import './Pager.less';

const regNum = /^[1-9]\d*$/;

const Pager = ({ total, current, onChange }) => {
  if (!total) {
    return null;
  }

  const totalPage = Math.ceil(total / 12);

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
    if (val > totalPage) {
      return;
    }
    onChange?.(val);
  };

  return (
    <div className="search-result-pager-box">
      <button
        className={`search-btn iconfont iconjiantouyou1 search-result-pager-prev ${
          current === 1 ? 'disabled' : ''
        }`}
        disabled={current === 1}
        onClick={() => handleClick('prev')}
      />
      <div className="search-result-pager-info">
        <input type="text" value={current} onChange={handleChange} />
        of
        <div className="search-result-pager-all">{totalPage}</div>
      </div>
      <button
        className={`search-btn iconfont iconjiantouyou1 search-result-pager-next ${
          current === totalPage ? 'disabled' : ''
        }`}
        disabled={current === totalPage}
        onClick={() => handleClick('next')}
      />
    </div>
  );
};

export default Pager;
