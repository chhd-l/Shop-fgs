import React from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@googlemaps/markerclustererplus';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // key:'AIzaSyAon2T3c9-PS9lXxkAztfBZP5BWygtBTWE',
      //key: 'AIzaSyBLH2Eqd_rGKwq6jvPMMw4mkokSr4kATqc',//线上key
      key: 'AIzaSyDEeI1tcGjL2CddJsenJxeUR0P5uxkentM' //测试key
    };
    this.mapRef = React.createRef();
  }
  static defaultProps = {
    center: '',
    zoom: '',
    clinicArr: ''
  };
  handleApiLoaded = (map, maps) => {
    // use map and maps objects
    let locations = this.props.clinicArr
      .filter((e) => e.latitude && e.longitude)
      .map((item) => {
        return {
          lat: +item.latitude,
          lng: +item.longitude
        };
      });

    const markers = locations.map((location, i) => {
      return new maps.Marker({
        position: location,
        label: ''
      });
    });

    new MarkerClusterer(map, markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
  };

  render(h) {
    const { center, zoom } = this.props;
    return (
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
    );
  }
}
export default GoogleMap;
