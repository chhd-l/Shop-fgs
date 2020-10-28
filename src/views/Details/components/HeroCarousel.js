import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import Banner_Horizontal_Hot_Sale from '@/assets/images/Banner_Horizontal_Hot_Sale.jpg';
import Pomotion25offImg from '@/assets/images/pomotion_25off.png';
import Banner_recommend_item from '@/assets/images/Banner_recommend_item.jpg';
import Banner_recommend_item_m from '@/assets/images/Banner_recommend_item_m.jpg';
import Banner_urinary from '@/assets/images/banner/banner_urinary.jpg';
import Banner_urinary_m from '@/assets/images/banner/banner_urinary_m.jpg';
import Banner_subscritipon from '@/assets/images/banner/banner_subscritipon.jpg';
import Banner_subscritipon_m from '@/assets/images/banner/banner_subscritipon_m.jpg';
import './index.less';
import { SUBSCRIPTION_DISCOUNT_RATE } from '@/utils/constant';
import { getBanner } from '@/api/home.js';
import { getGoodsRelation } from '@/api/details';
import Rate from '@/components/Rate';
import { formatMoney } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next rc-btn rc-btn--icon rc-icon rc-interactive rc-right rc-iconography`}
      style={{
        ...style,
        right: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev rc-btn rc-btn--icon rc-icon rc-interactive rc-left rc-iconography`}
      style={{
        ...style,
        left: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    />
  );
}

class HeroCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeVisible: true,
      banner: [1,2,3,4,5,6],
      goodsList:[],
      windowWidth:0
    };
    this.hanldeClick = this.hanldeClick.bind(this);
    this.hideNotice = this.hideNotice.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      
  }
  componentDidMount(){
       //定义变量获取屏幕视口宽度
    var windowWidth = document.body.clientWidth
    this.setState({
        windowWidth
    })
    const {goodsId} = this.props
      if(goodsId){
        getGoodsRelation(goodsId).then((res)=>{
            console.log(333,res)
            this.setState({
                goodsList: res.context.goods
            })
        })
      }
  }
  UNSAFE_componentWillMount() {
    // getBanner().then((res) => {
    //   console.log(res, 'ressssss');
    //   this.setState({ banner: res.context });
    // });
  }
  hideNotice() {
    this.setState({
      noticeVisible: false
    });
  }
  hanldeClick=(item)=>{
      console.log(item)
    //   sessionItemRoyal.set(
    //     'rc-goods-cate-name',
    //     this.state.currentCatogery || ''
    //   );
    //   sessionItemRoyal.set('recomment-preview', this.props.location.pathname|);
    //   sessionItemRoyal.set('rc-goods-name', item.goodsName);
      const { history } = this.props;
      history.push('/details/' + item.goodsInfoIds[0]);  
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      pauseOnHover: true,
      lazyLoad: true,
      adaptiveHeight: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      dotsClass: 'dots-custom'
    };
    if(this.state.windowWidth < 640){
        settings.slidesToShow = 1
        settings.slidesToScroll = 1
    }
    if(this.state.windowWidth >= 640){
        // do something
        settings.slidesToShow = 4
        settings.slidesToScroll = 4
    }

    return (
      <div className="hero-carousel related-product">
        <div className="rc-max-width--xl">
          <Slider {...settings}>
            {this.state.goodsList.map((item, i) => (
              <div className="hero-carousel__slide" key={i}>
                <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                    <a className="related-product-a" onClick={()=>this.hanldeClick(item)}>
                        <img className="related-product-img" src={item.goodsImg}></img>
                        <h1 className="rc-card__title">{item.goodsSubtitle}</h1>
                        <p className="rc-card__meta">{item.goodsName}</p>
                        <div
                          className={`rc-card__price text-center RateFitScreen `}
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
                        <p className="rc-card__meta" style={{marginTop:'1rem',marginLeft:'-20px'}}>{formatMoney(item.minMarketPrice)}</p>
                        {
                            item.minSubscriptionPrice 
                            ?
                            <p className="rc-card__meta">
                                <div>
                                    {formatMoney(item.minSubscriptionPrice)}
                                    <span
                                        className="iconfont font-weight-bold red mr-1"
                                        style={{
                                            fontSize: '.65em',
                                            marginLeft:'6px'
                                        }}
                                        >
                                        &#xe675;
                                    </span>
                                    <span
                                    className="position-relative red-text position-absolute"
                                        style={{
                                            fontSize: '.7em',
                                            whiteSpace: 'nowrap',
                                            marginTop:'4px',
                                            marginLeft:'4px',
                                        }}
                                        >
                                        <FormattedMessage id="autoshop" />
                                    </span>
                                </div>                            
                            </p>
                            : null
                        }
                    </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div style={{height: '1rem',marginTop:'1rem'}}></div>
      </div>
    );
  }
}

export default HeroCarousel;
