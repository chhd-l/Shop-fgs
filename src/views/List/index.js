import React from 'react'
import Skeleton from 'react-skeleton-loader'
import { createHashHistory } from 'history'
import { FormattedMessage } from 'react-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import Filters from '@/components/Filters'
import './index.css'
import { cloneDeep } from 'lodash'
import titleCfg from './json/title.json'
import { getList, getProps } from '@/api/list'
import { queryStoreCateIds, formatMoney } from "@/utils/utils"
import { STOREID, CATEID } from '@/utils/constant'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeCateId: '',
      category: '',
      titleData: null,
      productList: [
        // 占位用，不能删
        {
          id: '3003_RU',
          lowGoodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        },
        {
          id: '3004_RU',
          lowGoodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        },
        {
          id: '3005_RU',
          lowGoodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        }
      ],
      loading: true,
      checkedList: [],
      currentPage: 1,
      totalPage: 1, // 总页数
      results: 0, // 总数据条数
      pageSize: 10,
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      keywords: '',
      filterList: [],
      initingFilter: true
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCurrentPageNumChange = this.handleCurrentPageNumChange.bind(this)
    this.handlePrevOrNextPage = this.handlePrevOrNextPage.bind(this)
    this.hanldeItemClick = this.hanldeItemClick.bind(this)
  }
  async initData () {
    const { category } = this.state
    this.setState({
      titleData: titleCfg[category]
    })

    let storeIdList = await queryStoreCateIds()
    let targetObj = storeIdList.find(s => s.cateName.toLocaleLowerCase() === category)
    if (targetObj) {
      this.setState({
        storeCateId: targetObj.storeCateId
      })
    }

    this.getProductList()
  }
  componentDidMount () {
    this.setState({
      category: this.props.match.params.category
    }, () => {
      const { category } = this.state
      this.initData()
      if (category.toLocaleLowerCase() === 'keywords') {
        this.setState({
          keywords: localStorage.getItem('rc-search-keywords')
        })
      }
    })
  }
  async getProductList () {
    let { checkedList, currentPage, pageSize, storeCateId, keywords } = this.state;
    this.setState({
      loading: true
    })

    let params = {
      storeId: STOREID,
      cateId: CATEID,
      propDetails: [],
      pageNum: currentPage - 1,
      brandIds: [],
      sortFlag: 0,
      pageSize,
      esGoodsInfoDTOList: [],
      companyType: '',
      keywords
    }

    if (storeCateId) {
      params.storeCateIds = [storeCateId]
    }

    for (let item of checkedList) {
      let tmp = params.propDetails.find(p => p.propId === item.propId)
      if (tmp) {
        tmp.detailIds.push(item.detailId)
      } else {
        params.propDetails.push({ propId: item.propId, detailIds: [item.detailId] })
      }
    }

    getList(params)
      .then(res => {
        this.setState({ loading: false })
        const esGoods = res.context.esGoods
        if (esGoods && esGoods.content.length) {
          let goodsContent = esGoods.content
          if (res.context.goodsList) {
            goodsContent = goodsContent.map(ele => {
              let ret = Object.assign({}, ele)
              const tmpItem = res.context.goodsList.find(g => g.goodsId === ele.id)
              if (tmpItem) {
                ret = Object.assign(ret, { goodsCateName: tmpItem.goodsCateName, goodsSubtitle: tmpItem.goodsSubtitle })
              }
              return ret
            })
          }
          this.setState({
            productList: goodsContent,
            results: esGoods.totalElements,
            currentPage: esGoods.number + 1,
            totalPage: esGoods.totalPages
          })
        } else {
          this.setState({
            productList: []
          })
        }
      })
      .catch(() => {
        this.setState({ loading: false, productList: [] })
      })

    if (!this.state.filterList.length) {
      getProps(CATEID)
        .then(res => {
          this.setState({
            filterList: res.context,
            initingFilter: false
          })
        })
    }
  }
  handleFilterChange (item) {
    const { checkedList } = this.state;
    let checkedListCopy = cloneDeep(checkedList);
    let index = checkedListCopy.findIndex(c => c.detailId === item.detailId && c.propId === item.propId)
    if (index > -1) {
      checkedListCopy.splice(index, 1)
    } else {
      checkedListCopy.push(item)
    }
    this.setState({ checkedList: checkedListCopy }, () => this.getProductList())
  }
  handleRemove (item) {
    const { checkedList } = this.state;
    let checkedListCopy = cloneDeep(checkedList);
    let res
    if (item === 'all') {
      res = []
    } else {
      checkedListCopy.splice(checkedListCopy.findIndex(c => c.detailId === item.detailId && c.propId === item.propId), 1)
      res = checkedListCopy
    }
    this.setState({ checkedList: res }, () => this.getProductList())
  }
  handleCurrentPageNumChange (e) {
    let tmp = parseInt(e.target.value)
    if (isNaN(tmp)) {
      tmp = 1
    }
    if (tmp > this.state.totalPage) {
      tmp = this.state.totalPage
    }
    this.setState({ currentPage: tmp }, () => this.getProductList())
  }
  handlePrevOrNextPage (type) {
    const { currentPage, totalPage } = this.state
    let res
    if (type === 'prev') {
      if (currentPage <= 1) {
        return
      }
      res = currentPage - 1
    } else {
      if (currentPage >= totalPage) {
        return
      }
      res = currentPage + 1
    }
    this.setState({ currentPage: res }, () => this.getProductList())
  }
  hanldeItemClick (item) {
    sessionStorage.setItem('rc-goods-cate-name', item.goodsCateName || '')
    sessionStorage.setItem('rc-goods-name', item.lowGoodsName)
    createHashHistory().push('/details/' + item.goodsInfos[0].goodsInfoId)
  }
  render () {
    const { results, productList, loading, checkedList, currentPage, totalPage, titleData, cartData } = this.state
    return (
      <div>
        <Header cartData={cartData} showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          {titleData ?
            <div className="content-block__wrapper_ rc-bg-colour--brand3 rc-padding--sm rc-margin-bottom--xs ">
              <div className="layout-container_ two-column_ rc-layout-container rc-two-column rc-max-width--lg rc-content-h-middle">
                <div className="rc-column ">
                  <div className="rc-full-width rc-text--left rc-padding-x--sm">
                    <h1 className="rc-alpha">{titleData.title}</h1>
                    <p>{titleData.description}</p>
                  </div>
                </div>
                <div className="rc-column ">
                  <img
                    src={titleData.img}
                    alt={titleData.imgAlt} />
                </div>
              </div>
            </div>
            : ''}

          <div className="search-results rc-padding--sm rc-max-width--xl">
            <div className="search-nav">
              {this.state.keywords ?
                <div className="nav-tabs-wrapper rc-text--center">
                  <div className="rc-intro"><FormattedMessage id="list.youSearchedFor" />:</div>
                  <div className="rc-beta rc-padding-bottom--sm rc-margin-bottom--none searchText"><b>"{this.state.keywords}"</b>(<FormattedMessage id="results" /> {results})</div>
                </div> : null}
            </div>
            <section className="rc-bg-colour--brand3">
              <div>
                <div className="rc-text--right rc-meta rc-margin-bottom--none">
                  {results} <FormattedMessage id="results" />
                </div>
                <div className="rc-layout-container rc-four-column">
                  <div className="refinements rc-column js-filter-refinement">
                    <button className="rc-md-down rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography"
                      data-filter-trigger="filter-example">Filters</button>
                    <aside className="rc-filters" data-filter-target="filter-example">
                      <Filters
                        initing={this.state.initingFilter}
                        onChange={this.handleFilterChange}
                        onRemove={this.handleRemove}
                        filterList={this.state.filterList}
                        checkedList={checkedList} />
                    </aside>
                  </div>
                  <div className={['rc-column', 'rc-triple-width', !productList.length ? 'd-flex justify-content-center align-items-center' : ''].join(' ')}>
                    {!productList.length
                      ?
                      <React.Fragment>
                        <div className="ui-font-nothing rc-md-up">
                          <i className="rc-icon rc-incompatible--sm rc-iconography"></i>
                          No products found, please change the search criteria and try again!
                        </div>
                        <div className="ui-font-nothing rc-md-down d-flex">
                          <i className="rc-icon rc-incompatible--xs rc-iconography"></i>
                          No products found, please change the search criteria and try again!
                        </div>
                      </React.Fragment>
                      :
                      <div className={['rc-match-heights', 'rc-layout-container', 'rc-event-card--sidebar-present'].join(' ')}>
                        {productList.map(item => (
                          <div className={['rc-column'].join(' ')} key={item.id}>

                            <article className="rc-card rc-card--product" style={{ minHeight: '120px' }}>
                              <div className="fullHeight">
                                <a onClick={() => this.hanldeItemClick(item)} className="ui-cursor-pointer">
                                  <article className="rc-card--a rc-text--center rc-padding-top--sm">
                                    {
                                      loading
                                        ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} />
                                        : <React.Fragment>
                                          <picture className="rc-card__image">
                                            <div className="rc-padding-bottom--xs">
                                              <img
                                                src={item.goodsInfos[0].goodsInfoImg}
                                                srcSet={item.goodsInfos[0].goodsInfoImg}
                                                alt={item.lowGoodsName}
                                                title={item.lowGoodsName} />
                                            </div>
                                          </picture>
                                          <div className="rc-card__body rc-padding-top--none">
                                            <div className="height-product-tile-plpOnly height-product-tile">
                                              <header className="rc-text--center">
                                                <h3 className="rc-card__title rc-gamma">{item.lowGoodsName}</h3>
                                              </header>
                                              <div className="Product-Key-words rc-text--center"></div>
                                              <div className="rc-card__meta rc-margin-bottom--xs rc-text--center">
                                                {item.goodsSubtitle}
                                              </div>
                                            </div>
                                            <span className="rc-card__price rc-text--center">
                                              <span className="range">
                                                <FormattedMessage id="from" /> $ {formatMoney(item.goodsInfos[0].salePrice)}
                                              </span>
                                            </span>
                                          </div>
                                        </React.Fragment>
                                    }
                                  </article>
                                </a>
                              </div>
                            </article>
                          </div>
                        ))}
                        <div className="grid-footer rc-full-width">
                          <nav className="rc-pagination">
                            <div className="rc-pagination__form">
                              <div
                                className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                                onClick={() => this.handlePrevOrNextPage('prev')}></div>
                              {/* <div
                              className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                              onClick={this.handlePrevOrNextPage('prev')}></div> */}
                              <div className="rc-pagination__steps">
                                <input
                                  type="text"
                                  className="rc-pagination__step rc-pagination__step--current"
                                  value={currentPage}
                                  onChange={this.handleCurrentPageNumChange} />
                                <div className="rc-pagination__step rc-pagination__step--of">
                                  <FormattedMessage id="of" /> <span>{totalPage}</span>
                                </div>
                              </div>

                              <span
                                className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"
                                onClick={() => this.handlePrevOrNextPage('next')}></span>
                            </div>
                          </nav>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div >
    );
  }
}

export default List;
