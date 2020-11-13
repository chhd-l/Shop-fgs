import React from 'react'
import GoogleMapReact from 'google-map-react'

class GoogleMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // key:'AIzaSyAon2T3c9-PS9lXxkAztfBZP5BWygtBTWE',
      key:'AIzaSyBLH2Eqd_rGKwq6jvPMMw4mkokSr4kATqc',
      center:this.props.center,
      zoom:this.props.zoom
    }
    this.mapRef = React.createRef();
  }
  
  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({
      center: nextProps.center,
      zoom: nextProps.zoom
    },()=>{
      console.log(1111)
      console.log(this.state.center)
      console.log(this.state.zoom)
      console.log(1111)
    })
  }
  render(h) {
    const { center ,zoom } = this.state
    return (
      <GoogleMapReact
        ref={this.mapRef}
        bootstrapURLKeys={{ key: this.state.key }}
        defaultCenter={center}
        defaultZoom={zoom}>
        {this.props.flags}
      </GoogleMapReact>
    )
  }
}
export default GoogleMap
