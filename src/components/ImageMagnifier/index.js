import React, { Component } from "react";
import './index.css'

class ImageMagnifier extends Component {
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
        width: (props.config && props.config.width) || "200",
        // 组件高
        height: (props.config && props.config.height) || "250"
      },
      // 缩略图
      minImg: "",
      // 大图
      maxImg: "",
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
          cursor: "move",
          position: "relative"
        },
        // 鼠标悬停小方块样式
        mouseBlock: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100px",
          height: "100px",
          background: "rgba(0,0,0,0.1)",
          zIndex: 99
        },
        // 鼠标悬停遮罩层样式
        maskBlock: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0)",
          zIndex: 100
        },

        //  放大镜容器样式
        magnifierContainer: {
          position: "absolute",
          left: "-400px",
          top: "0",
          width: "400px",
          height: "400px",
          border: "1px solid #ccc",
          overflow: "hidden",
          zIndex: 98
        },
        // 图片样式
        imgStyle: {
          width: "200",
          height: "100%",
          margin: "0 auto",
          display: 'block'
        },
        // 图片放大样式
        // 此处图片宽高不能设置为百分比，在scale的作用下，放大的只是图片初始的宽高 ！！！
        imgStyle2: {
          width: "400px",
          height: "400px",
          position: "absolute",
          top: 0,
          left: 0,
          transform: "scale(4)",
          transformOrigin: "top left"
        }
      },
      videoShow: false,
      videoModalShow: true,
      listenerCount: 1
    };
  }

  /**
   * 生命周期函数
   */
  // 组件初始化
  componentWillMount () {
    this.initParam();
    this.updataImg(this.props);
  }
  componentDidMount() {
    let { currentImg } = this.state
    let { images, sizeList } = this.props
    if (!currentImg && images && images.length > 0) {
      currentImg = images[0].artworkUrl
    }
    console.log(currentImg, 'currentImg')
    this.setState({
      currentImg: currentImg
    })
    
    let selectedSizeInfo = sizeList.filter(item => item.selected)
    if (selectedSizeInfo.length) {
      this.setState({ currentImg: selectedSizeInfo[0].goodsInfoImg, videoShow: false })
    }
  }
  // props 变化时更新
  componentWillReceiveProps (nextProps) {
    let { currentImg } = this.state
    let { images } = this.props
    if (!currentImg && images && images.length > 0) {
      currentImg = images[0].artworkUrl
    }
    console.log(currentImg, 'currentImg')
    this.setState({
      currentImg: currentImg
    })
    this.updataImg(nextProps);
    const { sizeList } = nextProps
    console.log(sizeList.filter(item => item.selected))
    let selectedSizeInfo = sizeList.filter(item => item.selected)
    if (selectedSizeInfo.length) {
      this.setState({ currentImg: selectedSizeInfo[0].goodsInfoImg, videoShow: false })
    }
  }

  /**
   * 方法
   */
  // 鼠标移入
  mouseEnter = () => {
    this.setState({
      magnifierOff: true,
      params: Object.assign({}, this.state.params,
        {
          width: document.querySelector('#J_detail_img').offsetWidth,
          height: document.querySelector('#J_detail_img').offsetHeight
        })
    }, () => this.initParam());
  };
  // 鼠标移除
  mouseLeave = () => {
    this.setState({
      magnifierOff: false
    });
  };
  // 鼠标移动
  mouseMove = event => {
    // console.log(event);
    let e = event.nativeEvent;
    this.calculationBlock(e.offsetX, e.offsetY);
  };

  // 计算相关参数
  calculationBlock (offsetX, offsetY) {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    const scale = parseInt(this.state.params.scale)
    /* 小方块位置 */
    // 防止鼠标移动过快导致计算失误，只要小于或者大于对应值，直接设置偏移量等于最小值或者最大值
    if (offsetX < 50) {
      offsetX = 50;
    }
    const tmpWidth = parseInt(this.state.params.width)
    if (offsetX > tmpWidth - 50) {
      offsetX = tmpWidth - 50;
    }
    if (offsetY < 50) {
      offsetY = 50;
    }
    const tmpHeight = parseInt(this.state.params.height)
    if (offsetY > tmpHeight - 50) {
      offsetY = tmpHeight - 50;
    }
    cssStyle.mouseBlock.left = parseFloat(offsetX - 50) + "px";
    cssStyle.mouseBlock.top = parseFloat(offsetY - 50) + "px";

    /* 计算图片放大位置 */
    cssStyle.imgStyle2.left = parseFloat(-(offsetX - 50) * scale) + "px";
    cssStyle.imgStyle2.top = parseFloat(-(offsetY - 50) * scale) + "px";

    this.setState({
      cssStyle: cssStyle
    });
  }

  // 初始化静态参数
  initParam () {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    let params = JSON.parse(JSON.stringify(this.state.params));
    cssStyle.imgContainer.width = params.width + "px";
    cssStyle.imgContainer.height = params.height + "px";
    cssStyle.magnifierContainer.width = params.width + "px";
    cssStyle.magnifierContainer.height = params.height + "px";
    cssStyle.magnifierContainer.left = (parseInt(params.width) + 80) + "px";
    cssStyle.imgStyle2.width = params.width + "px";
    cssStyle.imgStyle2.height = params.height + "px";
    cssStyle.imgStyle2.transform = "scale(" + params.scale + ")";

    this.setState({
      cssStyle: cssStyle
    });
  }

  // 更新图片
  updataImg (props) {
    this.setState({
      minImg: props.minImg,
      maxImg: props.maxImg
    });
  }
  imageChange (e, image) {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    cssStyle.imgContainer.cursor = 'move'
    this.setState({
      currentImg: image,
      videoShow: false,
      cssStyle
    })
  }
  // 图片加载情况
  handleImageLoaded (e) {
    // console.log(e);
    this.setState({ imgLoad: true });
  }

  // 图片加载中
  handleImageErrored () {
    this.setState({ imgLoad: false });
  }
  componentDidUpdate () {
    if (this.refs.video) {
      this.refs.video['disablePictureInPicture'] = true
      this.refs.video.addEventListener('play', () => {
        console.log(false)
        this.setState({ videoModalShow: false })
      })
      this.refs.video.addEventListener('pause', () => {
        console.log(true)
        this.setState({ videoModalShow: true })
      })
    }
  }
  // closeVideoModal() {
  //   this.setState()
  // }
  render () {
    const { cssStyle, magnifierOff, minImg, maxImg, imgLoad, currentImg, videoShow, videoModalShow } = this.state;
    const { images, video } = this.props
    console.log(images, 'images');
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <div style={cssStyle.imgContainer}>
            {videoShow && videoModalShow && <div className="videoModal" onClick={() => {
              this.refs.video.play()
              this.setState({ videoModalShow: false })
            }}></div>}
            {!(videoShow && video) && <img id="J_detail_img" style={cssStyle.imgStyle} src={currentImg} alt="" />}
            {(videoShow && video) && <video ref="video" style={cssStyle.imgStyle} src={video ? video : ''} controlslist="nodownload" oncontextmenu="return false;" controls></video>}
            {!videoShow && <div
              style={cssStyle.maskBlock}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
              onMouseMove={this.mouseMove}
            />}
            {!videoShow && magnifierOff && <div style={cssStyle.mouseBlock} />}
          </div>
          {magnifierOff && !videoShow && (
            <div style={cssStyle.magnifierContainer}>
              <img
                style={cssStyle.imgStyle2}
                src={currentImg}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                alt=""
              />
              {!imgLoad && "failed to load"}
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center">
          {
            
            images && images.map((el, i) => (
              <div key={i} className="rc-img--square rc-img--square-custom" onMouseEnter={(e) => this.imageChange(e, el.artworkUrl || el.goodsInfoImg)} style={{ backgroundImage: 'url(' + (el.artworkUrl || el.goodsInfoImg) + ')' }}></div>
            ))
          }
          {video && <video className="rc-img--square rc-img--square-custom" onMouseEnter={() => {
            let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
            cssStyle.imgContainer.cursor = 'pointer'
            this.setState({ videoShow: true, cssStyle })
          }} src={video ? video : ''}></video>}
        </div>
      </div>
    );
  }
}

export default ImageMagnifier