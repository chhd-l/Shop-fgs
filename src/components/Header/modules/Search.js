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
      isSearchSuccess: false //是否搜索成功
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
        keywords: e.target.value
      },
      () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
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
        pageSize: 20,
        esGoodsInfoDTOList: [],
        companyType: ''
      }),
      isHub && getSearch({ keywords })
      // isHub && querySearch()
    ])
      .then((res) => {
        let goodsContent = [];
        const esGoods = res[0] && res[0].context && res[0].context.esGoods;
        if (esGoods && esGoods.content.length) {
          goodsContent = (esGoods.content || []).map((ele) => {
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
            dataLayer[0].search.results = esGoods.totalElements;
            dataLayer[0].search.type = 'with results';
          }

          this.setState({
            isSearchSuccess: true,
            result: Object.assign(
              {},
              {
                productList: goodsContent,
                totalElements: esGoods.totalElements
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
  }
  handleSearch = () => {
    if (this.state.loading) return;
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
    this.hubGA && dataLayer.push({
      event: 'topPictosClick',
      topPictosClick: {
        itemName: 'Type and search',
      }
    });
  }

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
                      <i className="rc-icon rc-incompatible--xs rc-iconography" />
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
                      <b>
                        <FormattedMessage id="viewAllResults" /> (
                        {result.totalElements})
                      </b>
                    </Link>
                  </div>
                ) : null}
              </div>
              {isHub && (
                <div class="col-12 col-md-5 rc-column rc-bg-colour--brand4">
                  {result && result.attach ? (
                    <>
                      {(result.attach.Items || []).map((item, i) => (
                        <a
                          class="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
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
                          class="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                          alt={item.Title}
                          title={item.Title}
                          href={item.Url}
                          key={i}
                        >
                          {item.Title}
                        </a>
                      ))}
                    </>
                  ) : null}
                </div>
              )}
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
              <span className="iconfont icon-search">&#xe6a5;</span>
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
                    className="search-field rc-bg-colour--brand4"
                    type="search"
                    autoComplete="off"
                    placeholder={txt}
                    onFocus={this.hanldeSearchFocus}
                    onChange={this.handleSearchInputChange}
                    value={keywords}
                  />
                )}
              </FormattedMessage>
            </div>
            {result ? (
              <div style={{ position: 'relative' }}>
                <div className="suggestions-wrapper">
                  {this.renderResultJsx()}
                </div>
              </div>
            ) : null}
            {/* <div
              class={`rc-shade searchbar ${showSearchInput ? '' : 'rc-hidden'}`}
            />
            <div
              className={`search-contaner__shadow rc-bg-colour--brand4 ${
                showSearchInput ? '' : 'rc-hidden'
              } ${
                result && result.Items && result.Items.length ? 'result' : ''
              }`}
            >
              <div className="search-contaner">
                <span className="iconfont icon-search">&#xe6a5;</span>
                <span
                  className="iconfont icon-close"
                  onClick={this.hanldeSearchCloseClick}
                >
                  &#xe6fb;
                </span>
                <FormattedMessage id="startTypingToSearch">
                  {(txt) => (
                    <input
                      ref={this.inputRef}
                      className={`search-field`}
                      type="search"
                      autoComplete="off"
                      placeholder={txt}
                      value={keywords}
                      onChange={this.handleSearchInputChange}
                      onFocus={this.hanldeSearchClick}
                    />
                  )}
                </FormattedMessage>
              </div>
              <div className="suggestions-wrapper w-100">
                {this.renderResultJsx()}
              </div>
            </div>
           */}
          </>
        ) : (
          <>
            <button
              id="mainSearch"
              className={`rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography ${
                showSearchInput ? 'rc-hidden' : ''
              }`}
              aria-label="Search"
              onClick={this.hanldeSearchClick}
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
          </>
        )}
      </div>
    );
  }
}
