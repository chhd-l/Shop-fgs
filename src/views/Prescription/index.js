import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Progress from '@/components/Progress'
import { createHashHistory } from 'history'
import './index.css'
import MapFlag from '@/components/MapFlag'
import GoogleMap from '@/components/GoogleMap'
import { FormattedMessage } from 'react-intl'
import { getPrescription } from '@/api/clinic'

const handleConfirm=()=>{
  createHashHistory().push('/payment/shipping')
}

const AnyReactComponent = ({ obj }) => {
  if(obj.type !== 'customer'){
    return (
      <MapFlag obj={obj}></MapFlag>
  )}
  else {
    return (<div style={{
      color: 'white',
      background: 'blue',
      padding: '5px 5px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {obj.title}
    </div>)
  }
}

class Prescription extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      type:'perscription',
      keywords:'',
      selectedSort:1,
      current: 1,
      total: 0, // 总页数
      center:{
        lat: 39.99,
        lng: 116.3
      },
      zoom: 11,
      key:0,
      me:{
        id:1001,
       
        title:'me',
        type:'customer'
      },
      meLocation:{
        lat: 39.99,
        lng: 116.3,
      },
      clinicArr:[]

    }
    this.headerRef = React.createRef();
    this.inputRef = React.createRef();
    this.handleInit()
    this.getPrescription()
  }
  inputSearchValue=(e)=>{
    this.setState({
      keywords: e.target.value
    })
  }

   handleInit=(e)=>{
    this.handldKey(this.state.key)
    
        //获取当前地理位置信息
    navigator.geolocation.getCurrentPosition(position => {
      this.handldKey(this.state.key)
      this.setState({
        center:{
          lat:position.coords.latitude,
          lng:position.coords.longitude
        },
        zoom:11,
        meLocation:{
          lat:position.coords.latitude,
          lng:position.coords.longitude
        },
      })
    })
  }

  async getPrescription(){
    const res = await getPrescription()
    if(res.code === 'K-000000'){
      this.setState({
        clinicArr: res.context.context.clinicsVo,
        total:res.context.context.clinicsVo.length
      })
      
    }
    
  }
  handleSearch(){
    console.log('search');

  }
  
  handleCurrentPageNumChange (e) {
    let tmp = parseInt(e.target.value)
    if (isNaN(tmp)) {
      tmp = 1
    }
    if (tmp > this.state.total) {
      tmp = this.state.total
    }
    this.setState({ current: tmp }, () => this.getProductList())
  }
  handlePrevOrNextPage (type) {
    const { current, total } = this.state
    let res
    if (type === 'prev') {
      if (current <= 1) {
        return
      }
      res = current - 1
    } else {
      if (current >= total) {
        return
      }
      res = current + 1
    }
    this.setState({ current: res }, () => this.getProductList())
  }
  handldKey=(key)=>{
    this.setState({
      key: key + 1
    })
  }
  handleItem=(item)=>{
    this.handldKey(this.state.key)
    item.latitude = +item.latitude
    item.longitude = +item.longitude
    this.setState({
      center:{
        lat:item.latitude,
        lng:item.longitude
      }
    })
    
  }

render(h) {
    let flags=[];

    flags.push(<AnyReactComponent
      key={this.state.me.id}
      lat={this.state.meLocation.lat}
      lng={this.state.meLocation.lng}
      obj={this.state.me}
    />)
    for (var i = 0; i < this.state.clinicArr.length; i++) {
      flags.push(<AnyReactComponent
        key={this.state.clinicArr[i].clinicsId}
        lat={this.state.clinicArr[i].latitude}
        lng={this.state.clinicArr[i].longitude}
        obj={this.state.clinicArr[i]}
      />)
    }

    return (
      <div>
        <Header showMiniIcons={true}/>
        <main className="rc-content--fixed-header rc-bg-colour--brand3" >
          <div
            id="checkout-main"
            style={{maxWidth:"90%"}}
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="prescription">
            <Progress type="perscription" />
            
            <div className="clinic-tip"><FormattedMessage id="clinic.clinicTip"/></div>
            
            <div className="map-saerch">

              <div className="clinic-search-list">
                <div><FormattedMessage id="clinic.selectVetClinics"/></div>
                <form
                  className={['inlineblock', 'headerSearch', 'headerSearchDesktop', 'relative' ].join(' ')}
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
                    <i className="rc-icon rc-location2--xs rc-iconography rc-vertical-align click-btn"
                      aria-label="location" onClick={(e)=> this.handleInit(e)}>
                    </i>
                  </span>
                  <input type="hidden" value="null" name="lang" />

                  <span className="rc-select rc-input--inline rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop"
                    style={{width:'100%',maxWidth:'100%', padding: "1rem 0 0 0"}}>
                    <select data-js-select="" id="id-single-select" value={this.state.selectedSort}>
                    <FormattedMessage id='clinic.sortResultsByDistance'>
                        {(txt) => (
                          <option value="1">{txt}</option>
                        )}
                    </FormattedMessage>
                    <FormattedMessage id='clinic.sortResultsByStarRating'>
                        {(txt) => (
                          <option value="2">{txt}</option>
                        )}
                    </FormattedMessage>
                    </select>
                  </span>
                  <div className="rc-column" style={{padding:"0", marginBottom:'2rem' }}>
                    { this.state.clinicArr.map( item =>(
                      <article className="rc-card rc-card--a clinic-card-boder" style={{width:'100%',margin:'1rem 0'}} 
                        key={item.clinicsId}>
                        <div className="rc-card__body" style={{padding:"0 0 0 1rem" ,}}>
                          <p style={{marginTop:'1rem'}}><FormattedMessage id='clinic.vet' ></FormattedMessage></p>
                          <h3 className="rc-card__title rc-delta click-btn clinic-title" onClick={()=> this.handleItem(item)}>{item.clinicsName}</h3>
                          <p className="clinic-phone">{item.email} </p>
                          <p className="clinic-address">{item.location} </p>
                          <div style={{height: '3rem'}}>
                            <button className="rc-btn rc-btn--sm rc-btn--one card-btn" onClick={handleConfirm}>
                              <FormattedMessage id="clinic.confirm" />
                            </button>
                          </div>
                          
                        </div>
                      </article>))
                      }
                  </div>
                  <div className="grid-footer rc-full-width">
                    <nav className="rc-pagination" data-pagination="" data-pages={this.state.total}>
                      <form className="rc-pagination__form">
                        <button
                          className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                          aria-label="Previous step" data-prev="" type="submit" onClick={this.handlePrevOrNextPage('prev')}></button>
                        <div className="rc-pagination__steps">
                          <input type="text" className="rc-pagination__step rc-pagination__step--current" value={this.state.current}
                            aria-label="Current step" onChange={this.handleCurrentPageNumChange} />
                          <div className="rc-pagination__step rc-pagination__step--of">
                            of
                            &nbsp;<span data-total-steps-label=""></span>
                          </div>
                        </div>
                        <button
                          className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"
                          aria-label="Previous step" data-next="" type="submit" onClick={() => this.handlePrevOrNextPage('next')}></button>
                      </form>
                    </nav>
                  </div>
                </form>

              </div>
              <div className="clinic-map" >
                <GoogleMap center={this.state.center} zoom={this.state.zoom} flags={flags} key={this.state.key}>
                </GoogleMap>
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
