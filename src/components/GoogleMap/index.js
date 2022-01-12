import React from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { injectIntl } from 'react-intl-phraseapp';
import findIndex from 'lodash/findIndex';

@injectIntl
class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // key:'AIzaSyAon2T3c9-PS9lXxkAztfBZP5BWygtBTWE',
      key: 'AIzaSyBLH2Eqd_rGKwq6jvPMMw4mkokSr4kATqc' //线上key
      //key: 'AIzaSyDEeI1tcGjL2CddJsenJxeUR0P5uxkentM' //测试key
    };
    this.mapRef = React.createRef();
  }
  static defaultProps = {
    center: '',
    zoom: '',
    clinicArr: [],
    currentSelectClinic: {}
  };

  handleApiLoaded = (map, maps) => {
    var _this = this;
    // use map and maps objects
    let locations = this.props.clinicArr
      .filter((e) => e.latitude && e.longitude)
      .map((item) => {
        return {
          id: item.id,
          lat: +item.latitude,
          lng: +item.longitude,
          prescriberName: item.prescriberName || '',
          location: item.location || '',
          phoneOrEmail:
            item.preferredChannel == 'phone' ? item.phone : item.email,
          clinicVet: this.props.intl.messages['clinic.vet'],
          type: item.type != 'customer' ? 'confirm' : 'navigate',
          btnValue:
            item.type != 'customer'
              ? this.props.intl.messages['clinic.confirm']
              : this.props.intl.messages['clinic.navigate']
        };
      });

    var obj = {};

    obj.pics = null;
    obj.map = null;
    obj.markerClusterer = null;
    obj.markers = [];
    obj.infoWindow = null;

    obj.map = map;
    obj.pics = locations;

    obj.infoWindow = new maps.InfoWindow();

    obj.showMarkers = function () {
      obj.markers = [];

      if (obj.markerClusterer) {
        obj.markerClusterer.clearMarkers();
      }

      for (var i = 0; i < locations.length; i++) {
        var latLng = new maps.LatLng(obj.pics[i].lat, obj.pics[i].lng);

        //点位图标图片大小
        var imageUrl =
          'http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=' +
          'FFFFFF,FF0000,000000&ext=.png';
        var markerImage = new maps.MarkerImage(imageUrl, new maps.Size(24, 32));

        var marker = new maps.Marker({
          position: latLng,
          icon: markerImage
        });

        obj.markerClickFunction = function (pic, latlng) {
          return function (e) {
            if (e) {
              e.cancelBubble = true;
              e.returnValue = false;
              if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
              }
            }

            //infoHtml里面不易监听事件，所有用a标签href跳转传值去另外页面执行事件
            var infoHtml = `
            <div style="display: block; z-index: 1;">
              <div class="rc-tooltip rc-text--left rc-padding--xs" id="map-tooltip" style="display: block;">
              <div class="rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop" style="margin-bottom: 0px;  ">
                <p id='clinicVet'>${pic.clinicVet}</p>
                <h4 class="rc-card__title rc-delta click-btn map-flag-title">${
                  pic.prescriberName
                }</h4>
                <div class="map-flag-address">${pic.location}</div>
                <div class="map-flag-phone">${pic.phoneOrEmail || ''}</div>
                <div class="rc-button-link-group rc-padding-right--md--desktop" style="margin-top: 1rem;">
                <a class="rc-btn rc-btn--one rc-btn--sm" href="${window.__.env.REACT_APP_HOMEPAGE.replace(
                  /\/$/gi,
                  ''
                )}/makerHandle?type=${pic.type}&id=${pic.id}&prescriberName=${
              pic.prescriberName
            }&lat=${pic.lat}&lng=${pic.lng}">${pic.btnValue}</a></div>
                </div>
              </div>
            </div>
            `;

            obj.infoWindow.setContent(infoHtml); //小窗口内容
            obj.infoWindow.setPosition(latlng); //小窗口位置
            obj.infoWindow.setOptions({ maxWidth: 260 }); //小窗口宽度
            obj.infoWindow.open(obj.map); //打开小窗口
          };
        };

        var fn = obj.markerClickFunction(obj.pics[i], latLng);
        maps.event.addListener(marker, 'click', fn);

        obj.markers.push(marker);
      }
    };

    obj.showMarkers();

    obj.markerClusterer = new MarkerClusterer(obj.map, obj.markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    let clinicArrIndex = findIndex(
      _this.props.clinicArr.filter((e) => e.latitude && e.longitude),
      (ele) => ele.id == _this.props.currentSelectClinic.id
    );
    if (clinicArrIndex != -1) {
      //点击左侧list诊所，右边地图弹出诊所小窗口
      obj.markerClickFunction(
        obj.pics[clinicArrIndex],
        new maps.LatLng(
          obj.pics[clinicArrIndex].lat,
          obj.pics[clinicArrIndex].lng
        )
      )();
    }
  };

  render(h) {
    const { center, zoom } = this.props;
    return (
      <>
        <GoogleMapReact
          ref={this.mapRef}
          bootstrapURLKeys={{ key: this.state.key }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          {/* {this.props.flags} */}
        </GoogleMapReact>
      </>
    );
  }
}
export default GoogleMap;
