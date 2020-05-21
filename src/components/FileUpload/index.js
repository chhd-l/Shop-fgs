import React from 'react';
// import { Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import './img-upload.css'

export default class ImgUpload extends React.Component {
  /*
    组件属性
    id:组件动态标识，表明组件是否需要修改的唯一标识
    imgTitle：组件的中文描述
    height：图片外框的高度
    imgFile:图片文件
    renderState：图片初始化状态,//init：初始化，loading:正在上传，upload：上传成功
    imgSrc:图片src路径
    isPreview: false//是否显示弹出层预览全图
    titleClass:"" //文本描述信息的样式
    getImgFile:function(name,file,path):获取图片文件，在图片文件改变时触发
  */
  constructor(props) {
    super(props)
    this.state = {
      imgFile: null,
      imgSrc: this.props.imgSrc || "",
      renderState: this.props.renderState || "init",
      isPreview: false,
      disabled: this.props.disabled || false
    }
  }

  static defaultProps = {
    imgTitle: "",
    height: "200px",
    renderState: "init",
    imgSrc: "",
    titleClass: "",
    accept: "*"
  }

  static propTypes = {
    imgTitle: PropTypes.string,
    renderState: PropTypes.oneOf(['init', 'loading', 'upload']),
    imgSrc: PropTypes.string,
    titleClass: PropTypes.string,
    accept: PropTypes.string
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.imgSrc != nextProps.imgSrc) {
      this.setState({ imgSrc: nextProps.imgSrc })
    }
    if (this.props.renderState != nextProps.renderState) {
      this.setState({ renderState: nextProps.renderState })
    }
    if (this.props.disabled != nextProps.disabled) {
      this.setState({ disabled: nextProps.disabled })
    }

  }

  renderInit () {//初始化渲染
    return (
      <div className="img-box" style={{ height: this.props.height }}>
        <input type="file" className="img-file" onChange={this.imgChange.bind(this)} accept={this.props.accept} />
        <div className={"img-add " + this.props.titleClass}>
          {/* <Icon type="plus" className="img-add-icon" /> */}
          +
          <div>{this.props.imgTitle}</div>
        </div>
      </div>
    )
  }

  renderLoading () {//正在上传
    return (
      <div className="img-box" style={{ height: this.props.height }}>
        <img src="/static/admin/img/loading.gif" className="img-loading" />
      </div>
    )
  }

  renderUpload () {//上传完成
    const imgSrc = (this.state.imgSrc && this.state.imgSrc != "") ? this.state.imgSrc : "/static/admin/img/error_img.jpg"
    const imgBox = this.state.disabled ? "img-box-preview-hide" : "img-box-preview-show"
    return (
      <div className={imgBox} style={{ height: this.props.height }}>
        <img src={imgSrc} className="img-wh" />
        <div className="img-preview">
          <span style={{ background: '#000' }} className="img-operate" onClick={this.original.bind(this)}>eye</span>
          <span style={{ background: '#000' }} className="img-operate" onClick={this.original.bind(this)}>delete</span>
          {/* <Icon type="eye-o" className="img-operate" onClick={this.original.bind(this)} /> */}
          {/* <Icon type="delete" className="img-operate" onClick={this.deleteImg.bind(this)} /> */}
        </div>
      </div>
    )
  }

  renderImg () {
    if (this.state.renderState === "init") {
      return this.renderInit()
    } else if (this.state.renderState === "loading") {
      return this.renderLoading()
    } else if (this.state.renderState === "upload") {
      return this.renderUpload()
    }
  }

  imgChange (event) {//获取文件图片
    this.setState({ imgFile: event.target.files[0], renderState: "loading" }, () => {
      this.previewImg()
    })
  }

  previewImg () {//本地预览
    const that = this;
    const file = this.state.imgFile;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      that.setState({ renderState: "upload", imgSrc: this.result })
    }
  }

  original () {//原图查看
    this.setState({ isPreview: true })
  }

  deleteImg () {//删除图片
    this.setState({ renderState: "init", imgFile: null, isPreview: false, imgSrc: "" })
  }

  resetImgSrc () {
    this.setState({ renderState: this.props.renderState, imgFile: null, imgSrc: this.props.imgSrc })
  }

  getImgFile () {
    return { file: this.state.imgFile, src: this.state.imgSrc }
  }

  cancelModal () {//关闭弹窗
    this.setState({ isPreview: false })
  }
  handleChange (e) {
    let filePath = e.target.value
    let fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase()
    let src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式

    if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
      console.log('上传错误,文件格式必须为：png/jpg/jpeg');
      return;
    } else {
      // $('#cropedBigImg').css('display', 'block');
      // $('#cropedBigImg').attr('src', src);
    }
  }
  render () {
    return (
      <div class="aui-col-xs-3" id="img">
        +
        {/* <svg class="icon bigIcon" aria-hidden="true">
          <use xlink:href="#icon-msnui-add"></use>
 </svg> */}
        {/* <!--阿里巴巴矢量图标，就是最后效果图中的“+”图标-- > */}
        <div class="aui-grid-label">添加图片</div>
        <div id="upImg">
          <input type="file" name="file" id="chooseImage" onChange={e => this.handleChange(e)} />
        </div>
        <div id="imgPreview">
          <img src="#" id="cropedBigImg" />
        </div>
      </div >
    )
  }
}