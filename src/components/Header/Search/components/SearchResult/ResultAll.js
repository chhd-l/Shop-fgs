import React from 'react';
import { useSearch, initData } from '../../index';
import ListText from './components/ListText';
import ListCarousel from './components/ListCarousel';

// only display first page
let firstPageDataArticles = initData;
let firstPageDataBreeds = initData;
let firstPageDataProducts = initData;

const ResultAll = () => {
  const { setResultCurrentTab, dataArticles, dataBreeds, dataProducts } =
    useSearch();

  if (dataArticles.pageNum === 0) {
    firstPageDataArticles = { ...dataArticles };
  }
  if (dataBreeds.pageNum === 0) {
    firstPageDataBreeds = { ...dataBreeds };
  }
  if (dataProducts.pageNum === 0) {
    firstPageDataProducts = { ...dataProducts };
  }

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
