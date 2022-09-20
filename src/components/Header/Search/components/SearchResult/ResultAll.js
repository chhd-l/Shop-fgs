import React from 'react';
import { useSearch } from '../../index';
import ListText from './components/ListText';
import ListCarousel from './components/ListCarousel';

const ResultAll = () => {
  const { setResultCurrentTab } = useSearch();

  return (
    <div className="search-result-all-box">
      <ListText
        title="Breeds"
        total="4"
        list={[1, 2, 3, 4]}
        onViewMore={() => setResultCurrentTab('Breeds')}
      />
      <ListCarousel
        title="Products"
        total="4"
        list={[1, 2, 3, 4, 5]}
        onViewMore={() => setResultCurrentTab('Products')}
      />
      <ListText
        title="Articles"
        total="4"
        list={[1, 2, 3, 4]}
        onViewMore={() => setResultCurrentTab('Articles')}
      />
    </div>
  );
};

export default ResultAll;
