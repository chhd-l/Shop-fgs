import React from 'react';
import { animate } from '@/assets/js/animate';
import { getGoodsRelation } from '@/api/details';
import chunk from 'lodash/chunk';
import Rate from '@/components/Rate';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';

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
            if (this.state.goodsList.length) {
              // 观察'推荐块'元素是否出现在可见视口中
              let initObserver = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio <= 0) return; // intersectionRatio 是否可见，不可见则返回
                this.hubGA && window.dataLayer && dataLayer.push({
                  event: 'pdpAssociatedProductsDisplay',
                  pdpAssociatedProductsDisplay: [
                    {
                      price: 40, //Product Price, including discount if promo code activated for this product
                      specie: 'Cat', //'Cat' or 'Dog',
                      range: 'Size Health Nutrition', //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
                      name: 'Medium Puppy', //WeShare product name, always in English
                      mainItemCode: '3003', //Main item code
                      SKU: '123456789', //product SKU
                      recommendationID: '123456', //recommendation ID
                      subscription: 'One Shot', //'One Shot', 'Subscription', 'Club'
                      subscriptionFrequency: 3, //Frequency in weeks, to populate only if 'subscription' equals 'Subscription or Club'
                      technology: 'Dry', //'Dry', 'Wet', 'Pack'
                      brand: 'Royal Canin', //'Royal Canin' or 'Eukanuba'
                      size: '12x85g', //Same wording as displayed on the site, with units depending on the country (oz, grams…)
                      breed: ['Beagle', 'Boxer', 'Carlin'], //All animal breeds associated with the product in an array
                      quantity: 2, //Number of products, only if already added to cart
                      sizeCategory: 'Small', //'Less than 4Kg', 'Over 45kg'... reflecting the 'Weight of my animal' field present in the PLP filters
                      promoCodeName: 'PROMO1234', //Promo code name, only if promo activated
                      promoCodeAmount: 8 //Promo code amount, only if promo activated
                    }
                  ] //待后端添加
                });
              });
              let recommendationGoodsDom = document.querySelector(
                '#goods-recommendation-container'
              );
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
    console.log(item);
    const { history, location } = this.props;
    sessionItemRoyal.set('recomment-preview', location.pathname);

    history.push('/details/' + item.goodsInfoIds[0]);
  };
  render() {
    return (
      <div
        style={{
          display: this.state.goodsList.length === 0 ? 'none' : 'block'
        }}
        className="goods-recommendation-container"
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
                              className="hdshoisdhdsaiof"
                              key={index2}
                              onClick={() => this.hanldeClick(item2)}
                              style={{ cursor: 'pointer' }}
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
