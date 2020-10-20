import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
//import { getLoginGoodsEvaluate, getUnLoginGoodsEvaluate } from '@/api/details';
import Skeleton from 'react-skeleton-loader';
@injectIntl
class RalatedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProduce: [
        {
          pic_url: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008050653441618.png',
          goodsName: 'MOBILITY C2P+ SMALL DOG',
          goodsSubtitle: 'Trocken, Hund',
          avgEvaluate: '',
          goodsEvaluateNum: '',
          minMarketPrice: '6.51',
          minSubscriptionPrice: '6.18'
        },
        {
          pic_url: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008050653441618.png',
          goodsName: 'MOBILITY C2P+ SMALL DOG',
          goodsSubtitle: 'Trocken, Hund',
          avgEvaluate: '',
          goodsEvaluateNum: '',
          minMarketPrice: '6.51',
          minSubscriptionPrice: '6.18'
        },
      ]
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  render() {
    return (
      <div class="rc-carousel rc-carousel--cards rc-match-heights" data-js-carousel="" data-rc-cards="true">
        <div class="rc-carousel__card-gal">
          <a class="rc-card__link" href="#/">
            <article class="rc-card rc-card--b">
              <button class="rc-btn rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography" arialabel="Like">
                <span class="rc-screen-reader-text">Like</span>
              </button>
              <picture class="rc-card__image">
                <img alt="alt text" src="https://placehold.it/800x600?text=4:3" />
              </picture>
              <div class="rc-card__body">
                <header>
                  <p class="rc-card__meta">Meta 1</p>
                  <h1 class="rc-card__title">Heading</h1>
                </header>
              </div>
            </article>
          </a>
        </div>
      </div>
    );
  }
}
export default RalatedProduct;
