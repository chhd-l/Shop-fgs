import React from 'react';
import {
  YMaps,
  Map,
  Placemark,
  Clusterer,
  ObjectManager
} from 'react-yandex-maps';
import { getAllPrescription } from '@/api/clinic';
import points from './location';
import { injectIntl } from 'react-intl-phraseapp';

@injectIntl
class YandexMap extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    center: '',
    zoom: '',
    clinicArr: []
  };

  render() {
    const { clinicArr, center, zoom } = this.props;
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
              zoom,
              controls: ['zoomControl', 'fullscreenControl']
            }}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
          >
            <ObjectManager
              options={{
                clusterize: true,
                gridSize: 32
              }}
              objects={{
                openBalloonOnClick: true,
                preset: 'islands#greenDotIcon'
              }}
              clusters={{
                preset: 'islands#redClusterIcons'
              }}
              defaultFeatures={clinicArr}
              modules={[
                'objectManager.addon.objectsBalloon',
                'objectManager.addon.objectsHint'
              ]}
            />
          </Map>
        </YMaps>
      </>
    );
  }
}

export default YandexMap;
