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

  componentDidMount() {
    this.getAllPrescription();
  }

  async getAllPrescription() {
    let params = {
      storeId: window.__.env.REACT_APP_STOREID
    };
    const res = await getAllPrescription(params);

    let clinicArr = res.context.prescriberVo;
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
  }

  click = () => {
    this.setState(
      {
        center: [55.751574, 37.573856],
        clinicArr: []
      },
      () => {
        this.getAllPrescription();
      }
    );
  };

  render() {
    return (
      <>
        <YMaps
          query={{
            lang: 'en_RU',
            apikey: 'd1662288-48f4-421a-9033-64db4551d53c'
          }}
        >
          <Map
            width="70%"
            height="50rem"
            defaultState={{
              center: this.state.center,
              zoom: 12,
              controls: ['zoomControl', 'fullscreenControl']
            }}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedRedClusterIcons',
                groupByCoordinates: false
              }}
            >
              {points.map((item, index) => (
                <Placemark
                  modules={['geoObject.addon.balloon']}
                  key={index}
                  geometry={item}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
        <button onClick={this.click}>点击</button>
      </>
    );
  }
}

export default YandexMap;
