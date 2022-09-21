import React from 'react';
import './ListText.less';

const ListText = ({ title = '', total = '', list = [], onViewMore }) => {
  const renderList = () => {
    if (list.length === 0) {
      return <div className="list-text-content">No results</div>;
    }
    return (
      <ul className="list-text-content">
        {list.map((item, index) => {
          if (index > 2) {
            return null;
          }
          return (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderMoreAction = () => {
    if (list.length <= 3) {
      return null;
    }
    return (
      <div className="list-text-actions" onClick={() => onViewMore?.()}>
        {`View more (${total})`}
      </div>
    );
  };

  return (
    <div className="search-list-text-box">
      <div className="list-text-title">{title}</div>
      {renderList()}
      {renderMoreAction()}
    </div>
  );
};

export default ListText;
