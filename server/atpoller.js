const { AtApi } = require('../utils/api')

let store = {}

function run(){
  setInterval(getLocations, 30000) // every 30 seconds
  setInterval(getRoutes, 86400000) // daily: 1000 * 60 * 60 * 24
  getRoutes()
  getLocations()
  console.log('Run at poller')
}
function getLocations(){
  const atApi = new AtApi()
  return atApi.getVehicleLocations().then(locations=>{
    store.locations = locations.response
    console.log('New locations:', locations.response.entity.length)
  }).catch(err=>{
    console.error('Error getting routes', err)
  })
}
function getRoutes(){
  const atApi = new AtApi()
  return atApi.getRoutes().then(routes=>{
    store.routes = routes.response.reduce((a,n)=>{
      a[n.route_id] = n
      return a
    }, {})
    console.log('New routes:', routes.response.length)
  }).catch(err=>{
    console.error('Error getting routes', err)
  })
}

module.exports = st=>{
  store = st
  return run
}
