import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './index.css'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Prescription extends React.Component{
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  constructor(props) {
    super(props)
    this.state = {
      key:'AIzaSyAon2T3c9-PS9lXxkAztfBZP5BWygtBTWE',
      type:'perscription',
      keywords:'',
      selectedSort:1
    }
    this.headerRef = React.createRef();
    this.inputRef = React.createRef();
  }
  inputSearchValue=(e)=>{
    this.setState({
      keywords: e.target.value
    })
    
  }
  handleSearch(){
    console.log('search');
    
  }
  render(h) {
    return (
      <div>
        <Header />
          <main class="rc-content--fixed-header rc-bg-colour--brand3">
            <div
              id="checkout-main"
              class="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
              data-checkout-stage="prescription">
              <div class="rc-padding--sm rc-padding-top--none">
                <div
                  class="checkout-steps rc-layout-container rc-margin-top--lg--mobile"
                  data-loc="checkout-steps">
                  <div class="rc-column rc-padding-x--none--mobile">
                    <ul class="rc-list rc-list--inline rc-content-v-middle rc-padding--none">
                    <li className={`checkout-steps__item ${
                          this.state.type === "perscription" ? "active" : ""
                        }`}
                        data-step="perscription">
                        <span class="rc-header-with-icon">
                          <i class="icon icon-prescription"></i>
                          Prescription
                        </span>
                      </li>
                      <li className={`checkout-steps__item ${
                          this.state.type === "shipping" ? "active" : ""
                        }`}
                        data-step="shipping">
                        <span class="rc-header-with-icon">
                          <hr />
                          <i class="icon icon-delivery"></i>
                          Delivery
                        </span>
                      </li>
                      <li
                        className={`checkout-steps__item ${
                          this.state.type === "payment" ? "active" : ""
                        }`}
                        data-step="payment"
                      >
                        <span class="rc-header-with-icon">
                          <hr />
                          <i class="icon icon-payment"></i>
                          Choose payment
                        </span>
                      </li>
                      <li
                        className={`checkout-steps__item ${
                          this.state.type === "confirmation" ? "active" : ""
                        }`}
                        data-step="confirmation"
                      >
                        <span class="rc-header-with-icon">
                          <hr />
                          <i class="icon icon-validation"></i>
                          Confirmation
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p>Select Vet Clinic</p> 
              <div class="map-saerch">
                
                <div style={{ height: '60vh', width: '30%' }}>
                  <form
                    className={['inlineblock', 'headerSearch', 'headerSearchDesktop', 'relative'].join(' ')}
                    role="search"
                    name="simpleSearch"
                    onSubmit={e => { e.preventDefault() }}>
                    <span className="rc-input rc-input--full-width" input-setup="true">
                      <button className="rc-input__submit rc-input__submit--search" type="submit" onClick={this.handleSearch}>
                        <span className="rc-screen-reader-text">Submit</span>
                      </button>
                      <input
                        ref={this.inputRef}
                        className="search-field"
                        type="search"
                        autoComplete="off"
                        aria-label="Search location"
                        placeholder="Search location"
                        value={this.state.keywords}
                        onChange={this.inputSearchValue} />
                      <label className="rc-input__label" htmlFor="id-submit-2">
                        <span className="rc-input__label-text"></span>
                      </label>
                      <i className="rc-icon rc-location2 rc-iconography  rc-vertical-align " 
                        aria-label="location">
                      </i>
                    </span>
                    <input type="hidden" value="null" name="lang" />
                    
                    <span class="rc-select rc-input--inline rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop"
                     style={{width:'280px',margin:'40px 0 0 0'}}>
                      <select data-js-select="" id="id-single-select" value={this.state.selectedSort} placeholder="Sort results">
                        <option value="1">Sort results by distance</option>
                        <option value="2">Sort results by star rating</option>
                      </select>
                    </span>
                    <div class="rc-column" style={{padding:"0" ,margin:"10px 0 "}}>
                      <article class="rc-card rc-card--a" style={{width:"280px"}} >
                        <div class="rc-card__body" style={{padding:"0"}}>
                          <h1 class="rc-card__title rc-delta">Headline</h1>
                          <p>1234 </p>
                          <p style={{display: "inline-block",width:"160px"}}>1234 </p>
                          <button class="rc-btn rc-btn--sm">comfirm</button>
                        </div>
                      </article>
                    </div>
                  </form>
                  
                </div>
                <div style={{ height: '60vh', width: '70%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: this.state.key }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>
                    <AnyReactComponent
                      lat={59.955413}
                      lng={30.337844}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div>
              </div>
              
            </div>
          </main>
        <Footer />
      </div>
    )
  }
}
export default Prescription