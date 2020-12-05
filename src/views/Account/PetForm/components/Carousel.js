import React from 'react';
import "./Carousel.less"
import { animate } from "@/assets/js/animate"
// import { getGoodsRelation } from '@/api/details';
import Rate from '@/components/Rate';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
import { getRecommendProducts } from '@/api/pet'

const sessionItemRoyal = window.__.sessionItemRoyal;

//信号量
var idx = 0;
var options = {
  "interval": 2000,	//间隔时间
  "animatetime": 500,
  "tween": "QuadEaseOut",
  "width": 1200
}

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      windowWidth: 0,

    };
  }
  componentDidMount() {
    //定义变量获取屏幕视口宽度
    // var windowWidth = document.body.clientWidth
    // this.setState({
    //   windowWidth
    // })
    // const { goodsId } = this.props
    // if (goodsId) {
    //   getGoodsRelation(goodsId).then((res) => {
    //     console.log(333, res)
    //     this.setState({
    //       goodsList: chunk(res.context.goods, 4)
    //     }, () => {
    //       console.log(747, this.state.goodsList)
    //     })
    //   })
    // }
    // console.log(this.props,'props')
  }
  
  changeCircles = () => {
    //得到元素
    var circles = document.getElementById("circles");
    var m_unit = document.getElementById("m_unit");
    var imageUL = m_unit.getElementsByTagName("ul")[0];
    var imageLis = imageUL.getElementsByTagName("li");
    var circlesLis = circles.getElementsByTagName("li");

    var length = imageLis.length;

    //idx可能是5，但是我们的小圆点下标最大是4，所以用n过渡一下：
    var n = idx > length - 1 ? 0 : idx;
    //排他
    for (var i = 0; i < circlesLis.length; i++) {
      circlesLis[i].className = "";
    }
    circlesLis[n].className = "cur";
  }
  leftBtnClick = () => {
    //得到元素
    var m_unit = document.getElementById("m_unit");
    var imageUL = m_unit.getElementsByTagName("ul")[0];
    var imageLis = imageUL.getElementsByTagName("li");

    var length = imageLis.length;

    //阻止第一个跳转
    if(idx===0) return

    //函数截流
    if (m_unit.isanimated) return;

    //信号量的变化
    idx--;
    if (idx < 0) {
      idx = length - 1;
      m_unit.style.left = -options.width * length + "px";
    }

    //改变小圆点
    this.changeCircles();

    animate(m_unit, { "left": -options.width * idx }, options.animatetime, options.tween);
  }
  rightBtnClick = () => {
    //得到元素
    var circles = document.getElementById("circles");
    var m_unit = document.getElementById("m_unit");
    var imageUL = m_unit.getElementsByTagName("ul")[0];
    var imageLis = imageUL.getElementsByTagName("li");



    var length = imageLis.length;

     //阻止最后一个跳转
     if(idx===length - 1) return

    //函数截流
    if (m_unit.isanimated) return;

    //信号量的变化
    idx++;

    

    //改变小圆点
    this.changeCircles();

    //运动机构的移动
    animate(m_unit, { "left": -options.width * idx }, options.animatetime, options.tween, function () {
      if (idx > length - 1) {
        idx = 0;
        m_unit.style.left = "0px";
        return
      }
    });
  }
  clickCircle = (index) => {
    //信号量就是自己的序号
    idx = index;
    //拉动
    animate(m_unit, { "left": -options.width * idx }, options.animatetime, options.tween);
    //改变小圆点
    this.changeCircles();
  }

  hanldeClick = (item) => {
    console.log(item)
    // sessionItemRoyal.set(
    //   'rc-goods-cate-name',
    //   this.state.currentCatogery || ''
    // );
    const { history, location } = this.props;
    sessionItemRoyal.set('recomment-preview', location.pathname);

    // this.props.history.push(
    //   `/${item.spuName.split(' ').join('-')}-${item.goodsNo}`
    // );
    history.push('/details/' + item.goodsInfos[0].goodsInfoId);
  }
  render() {
    console.log(this.props.recommendData, 'recommendData')
    return (
      <div style={{display:this.props.recommendData.length===0?'none':'block'}}>
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
        <div className='carousel-wrap'>
          <a href="javascript:;" className="leftBtn Btn rc-icon rc-left rc-iconography" id="leftBtn" onClick={this.leftBtnClick}></a>
          <a href="javascript:;" className="rightBtn Btn  rc-icon  rc-right rc-iconography" id="rightBtn" onClick={this.rightBtnClick}></a>
          <div className="carousel" id="carousel">
            <div className="m_unit" id="m_unit">
              <ul>
                {
                  this.props.recommendData.length && this.props.recommendData.map((item, index) => {
                    return (
                      <li key={index}>
                        <div>
                          {
                            (
                              <p key={index} onClick={this.hanldeClick.bind(this, item)} style={{ cursor: 'pointer' }}>
                              <div style={{ width: '150px', height: '180px', backgroundSize: '150px 180px', backgroundImage: 'url(' + item.goodsImg + ')', margin: '10px auto 0' }}></div>
                              <div className="goodsName">{item.goodsName}</div>
                              <div className="subtitle">{item.goodsSubtitle}</div>
                              <div
                                className='rete'
                              >
                                <div className="display-inline">
                                  <Rate
                                    def={item.avgEvaluate}
                                    disabled={true}
                                    marginSize="smallRate"
                                  />
                                </div>
                                <span className="comments rc-margin-left--xs rc-text-colour--text">
                                  ({item.goodsEvaluateNum})
                              </span>
                              </div>
                              <div className="marketPrice">{formatMoney(item.minMarketPrice)}
                              {item.minLinePrice&&<span>{formatMoney(item.minLinePrice)}</span>}
                              </div>
                              {
                                item.minSubscriptionPrice
                                  ?
                                  <p className="subscriptionPrice">
                                    <div>
                                      {formatMoney(item.minSubscriptionPrice)}
                                      <span
                                        className="iconfont font-weight-bold red mr-1"
                                        style={{
                                          fontSize: '.65em',
                                          marginLeft: '6px',
                                          color:'#323232',
                                          fontWeight:'bold'
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
                                          marginLeft: '4px',
                                        }}
                                      >
                                        <FormattedMessage id="autoshop" />
                                      </span>
                                    </div>
                                  </p>
                                  : null
                              }
                            </p>
                            )
                          }
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="circles" id="circles">
            <ol>
              {
                this.state.goodsList.map((item, index) => {
                  return (
                    <li className={index === 0 ? 'cur' : ''} onClick={() => this.clickCircle(index)}></li>
                  )
                })
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel;
