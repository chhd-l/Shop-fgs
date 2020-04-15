import React from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MegaMenu from '@/components/MegaMenu'
import BreadCrumbs from '@/components/BreadCrumbs'
import Filters from '@/components/Filters'
import './index.css'
import { cloneDeep } from 'lodash'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [
        // 占位用，不能删
        {
          pid: '3003_RU',
          name: 'Mini adult',
          href: '#',
          imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
          imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
          description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
          price: 945
        }
      ],
      loading: true,
      checkedList: [],
      current: 1,
      total: 1, // 总页数
      results: 33 // 总数据条数
    }
    this.filterList = [
      {
        name: 'AGE',
        list: [
          {
            label: 'Puppies (up to 10 months)',
            value: 'Puppies (up to 10 months)'
          },
          {
            label: 'Adults (1-7 years old)',
            value: 'Adults (1-7 years old)'
          },
          {
            label: 'Aging (over 7 years old)',
            value: 'Aging (over 7 years old)'
          }
        ]
      },
      {
        name: 'Pet size',
        list: [
          {
            label: 'X-Small (up to 4 kg)',
            value: 'X-Small (up to 4 kg)'
          },
          {
            label: 'Mini (4-10 kg)',
            value: 'Mini (4-10 kg)'
          },
          {
            label: 'Medium (10-25 kg)',
            value: 'Medium (10-25 kg)'
          },
          {
            label: 'Maxi (25-45 kg)',
            value: 'Maxi (25-45 kg)'
          },
          {
            label: 'Giant (over 45 kg)',
            value: 'Giant (over 45 kg)'
          }
        ]
      },
      {
        name: 'Breed',
        list: [
          {
            label: 'Bulldog',
            value: 'Bulldog'
          },
          {
            label: 'Beagle',
            value: 'Beagle'
          },
          {
            label: 'Boxer',
            value: 'Boxer'
          },
          {
            label: 'West Highland White Terrier',
            value: 'West Highland White Terrier'
          },
          {
            label: 'Dalmatian',
            value: 'Dalmatian'
          },
          {
            label: 'Jack Russell Terrier',
            value: 'Jack Russell Terrier'
          },
          {
            label: 'Golden retriever',
            value: 'Golden retriever'
          },
          {
            label: 'Labrador retriever',
            value: 'Labrador retriever'
          },
          {
            label: 'Pug',
            value: 'Pug'
          },
          {
            label: 'German Shepherd',
            value: 'German Shepherd'
          },
          {
            label: 'Rottweiler',
            value: 'Rottweiler'
          },
          {
            label: 'Dachshund standard smooth-haired',
            value: 'Dachshund standard smooth-haired'
          },
          {
            label: 'Shih Tzu',
            value: 'Shih Tzu'
          },
          {
            label: 'French Bulldog',
            value: 'French Bulldog'
          },
          {
            label: 'Yorkshire Terrier',
            value: 'Yorkshire Terrier'
          },
          {
            label: 'Chihuahua longhair',
            value: 'Chihuahua longhair'
          },
          {
            label: 'Mixed Breed or Outbred',
            value: 'Mixed Breed or Outbred'
          }
        ]
      },
      {
        name: 'Feed type',
        list: [
          {
            label: 'Dry',
            value: 'Dry'
          },
          {
            label: 'Wet',
            value: 'Wet'
          }
        ]
      },
      {
        name: 'Sterilization',
        list: [
          {
            label: 'Yes',
            value: 'Yes'
          },
          {
            label: 'No',
            value: 'No'
          }
        ]
      }
    ]
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCurrentPageNumChange = this.handleCurrentPageNumChange.bind(this)
    this.handlePrevPage = this.handlePrevPage.bind(this)
    this.handleNextPage = this.handleNextPage.bind(this)
  }
  componentDidMount () {
    this.getProductList()
  }
  getProductList () {
    // 搜索参数
    const { checkedList, current } = this.state;
    console.log('query getProductList interface', checkedList, current)
    let res = [
      {
        pid: '3003_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 945
      },
      {
        pid: '3001_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 33
      },
      {
        pid: '3005_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 44
      },
      {
        pid: '3065_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 66
      },
      {
        pid: '3075_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
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
    if (val == 'all') {
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
  handlePrevPage () {
    const { current } = this.state
    if (current <= 1) {
      return
    }
    this.setState({ current: current - 1 }, () => this.getProductList())
  }
  handleNextPage () {
    const { current, total } = this.state
    if (current >= total) {
      return
    }
    this.setState({ current: current + 1 }, () => this.getProductList())
  }
  render () {
    const { results, productList, loading, checkedList, current, total } = this.state
    return (
      <div>
        <Header />
        <MegaMenu />

        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs data={[{ name: 'Dog', href: '' }]} />
          <div className="content-block__wrapper_ rc-bg-colour--brand3 rc-padding--sm rc-margin-bottom--xs ">
            <div className="layout-container_ two-column_ rc-layout-container rc-two-column rc-max-width--lg rc-content-h-middle">
              <div className="rc-column ">
                <div className="rc-full-width rc-text--left rc-padding-x--sm">
                  <h1 className="rc-alpha">Специализированное здоровое питание для Вашей собаки</h1>
                  <p>У собак разных размеров (например, чихуахуа и ротвейлера) физиологические потребности совершенно
                  различны. Из-за этого выбор подходящего корма может оказаться трудной задачей. Вот почему ROYAL CANIN®
                  предлагает&nbsp; питание, учитывающее уникальные характеристики каждой собаки: размер, возраст,
                  особенности здоровья, образа жизни и породы. Воспользуйтесь фильтрами ниже, чтобы сделать оптимальный
                выбор для Вашей собаки.</p>
                  <p>
                  </p>
                </div>
              </div>
              <div className="rc-column ">
                <img
                  src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd94da11c/ENGLISH_COCKER_SPANIEL_ADULT__DERMATOLOGY_EMBLEMATIC_High_Res.___Print.png?sw=500&amp;sh=385&amp;sm=fit&amp;cx=356&amp;cy=161&amp;cw=2088&amp;ch=1608&amp;sfrm=png"
                  alt="dog category" />
              </div>
            </div>
          </div>
          {/* <!-- divider --> */}
          <section>
            <div className="rc-border-bottom rc-border-colour--brand4 rc-margin-bottom--xs" style={{ borderBottomWidth: '1px' }}>
            </div>
          </section>

          <section>
            <div className="rc-padding--sm rc-max-width--xl rc-padding-top--none">
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
                      <div className={['rc-column', loading ? 'loading' : ''].join(' ')} key={item.pid}>
                        <article className="rc-card rc-card--product">
                          <div className="fullHeight">
                            <a href={item.href}>
                              <article className="rc-card--a rc-text--center rc-padding-top--sm">
                                <picture className="rc-card__image">
                                  <div className="rc-padding-bottom--xs">
                                    <img className=""
                                      src={item.imgSrc}
                                      srcSet={item.imgSrcSet}
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
                            aria-label="Previous step" data-prev="" type="submit" onClick={this.handlePrevPage}></button>
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
                            aria-label="Previous step" data-next="" type="submit" onClick={this.handleNextPage}></button>
                        </form>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div >
    );
  }
}

export default List;
