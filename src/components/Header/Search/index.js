import React, { useState } from 'react';
import { createContainer } from './unstated-next';
import Search from './components/Search';

function useSearchHook() {
  // Modal visible state
  const [modalVisible, setModalVisible] = useState(true);
  // Current input value
  const [inputValue, setInputValue] = useState('');
  // Input Search history
  const [recentSearches, setRecentSearches] = useState([]);
  // All Result State:  All, Breeds, Products, Articles
  const [resultCurrentTab, setResultCurrentTab] = useState('All');

  return {
    modalVisible,
    setModalVisible,
    inputValue,
    setInputValue,
    recentSearches,
    setRecentSearches,
    resultCurrentTab,
    setResultCurrentTab
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
