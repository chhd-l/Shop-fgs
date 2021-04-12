import React, { Component } from 'react';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';
import { Link } from 'react-router-dom';
import './index.less';
import { settings } from './config';

export default class Responsive extends Component {
  static defaultProps = {
    location: '',
    history: '',
    goodsList: []
  };
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0
    };
  }
  render() {
    const { goodsList } = this.props;
    if (goodsList.length > 0) {
      console.log({ goodsList });
    }
    return (
      <div className="responsive-carousel">
        <h2>
          <FormattedMessage id="recommandedForyou" />
        </h2>
        <Slider {...settings}>
          {goodsList.map((item, index) => {
            return (
              <Link
                to={{
                  pathname: item
                    ? `/${item.goodsName
                        .toLowerCase()
                        .split(' ')
                        .join('-')
                        .replace('/', '')}-${item.mainItemCode}`
                    : ''
                }}
              >
                <div key={index} className="goods">
                  <img src={item.goodsImg}></img>
                  <div className="Name">{item.goodsName}</div>
                  <div className="Subtitle">{item.goodsSubtitle}</div>
                  <div className="marketPrice">
                    {formatMoney(item.minMarketPrice)}
                    {item.minLinePrice && (
                      <span>{formatMoney(item.minLinePrice)}</span>
                    )}
                  </div>
                  {item.minSubscriptionPrice ? (
                    <p className="subscriptionPrice">
                      <div>
                        {formatMoney(item.minSubscriptionPrice)}
                        <span
                          className="iconfont font-weight-bold red mr-1"
                          style={{
                            fontSize: '.65em',
                            marginLeft: '6px',
                            color: '#323232',
                            fontWeight: 'bold'
                          }}
                        >
                          &#xe675;
                        </span>
                        <span
                          className="position-relative red-text position-absolute"
                          style={{
                            fontSize: '.7em',
                            whiteSpace: 'nowrap',
                            marginTop: '4px',
                            marginLeft: '4px'
                          }}
                        >
                          <FormattedMessage id="autoshop" />
                        </span>
                      </div>
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </Slider>
        <div style={{ height: '50px' }}></div>
      </div>
    );
  }
}
