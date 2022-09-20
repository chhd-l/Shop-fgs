import React from 'react';
import ListText from './components/ListText';
import ListCarousel from './components/ListCarousel';

const ResultAll = () => {
  return (
    <div className="search-result-all-box">
      <ListText />
      <ListCarousel />
      <ListText />
    </div>
  );
};

export default ResultAll;
