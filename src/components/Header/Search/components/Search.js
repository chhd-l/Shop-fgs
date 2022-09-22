import React, { useEffect } from 'react';
import { useSearch } from '../index';
import SearchModal from './SearchModal';
import SearchInput from './SearchInput';
import SearchRecent from './SearchRecent';
import SearchResult from './SearchResult';
import SearchEmpty from './SearchEmpty';
import * as api from './api';
import { GAEventClickSearchBar, GAEventDisplayResult } from '../GA';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';

const Search = (props) => {
  const {
    config,
    setConfig,
    setModalVisible,
    isSearched,
    setIsSearched,
    setResultCurrentTab,
    dataArticles,
    setDataArticles,
    dataBreeds,
    setDataBreeds,
    dataProducts,
    setSataProducts
  } = useSearch();

  useEffect(() => {
    setConfig({
      countryCode: props?.countryCode ?? 'fr',
      baseRouterPrefixForFgs: props?.baseRouterPrefixForFgs ?? '',
      baseApiPrefixForFgs: props?.baseApiPrefixForFgs ?? '/api',
      productFinderLink:
        props?.productFinderUrl ??
        `/${props?.countryCode ?? 'fr'}/product-finder`
    });
  }, []);

  const getAllList = async (keywords) => {
    const [articles, breeds, products] = await Promise.all([
      getArticles(keywords),
      getBreeds(keywords),
      getProducts(keywords)
    ]);
    setIsSearched(true);
    setResultCurrentTab('All');
    GAEventDisplayResult(breeds, products, articles);
  };

  const getArticles = async (keywords, pageNum = 0) => {
    const { total = 0, content = [] } = await api.fetchArticles({
      baseUrl: config.baseApiPrefixForFgs,
      keywords,
      pageNum,
      countryCode: config.countryCode
    });
    setDataArticles({
      total,
      content,
      pageNum
    });
    return total;
  };

  const getBreeds = async (keywords, pageNum = 0) => {
    const { total = 0, content = [] } = await api.fetchBreeds({
      baseUrl: config.baseApiPrefixForFgs,
      keywords,
      pageNum,
      countryCode: config.countryCode
    });
    setDataBreeds({
      total,
      content,
      pageNum
    });
    return total;
  };

  const getProducts = async (keywords, pageNum = 0) => {
    const { total = 0, content = [] } = await api.fetchProducts({
      baseUrl: config.baseApiPrefixForFgs,
      keywords,
      pageNum,
      countryCode: config.countryCode,
      itemBaseUrl: config.baseRouterPrefixForFgs
    });
    setSataProducts({
      total,
      content,
      pageNum
    });
    return total;
  };

  const hasSomeData =
    dataArticles.total > 0 || dataBreeds.total > 0 || dataProducts.total > 0;

  return (
    <div className="rc-search-box">
      <button
        className="search-btn iconfont iconSearch"
        onClick={() => {
          document.querySelector('body').style.overflowY = 'hidden';
          setModalVisible(true);
          GAEventClickSearchBar();
        }}
      />

      <SearchModal>
        <SearchInput onSearch={getAllList} />

        {/*搜索状态是false = 才展示*/}
        {!isSearched && <SearchRecent onClickChange={getAllList} />}

        {/*有数据 && 搜索状态是true = 才展示*/}
        {hasSomeData && isSearched && (
          <SearchResult
            getArticles={getArticles}
            getBreeds={getBreeds}
            getProducts={getProducts}
          />
        )}

        {/*没有数据 && 搜索状态是true = 才展示*/}
        {!hasSomeData && isSearched && <SearchEmpty />}
      </SearchModal>
    </div>
  );
};

export default Search;
