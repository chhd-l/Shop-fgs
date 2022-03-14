import React from 'react';
import { inject, observer } from 'mobx-react';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import MapFlag from '@/components/MapFlag';
import GoogleMap from '@/components/GoogleMap';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getPrescription, getAllPrescription } from '@/api/clinic';
import meImg from '@/assets/images/map-default-marker.png';
import initLocation from './location';
import LazyLoad from 'react-lazyload';
import '../Prescription/index.css';
import PageBaseInfo from '@/components/PageBaseInfo';

const AnyReactComponent = ({ obj, show, sonMess, props }) => {
  if (obj.type !== 'customer') {
    return (
      <MapFlag
        obj={obj}
        show={show}
        sonMess={sonMess}
        props={props}
        mode="navigate"
      />
    );
  } else {
    return (
      <div>
        <LazyLoad>
          <img
            alt="map default marker"
            src={meImg}
            draggable="false"
            className="map-default-marker"
          />
        </LazyLoad>
      </div>
    );
  }
};

@inject('clinicStore', 'checkoutStore')
@observer
class Prescription extends React.Component {
  constructor(props) {
    const lang = window.__.env.REACT_APP_COUNTRY || 'mx';
    const initLocationData = initLocation[lang] || initLocation['mx'];
    const lat = initLocationData.lat;
    const lng = initLocationData.lng;
    super(props);
    this.state = {
      type: 'perscription',
      keywords: '',
      selectedSort: 1,
      current: 1,
      total: 0, // 总数
      totalPage: 1,
      center: {
        lat,
        lng
      },
      zoom: 12,
      mapKey: 0,
      me: {
        id: 1001,
        title: 'me',
        type: 'customer'
      },
      meLocation: {
        lat,
        lng
      },
      clinicArr: [],
      currentClinicArr: [],
      params: {
        distance: 1000000,
        enabled: true,
        input: '',
        pageNum: 0,
        pageSize: 3,
        latitude: lat,
        longitude: lng,
        storeId: window.__.env.REACT_APP_STOREID
      },
      currentSelectClinic: {
        lat: 0,
        lng: 0
      },
      loading: true
    };
  }
  componentDidMount() {
    this.handleInit();

    this.getAllPrescription();
  }
  componentWillUnmount() {}
  inputSearchValue = (e) => {
    this.setState({
      keywords: e.target.value
    });
  };

