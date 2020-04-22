import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Progress from '@/components/Progress'
import { createHashHistory } from 'history'
import './index.css'
import GoogleMapReact from 'google-map-react';
import MapFlag from '@/components/MapFlag'

const handleConfirm=()=>{
  createHashHistory().push('/payment/shipping')
}

const AnyReactComponent = ({ obj }) => {
  if(obj.type === 'clinic'){
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
      key:'AIzaSyAon2T3c9-PS9lXxkAztfBZP5BWygtBTWE',
      type:'perscription',
      keywords:'',
      selectedSort:1,
      current: 1,
      total: 6, // 总页数
      center:{
        lat: 39.9,
        lng: 116.3
      },
      zoom: 11,
      map:''
    }
    this.headerRef = React.createRef();
    this.inputRef = React.createRef();
    this.init()
  }
  inputSearchValue=(e)=>{
    this.setState({
      keywords: e.target.value
    })
  }
  init=()=>{
    if (navigator.geolocation) {
      //获取当前地理位置信息
      navigator.geolocation.getCurrentPosition(position => {
        // this.setState({
        //   center:{
        //     lat:position.coords.latitude,
        //     lng:position.coords.longitude
        //   },
        //   zoom:11
        // })
        this.state = ({
          center:{
            lat:position.coords.latitude,
            lng:position.coords.longitude
          },
          zoom:11
        })
      })
   } else {
      alert("你的浏览器不支持HTML5来获取地理位置信息。");
    }
  }
  handleInit=()=>{
    this.setState({})
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

render(h) {
    let tempArr=[
      {
        title:'me',
        type:'customer',
        desc:'meda1',
        id:1001,
        lat:this.state.center.lat,
        lng:this.state.center.lng,
      },
      {
      title:'clinic11111',
      type:'clinic',
      phone:'023-12341231',
      desc:'meda1',
      id:1,
      lat:this.state.center.lat+0.1,
        lng:this.state.center.lng+0.1,
    },{
      title:'clinic2',
      type:'clinic',
      phone:'023-12341232',
      desc:'meda2',
      id:2,
      lat:this.state.center.lat+0.3,
        lng:this.state.center.lng,
    },{
      title:'clinic3',
      type:'clinic',
      phone:'023-12341233',
      desc:'meda3',
      id:3,
      lat:this.state.center.lat+0.3,
        lng:this.state.center.lng+0.1,
    }]
    let items = [];
    let flags=[];

    for (var i = 0; i < tempArr.length; i++) {
      if(tempArr[i].type==='clinic'){
        items.push(
          <article class="rc-card rc-card--a" style={{width:"17rem",margin:"1rem 0 "}} key={tempArr[i].id}>
            <div class="rc-card__body" style={{padding:"0 0 0 1rem"}}>
              <h1 class="rc-card__title rc-delta">{tempArr[i].title}</h1>
              <p>{tempArr[i].phone} </p>
              <p style={{display: "inline-block",width:"11rem"}}>{tempArr[i].desc} </p>
              <a class="rc-styled-link" style={{ backgroundColor: "red",color: "white",padding: "5px"}} onClick={handleConfirm}>comfirm</a>
            </div>
          </article>)
      }
        flags.push(<AnyReactComponent
          key={tempArr[i].id}
          lat={tempArr[i].lat}
          lng={tempArr[i].lng}
          obj={tempArr[i]}
        />)
    }

    return (
      <div>
        <Header showMiniIcons={true}/>
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div
            id="checkout-main"
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="prescription">
            <Progress type="perscription" />
            <p>Select Vet Clinic</p>
            <div className="map-saerch">

              <div style={{ width: '30%' }}>
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
                    <i className="rc-icon rc-location2--xs rc-iconography rc-vertical-align "
                      aria-label="location" onClick={this.handleInit}>
                    </i>
                  </span>
                  <input type="hidden" value="null" name="lang" />

                  <span className="rc-select rc-input--inline rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop"
                    style={{width:'17rem',padding: "1rem 0 0 0"}}>
                    <select data-js-select="" id="id-single-select" value={this.state.selectedSort} placeholder="Sort results">
                      <option value="1">Sort results by distance</option>
                      <option value="2">Sort results by star rating</option>
                    </select>
                  </span>
                  <div className="rc-column" style={{padding:"0" }}>
                    {items}
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
              <div style={{ height: '40rem', width: '70%' }}>
                <GoogleMapReact
                  ref={(ref) => { this.map = ref }}
                  bootstrapURLKeys={{ key: this.state.key }}
                  defaultCenter={this.state.center}
                  distanceToMouse={()=>{}}
                  defaultZoom={this.state.zoom}>
                  {flags}
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
