import React, { Component } from 'react';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { getDeviceType } from '@/utils/utils';
import PLPCover from '@/components/PLPCover';
import { settings } from './config';

const isMobilePhone = getDeviceType() === 'H5';
import './index.less';

/**
 * 关联产品轮播组件
 * {Array} - goodsList 关联产品列表
 */
export default class RelateProductCarousel extends Component {
  static defaultProps = {
    goodsList: []
  };
  render() {
    const { goodsList } = this.props;
    return (
      <div className="responsive-carousel">
        <h2>
          <FormattedMessage id="recommandedForyou" />
        </h2>
        <Slider {...settings}>
          {goodsList.map((item, index) => {
            return (
              <PLPCover
                className="ml-2 mr-2"
                item={{ ...item }}
                key={index}
                showBorder={!isMobilePhone}
                link={{
                  pathname: item
                    ? `/${item.goodsName
                        .toLowerCase()
                        .split(' ')
                        .join('-')
                        .replace('/', '')}-${item.mainItemCode}`
                    : ''
                }}
                // isDogPage={isDogPage}
                // sourceParam={this.state.sourceParam}
                // GAListParam={GAListParam}
                // breadListByDeco={breadListByDeco}
                // headingTag={this.state.seoConfig.headingTag}
              />
            );
          })}
        </Slider>
      </div>
    );
  }
}
