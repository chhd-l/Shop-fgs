import React from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import Filters from '@/components/Filters'
import './index.css'
import { cloneDeep } from 'lodash'
import filterData from './json/index.json'
import titleCfg from './json/title.json'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      titleData: null,
      productList: [
        // 占位用，不能删
        {
          id: '3003_RU',
          name: 'Mini adult',
          url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
          img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
          description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
          price: 945
        }
      ],
      loading: true,
      checkedList: [],
      current: 1,
      total: 6, // 总页数
      results: 33, // 总数据条数
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
    this.breadCrumbsData = []
    this.filterList = []
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCurrentPageNumChange = this.handleCurrentPageNumChange.bind(this)
    this.handlePrevOrNextPage = this.handlePrevOrNextPage.bind(this)
  }
  initData () {
    const { type } = this.state
    this.filterList = filterData[type]
    this.setState({
      titleData: titleCfg[type]
    })
    this.getProductList()
  }
  componentDidMount () {
    this.setState({
      type: this.props.match.params.type
    }, () => {
      const { type } = this.state
      this.initData()
      let capitalizeType = this.capitalize(type)
      this.breadCrumbsData = [{ name: capitalizeType, href: '' }]
      if (type === 'kittens') {
        this.breadCrumbsData = [
          { name: capitalizeType, href: '#/cats' },
          { name: 'Age', href: '#/cats' },
          { name: 'Kitten (0-1 year old)', href: '' }
        ]
      } else if (type === 'puppies') {
        this.breadCrumbsData = [
          { name: capitalizeType, href: '#/dogs' },
          { name: 'Age', href: '#/dogs' },
          { name: 'Puppy (0-1 year old)', href: '' }
        ]
      }
    })
  }
  capitalize (val) {
    if (!val) return ''
    val = val.toString()
    return val.charAt(0).toUpperCase() + val.slice(1)
  }
  getProductList () {
    // 搜索参数
    const { checkedList, current } = this.state;
    console.log('query getProductList interface', checkedList, current)
    let res = [
      {
        id: '3003_RU',
        name: 'Mini adult',
        url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 945
      },
      {
        id: '3001_RU',
        name: 'Mini adult',
        url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 33
      },
      {
        id: '3005_RU',
        name: 'Mini adult',
        url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 44
      },
      {
        id: '3065_RU',
        name: 'Mini adult',
        url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 66
      },
      {
        id: '3075_RU',
        name: 'Mini adult',
        url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 66
      }
    ]
    setTimeout(() => {
      this.setState({
        productList: res,
        loading: false
      })
    }, 1000)
  }
  handleFilterChange (value) {
    const { checkedList } = this.state;
    let checkedListCopy = cloneDeep(checkedList);
    let index = checkedListCopy.indexOf(value);
    if (index > -1) {
      checkedListCopy.splice(index, 1)
    } else {
      checkedListCopy.push(value)
    }
    this.setState({ checkedList: checkedListCopy }, () => this.getProductList())
  }
  handleRemove (val) {
    const { checkedList } = this.state;
    let checkedListCopy = cloneDeep(checkedList);
    let res
    if (val === 'all') {
      res = []
    } else {
      checkedListCopy.splice(checkedListCopy.indexOf(val), 1)
      res = checkedListCopy
    }
    this.setState({ checkedList: res }, () => this.getProductList())

  }
  handleCurrentPageNumChange (e) {
    let tmp = parseInt(e.target.value)
    if (isNaN(tmp)) {
      tmp = 1
    }
    if (tmp > this.state.total) {
      tmp = this.state.total
    }
    this.setState({ current: tmp }, () => this.getProductList())
  }
  handlePrevOrNextPage (type) {
    const { current, total } = this.state
    let res
    if (type === 'prev') {
      if (current <= 1) {
        return
      }
      res = current - 1
    } else {
      if (current >= total) {
        return
      }
      res = current + 1
    }
    this.setState({ current: res }, () => this.getProductList())
  }
  render () {
    const { results, productList, loading, checkedList, current, total, titleData, cartData } = this.state
    return (
      <div>
        <Header cartData={cartData} showMiniIcons={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs data={this.breadCrumbsData} />
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
            <div className="search-nav"></div>
            <section className="rc-bg-colour--brand3">
              <div>
                <div className="rc-text--right rc-meta rc-margin-bottom--none">
                  {results} Results
                </div>
                <div className="rc-layout-container rc-four-column">
                  <div className="refinements rc-column js-filter-refinement">
                    <button className="rc-md-down rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography"
                      data-filter-trigger="filter-example">Filters</button>
                    <aside className="rc-filters" data-filter-target="filter-example">
                      <Filters onChange={this.handleFilterChange} onRemove={this.handleRemove} filterList={this.filterList} checkedList={checkedList} />
                    </aside>
                  </div>
                  <div className="rc-column rc-triple-width">
                    <div className="rc-match-heights rc-layout-container rc-event-card--sidebar-present">
                      {productList.map(item => (
                        <div className={['rc-column', loading ? 'loading' : ''].join(' ')} key={item.id}>
                          <article className="rc-card rc-card--product">
                            <div className="fullHeight">
                              <a href={'#/details/' + item.id}>
                                <article className="rc-card--a rc-text--center rc-padding-top--sm">
                                  <picture className="rc-card__image">
                                    <div className="rc-padding-bottom--xs">
                                      <img className=""
                                        src={item.url}
                                        srcSet={item.img}
                                        alt={item.name} title={item.name} />
                                    </div>
                                  </picture>
                                  <div className="rc-card__body rc-padding-top--none">
                                    <div className="height-product-tile-plpOnly height-product-tile">
                                      <header className="rc-text--center">
                                        <h3 className="rc-card__title rc-gamma">{item.name}</h3>
                                      </header>
                                      <div className="Product-Key-words rc-text--center"></div>
                                      <div className="rc-card__meta rc-margin-bottom--xs rc-text--center">
                                        {item.description}
                                      </div>
                                    </div>
                                    <span className="rc-card__price rc-text--center">
                                      <span className="range">
                                        From {item.price} ₽
                                    </span>
                                    </span>
                                  </div>
                                </article>
                              </a>
                            </div>
                          </article>
                        </div>
                      ))}
                      <div className="grid-footer rc-full-width">
                        <nav className="rc-pagination" data-pagination="" data-pages={total}>
                          <form className="rc-pagination__form">
                            <button
                              className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                              aria-label="Previous step" data-prev="" type="submit" onClick={this.handlePrevOrNextPage('prev')}></button>
                            <div className="rc-pagination__steps">
                              <input type="text" className="rc-pagination__step rc-pagination__step--current" value={current}
                                aria-label="Current step" onChange={this.handleCurrentPageNumChange} />
                              <div className="rc-pagination__step rc-pagination__step--of">
                                of
                              <span data-total-steps-label=""></span>
                              </div>
                            </div>
                            <button
                              className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"
                              aria-label="Previous step" data-next="" type="submit" onClick={() => this.handlePrevOrNextPage('next')}></button>
                          </form>
                        </nav>
                      </div>
                    </div>
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
