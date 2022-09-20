import React, { useEffect } from 'react';
import { useSearch } from '../index';
import SearchModal from './SearchModal';
import SearchInput from './SearchInput';
import SearchRecent from './SearchRecent';
import SearchResult from './SearchResult';
import SearchEmpty from './SearchEmpty';
import * as api from './api';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';

const Search = () => {
  const { setModalVisible, setDataArticles, setDataBreeds, setSataProducts } =
    useSearch();

  const getAllList = (keywords) => {
    getArticles(keywords);
    getBreeds(keywords);
    getProducts(keywords);
  };

  const getArticles = async (keywords, pageNum = 0) => {
    const { total = 0, content = [] } = await api.fetchArticles({
      keywords,
      pageNum
    });
    setDataArticles({
      total,
      content,
      pageNum
    });
  };

  const getBreeds = async (keywords, pageNum = 0) => {
    const { total = 0, content = [] } = await api.fetchBreeds({
      keywords,
      pageNum
    });
    setDataBreeds({
      total,
      content,
      pageNum
    });
  };

  const getProducts = async (keywords, pageNum = 0) => {
    const { total = 0, content = [] } = await api.fetchProducts({
      keywords,
      pageNum
    });
    setSataProducts({
      total,
      content,
      pageNum
    });
  };

  return (
    <div className="rc-search-box">
      <button
        className="search-btn iconfont iconSearch"
        onClick={() => {
          document.querySelector('body').style.overflowY = 'hidden';
          setModalVisible(true);
        }}
      />

      <SearchModal>
        <SearchInput onSearch={getAllList} />

        <SearchRecent onClickChange={getAllList} />

        <SearchResult />

        {/*<SearchEmpty />*/}
      </SearchModal>
    </div>
  );
};

export default Search;
