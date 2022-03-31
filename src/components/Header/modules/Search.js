import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import find from 'lodash/find';
import { getList, getSearchSuggestion } from '@/api/list';
import Loading from '@/components/Loading';
import LazyLoad from 'react-lazyload';
import { IMG_DEFAULT } from '@/utils/constant';
import { getSearch } from '@/api/hub';
import querySearch from '../mock/search';
import axios from 'axios';
import { cancelPrevRequest, optimizeImage, getDeviceType } from '@/utils/utils';

import {
  GAInstantSearchFieldClick,
  GAInstantSearchResultDisplay,
  GAInstantSearchResultClick
} from '@/utils/GA';

const isHub = window.__.env.REACT_APP_HUB;
let sessionItemRoyal = window.__.sessionItemRoyal;

const getSearchContainerMaxHeight = () => {
  return `calc(${window.innerHeight}px - 5rem)`;
};

const transSpecialCharOfRegExp = (originalString) => {
  let result = '';
  const specialCharacters = [
    '[',
    ']',
    '\\',
    '^',
    '$',
    '.',
    '|',
    '?',
    '*',
    '+',
    '(',
    ')'
  ];
  for (let i = 0; i < originalString.length; i++) {
    let g = originalString.charAt(i);
    if (specialCharacters.indexOf(g) > -1) {
      result = result + '\\';
    }
    result = result + g;
  }
  return result;
};

