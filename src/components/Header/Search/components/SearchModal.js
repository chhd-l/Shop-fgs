import React from 'react';
import { useSearch, initData } from '../index';

const SearchModal = ({ children }) => {
  const {
    modalVisible,
    setModalVisible,
    setIsSearched,
    setDataArticles,
    setDataBreeds,
    setSataProducts,
    setInputValue,
    setResultCurrentTab
  } = useSearch();

  if (!modalVisible) {
    return null;
  }

  return (
    <div className="search-modal-box">
      <div className="search-modal-header-wrap">
        <div className="search-modal-header">
          <button
            className="search-btn iconfont iconguan"
            onClick={() => {
              document.querySelector('body').style.overflowY = 'auto';
              setDataArticles(initData);
              setDataBreeds(initData);
              setSataProducts(initData);
              setInputValue('');
              setResultCurrentTab('All');
              setIsSearched(false);
              setModalVisible(false);
            }}
          />
        </div>
      </div>
      <div className="search-modal-content-wrap">{children}</div>
    </div>
  );
};

export default SearchModal;
