import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import Sidebar from 'react-sidebar'
import _ from 'lodash'

import { MainApi } from './api'
import Header from './Header'
import Marker from './Marker'
import SidebarContent from './SidebarContent'

export default class BusView extends Component {
  constructor(props){
    super(props)
    this.aucklandCentre = [
      -36.8630231,174.8654693
    ]
    this.state = {
      centre: this.aucklandCentre
    , zoom: 11
    , buses: []
    , sidebarOpen: true
    , sidebarDocked: true
    , routes: []
    , activeRoutes: {}
    , visibleRoutes: {}
    }
    this.defaultState = {
      centre: this.state.centre
    , zoom: this.state.zoom
    }
  }
  componentWillMount(){
    this._getData()
    this._interval = setInterval(()=>this._updateData(), 30*1000)

    this._mql = window.matchMedia(`(min-width: 800px)`)
    this._mql.addListener(this._mediaQueryChanged)
    this.setState({sidebarDocked: this._mql.matches, sidebarOpen: !!this._mql.matches})
  }
  _parseData(vehicles){
    const buses = vehicles.entity.map(v=>{
      return {
        lat: v.vehicle.position.latitude
      , lng: v.vehicle.position.longitude
      , text: this.state.routes[v.vehicle.trip.route_id].route_short_name
      , color: 'rgba(50, 120, 255, 0.2)'
      , routeId: v.vehicle.trip.route_id
      }
    })
    this.setState({
      buses
    , prevBuses: buses
    })
  }
  async _getData(){
    const mainApi = new MainApi()
    const responses = await Promise.all([mainApi.getVehicles(), mainApi.getRoutes()])
    if (!responses.every(r=>r.ok)){
      return console.error('Failure to get from api')
    }
    const [ vehicles, routes ] = await Promise.all(responses.map(r=>r.json()))
    this.setState({routes})

    this._parseData(vehicles)
  }
  async _updateData(){
    const mainApi = new MainApi()
    const r = await mainApi.getVehicles()
    if (!r.ok || !this.state.routes) {
      return console.error('Error updating data')
    }
    const vehicles = await r.json()

    this._parseData(vehicles)
  }
  _setRouteActive = routeId=>{
    const activeRoutes = {...this.state.activeRoutes}
    activeRoutes[routeId] = true
    this.setState({activeRoutes})
  }
  _setRouteInactive = routeId=>{
    const activeRoutes = {...this.state.activeRoutes}
    activeRoutes[routeId] = false
    this.setState({activeRoutes})
  }

  componentWillUnmount() {
    this._mql.removeListener(this._mediaQueryChanged);
  }
  _mediaQueryChanged = ()=>{
    this.setState({sidebarDocked: this._mql.matches, sidebarOpen: !!this._mql.matches});
  }
  render(){
    const buses = this.state.buses
    const routes = _.uniqBy(buses.map(b=>this.state.routes[b.routeId]), 'route_short_name')
      .filter(r=>r)
      .sort((a,b)=>{
        if (a.route_short_name.length < b.route_short_name.length) {
          return -1
        }
        if (a.route_short_name.length > b.route_short_name.length) {
          return 1
        }
        if (a.route_short_name < b.route_short_name) {
          return -1
        }
        if (a.route_short_name > b.route_short_name) {
          return 1
        }
        // a must be equal to b
        return 0
      })
    //const bus = { lat: -36, lng: 174, text: 550, color: '#5bf' }
    return (
      <Sidebar sidebar={<SidebarContent routes={routes} setRouteActive={this._setRouteActive} setRouteInactive={this._setRouteInactive} />}
        open={this.state.sidebarOpen}
        onSetOpen={sidebarOpen=>this.setState({sidebarOpen})}
        docked={this.state.sidebarDocked}
        transitions={false}
      >
        <Header />
        <div>
          <GoogleMap
            defaultCenter={this.defaultState.centre}
            defaultZoom={this.defaultState.zoom}
            onChange={e=>this.setState({centre: e.center, zoom: e.zoom})}
            center={this.state.centre}
            zoom={this.state.zoom}
            style={{minHeight: '400px'}}
            bootstrapURLKeys={{
              key: 'AIzaSyBkSlPom4tp0ypqQpZela8ct4VIjh2OoN8',
            }}
            options={{}}
          >
            {buses.map((b, i)=>(
              <Marker
                lat={b.lat}
                lng={b.lng}
                route={this.state.routes[b.routeId]}
                bus={b}
                key={i}
                active={!!this.state.activeRoutes[b.routeId]}
                color={b.color}/>
            ))}
          </GoogleMap>
        </div>

      </Sidebar>
    )
  }
}
