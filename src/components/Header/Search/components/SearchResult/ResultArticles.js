import React from 'react';
import { useSearch } from '../../index';
import CardImage from './components/CardImage';
import Pager from './components/Pager';

const ResultArticles = () => {
  const { dataArticles } = useSearch();

  return (
    <div className="result-list-page-box">
      <div className="result-list-page-content">
        {dataArticles.content.map((item, index) => (
          <CardImage key={index} item={item} fullImage />
        ))}
      </div>
      <div className="result-list-page-footer">
        <Pager
          current={dataArticles.pageNum}
          total={dataArticles.total}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};

export default ResultArticles;
