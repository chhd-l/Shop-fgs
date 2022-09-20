import React from 'react';
import './ListText.less';

const ListText = () => {
  const renderMoreAction = () => {
    return <div className="list-text-actions">View more (23)</div>;
  };

  return (
    <div className="search-list-text-box">
      <div className="list-text-title">Article</div>
      <ul className="list-text-content">
        <li>How to link?</li>
      </ul>
      {renderMoreAction()}
    </div>
  );
};

export default ListText;
