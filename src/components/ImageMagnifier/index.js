import React, { Component } from 'react';
import './index.css';
import { FormattedMessage } from 'react-intl';
import noPic from '@/assets/images/noPic.png'
// import noPic from './images/noPic1.png';
//import LeftImg from '@/assets/images/left.png'
//import RightImg from '@/assets/images/right.png'
import { getDeviceType } from '@/utils/utils.js'
import LazyLoad from 'react-lazyload';
let isMobile = getDeviceType() === 'H5'

class ImageMagnifier extends Component {
  static defaultProps = {
    taggingForText: null,
    taggingForImage: null
  };
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 图片放大镜参数列表
       * 组件宽高必须大于鼠标悬停小方块 ！！！
       */
      params: {
        // 放大倍数
        scale: (props.config && props.config.scale) || 2,
        // 组件宽
        width: isMobile? '230': ((props.config && props.config.width) || '400'),
        // 组件高
        height: isMobile? '324': ((props.config && props.config.height) || '450')
      },
      // 缩略图
      minImg: '',
      // 大图
      maxImg: '',
      currentImg: '',
      // 开关
      magnifierOff: false,
      // 图片加载情况
      imgLoad: false,
      /**
       * 样式
       */
      cssStyle: {
        // 图片容器样式
        imgContainer: {
          // width: "400px",
          // height: "400px",
          // border: "1px solid #ccc",
          margin: '0 auto',
          cursor: 'move',
          position: 'relative'
        },
        // 鼠标悬停小方块样式
        mouseBlock: {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100px',
          height: '100px',
          background: 'rgba(0,0,0,0.1)',
          zIndex: 99
        },
        // 鼠标悬停遮罩层样式
        maskBlock: {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0)',
          zIndex: 100
        },

