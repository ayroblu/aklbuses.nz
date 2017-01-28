import React, { Component } from 'react'

import 'Marker.css'

export default class Marker extends Component{
  static propTypes = {
    color: React.PropTypes.string.isRequired
  , text: React.PropTypes.string.isRequired
  }
  render(){
    return (
      <div className='Marker' style={{background: this.props.color}}>
        {this.props.text}
      </div>
    )
  }
}

