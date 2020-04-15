import React from 'react';
import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'
import MegaMenu from '../../components/MegaMenu/index'
import BreadCrumbs from '../../components/BreadCrumbs/index'
import Filters from '../../components/Filters/index'
import './list.css'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: 33,
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
      loading: true
    }
  }
  componentDidMount () {
    this.getProductList()
  }
  getProductList () {
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
  render () {
    const { results, productList, loading } = this.state
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
                    <Filters />
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
                      <nav className="rc-pagination" data-pagination="" data-pages="10">
                        <form action="#" method="POST" className="rc-pagination__form">
                          <button
                            className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                            aria-label="Previous step" data-prev="" type="submit"></button>
                          <div className="rc-pagination__steps">
                            <input type="text" className="rc-pagination__step rc-pagination__step--current" value="1"
                              aria-label="Current step" />
                            <div className="rc-pagination__step rc-pagination__step--of">
                              of
                              <span data-total-steps-label=""></span>
                            </div>
                          </div>
                          <button
                            className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"
                            aria-label="Previous step" data-next="" type="submit"></button>
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
