import React from 'react';
import { uploadResource } from '@/api';
import './index.less';
import LazyLoad from 'react-lazyload';

export default class ImgUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      preImg: ''
    };
    this.uploadDom = React.createRef();
  }

  handleChange(e) {
    console.log('测试图片类型');
    const imgType = e.target.files[0].name || null;
    console.log(imgType);
    let errMsg = 'File type is not valid';
    if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|mp4|rmvb|avi|ts)$/.test(imgType)) {
      console.log('flag状态改变', errMsg);
      errMsg = '';
    }

    const { imgList } = this.state;
    const files = e.target.files;
    if (imgList.length > 8) {
      errMsg = 'The number of pictures cannot exceed 9';
    }
    if (files.length && files[0].size >= 1048576) {
      console.log('上传图片大小不得超过1M');
      return false;
    }
    console.log('falg:', errMsg);
    this.props.geterrMessage(errMsg);
    if (errMsg) {
      console.log('文件类型错误');
    } else {
      const formData = new FormData();
      formData.append('uploadFile', files[0]);
      this.props.showLoading()
      uploadResource(formData)
        .then((res) => {
          this.props.handleChange(res.context[0]);
          this.props.hiddenLoading()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  hanldeDelete(idx) {
    const { imgList } = this.state;
    imgList.splice(idx, 1);
    this.setState({
      imgList: imgList
    });
    this.props.handleChange();
  }
  hanldePreview(idx) {
    this.setState({
      preImg: this.state.imgList[idx]
    });
  }
  render() {
    return (
      <div className="aui-col-xs-3 d-flex flex-wrap" id="img">
        <div
          id="imgPreview"
          className="d-flex flex-wrap"
        >
          <p style={{marginTop: '10px'}}>
          <a className="rc-styled-link" href="#/" onClick={(e) => {
                        e.preventDefault()
                        this.uploadDom.current.click()
                      }}></a>
          </p>
          {this.state.imgList.length <= 2 ? (
            <div className="icon-add" style={{visibility: 'hidden', position: 'absolute'}}>
              <div id="upImg">
                <input
                  ref={this.uploadDom}
                  type="file"
                  name="img"
                  accept="image/jpg, image/png, image/jpeg, image/gif"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>
          ) : null}
          {/* <div className="icon-add">
              <div id="upImg">
                <input
                  type="file"
                  name="img"
                  accept="image/jpg, image/png, image/jpeg, image/gif"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div> */}
        </div>

        {this.props.tipVisible ? (
          <p style={{ fontSize: '.8em', color: '#999' }}>
            Only jpg, jpeg, png, gif files are supported, up to 10 sheets can be
            uploaded, and the size does not exceed 5M
          </p>
        ) : null}
        {/* modal */}
        <div
          className={`modal-backdrop fade ${this.state.preImg ? 'show' : ''}`}
          style={{ display: this.state.preImg ? 'block' : 'none', zIndex: 59 }}
          onClick={() => {
            this.setState({ preImg: '' });
          }}
        ></div>
        <div
          className={`modal fade ${this.state.preImg ? 'show' : ''}`}
          id="removeProductModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{
            display: this.state.preImg ? 'block' : 'none',
            overflow: 'hidden'
          }}
          aria-hidden="true"
          onClick={() => {
            this.setState({ preImg: '' });
          }}
        >
          <LazyLoad>
          <img
            className="img-pre"
            src={this.state.preImg}
            onClick={(e) => e.stopPropagation()}
            alt=""
          />
          </LazyLoad>
        </div>
      </div>
    );
  }
}
