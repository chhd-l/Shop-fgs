import React from 'react';
import { uploadResource } from "@/api"
import './index.css'

export default class ImgUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgList: [],
      preImg: ''
    }
  }

  handleChange (e) {
    const { imgList } = this.state
    const files = e.target.files
    if (files.length && files[0].size >= 1048576) {
      console.log("上传图片大小不得超过1M");
      return false;
    }
    const formData = new FormData()
    formData.append('uploadFile', files[0])
    uploadResource(formData)
      .then(res => {
        imgList.push(res.context[0])
        this.setState({
          imgList: imgList
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  hanldeDelete (idx) {
    const { imgList } = this.state
    imgList.splice(idx, 1)
    this.setState({
      imgList: imgList
    })
  }
  hanldePreview (idx) {
    this.setState({
      preImg: this.state.imgList[idx]
    })
  }
  render () {
    return (
      <div className="aui-col-xs-3 d-flex flex-wrap" id="img">
        <div id="imgPreview" className="d-flex flex-wrap">
          {
            this.state.imgList.map((src, i) => (
              <div className="img-item mr-2 mb-2" key={i}>
                <div className="img-layer d-flex justify-content-around align-items-center" style={{ color: '#fff' }}>
                  {/* <span className="rc-icon rc-incompatible--xs rc-iconography">EYE</span> */}
                  <a className="" style={{ cursor: 'pointer' }} onClick={() => { this.hanldePreview(i) }}>EYE</a>
                  <a className="" style={{ cursor: 'pointer' }} onClick={() => { this.hanldeDelete(i) }}>DEL</a>
                </div>
                <img className="" src={src} id={`cropedBigImg_${i}`} />
              </div>
            ))
          }
        </div>
        <div className="icon-add">
          <div id="upImg">
            <input type="file" name="img" accept="image/jpg, image/png, image/jpeg, image/gif" onChange={e => this.handleChange(e)} />
          </div>
        </div>
        <p style={{fontSize: '.8em', color: '#999'}}>Only jpg, jpeg, png, gif files are supported, up to 10 sheets can be uploaded, and the size does not exceed 5M</p>
        {/* modal */}
        <div
          className={`modal-backdrop fade ${
            this.state.preImg ? "show" : ""
            }`}
          style={{ display: this.state.preImg ? "block" : "none", zIndex: 59 }}
          onClick={() => { this.setState({ preImg: '' }) }}
        ></div>
        <div
          className={`modal fade ${this.state.preImg ? "show" : ""}`}
          id="removeProductModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: this.state.preImg ? "block" : "none", overflow: 'hidden' }}
          aria-hidden="true"
          onClick={() => { this.setState({ preImg: '' }) }}
        >
          <img className="img-pre" src={this.state.preImg} onClick={e => e.stopPropagation()} />
        </div>
      </div >
    )
  }
}