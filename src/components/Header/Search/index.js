import React, { useState } from 'react';
import { createContainer } from './unstated-next';
import Search from './components/Search';

const initData = {
  total: 0,
  content: [],
  pageNum: 0
};

function useSearchHook() {
  // Country code
  const [countryCode, setCountryCode] = useState('');
  // Modal visible state
  const [modalVisible, setModalVisible] = useState(false);
  // is search end
  const [searchEnd, setSearchEnd] = useState(false);
  // Current input value
  const [inputValue, setInputValue] = useState('');
  // Input Search history
  const [recentSearches, setRecentSearches] = useState([]);
  // All Result State:  All, Articles, Breeds, Products,
  const [resultCurrentTab, setResultCurrentTab] = useState('All');

  // three tabs search data
  const [dataArticles, setDataArticles] = useState(initData);
  const [dataBreeds, setDataBreeds] = useState(initData);
  const [dataProducts, setSataProducts] = useState(initData);

  return {
    countryCode,
    setCountryCode,
    modalVisible,
    setModalVisible,
    inputValue,
    setInputValue,
    recentSearches,
    setRecentSearches,
    resultCurrentTab,
    setResultCurrentTab,

    dataArticles,
    setDataArticles,
    dataBreeds,
    setDataBreeds,
    dataProducts,
    setSataProducts
  };
}

export const RECENT_SEARCH_LIST = 'recent-search-list';

export const SearchContainer = createContainer(useSearchHook);

export const useSearch = SearchContainer.useContainer;

export default function SearchIndex(props) {
  return (
    <SearchContainer.Provider>
      <Search {...props} />
    </SearchContainer.Provider>
  );
}
