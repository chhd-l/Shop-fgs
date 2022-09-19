import React, { useEffect } from 'react';
import { useSearch } from '../index';
import SearchModal from './SearchModal';
import SearchInput from './SearchInput';
import SearchRecent from './SearchRecent';
import SearchResult from './SearchResult';
import SearchEmpty from './SearchEmpty';

import './index.less';

const Search = () => {
  const { setModalVisible } = useSearch();

  return (
    <div className="rc-search-box">
      <button
        className="search-btn iconfont iconSearch"
        onClick={() => setModalVisible(true)}
      />

      <SearchModal>
        <SearchInput />

        {/*<SearchRecent/>*/}

        {/*<SearchResult/>*/}

        <SearchEmpty />
      </SearchModal>
    </div>
  );
};

export default Search;
