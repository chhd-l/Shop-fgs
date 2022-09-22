import React, { useEffect, useState } from 'react';
import { useSearch, initData } from '../../index';
import ListText from './components/ListText';
import ListCarousel from './components/ListCarousel';

const ResultAll = () => {
  const { setResultCurrentTab, dataArticles, dataBreeds, dataProducts } =
    useSearch();

  // only display first page
  const [firstPageDataArticles, setFirstPageDataArticles] = useState(initData);
  const [firstPageDataBreeds, setFirstPageDataBreeds] = useState(initData);
  const [firstPageDataProducts, setFirstPageDataProducts] = useState(initData);

  useEffect(() => {
    if (dataArticles.pageNum === 0) {
      setFirstPageDataArticles({ ...dataArticles });
    }
  }, [dataArticles]);

  useEffect(() => {
    if (dataBreeds.pageNum === 0) {
      setFirstPageDataBreeds({ ...dataBreeds });
    }
  }, [dataBreeds]);

  useEffect(() => {
    if (dataProducts.pageNum === 0) {
      setFirstPageDataProducts({ ...dataProducts });
    }
  }, [dataProducts]);

  return (
    <div className="search-result-all-box">
      <ListText
        title="Breeds"
        total={firstPageDataBreeds.total}
        list={firstPageDataBreeds.content}
        onViewMore={() => setResultCurrentTab('Breeds')}
      />
      <ListCarousel
        title="Products"
        total={firstPageDataProducts.total}
        list={firstPageDataProducts.content}
        onViewMore={() => setResultCurrentTab('Products')}
      />
      <ListText
        title="Articles"
        total={firstPageDataArticles.total}
        list={firstPageDataArticles.content}
        onViewMore={() => setResultCurrentTab('Articles')}
      />
    </div>
  );
};

export default ResultAll;
