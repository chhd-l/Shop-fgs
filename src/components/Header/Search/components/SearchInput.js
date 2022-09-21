import React, { useEffect, useRef } from 'react';
import { useSearch, RECENT_SEARCH_LIST } from '../index';

const SearchInput = ({ onSearch }) => {
  const inputRef = useRef();
  const {
    setModalVisible,
    inputValue,
    setInputValue,
    recentSearches,
    setRecentSearches
  } = useSearch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    if (inputValue && inputValue.trim().length >= 3) {
      handleRecordSearch();
      console.log(inputValue, 'inputValue');
      onSearch?.(inputValue);
    }
  };

  const handleRecordSearch = () => {
    const list = [...recentSearches];

    if (!list.includes(inputValue)) {
      list.unshift(inputValue);
    }

    const listSlice = list.slice(0, 5);
    setRecentSearches(listSlice);
    localStorage.setItem(RECENT_SEARCH_LIST, JSON.stringify(listSlice));
  };

  return (
    <div className="search-section-wrap">
      <div className="search-section-content">
        <form
          name="search"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('xxxxxxx');
            handleSearch();
          }}
        >
          <div className="search-input-box">
            <button
              className="search-btn iconfont iconSearch"
              onClick={handleSearch}
            />
            <input
              ref={inputRef}
              value={inputValue}
              type="text"
              name="keyword"
              autoComplete="off"
              placeholder="Search for a product, a breed or an article"
              onKeyUp={(e) => {
                if (e.keyCode === 27) {
                  setModalVisible(false);
                }
              }}
              onChange={(e) => {
                const val = e.target.value;
                console.log('aaaaaaaaaa');
                setInputValue(val);
              }}
            />
            <button
              className="search-btn iconfont iconguan"
              onClick={() => {
                setInputValue('');
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
