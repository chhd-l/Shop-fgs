import React from 'react';
import { useSearch } from '../../index';
import Tabs from './Tabs/index.js';
import ResultAll from './ResultAll';
import ResultBreeds from './ResultBreeds';
import ResultProducts from './ResultProducts';
import ResultArticles from './ResultArticles';

const SearchResult = (props) => {
  const {
    resultCurrentTab,
    setResultCurrentTab,
    dataArticles,
    dataBreeds,
    dataProducts
  } = useSearch();

  return (
    <div className="search-section-wrap">
      <div className="search-section-content">
        <div className="search-result-box">
          <Tabs current={resultCurrentTab} onChange={setResultCurrentTab}>
            <Tabs.TabPanel
              tabKey="All"
              title={`All Results (${
                dataArticles.total + dataBreeds.total + dataProducts.total
              })`}
            >
              <ResultAll />
            </Tabs.TabPanel>
            <Tabs.TabPanel
              tabKey="Breeds"
              title={`Breeds (${dataBreeds.total})`}
            >
              <ResultBreeds getBreeds={props.getBreeds} />
            </Tabs.TabPanel>
            <Tabs.TabPanel
              tabKey="Products"
              title={`Products (${dataProducts.total})`}
            >
              <ResultProducts getProducts={props.getProducts} />
            </Tabs.TabPanel>
            <Tabs.TabPanel
              tabKey="Articles"
              title={`Articles (${dataArticles.total})`}
            >
              <ResultArticles getArticles={props.getArticles} />
            </Tabs.TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
