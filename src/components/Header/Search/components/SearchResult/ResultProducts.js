import React from 'react';
import { useSearch } from '../../index';
import CardImage from './components/CardImage';
import Pager from './components/Pager';

const ResultProducts = (props) => {
  const { inputValue, dataProducts } = useSearch();

  return (
    <div className="result-list-page-box">
      <div className="result-list-page-content">
        {dataProducts.content.map((item, index) => (
          <CardImage key={index} item={item} />
        ))}
      </div>
      <div className="result-list-page-footer">
        <Pager
          current={dataProducts.pageNum + 1}
          total={dataProducts.total}
          onChange={(e) => {
            console.log(e);
            props.getProducts(inputValue, e - 1);
          }}
        />
      </div>
    </div>
  );
};

export default ResultProducts;
