import React, { useEffect } from 'react';
import { useSearch, RECENT_SEARCH_LIST } from '../index';
import { GAEventClickRecentSearchItem, GAEventClickFindAProduct } from '../GA';

const SearchFindLink = () => {
  const { config } = useSearch();

  return (
    <a
      className="search-find-box"
      href={`${config.countryCode}/`}
      onClick={GAEventClickFindAProduct}
    >
      <div className="search-find-content">
        <div className="search-find-title">Need help to find a product ?</div>
        <div className="search-find-desc">Try our product finder</div>
      </div>
      <div className="search-circle-btn">Find a product</div>
    </a>
  );
};

const SearchRecentTag = ({ label, onClick }) => {
  const { setInputValue, recentSearches, setRecentSearches } = useSearch();

  const handleSearch = () => {
    setInputValue(label);

    const listFilter = recentSearches.filter((item) => {
      return item !== label;
    });
    const listSort = [label, ...listFilter];

    handleSearchList(listSort);

    onClick?.(label);

    GAEventClickRecentSearchItem(label);
  };

  const handleDeleteTag = () => {
    const listFilter = recentSearches.filter((item) => {
      return item !== label;
    });

    handleSearchList(listFilter);
  };

  const handleSearchList = (list) => {
    setRecentSearches(list);
    localStorage.setItem(RECENT_SEARCH_LIST, JSON.stringify(list));
  };

  const formatLabel =
    label.length > 15 ? label?.substring(0, 15) + '...' : label;

  return (
    <div className="search-recent-tag" title={label}>
      <div className="search-recent-tag-label" onClick={handleSearch}>
        {formatLabel}
      </div>
      <button
        className="search-btn iconfont iconguan"
        onClick={handleDeleteTag}
      />
    </div>
  );
};

const SearchRecentList = ({ onClick }) => {
  const { recentSearches, setRecentSearches } = useSearch();

  useEffect(() => {
    const recentSearchList = JSON.parse(
      localStorage.getItem(RECENT_SEARCH_LIST) || '[]'
    );
    setRecentSearches(recentSearchList);
  }, []);

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <>
      <div className="search-recent-title">Recent searches</div>
      <div className="search-recent-tags">
        {recentSearches.map((item, index) => (
          <SearchRecentTag label={item} key={index} onClick={onClick} />
        ))}
      </div>
    </>
  );
};

const SearchRecent = ({ onClickChange }) => {
  return (
    <div className="search-section-wrap">
      <div className="search-section-content">
        <div className="search-recent-box">
          <SearchRecentList onClick={onClickChange} />
          <SearchFindLink />
        </div>
      </div>
    </div>
  );
};

export default SearchRecent;
