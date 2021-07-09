import React from 'react';
import GoogleMapReact from 'google-map-react';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // key:'AIzaSyAon2T3c9-PS9lXxkAztfBZP5BWygtBTWE',
      //key: 'AIzaSyBLH2Eqd_rGKwq6jvPMMw4mkokSr4kATqc',//真实的
      key: 'AIzaSyDEeI1tcGjL2CddJsenJxeUR0P5uxkentM', //qhx申请的
      center: this.props.center,
      zoom: this.props.zoom
    };
    this.mapRef = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(
      {
        center: nextProps.center,
        zoom: nextProps.zoom
      },
      () => {
        console.log('center', this.state.center);
        console.log('zoom', this.state.zoom);
      }
    );
  }

  render(h) {
    const { center, zoom } = this.state;
    return (
      <GoogleMapReact
        ref={this.mapRef}
        bootstrapURLKeys={{ key: this.state.key }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {this.props.flags}
      </GoogleMapReact>
    );
  }
}
export default GoogleMap;
