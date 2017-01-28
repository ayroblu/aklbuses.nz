const { AtApi } = require('../utils/api')

const store = {}

function run(update){
  setInterval(getLocations, 30000) // every 30 seconds
  setInterval(getRoutes, 86400000) // daily: 1000 * 60 * 60 * 24
  getRoutes()
}
function getLocations(){
  const atApi = new AtApi()
  return atApi.getVehicleLocations().then(locations=>{
    store.locations = locations
  }).catch(err=>{
    console.error('Error getting routes', err)
  })
}
function getRoutes(){
  const atApi = new AtApi()
  return atApi.getRoutes().then(routes=>{
  }).catch(err=>{
    console.error('Error getting routes', err)
  })
}

module.exports = st=>{
  Object.assign(store, st)
  return run
}