  handleInit = (e) => {
    const { params } = this.state;
    //获取当前地理位置信息
    navigator.geolocation.getCurrentPosition((position) => {
      this.handldKey(this.state.mapKey);
      params.latitude = position.coords.latitude.toString();
      params.longitude = position.coords.longitude.toString();

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
        params: params
      });
    });
    setTimeout(() => {
      this.getPrescription(params);
    }, 1000);
  };

  async getPrescription(params) {
    this.setState({ loading: true });
    const res = await getPrescription(params);
    let totalPage = Math.ceil(res.context.total / this.state.params.pageSize);
    this.setState({
      currentClinicArr: res.context.content,
      totalPage: totalPage,
      loading: false
    });
  }
  async getAllPrescription() {
    let params = {
      storeId: window.__.env.REACT_APP_STOREID
    };
    const res = await getAllPrescription(params);
    let clinicArr = res.context.prescriberVo;
    //过滤掉经纬度非数字值
    clinicArr = clinicArr.filter((item) => {
      return !(isNaN(item.latitude) || isNaN(item.longitude));
    });

    //过滤掉 经度-180-180 ，纬度 -90-90
    clinicArr = clinicArr.filter((item) => {
      return (
        +item.latitude >= -90 &&
        +item.latitude <= 90 &&
        +item.longitude >= -180 &&
        +item.longitude <= 180
      );
    });

    this.setState({
      clinicArr
    });
  }
  handleSearch = () => {
    const { params } = this.state;
    params.input = this.state.keywords;
    params.pageNum = 0;
    this.setState({ current: 1 });
    this.getPrescription(params);
  };
  hanldePageNumChange = (param) => {
    const { params } = this.state;
    this.setState(
      {
        current: param.currentPage,
        params: Object.assign(params, { pageNum: param.currentPage - 1 })
      },
      () => this.getPrescription(this.state.params)
    );
  };
  handldKey = (key) => {
    this.setState({
      mapKey: key + 1
    });
  };
  handleItem = (item) => {
    this.handldKey(this.state.mapKey);
    item.latitude = +item.latitude;
    item.longitude = +item.longitude;
    this.setState({
      center: {
        lat: item.latitude,
        lng: item.longitude
      },
      currentSelectClinic: {
        lat: +item.latitude,
        lng: +item.longitude
      }
    });
  };
  getSonMess(center) {
    this.setState({
      currentSelectClinic: {
        lat: +center.latitude,
        lng: +center.longitude
      }
    });
  }

  render(h) {
    let flags = [];

    flags.push(
      <AnyReactComponent
        key={this.state.me.id}
        lat={+this.state.meLocation.lat}
        lng={+this.state.meLocation.lng}
        obj={this.state.me}
        show={false}
      />
    );
    for (var i = 0; i < this.state.clinicArr.length; i++) {
      flags.push(
        <AnyReactComponent
          props={this.props}
          key={this.state.clinicArr[i].id}
          lat={+this.state.clinicArr[i].latitude}
          lng={+this.state.clinicArr[i].longitude}
          obj={this.state.clinicArr[i]}
          sonMess={this.getSonMess.bind(this)}
          show={
            +this.state.clinicArr[i].longitude ===
              +this.state.currentSelectClinic.lng &&
            +this.state.clinicArr[i].latitude ===
              +this.state.currentSelectClinic.lat
          }
        />
      );
    }
    const event = {
      page: {
        type: 'Checkout',
        theme: ''
      }
    };

    return (
      <div>
        <PageBaseInfo additionalEvents={event} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div
            id="checkout-main"
            style={{ maxWidth: '90%' }}
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="prescription"
          >
            {/* <Progress type="perscription" /> */}

            <div className="clinic-tip mt-6">
              <FormattedMessage id="clinic.clinicTip" />
            </div>

            <div className="map-saerch">
              <div className="clinic-search-list">
                <div>
                  <FormattedMessage id="clinic.selectVetClinics" />
                </div>
                <form
                  className={[
                    'inlineblock',
                    'headerSearch',
                    'headerSearchDesktop',
                    'pres-search',
                    'relative'
                  ].join(' ')}
                  role="search"
                  name="simpleSearch"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span
                    className="rc-input rc-input--full-width"
                    input-setup="true"
                  >
                    <button
                      className="rc-input__submit rc-input__submit--search"
                      type="submit"
                      onClick={this.handleSearch}
                    >
                      <span className="rc-screen-reader-text">Submit</span>
                    </button>
                    <FormattedMessage id="searchPrescriber">
                      {(txt) => (
                        <input
                          className="search-field"
                          type="search"
                          autoComplete="off"
                          aria-label="Search location"
                          placeholder={txt}
                          value={this.state.keywords}
                          onChange={this.inputSearchValue}
                        />
                      )}
                    </FormattedMessage>
                    <label className="rc-input__label" htmlFor="id-submit-2">
                      <span className="rc-input__label-text" />
                    </label>
                    <em
                      className="rc-icon rc-location2--xs rc-iconography rc-vertical-align click-btn"
                      aria-label="location"
                      onClick={(e) => this.handleInit(e)}
                    />
                  </span>

                  {/* <span className="rc-select rc-input--inline rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop w-full max-w-full pt-4 px-0 pb-0">
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
                  <div
                    className="rc-column"
                    style={{ padding: '0', margin: '1rem 0 2rem' }}
                  >
                    {this.state.currentClinicArr.map((item) => (
                      <article
                        className="rc-card rc-card--a clinic-card-boder w-full my-4 mx-0"
                        key={item.id}
                      >
                        <div className="rc-card__body py-0 pr-0 pl-4">
                          <div onClick={() => this.handleItem(item)}>
                            {/* clinic vet */}
                            <p style={{ margin: '.5rem 0 0 0' }}>
                              <FormattedMessage id="clinic.vet" />
                            </p>

                            {/* prescriberName  Name of the clinic*/}
                            <h3 className="rc-card__title rc-delta click-btn clinic-title">
                              {item.prescriberName}
                            </h3>
                            {/* <div className="clinic-phone">
                              {item.preferredChannel === 'phone'
                                ? item.phone
                                : item.email}{' '}
                            </div> */}
                            <div className="clinic-phone">
                              {item.phone ? item.phone : null}
                            </div>
                            {/* primaryCity */}
                            <div>
                              {item.primaryCity ? item.primaryCity : null}
                            </div>
                            {/* zip code */}
                            <div className="zip-code">
                              {item.primaryZip ? item.primaryZip : null}
                            </div>
                            {/* Street name */}
                            <div
                              className="clinic-address ui-text-overflow-line2 text-break mr-3 mb-2"
                              title={item.location}
                            >
                              {item.location}{' '}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="grid-footer rc-full-width">
                    <Pagination
                      loading={this.state.loading}
                      totalPage={this.state.totalPage}
                      defaultCurrentPage={this.state.current}
                      key={this.state.current}
                      onPageNumChange={this.hanldePageNumChange}
                    />
                  </div>
                </form>
              </div>
              <div className="clinic-map">
                <GoogleMap
                  center={this.state.center}
                  zoom={this.state.zoom}
                  flags={flags}
                  key={this.state.mapKey}
                />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
export default Prescription;
