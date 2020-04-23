import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { formatMoney } from "@/utils/utils.js"
import './index.css'

class InterestedIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [
        // 勿删，占位用
        {
          id: '3003_RU',
          name: 'Mini adult',
          url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
          img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
          description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
          price: 945
        }
      ],
      loading: true
    }
  }
  componentDidMount () {
    this.getList()
  }
  getList () {
    let res = [
      {
        id: '4003_RU',
        name: 'Mini adult',
        url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 945
      },
      {
        id: '4001_RU',
        name: 'Mini adult',
        url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 33
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
    const { productList, loading } = this.state
    return (
      <div className="rc-bottom-spacing rc-text-align-center">
        <h2 className="title rc-margin-bottom--md rc-beta rc-text--center"><FormattedMessage id="home.interestedIn" /></h2>
        <div className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-four-column rc-padding-bottom--lg">
          {productList.map(item => (
            <div className={['rc-grid rc-grid-custom', loading ? 'loading' : ''].join(' ')} key={item.id}>
              <div className="rc-card">
                <div>
                  <Link to={'/details/' + item.id}>
                    <article className="rc-card--product rc-text--center rc-padding-y--xs rc-column rc-padding-x--none">
                      <picture className="rc-card__image">
                        <div className="rc-padding-bottom--xs">
                          <img
                            src={item.url}
                            srcSet={item.img}
                            alt={item.name}
                            title={item.name} />
                        </div>
                      </picture>
                      <div className="rc-card__body">
                        <div className="height-product-tile">
                          <header className="rc-text--center">
                            <h3 className="rc-card__title rc-gamma">
                              {item.name}
                            </h3>
                          </header>
                          <div className="Product-Key-words rc-text--center"></div>
                          <div className="rc-card__meta rc-margin-bottom--xs rc-text--center">
                            {item.description}
                          </div>
                        </div>
                        <span className="rc-card__price rc-text--center rc-margin--none">
                          <span>
                            <span>
                              <span className="sales">
                                <span className="value">
                                  $ {formatMoney(item.price)}
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </div>
                    </article>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default InterestedIn