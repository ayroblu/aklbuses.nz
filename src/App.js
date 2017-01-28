import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

import Marker from './Marker'

class BusView extends Component {
  constructor(props){
    super(props)
    this.aucklandCentre = [
      -36.8630231,174.8654693
    ]
    this.state = {
      centre: this.aucklandCentre
    , zoom: 6
    , buses: []
    }
  }
  componentWillMount(){
  }
  render(){
    const buses = this.state.buses
    const bus = { lat: -36, lng: 174, text: 550, color: '#5bf' }
    return (
      <div>
        <GoogleMap
          defaultCenter={this.aucklandCentre}
          defaultZoom={6}
          onChange={e=>this.state.setState({centre: e.center, zoom: e.zoom})}
          center={this.state.centre}
          zoom={this.state.zoom}
          style={{minHeight: '400px'}}
          bootstrapURLKeys={{
            key: 'AIzaSyBkSlPom4tp0ypqQpZela8ct4VIjh2OoN8',
          }}
          options={{}}
        >
          {buses.map((b, i)=><Marker lat={b.lat} lng={b.lng} text={i} key={i} color={b.color}/>)}
        </GoogleMap>

      </div>
    )
  }
}
