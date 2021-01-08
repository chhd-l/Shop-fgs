import React from 'react';
import './index.less';
import { animate } from '@/assets/js/animate';
import { getBanner } from '@/api/home.js';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

// //信号量
var idx = 0;
// var options = {
//   interval: 2000, //间隔时间
//   animatetime: 500,
//   tween: 'QuadEaseOut',
//   width: document.documentElement.clientWidth < 1400? document.documentElement.clientWidth: 1400
// };

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      options: {
        interval: 2000, //间隔时间
        animatetime: 500,
        tween: 'QuadEaseOut',
        width:
          document.documentElement.clientWidth < 1400
            ? document.documentElement.clientWidth
            : 1400
      }
    };
    this.clickCircle = this.clickCircle.bind(this);
    this.resize = this.resize.bind(this);
  }
  GABannerImpression(idx) {
    const cur_banner = this.state.banner[idx];
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComPromotionImpression`,
      ecommerce: {
        promoClick: {
          promotions: [
            {
              id: cur_banner.bannerId, // Name or ID is required
              name: cur_banner.bannerName,
              creative: cur_banner.bannerName,
              position: idx
            }
          ]
        }
      }
    });
  }

  GABannerClick = (idx) => {
    const cur_banner = this.state.banner[idx];
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComPromotionClick`,
      ecommerce: {
        promoClick: {
          promotions: [
            {
              id: cur_banner.bannerId, // Name or ID is required
              name: cur_banner.bannerName,
              creative: cur_banner.bannerName,
              position: idx
            }
          ]
        }
      }
    });
  };

  componentDidMount() {
    getBanner().then((res) => {
      this.setState({ banner: res.context });
    });

    this.screenChange();
  }
  screenChange() {
    window.addEventListener('resize', this.resize);
  }
  resize() {
    this.setState({
      options: {
        interval: 2000, //间隔时间
        animatetime: 500,
        tween: 'QuadEaseOut',
        width:
          document.documentElement.clientWidth < 1400
            ? document.documentElement.clientWidth
            : 1400
      }
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

    //点击banner埋点
    this.GABannerImpression(n);
  };
  leftBtnClick = () => {
    const { options } = this.state;
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
    const { options } = this.state;
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
  clickCircle(index) {
    const { options } = this.state;
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
  }

  hanldeClick = (item) => {
    console.log(item);
  };
  render() {
    return (
      <div className="homePage">
        <div className="carousel-wrap">
          <a
            className="leftBtn Btn rc-icon rc-left rc-iconography ui-cursor-pointer"
            id="leftBtn"
            onClick={this.leftBtnClick}
          />
          <a
            className="rightBtn Btn  rc-icon  rc-right rc-iconography ui-cursor-pointer"
            id="rightBtn"
            onClick={this.rightBtnClick}
          />
          <div className="carousel" id="carousel">
            <div className="m_unit" id="m_unit">
              <ul>
                {this.state.banner.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.isVideo == 1 ? (
                        <a className="videoURL" style={{ cursor: 'default' }}>
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
                              {process.env.REACT_APP_LANG == 'de' ? (
                                <Link
                                  onClick={() => this.GABannerClick(index)}
                                  to="/list/keywords"
                                  className="rc-btn rc-btn--one"
                                >
                                  <FormattedMessage id="header.toBegin" />
                                </Link>
                              ) : (
                                <Link
                                  onClick={() => this.GABannerClick(index)}
                                  to={item.webSkipUrl}
                                  className="rc-btn rc-btn--one"
                                >
                                  <FormattedMessage id="header.toBegin" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </a>
                      ) : (
                        <a className="imageURL" style={{ cursor: 'default' }}>
                          <div
                            style={{
                              backgroundImage: 'url(' + item.webUrl + ')'
                            }}
                          ></div>
                          {process.env.REACT_APP_LANG === 'fr' && index == 1 ? (
                            <Link
                              onClick={() => this.GABannerClick(index)}
                              to={item.webSkipUrl}
                              className="category-btn"
                            >
                              <button className="rc-btn rc-btn--one">
                                En savoir plus
                              </button>
                            </Link>
                          ) : null}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="circles" id="circles">
            <ol>
              {this.state.banner.map((item, index) => {
                return (
                  <li
                    className={index === 0 ? 'cur' : ''}
                    onClick={this.clickCircle.bind(this, index)}
                    key={index}
                  />
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
