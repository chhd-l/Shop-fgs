import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl-phraseapp';
import { isMobile as isMobilePhone } from '@/utils/utils';
import PLPCover from '../PLPCover';
import { settings } from './config';
import getTechnologyOrBreedsAttr from '@/lib/get-technology-or-breedsAttr';
import './index.less';

/**
 * 产品轮播组件，一般用于关联产品轮播展示
 * {Array} - goodsList 产品列表
 */
export default class ProductCarousel extends Component {
  static defaultProps = {
    goodsList: [],
    targetType: '_self',
    title: (
      <h2 className="related-prodout-title">
        <FormattedMessage id="recommandedForyou" />
      </h2>
    ),
    onClick: () => {}
  };
  render() {
    const { goodsList } = this.props;
    const handledList = goodsList.map((ele) => {
      return {
        ...ele,
        technologyOrBreedsAttr:
          ele.technologyOrBreedsAttr || getTechnologyOrBreedsAttr(ele)
      };
    });
    return (
      <div className="responsive-carousel">
        {this.props.title}
        <Slider {...settings}>
          {handledList.map((item, index) => {
            return (
              <PLPCover
                targetType={this.props.targetType}
                className="ml-2 mr-2"
                item={{ ...item }}
                key={index}
                showBorder={!isMobilePhone}
                onClick={() => this.props.onClick(item)}
                link={{
                  pathname: item
                    ? `/${item.goodsName
                        .toLowerCase()
                        .split(' ')
                        .join('-')
                        .replace('/', '')}-${item.mainItemCode}`
                    : ''
                }}
              />
            );
          })}
        </Slider>
      </div>
    );
  }
}
