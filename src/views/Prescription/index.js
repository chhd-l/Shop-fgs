import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Progress from '@/components/Progress'
import { createHashHistory } from 'history'
import './index.css'
import MapFlag from '@/components/MapFlag'
import GoogleMap from '@/components/GoogleMap'
import { FormattedMessage } from 'react-intl'

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
      type:'perscription',
      keywords:'',
      selectedSort:0,
      current: 1,
      total: 6, // 总页数
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
      }

    }
    this.headerRef = React.createRef();
    this.inputRef = React.createRef();
    // this.init()
  }
  inputSearchValue=(e)=>{
    this.setState({
      keywords: e.target.value
    })
  }
  // init=()=>{
  //   if (navigator.geolocation) {
  //     //获取当前地理位置信息
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.setState({
  //         center:{
  //           lat:position.coords.latitude,
  //           lng:position.coords.longitude
  //         },
  //         zoom:11
  //       })
  //       // this.state = ({
  //       //   center:{
  //       //     lat:position.coords.latitude,
  //       //     lng:position.coords.longitude
  //       //   },
  //       //   zoom:11
  //       // })
  //     })
  //  } else {
  //     alert("你的浏览器不支持HTML5来获取地理位置信息。");
  //   }
  // }
  handleInit=(e)=>{
    this.handldKey(this.state.key)
        //获取当前地理位置信息
      navigator.geolocation.getCurrentPosition(position => {

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
    this.setState({
      center:{
        lat:item.lat,
        lng:item.lng
      }
    })
    
  }

render(h) {
    let tempArr=[
      {
      title:'clinic11111',
      type:'clinic',
      phone:'023-12341231',
      desc:'meda1',
      id:1,
      lat: 39.89,
      lng: 116.13
    },{
      title:'clinic2',
      type:'clinic',
      phone:'023-12341232',
      desc:'meda2',
      id:2,
      lat: 39.99,
      lng: 116.33
    },{
      title:'clinic3',
      type:'clinic',
      phone:'023-12341233',
      desc:'meda3',
      id:3,
      lat: 39.9,
      lng: 116.43
    }]
    let flags=[];

    flags.push(<AnyReactComponent
      key={this.state.me.id}
      lat={this.state.meLocation.lat}
      lng={this.state.meLocation.lng}
      obj={this.state.me}
    />)
    for (var i = 0; i < tempArr.length; i++) {
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
            <p><FormattedMessage id="clinic.selectVetClinics"/></p>
            <div className="map-saerch">

              <div class="clinic-search-list">
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
                    style={{width:'17rem',padding: "1rem 0 0 0"}}>
                    <select data-js-select="" id="id-single-select" value={this.state.selectedSort}>

                    <FormattedMessage id='clinic.sortResults'>
                        {(txt) => (
                          <option value="0" disabled>{txt}</option>
                        )}
                    </FormattedMessage>
                    <FormattedMessage id='clinic.sortResultsByDistance'>
                        {(txt) => (
                          <option value="1">{txt}</option>
                        )}
                    </FormattedMessage>
                    <FormattedMessage id='clinic.SortResultsByStarRating'>
                        {(txt) => (
                          <option value="2">{txt}</option>
                        )}
                    </FormattedMessage>
                    </select>
                  </span>
                  <div className="rc-column" style={{padding:"0" }}>
                    { tempArr.map( item =>(
                      <article class="rc-card rc-card--a" style={{width:"17rem",margin:"1rem 0 "}} key={item.id}>
                        <div class="rc-card__body" style={{padding:"0 0 0 1rem"}}>
                          <h1 class="rc-card__title rc-delta click-btn" onClick={()=> this.handleItem(item)}>{item.title}</h1>
                          <p>{item.phone} </p>
                          <p style={{display: "inline-block",width:"11rem"}}>{item.desc} </p>
                          <a class="rc-styled-link" style={{ backgroundColor: "red",color: "white",padding: "5px"}} 
                          onClick={handleConfirm}>
                          <FormattedMessage id="clinic.confirm"/>
                          </a>
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
              <div class="clinic-map" >
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
