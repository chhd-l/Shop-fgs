import React from 'react'
import { createHashHistory } from 'history'
import { FormattedMessage } from 'react-intl'
import './index.css'

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
  handleConfirm=(item)=>{
    sessionStorage.setItem('rc-clinics-name2',item.clinicsName)
    sessionStorage.setItem('rc-clinics-id2', item.clinicsId)
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
            <p><FormattedMessage id='clinic.vet' ></FormattedMessage></p>
            <h4 class="rc-card__title rc-delta click-btn map-flag-title" >{this.props.obj.clinicsName}</h4>
            
            <div class="map-flag-address">{this.props.obj.location} </div>

            <div class="map-flag-phone">{this.props.obj.email} </div>
            <div class="rc-button-link-group rc-padding-right--md--desktop" style={{marginTop:"1rem"}}>
            <button class="rc-btn rc-btn--two rc-btn--sm"  onClick={this.handleClose}>
              <FormattedMessage id='clinic.cancel' ></FormattedMessage>
            </button>
            <button class="rc-btn rc-btn--one rc-btn--sm"  onClick={()=>this.handleConfirm(this.props.obj)}>
              <FormattedMessage id='clinic.confirm' ></FormattedMessage>
            </button>
          </div>
            {/* <div style={{marginTop:"1rem"}}>
              <a className="rc-styled-link" 
                style={{ backgroundColor: "gray",color: "white",padding: "5px",marginRight:"1rem"}} 
                onClick={this.handleClose}>Close</a>
              <a className="rc-styled-link" 
                style={{ backgroundColor: "red",color: "white",padding: "5px"}} 
                onClick={this.handleConfirm}>Comfirm</a>
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
    )
    

  }
}
export default MapFlag