import React, { Component } from 'react'
import './SidebarContent.css'

export default class SidebarContent extends Component {
  static propTypes = {
    routes: React.PropTypes.array.isRequired
  , setRouteActive: React.PropTypes.func
  , setRouteInactive: React.PropTypes.func
  }
  render(){
    return (
      <div className="SidebarContent">
        <div className="Title">List of Routes</div>
        {this.props.routes.map((r, i)=>(
          <div key={i} className="RouteItem" onMouseOver={()=>this.props.setRouteActive(r.route_id)} onMouseOut={()=>this.props.setRouteInactive(r.route_id)}>{r.route_short_name}</div>)
        )}
      </div>
    )
  }
}

