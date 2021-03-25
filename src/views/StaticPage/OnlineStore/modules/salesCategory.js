import React, { Component } from 'react';
import { queryStoreCateList } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { Link } from 'react-router-dom';
import './css/salesCategory.less';
import catsImg from '@/assets/images/salesCategory_cat.png';
import dogsImg from '@/assets/images/salesCategory_dog.png';

export default class OnlineStoreSalesCategory extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      cateGoryList_cat: [],
      cateGoryList_dog: [],
      listLoading: true
    };
  }
  componentDidMount() {
    queryStoreCateList().then((res) => {
      this.setState({ listLoading: false });
      this.rebindCategoryList(res);
    });
  }
  rebindCategoryList(res) {
    let cateGoryList_dog = [];
    let cateGoryList_cat = [];
    cateGoryList_dog = res
      .filter((item) => {
        return item.cateType === 'dog';
      })
      .map((item2) => {
        return {
          imgSrc:
            typeof item2.cateImg === 'string' &&
            JSON.parse(item2.cateImg)[0].artworkUrl,
          cateName: item2.cateName,
          altName: item2.altName,
          cateRouter: item2.cateRouter,
          goodsCateId: item2.goodsCateId
        };
      });

    cateGoryList_cat = res
      .filter((item) => {
        return item.cateType === 'cat';
        //return item.cateType === 'cat' && item.cateRouter.indexOf('vet') == -1; //排除vet产品
      })
      .map((item2) => {
        return {
          imgSrc:
            typeof item2.cateImg === 'string' &&
            JSON.parse(item2.cateImg)[0].artworkUrl,
          cateName: item2.cateName,
          altName: item2.altName,
          cateRouter: item2.cateRouter,
          goodsCateId: item2.goodsCateId
        };
      });
    this.setState({ cateGoryList_dog, cateGoryList_cat });
  }
  render() {
    return (
      <div className="online-store-salesCategory rc-bg-colour--brand3 rc-margin-bottom--xs">
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
          <div className="rc-layout-container rc-two-column">
            <div className="rc-column">
              <div className="header-title">
                <div style={{ fontSize: '20px' }} className="rc-espilon">
                  <FormattedMessage id="onlineStore.salesCategory.cat" />
                </div>
                <img src={catsImg} alt="" />
              </div>
              <div className="rc-layout-container rc-two-column ml-0 mr-0">
                {this.state.listLoading ? (
                  <div style={{ width: '100%' }}>
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="10%"
                      count={4}
                    />
                  </div>
                ) : (
                  this.state.cateGoryList_cat.map((item, index) => {
                    return (
                      <div className="rc-column category-goods" key={index}>
                        <Link
                          className="rc-moblie-flex"
                          to={`${item.cateRouter}`}
                        >
                          <picture>
                            <source srcSet={item.imgSrc} />
                            <div className="text-center">
                              <img
                                src={item.imgSrc}
                                alt={item.altName}
                                title={item.altName}
                              />
                            </div>
                          </picture>
                          <div className="d-flex justify-content-center">
                            <h3 className="rc-margin--none">{item.cateName}</h3>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="rc-column">
              <div className="header-title">
                <div style={{ fontSize: '20px' }} className="rc-espilon">
                  <FormattedMessage id="onlineStore.salesCategory.dog" />
                </div>
                <img src={dogsImg} alt="" />
              </div>
              <div className="rc-layout-container rc-two-column ml-0 mr-0">
                {this.state.listLoading ? (
                  <div style={{ width: '100%' }}>
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="10%"
                      count={4}
                    />
                  </div>
                ) : (
                  this.state.cateGoryList_dog.map((item, index) => {
                    return (
                      <div className="rc-column category-goods" key={index}>
                        <Link
                          className="rc-moblie-flex"
                          to={`${item.cateRouter}`}
                        >
                          <picture>
                            <source srcSet={item.imgSrc} />
                            <div className="text-center">
                              <img
                                src={item.imgSrc}
                                alt={item.altName}
                                title={item.altName}
                              />
                            </div>
                          </picture>
                          <div className="d-flex justify-content-center">
                            <h3 className="rc-margin--none">{item.cateName}</h3>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
