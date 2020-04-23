import React from 'react'
import { createHashHistory } from 'history'

class MapFlag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show:false
    }
  }
  openTooltip = () =>{
    this.setState({
      show:true
    })
  }
  handleConfirm=()=>{
    createHashHistory().push('/payment/shipping')
  }
  handleClose=()=>{
    this.setState({
      show:false
    })
  }


  render(h) {
    return(
      <div>
        <div data-tooltip-placement="top" className="rc-margin-top--md rc-text--center">
          <div className="rc-map-location__icon" onClick={this.openTooltip}>
            <svg width="24" height="32">
              <path d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0" fill="#E2001A" fillRule="evenodd"></path>
            </svg>
          {this.props.obj.clinicsName}
        </div>
      </div>
      <div className="gm-style-iw-c" 
      style={{ display: this.state.show === true? "block":"none"}}>
        <div className="rc-tooltip rc-text--left rc-padding--xs" id="map-tooltip" style={{ display:'block'}}>
          <div className="rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop" style={{marginBottom:"0"}}>
            <h1 className="rc-card__title rc-delta">{this.props.obj.clinicsName}</h1>
            <p>{this.props.obj.email} </p>
            <p style={{display: "inline-block",width:"10rem"}}>{this.props.obj.location}</p>
            <div style={{marginTop:"1rem"}}>
              <a className="rc-styled-link" 
                style={{ backgroundColor: "gray",color: "white",padding: "5px",marginRight:"1rem"}} 
                onClick={this.handleClose}>Close</a>
              <a className="rc-styled-link" 
                style={{ backgroundColor: "red",color: "white",padding: "5px"}} 
                onClick={this.handleConfirm}>Comfirm</a>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    )
    

  }
}
export default MapFlag