export default class Search extends React.Component {
  static defaultProps = {
    onClose: () => {},
    focusedOnDidMount: false
  };
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false,
      result: null,
      keywords: '',
      loading: false,
      isSearchSuccess: false, //是否搜索成功
      hasSearchedDone: false, //是否请求接口完毕
      hiddenResult: false
    };
    this.inputRef = React.createRef();
    this.inputRefMobile = React.createRef();

    this.hanldeSearchClick = this.hanldeSearchClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.hanldeSearchCloseClick = this.hanldeSearchCloseClick.bind(this);
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
  }
  handleSearchInputChange(e) {
    this.setState(
      {
        keywords: e.target.value,
        hasSearchedDone: false
      },
      () => {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          cancelPrevRequest();
          this.getSearchData();
        }, 500);
      }
    );
  }
  componentDidMount() {
    this.props.focusedOnDidMount &&
      this.inputRef.current &&
      this.inputRef.current.focus();
    window.document.addEventListener('click', this.hanldeSearchBlur);
    window.addEventListener('resize', this.setIosSafariSearchContainerHeight);
  }

  componentWillUnmount() {
    window.document.removeEventListener('click', this.hanldeSearchBlur);
    window.removeEventListener(
      'resize',
      this.setIosSafariSearchContainerHeight
    );
    this.leaveResultBox();
  }

  setIosSafariSearchContainerHeight = () => {
    if (getDeviceType() === 'H5' && !isHub) {
      let suggestionResults =
        window.document.getElementsByClassName('suggestions');
      for (let i = 0; i < suggestionResults.length; i++) {
        suggestionResults[i].style.maxHeight = getSearchContainerMaxHeight();
      }
    }
  };

  async getSearchData() {
    const { keywords } = this.state;
    // this.setState({ loading: true });
    Promise.all([
      getList({
        keywords,
        propDetails: [],
        pageNum: 0,
        brandIds: [],
        pageSize: 10, //isHub ? 10 : 20,不区分，都改成10条
        esGoodsInfoDTOList: [],
        companyType: '',
        minMarketPrice: 0,
        maxMarketPrice: this.props?.configStore?.maxGoodsPrice || null
      }),
      isHub && getSearch({ keywords })
      // isHub && querySearch()
    ])
      .then((res) => {
        let goodsContent = [];

        let productResultNum = res[0]?.context?.esGoodsPage?.totalElements || 0;
        let contentResultTitle = res[1]?.FeaturedItems?.[0]?.Title;
        let contentResultNum =
          typeof contentResultTitle == 'string'
            ? Number(
                contentResultTitle.split(' ')[
                  contentResultTitle.split(' ').length - 1
                ]
              )
            : 0;
        GAInstantSearchResultDisplay({
          query: keywords,
          productResultNum,
          contentResultNum
        });

        const esGoodsPage =
          res[0] && res[0].context && res[0].context.esGoodsPage;
        if (esGoodsPage && esGoodsPage.content.length) {
          goodsContent = esGoodsPage.content || [];
          if (window?.dataLayer && dataLayer[0] && dataLayer[0].search) {
            dataLayer[0].search.query = keywords;
            dataLayer[0].search.results = esGoodsPage.totalElements;
            dataLayer[0].search.type = 'with results';
          }
          sessionItemRoyal.set('search-results', esGoodsPage.totalElements);

          this.setState({
            isSearchSuccess: true,
            result: Object.assign(
              {},
              {
                productList: goodsContent,
                totalElements: esGoodsPage.totalElements
              },
              { attach: res[1] }
            )
          });
        } else {
          if (window?.dataLayer && dataLayer[0] && dataLayer[0].search) {
            dataLayer[0].search.query = keywords;
            dataLayer[0].search.results = 0;
            dataLayer[0].search.type = 'without results';
          }
          this.setState({
            isSearchSuccess: false,
            result: Object.assign({}, { productList: [], totalElements: 0 })
          });
        }
        this.setState({
          hasSearchedDone: true,
          loading: false
        });
      })
      .catch((err) => {
        if (window?.dataLayer && dataLayer[0] && dataLayer[0].search) {
          dataLayer[0].search.query = keywords;
          dataLayer[0].search.results = 0;
          dataLayer[0].search.type = 'without results';
        }
        this.setState({
          hasSearchedDone: true,
          loading: false,
          result: Object.assign({}, { productList: [], totalElements: 0 })
        });
      })
      .finally(() => {
        if (getDeviceType() === 'H5' && !isHub) {
          this.enterResultBox();
        }
      });
  }
  hanldeSearchCloseClick() {
    this.setState({
      showSearchInput: false,
      keywords: '',
      result: null
    });
    this.props.onClose();
    if (getDeviceType() === 'H5' && !isHub) {
      this.leaveResultBox();
    }
  }
  hanldeSearchClick() {
    this.setState(
      {
        showSearchInput: true
      },
      () => {
        setTimeout(() => {
          this.inputRef.current && this.inputRef.current.focus();
          this.inputRefMobile.current && this.inputRefMobile.current.focus();
        });
      }
    );
    this.hanldeSearchFocus();
  }
  handleSearch = () => {
    //if (this.state.loading || !this.state.hasSearchedDone) return;
    this.timer && clearTimeout(this.timer);
    this.props.history.push({
      pathname: window.__.env.REACT_APP_SEARCH_LINK,
      // pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?q=${e.current.value}`,
      search: `?q=${this.state.keywords}`,
      state: {
        GAListParam: 'Search Results',
        noresult: false // !this.state.isSearchSuccess
      }
    });
  };

  hanldeSearchFocus = () => {
    this.setState({
      hiddenResult: false
    });
    // this.hubGA &&
    //   dataLayer.push({
    //     event: 'topPictosClick',
    //     topPictosClick: {
    //       itemName: 'Type and search'
    //     }
    //   });
    GAInstantSearchFieldClick();
  };

  hanldeSearchBlur = () => {
    this.setState({
      hiddenResult: true
    });
  };

  doGAInstantSearchResultClick = (type, item, idx, e) => {
    GAInstantSearchResultClick({
      type,
      name: item.goodsName,
      position: idx + 1
    });
    this.props.history.push({
      pathname: `/${item.lowGoodsName.split(' ').join('-').replace('/', '')}-${
        item.goodsNo
      }`,
      state: {
        GAListParam: 'Search Results'
      }
    });
  };
  doGAInstantSearchResultClick2 = (type, item, idx, e) => {
    GAInstantSearchResultClick({ type, name: item.Title, position: idx + 1 });
    location.href = item.Url;
  };

  enterResultBox = () => {
    const clientW =
      document.body.clientWidth || document.documentElement.clientWidth;
    const innerW = window.innerWidth;
    const scrollBarW = innerW - clientW;
    console.log(scrollBarW, 'scrollBarW==');
    const bodyDom = document.getElementsByTagName('body')[0];
    const rcHeaderDom = document.getElementsByClassName('rc-header')[0];
    if (bodyDom) {
      bodyDom.style.overflow = 'hidden';
      bodyDom.style.width = `calc(100% - ${scrollBarW}px)`;
      // bodyDom.classList.add('body-hidden-scroll');
    }
    if (rcHeaderDom) {
      rcHeaderDom.style.width = `calc(100% - ${scrollBarW}px)`;
    }
  };

  leaveResultBox = () => {
    const bodyDom = document.getElementsByTagName('body')[0];
    const rcHeaderDom = document.getElementsByClassName('rc-header')[0];
    if (bodyDom) {
      // bodyDom.classList.remove('body-hidden-scroll');
      bodyDom.style.overflow = 'auto';
      bodyDom.style.width = '100%';
    }
    if (rcHeaderDom) {
      rcHeaderDom.style.width = '100%';
    }
  };

  handleSearchContainerClick = (e) => {
    e.nativeEvent.stopImmediatePropagation();
  };

  renderResultJsx() {
    const { result, keywords } = this.state;
    let ret = null;
    const keyReg = new RegExp(transSpecialCharOfRegExp(keywords), 'gi');
    if (result) {
      //ios safari 100vh问题
      const resultHeight = getSearchContainerMaxHeight();
      ret = (
        <div
          className="suggestions"
          id="mainSuggestions"
          onMouseOver={() => this.enterResultBox()}
          onMouseOut={() => this.leaveResultBox()}
          style={
            getDeviceType() === 'H5' && !isHub
              ? { maxHeight: resultHeight }
              : {}
          }
        >
          <div className="container">
            <div className="row d-flex flex-sm-row">
              <div className={`${isHub ? 'col-md-7' : ''} col-12 rc-column`}>
                <div className="rc-padding-top--lg--mobile rc-large-intro">
                  <FormattedMessage id="goods" />
                </div>
                <div className="suggestions-items row justify-content-end items rc-padding-left--xs">
                  {result.productList.length ? (
                    result.productList.map((item, idx) => (
                      <div className="col-12 item" key={item.id + idx}>
                        <div
                          className="row"
                          onClick={() =>
                            this.doGAInstantSearchResultClick(
                              'Product',
                              item,
                              idx
                            )
                          }
                        >
                          <div className="item__image hidden-xs-down_ swatch-circle col-4 col-md-3 col-lg-2">
                            <div
                              className="ui-cursor-pointer"
                              style={{ width: '100%' }}
                              onClick={() => {
                                sessionItemRoyal.remove('pr-question-params');
                                sessionItemRoyal.remove('pf-result');
                                sessionItemRoyal.remove('pf-result-before');
                                localStorage.removeItem('pfls');
                                localStorage.removeItem('pfls-before');
                              }}
                              // to={{
                              //   pathname: `/${item.lowGoodsName
                              //     .split(' ')
                              //     .join('-')
                              //     .replace('/', '')}-${item.goodsNo}`,
                              //   state: {
                              //     GAListParam: 'Search Results'
                              //   }
                              // }}
                            >
                              <LazyLoad>
                                <img
                                  className="swatch__img"
                                  alt={item.goodsName}
                                  title={item.goodsName}
                                  style={{ width: '100%' }}
                                  src={
                                    optimizeImage({
                                      originImageUrl:
                                        item.goodsImg ||
                                        item.goodsInfos?.sort(
                                          (a, b) =>
                                            a.marketPrice - b.marketPrice
                                        )[0]?.goodsInfoImg
                                    }) || IMG_DEFAULT
                                  }
                                />
                              </LazyLoad>
                            </div>
                          </div>
                          <div className="col-8 col-md-9 col-lg-10">
                            <div
                              onClick={() => {
                                sessionItemRoyal.remove('pr-question-params');
                                sessionItemRoyal.remove('pf-result');
                                sessionItemRoyal.remove('pf-result-before');
                                localStorage.removeItem('pfls');
                                localStorage.removeItem('pfls-before');
                              }}
                              // to={{
                              //   pathname: `/${item.lowGoodsName
                              //     .split(' ')
                              //     .join('-')
                              //     .replace('/', '')}-${item.goodsNo}`,
                              //   state: {
                              //     GAListParam: 'Search Results'
                              //   }
                              // }}
                              className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                              alt={item.goodsName}
                              title={item.goodsName}
                              dangerouslySetInnerHTML={{
                                __html: item.goodsName.replace(
                                  keyReg,
                                  (txt) => `<b>${txt}</b>`
                                )
                              }}
                            ></div>
                            <div className="rc-meta searchProductKeyword" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="d-flex ml-2 mr-2">
                      <em className="rc-icon rc-incompatible--xs rc-iconography" />
                      <FormattedMessage id="search.noResultTip" />
                    </p>
                  )}
                </div>
                {result.totalElements ? (
                  <div className="rc-margin-top--xs">
                    <Link
                      className="productName rc-large-body ui-cursor-pointer"
                      to={{
                        pathname: window.__.env.REACT_APP_SEARCH_LINK,
                        search: `?q=${keywords}`
                      }}
                    >
                      <strong>
                        <FormattedMessage id="viewAllResults" /> (
                        {result.totalElements})
                      </strong>
                    </Link>
                  </div>
                ) : null}
              </div>
              {isHub && result && result.attach ? (
                <div className="col-12 col-md-5 rc-column rc-bg-colour--brand4">
                  {(result.attach.Items || []).map((item, i) => (
                    <a
                      className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                      alt={item.Title}
                      title={item.Title}
                      //href={item.Url}
                      href="javascript:;"
                      key={i}
                      onClick={() =>
                        this.doGAInstantSearchResultClick2('Content', item, i)
                      }
                      dangerouslySetInnerHTML={{
                        __html: item.Title.replace(
                          keyReg,
                          (txt) => `<b>${txt}</b>`
                        )
                      }}
                    ></a>
                  ))}
                  {(result.attach.FeaturedItems || []).map((item, i) => (
                    <a
                      className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                      alt={item.Title}
                      title={item.Title}
                      href={item.Url}
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: item.Title.replace(
                          keyReg,
                          (txt) => `<b>${txt}</b>`
                        )
                      }}
                    ></a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    return ret;
  }
  render() {
    const { showSearchInput, result, keywords, loading, hiddenResult } =
      this.state;
    const isMobile = getDeviceType() !== 'PC';
    return (
      <div
        className="inlineblock w-100"
        onClick={this.handleSearchContainerClick}
      >
        {loading ? <Loading /> : null}
        {isHub ? (
          <>
            <div
              className={` ${
                isMobile ? '' : 'search-desktop '
              } search-contaner`}
            >
              <form
                role="search"
                name="simpleSearch"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <button
                  className="iconfont icon-search"
                  type="submit"
                  onClick={this.handleSearch}
                >
                  &#xe6a5;
                </button>
                {keywords ? (
                  <span
                    className="iconfont icon-close"
                    onClick={this.hanldeSearchCloseClick}
                  >
                    &#xe6fb;
                  </span>
                ) : null}
                <FormattedMessage id="searchForAProductOrArtical">
                  {(txt) => (
                    <input
                      ref={this.inputRef}
                      className="search-field rc-bg-colour--brand4 ui-cursor-pointer-pure font-weight-light limit-md-width"
                      type="search"
                      autoComplete="off"
                      placeholder={txt}
                      onFocus={this.hanldeSearchFocus}
                      onChange={this.handleSearchInputChange}
                      value={keywords}
                    />
                  )}
                </FormattedMessage>
              </form>
            </div>
            {!hiddenResult && result ? (
              <div style={{ position: 'relative', top: '.2rem' }}>
                <div className="suggestions-wrapper">
                  {this.renderResultJsx()}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <button
              id="mainSearch"
              className={`rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography `}
              aria-label="Search"
              onClick={this.hanldeSearchClick}
              style={
                showSearchInput ? { display: 'none' } : { display: 'block' }
              }
            >
              <span className="rc-screen-reader-text">
                <FormattedMessage id="search" />
              </span>
            </button>
            <div className="rc-sm-up">
              <form
                className={`inlineblock headerSearch headerSearchDesktop relative ${
                  showSearchInput ? '' : 'rc-hidden'
                }`}
                role="search"
                name="simpleSearch"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <button
                    className="rc-input__submit rc-input__submit--search"
                    type="submit"
                    onClick={this.handleSearch}
                  >
                    <span className="rc-screen-reader-text" />
                  </button>
                  <FormattedMessage id="header.startTypingToSearch">
                    {(txt) => (
                      <input
                        id="startTypingToSearch"
                        ref={this.inputRef}
                        className="search-field"
                        type="search"
                        autoComplete="off"
                        placeholder={txt}
                        value={keywords}
                        onFocus={this.hanldeSearchFocus}
                        onChange={this.handleSearchInputChange}
                      />
                    )}
                  </FormattedMessage>
                  <label className="rc-input__label" htmlFor="id-submit-2">
                    <span className="rc-input__label-text" />
                  </label>
                </span>
                <span
                  className="rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle"
                  aria-label="Close"
                  onClick={this.hanldeSearchCloseClick}
                />
                {!hiddenResult && result ? (
                  <div className="suggestions-wrapper">
                    {this.renderResultJsx()}
                  </div>
                ) : null}
              </form>
            </div>
            <div className="rc-sm-down">
              <form
                className={`rc-header__search-bar headerSearch ${
                  showSearchInput ? '' : 'rc-hidden'
                }`}
                role="search"
                name="simpleSearch"
                style={{ position: 'fixed' }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Link
                  className="productName rc-large-body ui-cursor-pointer"
                  to={{
                    pathname: window.__.env.REACT_APP_SEARCH_LINK,
                    search: `?q=${keywords}`
                  }}
                >
                  <button
                    className="rc-btn rc-btn--icon rc-icon search--xs iconography stick-left rc-vertical-align"
                    type="submit"
                    aria-label="Search"
                  >
                    <span className="screen-reader-text">
                      <FormattedMessage id="search" />
                    </span>
                  </button>
                </Link>

                <FormattedMessage id="header.startTypingToSearch">
                  {(txt) => (
                    <input
                      ref={this.inputRefMobile}
                      type="search"
                      className="form-control search-field rc-header__input"
                      placeholder={txt}
                      autoComplete="off"
                      aria-label="Start typing to search"
                      value={this.state.keywords}
                      onChange={this.handleSearchInputChange}
                      style={{ padding: '1rem 4rem' }}
                    />
                  )}
                </FormattedMessage>
                <div className="suggestions-wrapper">
                  {this.renderResultJsx()}
                </div>
                <button
                  className="rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle"
                  type="button"
                  aria-label="Close"
                  onClick={this.hanldeSearchCloseClick}
                >
                  <span className="screen-reader-text">
                    <FormattedMessage id="close" />
                  </span>
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    );
  }
}
