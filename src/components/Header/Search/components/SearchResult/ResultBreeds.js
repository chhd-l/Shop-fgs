import React from 'react';
import { useSearch } from '../../index';
import CardImage from './components/CardImage';
import Pager from './components/Pager';

const ResultBreeds = () => {
  const { dataBreeds } = useSearch();

  return (
    <div className="result-list-page-box">
      <div className="result-list-page-content">
        {dataBreeds.content.map((item, index) => (
          <CardImage key={index} item={item} fullImage />
        ))}
      </div>
      <div className="result-list-page-footer">
        <Pager
          current={dataBreeds.pageNum}
          total={dataBreeds.total}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};

export default ResultBreeds;
