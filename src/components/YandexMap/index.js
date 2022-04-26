import React from 'react';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';
import { getAllPrescription } from '@/api/clinic';
import points from './location';
import { injectIntl } from 'react-intl-phraseapp';

@injectIntl
class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicArr: [],
      center: [55.45, 37.35]
    };
  }

  static defaultProps = {
    center: '',
    zoom: '',
    clinicArr: [],
    currentSelectClinic: {}
  };

  getAllPrescription = async () => {
    let clinicArr = this.props.clinicArr;
    //过滤掉经纬度非数字值
    clinicArr = clinicArr.filter((item) => {
      return (
        item.latitude &&
        item.longitude &&
        !(isNaN(item.latitude) || isNaN(item.longitude))
      );
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
  };

  render() {
    const { center, zoom } = this.props;
    console.log(center, zoom);
    return (
      <>
        <YMaps
          query={{
            lang: 'en_RU',
            apikey: 'd1662288-48f4-421a-9033-64db4551d53c'
          }}
        >
          <Map
            width="100%"
            height="50rem"
            defaultState={{
              center: [center.lat, center.lng],
              zoom: this.props.zoom,
              controls: ['zoomControl', 'fullscreenControl']
            }}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
            onLoad={() => this.getAllPrescription()}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedRedClusterIcons',
                groupByCoordinates: false
              }}
            >
              {this.state.clinicArr.map((item, index) => (
                <Placemark
                  modules={['geoObject.addon.balloon']}
                  key={index}
                  geometry={[item.latitude, item.longitude]}
                  properties={{
                    balloonContentBody: `
            <div style='display: block; z-index: 1;'>
                 <div class='rc-tooltip rc-text--left rc-padding--xs' id='map-tooltip' style='display: block;'>
                 <div class='rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop' style='margin-bottom: 0px;  '>
                   <p id='clinicVet'>${
                     this.props.intl.messages['clinic.vet']
                   }</p>
                   <h4 class='rc-card__title rc-delta click-btn map-flag-title'>${
                     item.prescriberName
                   }</h4>
                   <div class='map-flag-address'>${item.location}</div>
                   <div class='map-flag-phone'>${
                     item.preferredChannel === 'phone' ? item.phone : item.email
                   }</div>
                   <div class='rc-button-link-group rc-padding-right--md--desktop' style='margin-top: 1rem;'>
                   <a class='rc-btn rc-btn--one rc-btn--sm' href='${window.__.env.REACT_APP_HOMEPAGE.replace(
                     /\/$/gi,
                     ''
                   )}/makerHandle?type=${
                      item.type !== 'customer' ? 'confirm' : 'navigate'
                    }&id=${item.id}&prescriberName=${item.prescriberName}&lat=${
                      item.latitude
                    }&lng=${item.longitude}'>${
                      item.type !== 'customer'
                        ? this.props.intl.messages['clinic.confirm']
                        : this.props.intl.messages['clinic.navigate']
                    }</a></div>
                   </div>
                 </div>
               </div>
               `
                  }}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
      </>
    );
  }
}

export default YandexMap;
