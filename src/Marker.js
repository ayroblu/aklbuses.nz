import React, { Component } from 'react'

import './Marker.css'

function cn(){
  return Array.from(arguments).filter(a=>a).join(' ')
}
export default class Marker extends Component{
  static propTypes = {
    route: React.PropTypes.object
  , active: React.PropTypes.bool
  }
  render(){
    let { route } = this.props
    if (!route) {
      route = {
        agency_id: 'Unknown Agency'
      , route_short_name: 'Route Name'
      , route_long_name: 'Route Long Name'
      }
    }
    return (
      <div className='Marker' style={Object.assign({}, (this.props.$hover || this.props.active) ? {background: '#5bf', zIndex: 1} : {})}>
        <div className={cn('Popup',this.props.active ? ' active' : '', this.props.$focus ? 'focused' : '')} style={Object.assign({}, (this.props.$hover || this.props.active) ? {opacity: 1} : {})}>
          <p>{this.props.route.agency_id + ' - ' + this.props.route.route_short_name}</p>
          <p>{this.props.route.route_long_name}</p>
        </div>
        {this.props.route.route_short_name}
      </div>
    )
  }
}

