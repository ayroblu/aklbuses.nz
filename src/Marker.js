import React, { Component } from 'react'

import './Marker.css'

export default class Marker extends Component{
  static propTypes = {
    route: React.PropTypes.object.isRequired
  , active: React.PropTypes.bool
  }
  render(){
    return (
      <div className='Marker' style={Object.assign({}, (this.props.$hover || this.props.active) ? {background: '#5bf', zIndex: 1} : {})}>
        {(this.props.$hover || this.props.active)
        ? <div className='Popup'>
            <p>{this.props.route.agency_id + ' - ' + this.props.route.route_short_name}</p>
            <p>{this.props.route.route_long_name}</p>
          </div>
        : null}
        {this.props.route.route_short_name}
      </div>
    )
  }
}

