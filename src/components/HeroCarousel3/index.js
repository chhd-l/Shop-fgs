import React from 'react';
import './index.less';
import { animate } from '@/assets/js/animate';
import { getBanner } from '@/api/home.js';
import { FormattedMessage } from 'react-intl';

const sessionItemRoyal = window.__.sessionItemRoyal;

//信号量
var idx = 0;
var options = {
  interval: 2000, //间隔时间
  animatetime: 500,
  tween: 'QuadEaseOut',
  width: 1400
};

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      windowWidth: 0
    };
  }
  componentDidMount() {
    //定义变量获取屏幕视口宽度
    // var windowWidth = document.body.clientWidth
    // this.setState({
    //   windowWidth
    // })
    getBanner().then((res) => {
      this.setState({ banner: res.context });
    });
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
    //if(idx===0) return

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
    //  if(idx===length - 1) return

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
    // sessionItemRoyal.set(
    //   'rc-goods-cate-name',
    //   this.state.currentCatogery || ''
    // );
    // const { history, location } = this.props;
    // sessionItemRoyal.set('recomment-preview', location.pathname);
    // sessionItemRoyal.set('rc-goods-name', item.goodsName);

    // history.push('/details/' + item.goodsInfoIds[0]);
  };
  render() {
    return (
      <div className="homePage">
        <div className="carousel-wrap">
          <a
            href="javascript:;"
            className="leftBtn Btn rc-icon rc-left rc-iconography"
            id="leftBtn"
            onClick={this.leftBtnClick}
          ></a>
          <a
            href="javascript:;"
            className="rightBtn Btn  rc-icon  rc-right rc-iconography"
            id="rightBtn"
            onClick={this.rightBtnClick}
          ></a>
          <div class="carousel" id="carousel">
            <div class="m_unit" id="m_unit">
              <ul>
                {this.state.banner.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.isVideo == 1 ? (
                        <a href="javascript:;" className="videoURL">
                          <video autoPlay={true} muted={true} loop={true}>
                            <source src={item.webUrl} type="video/mp4" />
                          </video>
                          <div className="center-advice">
                            <div className="rc-gamma inherit-fontsize">
                              <h1>
                                <FormattedMessage id="header.carouselInfo1" />
                              </h1>
                            </div>
                            <div className="rc-margin-bottom--sm rc-body inherit-fontsize">
                              <p>
                                <FormattedMessage id="header.carouselInfo2" />
                              </p>
                            </div>
                            <div>
                              <a href="/product-finder">
                                <button class="rc-btn rc-btn--one">
                                  <FormattedMessage id="header.toBegin" />
                                </button>
                              </a>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <a href="#" className="imageURL">
                          <div
                            style={{
                              backgroundImage: 'url(' + item.webUrl + ')'
                            }}
                          ></div>
                          {process.env.REACT_APP_LANG == 'fr' && index == 1 ? (
                            <a href="/product-finder" className="category-btn">
                              <button class="rc-btn rc-btn--one">
                                En savoir plus
                              </button>
                            </a>
                          ) : null}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div class="circles" id="circles">
            <ol>
              {this.state.banner.map((item, index) => {
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
