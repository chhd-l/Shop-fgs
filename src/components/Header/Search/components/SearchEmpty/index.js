import React from 'react';
import Content from './Content';
import Contact from './Contact';
import './index.less';

const SearchEmpty = () => {
  return (
    <>
      <div className="search-section-wrap">
        <div className="search-section-content">
          <Content />
        </div>
      </div>
      <div className="search-section-wrap bg-black">
        <div className="search-section-content">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default SearchEmpty;
