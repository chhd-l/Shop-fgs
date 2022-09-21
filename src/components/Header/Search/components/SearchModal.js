import React from 'react';
import { useSearch } from '../index';

const SearchModal = ({ children }) => {
  const { modalVisible, setModalVisible } = useSearch();

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
