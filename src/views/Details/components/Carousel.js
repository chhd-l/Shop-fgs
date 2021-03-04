import React from 'react';
import { animate } from '@/assets/js/animate';
import { getGoodsRelation } from '@/api/details';
import chunk from 'lodash/chunk';
import Rate from '@/components/Rate';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import './Carousel.css';

const sessionItemRoyal = window.__.sessionItemRoyal;

//信号量
var idx = 0;
var options = {
  interval: 2000, //间隔时间
  animatetime: 500,
  tween: 'QuadEaseOut',
  width: 1200
};

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      windowWidth: 0
    };
    this.hubGA = process.env.REACT_APP_HUB_GA == '1';
  }
  componentDidMount() {
    //定义变量获取屏幕视口宽度
    // var windowWidth = document.body.clientWidth
    // this.setState({
    //   windowWidth
    // })
    const { goodsId } = this.props;
    if (goodsId) {
      getGoodsRelation(goodsId).then((res) => {
        console.log(res, 'resRelation+++')
        this.setState(
          {
            goodsList: chunk(res.context.goods, 4)
          },
          () => {
            let recommendationGoodsDom = document.querySelector(
              '#goods-recommendation-container'
            );
            const {goodsList} = this.state;
            if (this.hubGA && window.dataLayer && goodsList.length && recommendationGoodsDom) {
              // 观察'推荐块'元素是否出现在可见视口中
              let initObserver = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio <= 0) return; // intersectionRatio 是否可见，不可见则返回
                const products = goodsList?.[0].map(item => {
                  const { minMarketPrice, goodsName, mainItemCode, goodsInfoVOS, goodsSpecDetailVOS, attributesValue } = item;
                  const goodsInfoNo = goodsInfoVOS?.[0].goodsInfoNo;
                  const size = goodsSpecDetailVOS?.[0].detailName;
                  const { breeds = [], Range = [], Technology = [] } = attributesValue;
                  const breed = breeds?.length && breeds.map(item => item.attributeDetailName);
                  const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
                  const range = Range?.length && Range.map(item => item.attributeDetailName).toString() || '';
                  const technology = Technology?.length && Technology.map(item => item.attributeDetailName).toString() || '';
                  return {
                    price: minMarketPrice,
                    specie,
                    range,
                    name: goodsName,
                    mainItemCode,
                    SKU: goodsInfoNo,
                    technology,
                    brand: 'Royal Canin',
                    size,
                    breed,
                  }
                })
                  dataLayer.push({
                  event: 'pdpAssociatedProductsDisplay',
                  pdpAssociatedProductsDisplay: products
                });
              });
              this.setState(
                {
                  initObserver,
                  recommendationGoodsDom
                },
                () => {
                  this.state.initObserver.observe(this.state.recommendationGoodsDom);
                }
              )
            }
          }
        );
      });
    }
  }

  componentWillUnmount() {
    this.state.initObserver && this.state.initObserver.disconnect(this.state.recommendationGoodsDom);
    this.setState({
      initObserver:null
    })
  }

  changeCircles = () => {
    //得到元素
    var circles = document.getElementById('circles');
    var m_unit = document.getElementById('m_unit');
    var imageUL = m_unit.getElementsByTagName('ul')[0];
    var imageLis = imageUL.getElementsByTagName('li');
    var circlesLis = circles.getElementsByTagName('li');

    var length = imageLis.length;

    //idx可能是5，但是我们的小圆点下标最大是4，所以用n过渡一下：
    var n = idx > length - 1 ? 0 : idx;
    //排他
    for (var i = 0; i < circlesLis.length; i++) {
      circlesLis[i].className = '';
    }
    circlesLis[n].className = 'cur';
  };
  leftBtnClick = () => {
    //得到元素
    var m_unit = document.getElementById('m_unit');
    var imageUL = m_unit.getElementsByTagName('ul')[0];
    var imageLis = imageUL.getElementsByTagName('li');

    var length = imageLis.length;

    //阻止第一个跳转
    if (idx === 0) return;

    //函数截流
    if (m_unit.isanimated) return;

    //信号量的变化
    idx--;
    if (idx < 0) {
      idx = length - 1;
      m_unit.style.left = -options.width * length + 'px';
    }

    //改变小圆点
    this.changeCircles();

    animate(
      m_unit,
      { left: -options.width * idx },
      options.animatetime,
      options.tween
    );
  };
  rightBtnClick = () => {
    //得到元素
    var circles = document.getElementById('circles');
    var m_unit = document.getElementById('m_unit');
    var imageUL = m_unit.getElementsByTagName('ul')[0];
    var imageLis = imageUL.getElementsByTagName('li');

    var length = imageLis.length;

    //阻止最后一个跳转
    if (idx === length - 1) return;

    //函数截流
    if (m_unit.isanimated) return;

    //信号量的变化
    idx++;

    //改变小圆点
    this.changeCircles();

    //运动机构的移动
    animate(
      m_unit,
      { left: -options.width * idx },
      options.animatetime,
      options.tween,
      function () {
        if (idx > length - 1) {
          idx = 0;
          m_unit.style.left = '0px';
          return;
        }
      }
    );
  };
  clickCircle = (index) => {
    //信号量就是自己的序号
    idx = index;
    //拉动
    animate(
      m_unit,
      { left: -options.width * idx },
      options.animatetime,
      options.tween
    );
    //改变小圆点
    this.changeCircles();
  };

  hanldeClick = (item) => {
    const { history, location } = this.props;
    sessionItemRoyal.set('recomment-preview', location.pathname);

    // history.push('/details/' + item.goodsInfoIds[0]);
  };
  render() {
    return (
      <div
        style={{
          display: this.state.goodsList.length === 0 ? 'none' : 'block'
        }}
        id="goods-recommendation-container"
      >
        <div className="split-line rc-bg-colour--brand4" ></div>
        <div
          style={{
            textAlign: 'center',
            color: 'rgb(236, 0, 26)',
            height: '50px',
            lineHeight: '50px',
            fontSize: '1.4rem'
          }}
        >
          <FormattedMessage id="recommandedForyou" />
        </div>
        <div className="carousel-wrap">
          <a
            className="leftBtn Btn rc-icon rc-left rc-iconography ui-cursor-pointer"
            id="leftBtn"
            onClick={this.leftBtnClick}
          ></a>
          <a
            className="rightBtn Btn  rc-icon  rc-right rc-iconography ui-cursor-pointer"
            id="rightBtn"
            onClick={this.rightBtnClick}
          ></a>
          <div className="carousel" id="carousel">
            <div className="m_unit" id="m_unit">
              <ul>
                {this.state.goodsList.map((item, index) => {
                  return (
                    <li key={index}>
                      <div>
                        {item.map((item2, index2) => {
                          return (
                            <p
                              key={index2}
                              onClick={() => this.hanldeClick(item2)}
                              style={{ cursor: 'pointer' }}
                            >
                              <Link
                                to={{
                                  pathname: item2
                                    ? `/${item2.goodsName.toLowerCase()
                                      .split(' ')
                                      .join('-')
                                      .replace('/', '')}-${item2.mainItemCode}`
                                    : ''
                                }}
                              >
                                <div
                                  style={{
                                    width: '150px',
                                    height: '180px',
                                    backgroundSize: '150px 180px',
                                    backgroundImage:
                                      'url(' + item2.goodsImg + ')',
                                    margin: '10px auto 0'
                                  }}
                                ></div>
                                <div className="goodsName">{item2.goodsName}</div>
                                <div className="subtitle">
                                  {item2.goodsSubtitle}
                                </div>
                                <div className="rete">
                                  <div className="display-inline">
                                    <Rate
                                      def={item2.avgEvaluate}
                                      disabled={true}
                                      marginSize="smallRate"
                                    />
                                  </div>
                                  <span className="comments rc-margin-left--xs rc-text-colour--text">
                                    ({item2.goodsEvaluateNum})
                                </span>
                                </div>
                                <div className="marketPrice">
                                  {formatMoney(item2.minMarketPrice)}
                                  {item2.minLinePrice && (
                                    <span>{formatMoney(item2.minLinePrice)}</span>
                                  )}
                                </div>
                                {item2.minSubscriptionPrice ? (
                                  <p className="subscriptionPrice">
                                    <div>
                                      {formatMoney(item2.minSubscriptionPrice)}
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
                              </Link>
                            </p>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="circles" id="circles">
            <ol>
              {this.state.goodsList.map((item, index) => {
                return (
                  <li
                    className={index === 0 ? 'cur' : ''}
                    onClick={() => this.clickCircle(index)}
                  ></li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
