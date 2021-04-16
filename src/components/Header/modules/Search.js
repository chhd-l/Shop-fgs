import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import { getList } from '@/api/list';
import Loading from '@/components/Loading';
import LazyLoad from 'react-lazyload';
import { IMG_DEFAULT } from '@/utils/constant';
import { getSearch } from '@/api/hub';
import querySearch from '../mock/search';
import axios from 'axios';
import { cancelPrevRequest } from '@/utils/utils';

const isHub = process.env.REACT_APP_HUB === '1';
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
      hasSearchedDone: false //是否请求接口完毕
    };
    this.inputRef = React.createRef();
    this.inputRefMobile = React.createRef();

    this.hanldeSearchClick = this.hanldeSearchClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.hanldeSearchCloseClick = this.hanldeSearchCloseClick.bind(this);
    this.hubGA = process.env.REACT_APP_HUB_GA == '1';
  }
  handleSearchInputChange(e) {
    this.setState(
      {
        keywords: e.target.value,
        hasSearchedDone: false
      },
      () => {
        clearTimeout(this.timer);
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
  }
  async getSearchData() {
    const { keywords } = this.state;
    this.setState({ loading: true });
    Promise.all([
      getList({
        // cateId: process.env.REACT_APP_CATEID,
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
        const esGoodsPage =
          res[0] && res[0].context && res[0].context.esGoodsPage;
        if (esGoodsPage && esGoodsPage.content.length) {
          goodsContent = (esGoodsPage.content || []).map((ele) => {
            let ret = Object.assign({}, ele);
            const tmpItem = find(
              res[0].context.goodsList || [],
              (g) => g.goodsId === ele.id
            );
            if (tmpItem) {
              ret = Object.assign(ret, {
                goodsCateName: tmpItem.goodsCateName,
                goodsSubtitle: tmpItem.goodsSubtitle,
                goodsImg: tmpItem.goodsImg,
                goodsNo: tmpItem.goodsNo
              });
            }
            return ret;
          });
          if (dataLayer[0] && dataLayer[0].search) {
            dataLayer[0].search.query = keywords;
            dataLayer[0].search.results = esGoodsPage.totalElements;
            dataLayer[0].search.type = 'with results';
          }
          const sessionItemRoyal = window.__.sessionItemRoyal;
          sessionItemRoyal.set('search-results', esGoodsPage.totalElements);

          this.setState({
            isSearchSuccess: true,
            result: Object.assign(
              {},
              {
                productList: goodsContent,
                totalElements: esGoodsPage.totalElements
              },
              { attach: res[1] && res[1].data }
            )
          });
        } else {
          if (dataLayer[0] && dataLayer[0].search) {
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
        if (dataLayer[0] && dataLayer[0].search) {
          dataLayer[0].search.query = keywords;
          dataLayer[0].search.results = 0;
          dataLayer[0].search.type = 'without results';
        }
        this.setState({
          hasSearchedDone: true,
          loading: false,
          result: Object.assign({}, { productList: [], totalElements: 0 })
        });
      });
  }
  hanldeSearchCloseClick() {
    this.setState({
      showSearchInput: false,
      keywords: '',
      result: null
    });
    this.props.onClose();
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
    if (this.state.loading || !this.state.hasSearchedDone) return;
    this.props.history.push({
      pathname: `/on/demandware.store/Sites-${process.env.REACT_APP_LANG.toUpperCase()}-Site/${process.env.REACT_APP_LANG.toLowerCase()}_${process.env.REACT_APP_LANG.toUpperCase()}/Search-Show`,
      // pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?q=${e.current.value}`,
      search: `?q=${this.state.keywords}`,
      state: {
        GAListParam: 'Search Results',
        noresult: !this.state.isSearchSuccess
      }
    });
  };

  hanldeSearchFocus = () => {
    this.hubGA &&
      dataLayer.push({
        event: 'topPictosClick',
        topPictosClick: {
          itemName: 'Type and search'
        }
      });
  };

  renderResultJsx() {
    const { result, keywords } = this.state;
    let ret = null;
    if (result) {
      ret = (
        <div className="suggestions" id="mainSuggestions">
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
                        <div className="row">
                          <div className="item__image hidden-xs-down_ swatch-circle col-4 col-md-3 col-lg-2">
                            <Link
                              className="ui-cursor-pointer"
                              style={{ width: '100%' }}
                              to={{
                                pathname: `/${item.lowGoodsName
                                  .split(' ')
                                  .join('-')
                                  .replace('/', '')}-${item.goodsNo}`,
                                state: {
                                  GAListParam: 'Search Results'
                                }
                              }}
                            >
                              <LazyLoad>
                                <img
                                  className="swatch__img"
                                  alt={item.goodsName}
                                  title={item.goodsName}
                                  style={{ width: '100%' }}
                                  src={
                                    item.goodsImg ||
                                    item.goodsInfos.sort(
                                      (a, b) => a.marketPrice - b.marketPrice
                                    )[0].goodsInfoImg ||
                                    IMG_DEFAULT
                                  }
                                />
                              </LazyLoad>
                            </Link>
                          </div>
                          <div className="col-8 col-md-9 col-lg-10">
                            <Link
                              to={{
                                pathname: `/${item.lowGoodsName
                                  .split(' ')
                                  .join('-')
                                  .replace('/', '')}-${item.goodsNo}`,
                                state: {
                                  GAListParam: 'Search Results'
                                }
                              }}
                              className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                              alt={item.goodsName}
                              title={item.goodsName}
                            >
                              {item.goodsName}
                            </Link>
                            <div className="rc-meta searchProductKeyword" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="d-flex ml-2 mr-2">
                      <em className="rc-icon rc-incompatible--xs rc-iconography" />
                      <FormattedMessage id="list.errMsg4" />
                    </p>
                  )}
                </div>
                {result.totalElements ? (
                  <div className="rc-margin-top--xs">
                    <Link
                      className="productName rc-large-body ui-cursor-pointer"
                      // to={`/list/keywords/${keywords}`}
                      to={{
                        // pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show`,
                        pathname: `/on/demandware.store/Sites-${process.env.REACT_APP_LANG.toUpperCase()}-Site/${process.env.REACT_APP_LANG.toLowerCase()}_${process.env.REACT_APP_LANG.toUpperCase()}/Search-Show`,
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
                      href={item.Url}
                      key={i}
                    >
                      {item.Title}
                    </a>
                  ))}
                  {(result.attach.FeaturedItems || []).map((item, i) => (
                    <a
                      className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                      alt={item.Title}
                      title={item.Title}
                      href={item.Url}
                      key={i}
                    >
                      {item.Title}
                    </a>
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
    const { showSearchInput, result, keywords, loading } = this.state;
    return (
      <div className="inlineblock w-100">
        {loading ? <Loading /> : null}
        {+process.env.REACT_APP_HUB ? (
          <>
            <div className="search-contaner">
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
            {result ? (
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
                <div className="suggestions-wrapper">
                  {this.renderResultJsx()}
                </div>
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
                    // pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show`,
                    pathname: `/on/demandware.store/Sites-${process.env.REACT_APP_LANG.toUpperCase()}-Site/${process.env.REACT_APP_LANG.toLowerCase()}_${process.env.REACT_APP_LANG.toUpperCase()}/Search-Show`,
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
