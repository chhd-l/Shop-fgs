import React, { useEffect } from 'react';
import { useSearch } from '../../index';
import ListText from './components/ListText';
import ListCarousel from './components/ListCarousel';

const ResultAll = () => {
  const { setResultCurrentTab, dataArticles, dataBreeds, dataProducts } =
    useSearch();

  return (
    <div className="search-result-all-box">
      <ListText
        title="Breeds"
        total={dataBreeds.total}
        list={dataBreeds.content}
        onViewMore={() => setResultCurrentTab('Breeds')}
      />
      <ListCarousel
        title="Products"
        total={dataProducts.total}
        list={dataProducts.content}
        onViewMore={() => setResultCurrentTab('Products')}
      />
      <ListText
        title="Articles"
        total={dataArticles.total}
        list={dataArticles.content}
        onViewMore={() => setResultCurrentTab('Articles')}
      />
    </div>
  );
};

export default ResultAll;
