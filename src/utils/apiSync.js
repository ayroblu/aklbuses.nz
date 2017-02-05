import { MainApi } from '../api'

export default {
  _parseData(vehicles, routes){
    const buses = vehicles.entity.map(v=>{
      return {
        lat: v.vehicle.position.latitude
      , lng: v.vehicle.position.longitude
      , text: routes[v.vehicle.trip.route_id].route_short_name
      , routeId: v.vehicle.trip.route_id
      }
    })
    return buses
  },
  async getData(){
    const mainApi = new MainApi()
    const responses = await Promise.all([mainApi.getVehicles(), mainApi.getRoutes()])
    if (!responses.every(r=>r.ok)){
      return console.error('Failure to get from api')
    }
    const [ vehicles, routes ] = await Promise.all(responses.map(r=>r.json()))

    return {buses: this._parseData(vehicles, routes), routes}
  },
  async updateData(routes){
    const mainApi = new MainApi()
    const r = await mainApi.getVehicles()
    if (!r.ok || !routes) {
      return console.error('Error updating data')
    }
    const vehicles = await r.json()

    return {buses: this._parseData(vehicles, routes)}
  },
}

