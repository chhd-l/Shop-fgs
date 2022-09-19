import React, { useEffect } from 'react';
import { useSearch, RECENT_SEARCH_LIST } from '../index';

const SearchFindLink = () => {
  return (
    <a className="search-find-box" href="/">
      <div className="search-find-content">
        <div className="search-find-title">Need help to find a product ?</div>
        <div className="search-find-desc">Try our product finder</div>
      </div>
      <div className="search-circle-btn">Find a product</div>
    </a>
  );
};

const SearchRecentTag = ({ label }) => {
  const { setInputValue, recentSearches, setRecentSearches } = useSearch();

  const handleSearch = () => {
    setInputValue(label);

    const listFilter = recentSearches.filter((item) => {
      return item !== label;
    });
    const listSort = [label, ...listFilter];

    handleSearchList(listSort);
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

const SearchRecentList = () => {
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
          <SearchRecentTag label={item} key={index} />
        ))}
      </div>
    </>
  );
};

const SearchRecent = () => {
  return (
    <div className="search-section-wrap">
      <div className="search-section-content">
        <div className="search-recent-box">
          <SearchRecentList />
          <SearchFindLink />
        </div>
      </div>
    </div>
  );
};

export default SearchRecent;
