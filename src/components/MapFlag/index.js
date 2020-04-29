import React from 'react'
import { createHashHistory } from 'history'
import { FormattedMessage } from 'react-intl'
import './index.css'

class MapFlag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show:false,
      isPassive:true
    }
  }
  openTooltip = () =>{
    this.props.sonMess(this.props.obj)
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
      show:false,
      isPassive:false
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.show && this.state.show === false &&this.state.isPassive){
      this.setState({
        show:nextProps.show
      })
    }
    
  }


  render(h) {
    return(
      <div>
        <div data-tooltip-placement="top" className="rc-margin-top--md rc-text--center">
          <div className="rc-map-location__icon" onClick={this.openTooltip}>
            <svg width="24" height="32">
              <path d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0" fill="#E2001A" fillRule="evenodd"></path>
            </svg>
            { this.state.show === true?this.props.obj.clinicsName:''}
        </div>
      </div>
      <div className="gm-style-iw-c" 
      style={{ display: this.state.show === true? "block":"none" , zIndex:1}}>
        <div className="rc-tooltip rc-text--left rc-padding--xs" id="map-tooltip" style={{ display:'block'}}>
          <div className="rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop" style={{marginBottom:"0"}}>
            <p><FormattedMessage id='clinic.vet' ></FormattedMessage></p>
            <h4 className="rc-card__title rc-delta click-btn map-flag-title" >{this.props.obj.clinicsName}</h4>
            
            <div className="map-flag-address">{this.props.obj.location} </div>

            <div className="map-flag-phone">{this.props.obj.preferredChannel ==='phone'? this.props.obj.phone:this.props.obj.email} </div>
            <div className="rc-button-link-group rc-padding-right--md--desktop" style={{marginTop:"1rem"}}>
            {/* <button className="rc-btn rc-btn--two rc-btn--sm" style={{marginRight:"1rem"}}  onClick={this.handleClose}>
              <FormattedMessage id='clinic.cancel' ></FormattedMessage>
            </button> */}
            <button className="rc-btn rc-btn--one rc-btn--sm"  onClick={()=>this.handleConfirm(this.props.obj)}>
              <FormattedMessage id='clinic.confirm'></FormattedMessage>
            </button>
            <button
                  type="button"
                  className="close map-flag-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={()=>this.handleClose()}
                >
                  <span aria-hidden="true">
                    <font>
                      <font>×</font>
                    </font>
                  </span>
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