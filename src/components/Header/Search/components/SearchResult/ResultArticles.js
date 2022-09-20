import React from 'react';
import CardImage from './components/CardImage';
import Pager from './components/Pager';

const ResultArticles = () => {
  return (
    <div className="result-list-page-box">
      <div className="result-list-page-content">
        {[1, 2, 3, 4].map((_, index) => (
          <CardImage key={index} fullImage />
        ))}
      </div>
      <div className="result-list-page-footer">
        <Pager
          current={1}
          total={15}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};

export default ResultArticles;
