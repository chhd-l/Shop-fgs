import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getGoodsRelation } from '@/api/details';
//import Skeleton from 'react-skeleton-loader';
import Rate from '@/components/Rate';
import { formatMoney } from '@/utils/utils';
import { find } from 'lodash';
const sessionItemRoyal = window.__.sessionItemRoyal;
@injectIntl
class RalatedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsId:'',
      relatedProduce: [
        {
          goodsImg: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008050653441618.png',
          goodsName: 'MOBILITY C2P+ SMALL DOG',
          goodsSubtitle: 'Trocken, Hund',
          avgEvaluate: 0,
          goodsEvaluateNum: 2,
          minMarketPrice: '6.51',
          minSubscriptionPrice: '6.18',
          marketPrice: null,
          subscriptionStatus: null,
          goodsId:"ff80808173b716520173b81bd1450070"
        },
        {
          goodsImg: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008050653441618.png',
          goodsName: 'MOBILITY C2P+ SMALL DOG',
          goodsSubtitle: 'Trocken, Hund',
          avgEvaluate: 1,
          goodsEvaluateNum: 2,
          minMarketPrice: '6.51',
          minSubscriptionPrice: '6.18',
          marketPrice: null,
          subscriptionStatus: null,
          goodsId:"ff80808173b716520173b81bd1450070"
        },
        {
          goodsImg: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008050653441618.png',
          goodsName: 'MOBILITY C2P+ SMALL DOG',
          goodsSubtitle: 'Trocken, Hund',
          avgEvaluate: 0,
          goodsEvaluateNum: 2,
          minMarketPrice: '6.51',
          minSubscriptionPrice: '6.18',
          marketPrice: null,
          subscriptionStatus: null,
          goodsId:"ff80808173b716520173b81bd1450070"
        },
        {
          goodsImg: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008050653441618.png',
          goodsName: 'MOBILITY C2P+ SMALL DOG',
          goodsSubtitle: 'Trocken, Hund',
          avgEvaluate: 1,
          goodsEvaluateNum: 2,
          minMarketPrice: '6.51',
          minSubscriptionPrice: '6.18',
          marketPrice: null,
          subscriptionStatus: null,
          goodsId:"ff80808173b716520173b81bd1450070"
        },
        {
          goodsImg: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008050653441618.png',
          goodsName: 'MOBILITY C2P+ SMALL DOG',
          goodsSubtitle: 'Trocken, Hund',
          avgEvaluate: 0,
          goodsEvaluateNum: 2,
          minMarketPrice: '6.51',
          minSubscriptionPrice: '6.18',
          marketPrice: null,
          subscriptionStatus: null,
          goodsId:"ff80808173b716520173b81bd1450070"
        }
      ]
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    
  }
  componentDidMount(){
    let goodsId = this.props.goodsId
    if(goodsId){
      getGoodsRelation(goodsId).then((res)=>{
        if(res.code === 'K-000000'){
          const relatedProduce = res.context.goods
          this.setState({
            relatedProduce
          },()=>{
            console.log(111,this.state.relatedProduce)
          })
        }
      })
    }
  
  }

  hanldeItemClick=(item)=>{
    // if (this.state.loading) {
    //   return false;
    // }
    sessionItemRoyal.set(
      'rc-goods-cate-name',
      this.state.currentCatogery || ''
    );
    sessionItemRoyal.set('recomment-preview', this.props.location.pathname);
    sessionItemRoyal.set('rc-goods-name', item.goodsName);
    const { history } = this.props;
    history.push('/details/' + item.goodsInfoId);
  }

  render() {
    const {relatedProduce} = this.state
    console.log('renderrenderrender')
    return (
      <div 
        class="rc-carousel rc-carousel--cards rc-match-heights" 
        data-js-carousel=""
        data-rc-cards="true"
       >
        <div class="rc-carousel__card-gal">
          {
            relatedProduce.map((item, index) => {
              return (
                <a class="rc-card__link" href="#/" key={index}>
                  <article class="rc-card rc-card--b">
                    <picture class="rc-card__image">
                      <img alt="alt text" src={item.goodsImg} />
                    </picture>
                    <div class="rc-card__body">
                      <header>
                        <h1 class="rc-card__title">{item.goodsSubtitle}</h1>
                        <p class="rc-card__meta">{item.goodsName}</p>
                        <div
                          className={`rc-card__price text-center RateFitScreen `}
                        >
                          <div className="display-inline">
                            <Rate
                              def={item.avgEvaluate}
                              disabled={true}
                              marginSize="smallRate"
                            />
                          </div>
                          <span className="comments rc-margin-left--xs rc-text-colour--text">
                            ({item.goodsEvaluateNum})
                          </span>
                        </div>
                        <div
                          className="text-center NameFitScreen"
                          style={{
                            color: '#4a4a4a',
                            opacity:
                              this.state.relatedProduce.length > 1
                                ? 1
                                : 0
                          }}
                        >
                          <FormattedMessage id="startFrom" />
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="rc-card__price text-left PriceFitScreen">
                            <div
                              className={`rc-full-width PriceFitScreen`}
                            >
                              <span
                                style={{
                                  color: '#323232',
                                  fontWeight: 400
                                }}
                              >
                                {formatMoney(
                                  Math.min.apply(
                                    null,
                                    relatedProduce.map(
                                      (g) =>
                                        g.marketPrice || 0
                                    )
                                  )
                                )}{' '}
                                {relatedProduce.sort(
                                  (a, b) =>
                                    a.marketPrice -
                                    b.marketPrice
                                )[0].linePrice &&
                                  relatedProduce.sort(
                                    (a, b) =>
                                      a.marketPrice -
                                      b.marketPrice
                                  )[0].linePrice > 0 ? (
                                    <span
                                      className="text-line-through rc-text-colour--text font-weight-lighter"
                                      style={{
                                        fontSize: '.8em'
                                      }}
                                    >
                                      {formatMoney(
                                        relatedProduce.sort(
                                          (a, b) =>
                                            a.marketPrice -
                                            b.marketPrice
                                        )[0].linePrice
                                      )}
                                    </span>
                                  ) : null}
                              </span>
                            </div>
                            {find(
                              relatedProduce,
                              (ele) => ele.subscriptionStatus
                            ) &&
                              Math.min.apply(
                                null,
                                relatedProduce
                                  .filter(
                                    (g) => g.subscriptionStatus
                                  )
                                  .map(
                                    (g) =>
                                      g.subscriptionPrice || 0
                                  )
                              ) > 0 ? (
                                <div className="range position-relative SePriceScreen">
                                  <span
                                    style={{
                                      color: '#323232',
                                      fontWeight: 400
                                    }}
                                  >
                                    {formatMoney(
                                      Math.min.apply(
                                        null,
                                        relatedProduce
                                          .filter(
                                            (g) =>
                                              g.subscriptionStatus
                                          )
                                          .map(
                                            (g) =>
                                              g.subscriptionPrice ||
                                              0
                                          )
                                      )
                                    )}{' '}
                                  </span>
                                  <span
                                    className="iconfont font-weight-bold red mr-1"
                                    style={{
                                      fontSize: '.65em'
                                    }}
                                  >
                                    &#xe675;
                                  </span>
                                  <span
                                    className="position-relative red-text position-absolute"
                                    style={{
                                      fontSize: '.7em',
                                      top: '52%',
                                      transform:
                                        'translateY(-50%)',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    <FormattedMessage id="autoshop" />
                                  </span>
                                </div>
                              ) : null}
                          </div>
                        </div>
                      </header>
                    </div>
                  </article>
                </a>
              )
            })
          }
        </div>
      </div>
    );
  }
}
export default RalatedProduct;