        //  放大镜容器样式
        magnifierContainer: {
          position: 'absolute',
          left: '-400px',
          top: '0',
          width: '400px',
          height: '400px',
          border: '1px solid #ccc',
          overflow: 'hidden',
          zIndex: 98,
          background: '#fff'
        },
        // 图片样式
        imgStyle: {
          width: isMobile? '230': '400',
          height: '100%',
          margin: '0 auto',
          display: 'block'
        },
        // 图片放大样式
        // 此处图片宽高不能设置为百分比，在scale的作用下，放大的只是图片初始的宽高 ！！！
        imgStyle2: {
          width: isMobile? '230px': '400px',
          height: isMobile? '324px': '400px',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'scale(4)',
          transformOrigin: 'top left'
        }
      },
      videoShow: false,
      videoModalShow: true,
      listenerCount: 1,
      positionLeft: 0,
      hoverIndex: 0,
      offsetX: 0
    };
  }

  /**
   * 生命周期函数
   */
  // 组件初始化
  UNSAFE_componentWillMount() {
    this.initParam();
    this.updataImg(this.props);
  }
  componentDidMount() {
    let { currentImg } = this.state;
    let { images, sizeList } = this.props;
    if (!currentImg && images && images.length > 0) {
      currentImg = images[0].artworkUrl;
    }
    console.log(currentImg, 'currentImg');
    this.setState({
      currentImg: currentImg
    });

    let selectedSizeInfo = sizeList.filter((item) => item.selected);
    if (!selectedSizeInfo.length) {
      selectedSizeInfo = [sizeList[0]];
    }

    if (selectedSizeInfo.length && selectedSizeInfo[0].goodsInfoImg) {
      let hoverIndex = 0;
      images.map((el, i) => {
        if (
          el.artworkUrl === selectedSizeInfo[0].goodsInfoImg ||
          el.goodsInfoImg === selectedSizeInfo[0].goodsInfoImg
        ) {
          hoverIndex = i;
        }
        return el;
      });
      this.setState({
        currentImg: selectedSizeInfo[0].goodsInfoImg,
        videoShow: false,
        hoverIndex,
        offsetX: isMobile? hoverIndex * 230: hoverIndex * 400
      });
    }
  }
  // props 变化时更新
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps');
    let { currentImg } = this.state;
    let { images } = this.props;
    if (!currentImg && images && images.length > 0) {
      currentImg = images[0].artworkUrl;
    }
    this.setState({
      currentImg: currentImg
    });
    this.updataImg(nextProps);
    const { sizeList } = nextProps;
    let selectedSizeInfo = sizeList.filter((item) => item.selected);
    if (!selectedSizeInfo.length) {
      selectedSizeInfo = [sizeList[0]];
    }
    if (selectedSizeInfo.length) {
      let hoverIndex = 0;
      images.map((el, i) => {
        if (selectedSizeInfo[0].goodsInfoId === el.goodsInfoId) {
          hoverIndex = i;
        }
        return el;
      });
      this.setState({
        currentImg: selectedSizeInfo[0].goodsInfoImg,
        videoShow: false,
        hoverIndex,
        offsetX: isMobile? hoverIndex * 230: hoverIndex * 400
      });
    }
  }

  /**
   * 方法
   */
  // 鼠标移入
  mouseEnter = () => {
    this.setState(
      {
        magnifierOff: true,
        params: Object.assign({}, this.state.params, {
          width: document.querySelector('#J_detail_img')
            ? document.querySelector('#J_detail_img').offsetWidth
            : 10,
          height: document.querySelector('#J_detail_img')
            ? document.querySelector('#J_detail_img').offsetHeight
            : 10
        })
      },
      () => this.initParam()
    );
  };
  // 鼠标移除
  mouseLeave = () => {
    this.setState({
      magnifierOff: false
    });
  };
  // 鼠标移动
  mouseMove = (event) => {
    // console.log(event);
    let e = event.nativeEvent;
    this.calculationBlock(e.offsetX, e.offsetY);
  };

  // 计算相关参数
  calculationBlock(offsetX, offsetY) {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    const scale = parseInt(this.state.params.scale);
    /* 小方块位置 */
    // 防止鼠标移动过快导致计算失误，只要小于或者大于对应值，直接设置偏移量等于最小值或者最大值
    if (offsetX < 50) {
      offsetX = 50;
    }
    const tmpWidth = parseInt(this.state.params.width);
    if (offsetX > tmpWidth - 50) {
      offsetX = tmpWidth - 50;
    }
    if (offsetY < 50) {
      offsetY = 50;
    }
    const tmpHeight = parseInt(this.state.params.height);
    if (offsetY > tmpHeight - 50) {
      offsetY = tmpHeight - 50;
    }
    cssStyle.mouseBlock.left = parseFloat(offsetX - 50) + 'px';
    cssStyle.mouseBlock.top = parseFloat(offsetY - 50) + 'px';

    /* 计算图片放大位置 */
    cssStyle.imgStyle2.left = parseFloat(-(offsetX - 50) * scale) + 'px';
    cssStyle.imgStyle2.top = parseFloat(-(offsetY - 50) * scale) + 'px';

    this.setState({
      cssStyle: cssStyle
    });
  }

  // 初始化静态参数
  initParam() {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    let params = JSON.parse(JSON.stringify(this.state.params));
    console.log('params', params);
    // cssStyle.imgContainer.width = params.width + "px";
    cssStyle.imgContainer.width = isMobile? (230 + 'px'): (400 + 'px');
    cssStyle.imgContainer.height = params.height + 'px';
    cssStyle.magnifierContainer.width = params.width + 'px';
    cssStyle.magnifierContainer.height = params.height + 'px';
    cssStyle.magnifierContainer.left = parseInt(params.width) + 120 + 'px';
    cssStyle.imgStyle2.width = params.width + 'px';
    cssStyle.imgStyle2.height = params.height + 'px';
    cssStyle.imgStyle2.transform = 'scale(' + params.scale + ')';

    this.setState({
      cssStyle: cssStyle
    });
  }

  // 更新图片
  updataImg(props) {
    this.setState({
      minImg: props.minImg,
      maxImg: props.maxImg
    });
  }
  imageChange(e, image, i) {
    console.log(i);
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    cssStyle.imgContainer.cursor = 'move';
    this.setState({
      currentImg: image,
      videoShow: false,
      cssStyle,
      hoverIndex: i,
      offsetX: isMobile? i * 230: i * 400
    });
  }
  // 图片加载情况
  handleImageLoaded(e) {
    // console.log(e);
    this.setState({ imgLoad: true });
  }

  // 图片加载中
  handleImageErrored() {
    this.setState({ imgLoad: false });
  }
  componentDidUpdate() {
    if (this.refs.video) {
      this.refs.video['disablePictureInPicture'] = true;
      this.refs.video.addEventListener('play', () => {
        console.log(false);
        this.setState({ videoModalShow: false });
      });
      this.refs.video.addEventListener('pause', () => {
        console.log(true);
        this.setState({ videoModalShow: true });
      });
    }
  }
  // closeVideoModal() {
  //   this.setState()
  // }
  filterImage(arr) {
    let images = [];
    arr &&
      arr.map((item) => {
        if (
          !images.filter((img) => img.goodsInfoImg === item.goodsInfoImg).length
        ) {
          images.push(item);
        }
        return item;
      });
    return images;
  }
  render() {
    const {
      cssStyle,
      magnifierOff,
      imgLoad,
      currentImg,
      videoShow,
      videoModalShow,
      hoverIndex
    } = this.state;
    let { images, video, taggingForText, taggingForImage } = this.props;
    console.log(images, 'images');
    // images = this.filterImage(images)
    let imgCount = images.length;
    if (video) {
      imgCount = imgCount + 1;
    }
    return (
      <div>
        <div className="position-relative">
          {/* <div className="bigImageOutBox" style={cssStyle.imgContainer}> */}
          <div className="bigImageOutBox" style={cssStyle.imgContainer}>
            {taggingForText ? (
              <div
                className="product-item-flag-text"
                style={{
                  backgroundColor: taggingForText.taggingFillColor,
                  color: taggingForText.taggingFontColor
                }}
              >
                {taggingForText.taggingName}
              </div>
            ) : null}
            {taggingForImage ? (
              <div className="product-item-flag-image position-absolute">
                <LazyLoad>
                <img src={taggingForImage.taggingImgUrl} />
                </LazyLoad>
              </div>
            ) : null}
            <div
              className="bigImageInnerBox rc-loaded--final"
              style={{
                transform: `translateX(-${this.state.offsetX}px) translateY(0) scale(1) rotate(0deg)`
              }}
            >
              {images.filter((el) => el.goodsInfoImg).length
                ? images.map((el, i) => (
                    <div key={i}>
                      <LazyLoad>
                      <img
                        id="J_detail_img"
                        style={cssStyle.imgStyle}
                        src={currentImg || noPic}
                        alt=""
                      />
                      </LazyLoad>
                    </div>
                  ))
                : images.map((el, i) => (
                    <div key={i}>
                      <LazyLoad>
                      <img
                        id="J_detail_img"
                        style={cssStyle.imgStyle}
                        src={currentImg || this.state.maxImg || noPic}
                        alt=""
                      />
                      </LazyLoad>
                    </div>
                  ))}
              {videoShow && video && (
                <div>
                  <video
                    ref="video"
                    style={cssStyle.imgStyle}
                    src={video ? video : ''}
                    controlsList="nodownload"
                    onContextMenu="return false;"
                    controls
                  />
                </div>
              )}
            </div>
            {videoShow && videoModalShow && (
              <div
                className="videoModal"
                onClick={() => {
                  this.refs.video.play();
                  this.setState({ videoModalShow: false });
                }}
              ></div>
            )}
            {/* {!(videoShow && video) && <img id="J_detail_img" style={cssStyle.imgStyle} src={currentImg} alt="" />} */}

            {!videoShow && getDeviceType() === 'PC' && (
              <div
                style={cssStyle.maskBlock}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                onMouseMove={this.mouseMove}
              />
            )}
            {!videoShow && magnifierOff && <div style={cssStyle.mouseBlock} />}
          </div>
          {magnifierOff && !videoShow && (
            <div style={cssStyle.magnifierContainer}>
              <LazyLoad>
              <img
                style={cssStyle.imgStyle2}
                src={currentImg || this.state.maxImg || noPic}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                alt=""
              />
              </LazyLoad>
              {!imgLoad && 'failed to load'}
            </div>
          )}
        </div>
        <div className="scrollOutBox">
          <i
            className={`rc-icon rc-left leftArrow rc-iconography ${
              this.state.positionLeft === 0 ? '' : 'rc-brand1'
            }`}
            style={{ visibility: imgCount > 5 ? 'visible' : 'hidden' }}
            onClick={() => {
              if (this.state.positionLeft === 0) return;
              this.setState({ positionLeft: this.state.positionLeft + 69 });
            }}
          />
          {/* <img className="moveImg" src={LeftImg} /> */}
          <div className="imageOutBox">
            <div
              className="justify-content-center imageInnerBox"
              style={{
                marginTop: '2rem',
                textAlign: imgCount <= 5 ? 'center' : 'left',
                width: imgCount <= 5 ? '100%' : '1000px',
                left: imgCount <= 5? '-17px': (this.state.positionLeft + 'px')
              }}
            >
              {images.filter((el) => el.goodsInfoImg).length ? (
                images &&
                images.map((el, i) => (
                  <div
                    key={i}
                    className={`rc-img--square rc-img--square-custom ${
                      hoverIndex === i ? 'hover' : ''
                    }`}
                    onMouseEnter={(e) =>
                      this.imageChange(e, el.artworkUrl || el.goodsInfoImg, i)
                    }
                    style={{
                      backgroundImage:
                        'url(' +
                        (el.artworkUrl || el.goodsInfoImg || noPic) +
                        ')'
                    }}
                  ></div>
                ))
              ) : this.state.minImg ? (
                <div
                  className={`rc-img--square rc-img--square-custom hover`}
                  style={{
                    backgroundImage: 'url(' + this.state.minImg + ')'
                  }}
                ></div>
              ) : (
                <div
                  className={`rc-img--square rc-img--square-custom hover`}
                  style={{
                    backgroundImage: 'url(' + noPic + ')'
                  }}
                ></div>
              )}
              {video && (
                <video
                  className={`rc-img--square rc-img--square-custom ${
                    hoverIndex === images.length ? 'hover' : ''
                  }`}
                  onMouseEnter={() => {
                    let cssStyle = JSON.parse(
                      JSON.stringify(this.state.cssStyle)
                    );
                    cssStyle.imgContainer.cursor = 'pointer';
                    this.setState({
                      videoShow: true,
                      cssStyle,
                      hoverIndex: images.length,
                      offsetX: isMobile?images.length * 230: images.length * 400
                    });
                  }}
                  src={video ? video : ''}
                />
              )}
            </div>
          </div>
          {/* <img className="moveImg" src={RightImg} /> */}
          <i
            className={`rc-icon rc-right rightArrow rc-iconography ${
              this.state.positionLeft === (imgCount - 5) * -69
                ? ''
                : 'rc-brand1'
            }`}
            style={{ visibility: imgCount > 5 ? 'visible' : 'hidden' }}
            onClick={() => {
              if (this.state.positionLeft === (imgCount - 5) * -69) return;
              this.setState({ positionLeft: this.state.positionLeft - 69 });
            }}
          />
        </div>
      </div>
    );
  }
}

export default ImageMagnifier;
