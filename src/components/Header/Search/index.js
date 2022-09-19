import React, { useState } from 'react';
import { createContainer } from './unstated-next';
import Search from './components/Search';

function useSearchHook() {
  const [modalVisible, setModalVisible] = useState(true);

  const [inputValue, setInputValue] = useState('');

  const [recentSearches, setRecentSearches] = useState([]);

  return {
    modalVisible,
    setModalVisible,
    inputValue,
    setInputValue,
    recentSearches,
    setRecentSearches
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
