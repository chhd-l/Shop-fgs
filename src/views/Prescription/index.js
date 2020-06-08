import React from 'react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Progress from '@/components/Progress'
import Pagination from '@/components/Pagination'
import './index.css'
import MapFlag from '@/components/MapFlag'
import GoogleMap from '@/components/GoogleMap'
import { FormattedMessage } from 'react-intl'
import { getPrescription, getAllPrescription } from '@/api/clinic'
import meImg from "@/assets/images/map-default-marker.png"

const AnyReactComponent = ({ obj, show, sonMess }) => {
  if (obj.type !== 'customer') {
    return (
      <MapFlag obj={obj} show={show} sonMess={sonMess}></MapFlag>
    )
  }
  else {
    return (
      <div>

        <img alt="" src={meImg}
          draggable="false"
          style={{
            position: 'absolute', left: '0px', top: '0px', width: '1.5rem', height: '1.5rem',
            userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none'
          }} />
      </div>)
  }
}

class Prescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'perscription',
      keywords: '',
      selectedSort: 1,
      current: 1,
      total: 0, // 总数
      totalPage: 1,
      center: {
        lat: 19.3,
        lng: -99.1,
      },
      zoom: 12,
      mapKey: 0,
      me: {
        id: 1001,

        title: 'me',
        type: 'customer'
      },
      meLocation: {
        lat: 19.3,
        lng: -99.1,
      },
      clinicArr: [],
      currentClinicArr: [],
      params: {
        input: "",
        pageNum: 0,
        pageSize: 3,
      },
      currentSelectClinic: {
        lat: 0,
        lng: 0
      },
      loading: true
    }
    this.headerRef = React.createRef();
    this.inputRef = React.createRef();
    this.handleInit()
    this.getPrescription(this.state.params)
    this.getAllPrescription()
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  inputSearchValue = (e) => {
    this.setState({
      keywords: e.target.value
    })
  }

  handleInit = (e) => {
    //获取当前地理位置信息
    navigator.geolocation.getCurrentPosition(position => {
      this.handldKey(this.state.mapKey)
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 12,
        meLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
      })
    })
  }

  async getPrescription (params) {
    this.setState({ loading: true })
    const res = await getPrescription(params)
    if (res.code === 'K-000000') {
      let totalPage = Math.ceil(res.context.total / this.state.params.pageSize)
      this.setState({
        currentClinicArr: res.context.content,
        totalPage: totalPage,
        loading: false
      })

    }

  }
  async getAllPrescription () {
    let params = {
      "filterField": "string",
      "filteringStr": "string"
    }
    const res = await getAllPrescription(params)
    if (res.code === 'K-000000') {
      let clinicArr = res.context
      //过滤掉经纬度非数字值
      clinicArr = clinicArr.filter(item => {
        return !(isNaN(item.latitude) || isNaN(item.longitude))
      })
      //过滤掉 经度-180-180 ，纬度 -90-90
      clinicArr = clinicArr.filter(item => {
        return (item.latitude >= -90
          && item.latitude <= 90
          && item.longitude >= -180
          && item.longitude <= 180)
      })



      this.setState({
        clinicArr: clinicArr
      })
    }

  }
  handleSearch = () => {
    const { params } = this.state
    params.input = this.state.keywords
    params.pageNum = 0
    this.setState({ current: 1 })
    this.getPrescription(params)

  }
  hanldePageNumChange = param => {
    const { params } = this.state
    this.setState({
      current: param.currentPage,
      params: Object.assign(params, { pageNum: param.currentPage - 1 })
    }, () => this.getPrescription(this.state.params))
  }
  handldKey = (key) => {
    this.setState({
      mapKey: key + 1
    })
  }
  handleItem = (item) => {
    this.handldKey(this.state.mapKey)
    item.latitude = +item.latitude
    item.longitude = +item.longitude
    this.setState({
      center: {
        lat: item.latitude,
        lng: item.longitude
      },
      currentSelectClinic: {
        lat: +item.latitude,
        lng: +item.longitude
      }
    })

  }
  handleConfirm = (item) => {
    sessionStorage.setItem('rc-clinics-id2', item.clinicsId)
    sessionStorage.setItem('rc-clinics-name2', item.clinicsName)

    const { history } = this.props
    history.push('/payment/shipping')
  }
  getSonMess (center) {
    this.setState({
      currentSelectClinic: {
        lat: +center.latitude,
        lng: +center.longitude
      }
    })
  }

  render (h) {
    let flags = [];

    flags.push(<AnyReactComponent
      key={this.state.me.id}
      lat={this.state.meLocation.lat}
      lng={this.state.meLocation.lng}
      obj={this.state.me}
      show={false}
    />)
    for (var i = 0; i < this.state.clinicArr.length; i++) {
      flags.push(<AnyReactComponent
        key={this.state.clinicArr[i].clinicsId}
        lat={this.state.clinicArr[i].latitude}
        lng={this.state.clinicArr[i].longitude}
        obj={this.state.clinicArr[i]}
        sonMess={this.getSonMess.bind(this)}
        show={+(this.state.clinicArr[i].longitude) === +(this.state.currentSelectClinic.lng)
          && +(this.state.clinicArr[i].latitude) === +(this.state.currentSelectClinic.lat)}
      />)
    }
    const event = {
      "page": {
        "type": "Checkout",
        "theme": ""
      }
    }

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3" >
          <div
            id="checkout-main"
            style={{ maxWidth: "90%" }}
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="prescription">
            <Progress type="perscription" />

            <div className="clinic-tip"><FormattedMessage id="clinic.clinicTip" /></div>

            <div className="map-saerch">

              <div className="clinic-search-list">
                <div><FormattedMessage id="clinic.selectVetClinics" /></div>
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
                      placeholder="Buscar ubicación"
                      value={this.state.keywords}
                      onChange={this.inputSearchValue} />
                    <label className="rc-input__label" htmlFor="id-submit-2">
                      <span className="rc-input__label-text"></span>
                    </label>
                    <i className="rc-icon rc-location2--xs rc-iconography rc-vertical-align click-btn"
                      aria-label="location" onClick={(e) => this.handleInit(e)}>
                    </i>
                  </span>
                  <input type="hidden" value="null" name="lang" />

                  {/* <span className="rc-select rc-input--inline rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop"
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
                  </span> */}
                  <div className="rc-column" style={{ padding: "0", margin: '1rem 0 2rem' }}>
                    {this.state.currentClinicArr.map(item => (
                      <article className="rc-card rc-card--a clinic-card-boder" style={{ width: '100%', margin: '1rem 0' }}
                        key={item.clinicsId}>
                        <div className="rc-card__body" style={{ padding: "0 0 0 1rem", }}>
                          <div onClick={() => this.handleItem(item)}>
                            <p style={{ margin: '.5rem 0 0 0' }}><FormattedMessage id='clinic.vet' ></FormattedMessage></p>
                            <h3 className="rc-card__title rc-delta click-btn clinic-title" >{item.clinicsName}</h3>
                            <div className="clinic-phone">{item.preferredChannel === 'phone' ? item.phone : item.email} </div>
                            <div className="clinic-address">{item.location} </div>
                          </div>

                          <div style={{ height: '3rem' }}>
                            <button className="rc-btn rc-btn--sm rc-btn--one card-btn" onClick={() => this.handleConfirm(item)}>
                              <FormattedMessage id="clinic.confirm" />
                            </button>
                          </div>

                        </div>
                      </article>))
                    }
                  </div>
                  <div className="grid-footer rc-full-width">
                    <Pagination
                      loading={this.state.loading}
                      totalPage={this.state.totalPage}
                      onPageNumChange={params => this.hanldePageNumChange(params)} />
                  </div>
                </form>

              </div>
              <div className="clinic-map" >
                <GoogleMap center={this.state.center} zoom={this.state.zoom} flags={flags} key={this.state.mapKey}>
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
