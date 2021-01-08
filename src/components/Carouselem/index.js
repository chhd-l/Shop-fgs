import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import "./index.less"

const Carouselem = withRouter((props) => {
  const {list,sourceParam} = props
  return (
    <div className="refuge tns-outer">
      <div className="rc-carousel rc-carousel--cards rc-match-heights" data-js-carousel="" data-rc-cards="true"
        data-rows="6" data-rc-prev="prev" data-rc-next="next" >
        <div className="rc-carousel__card-gal">
          {
            list.map((item, index) => {
              return (
                <article className="rc-card rc-card--b tns-item tns-slide-active">
                  <Link to={item.linkUrl+sourceParam} className="rc-card__link rc-card--product rc-full-width h-100 rc-margin--none" style={{cursor:'pointer'}}>
                    <article className="rc-card rc-card--b rc-padding--sm--mobile rc-padding--xs--desktop rc-padding-x--xs h-100 priceRangeFormat">
                      <div className="row h-100">
                        <picture className="mx-auto col-4 col-sm-3 col-md-12 rc-margin-bottom--xs--desktop">
                          <img className="m-auto lazyloaded" src={item.imageUrl} alt="alt text" />
                        </picture>
                        <div className="text-left text-md-center col-8 col-sm-9 col-md-12 d-flex flex-column rc-padding-left--none--mobile align-self-center align-self-md-start">
                          <header>
                            <h3 className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop">{item.title}</h3>
                          </header>
                          <div className="Product-Key-words"></div>
                          <div className="rc-card__price rc-margin-top--xs">
                            <span className="range">
                              {
                                item.price&&item.marketPrice?' De ':''
                              }
                              <span>
                                <span className="sales">
                                  <span className="value" content={item.marketPrice}>
                                    {item.marketPrice>0?item.marketPrice +' €': '' }
                                  </span>
                                </span>
                              </span>
                              {
                                item.price&&item.marketPrice?' à ':''
                              }
                              <span>
                              <span className="sales">
                                  <span className="value" content={item.price}>
                                  {item.price>0?item.price+' €': '' }
                                  </span>
                                </span>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="rc-card__meta text-center col-12">
                          {item.subTitle}
                        </div>
                      </div>
                    </article>
                  </Link>
                </article>
              )
            })
          }
        </div>
      </div>
    </div>
  )


});
export default Carouselem;
