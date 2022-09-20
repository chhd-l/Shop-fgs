import React from 'react';
import { useSearch } from '../../index';
import Tabs from './Tabs';
import ResultAll from './ResultAll';
import ResultBreeds from './ResultBreeds';
import ResultProducts from './ResultProducts';
import ResultArticles from './ResultArticles';

const SearchResult = () => {
  const { resultCurrentTab, setResultCurrentTab } = useSearch();

  return (
    <div className="search-section-wrap">
      <div className="search-section-content">
        <div className="search-result-box">
          <Tabs current={resultCurrentTab} onChange={setResultCurrentTab}>
            <Tabs.TabPanel tabKey="All" title="All Results (111)">
              <ResultAll />
            </Tabs.TabPanel>
            <Tabs.TabPanel tabKey="Breeds" title="Breeds (22)">
              <ResultBreeds />
            </Tabs.TabPanel>
            <Tabs.TabPanel tabKey="Products" title="Products (30)">
              <ResultProducts />
            </Tabs.TabPanel>
            <Tabs.TabPanel tabKey="Articles" title="Articles (69)">
              <ResultArticles />
            </Tabs.TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
