const { AtApi } = require('../utils/api')
const _ = require('lodash')

let store = {}

function run(){
  setInterval(getLocations, 30000) // every 30 seconds
  //setInterval(getRoutes, 86400000) // daily: 1000 * 60 * 60 * 24
  getLocations()
  console.log('Run at poller')
}
function getLocations(){
  const atApi = new AtApi()
  return atApi.getVehicleLocations().then(locations=>{
    store.locations = locations.response
    if (!store.routes || locations.response.entity.find(e=>!store.routes[e.vehicle.trip.route_id])){
      console.log('no routes')
      return getRoutes().then(()=>{
        return locations
      })
    }
    return locations
  }).then(locations=>{
    const loc = locations.response.entity.map(e=>({
      routeId: e.vehicle.trip.route_id
    , lat: e.vehicle.position.latitude
    , lng: e.vehicle.position.longitude
    , text: store.routes[e.vehicle.trip.route_id] ? store.routes[e.vehicle.trip.route_id].route_short_name : 'No route information'
    , route: _.pick(store.routes[e.vehicle.trip.route_id], ['route_short_name', 'route_long_name', 'agency_id', 'route_type'])
    }))
    console.log('New locations:', loc.length)
    store.locations = loc
  }).catch(err=>{
    console.error('Error getting locations', err)
  })
}
function getRoutes(){
  const atApi = new AtApi()
  return atApi.getRoutes().then(routes=>{
    const newRoutes = routes.response.reduce((a,n)=>{
      a[n.route_id] = n
      return a
    }, {})
    if (!store.routes){
      store.routes = {}
    }
    Object.assign(store.routes, newRoutes)
    console.log('New routes:', routes.response.length)
  })
}

module.exports = st=>{
  store = st
  return run
}
