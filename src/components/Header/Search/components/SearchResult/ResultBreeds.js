import React from 'react';
import { useSearch } from '../../index';
import CardImage from './components/CardImage';
import Pager from './components/Pager';

const ResultBreeds = (props) => {
  const { inputValue, dataBreeds } = useSearch();

  return (
    <div className="result-list-page-box">
      <div className="result-list-page-content">
        {dataBreeds.content.map((item, index) => (
          <CardImage key={index} item={item} fullImage />
        ))}
      </div>
      <div className="result-list-page-footer">
        <Pager
          current={dataBreeds.pageNum + 1}
          total={dataBreeds.total}
          onChange={(e) => {
            console.log(e);
            props.getBreeds(inputValue, e - 1);
          }}
        />
      </div>
    </div>
  );
};

export default ResultBreeds;
