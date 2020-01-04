import { MainApi } from "../api";

export default {
  _parseData(vehicles) {
    //const buses = vehicles.entity.map(v=>{
    //  return {
    //    lat: v.vehicle.position.latitude
    //  , lng: v.vehicle.position.longitude
    //  , text: routes[v.vehicle.trip.route_id] ? routes[v.vehicle.trip.route_id].route_short_name : 'No route information'
    //  , routeId: v.vehicle.trip.route_id
    //  }
    //})
    return vehicles;
  },
  async getData() {
    const mainApi = new MainApi();
    const response = await mainApi.getVehicles();
    if (!response.ok) {
      return console.error("Failure to get from api");
    }
    const vehicles = await response.json();

    return { buses: this._parseData(vehicles) };
  },
  async updateData() {
    const mainApi = new MainApi();
    const r = await mainApi.getVehicles();
    if (!r.ok) {
      return console.error("Error updating data");
    }
    const vehicles = await r.json();

    return { buses: this._parseData(vehicles) };
  },
};
