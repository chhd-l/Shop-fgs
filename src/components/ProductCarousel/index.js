import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';
import { getDeviceType } from '@/utils/utils';
import PLPCover from '@/components/PLPCover';
import { settings } from './config';
import getTechnologyOrBreedsAttr from '@/lib/get-technology-or-breedsAttr';

const isMobilePhone = getDeviceType() === 'H5';
import './index.less';

/**
 * 产品轮播组件
 * {Array} - goodsList 产品列表
 */
export default class ProductCarousel extends Component {
  static defaultProps = {
    goodsList: [],
    title: (
      <h2 className="related-prodout-title">
        <FormattedMessage id="recommandedForyou" />
      </h2>
    )
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

    const tmpSetting = Object.assign(settings, {
      // 解决一个产品时，若adaptiveHeight设置为false，会显示两行的bug
      adaptiveHeight: handledList.length > 1 ? false : true
    });
    return (
      <div className="responsive-carousel">
        {this.props.title}
        <Slider {...tmpSetting}>
          {handledList.map((item, index) => {
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
              />
            );
          })}
        </Slider>
      </div>
    );
  }
}
