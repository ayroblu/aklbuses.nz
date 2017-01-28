function getVehicleLocations(){
  var url = 'https://api.at.govt.nz/v1/public/realtime/vehiclelocations?api_key=34893bb6-1d38-4403-923b-f3892de693e4'
  getUrl(url, saveVehicleLocations)
}
function getRoutes(){
  var url = 'https://api.at.govt.nz/v1/gtfs/routes?api_key=34893bb6-1d38-4403-923b-f3892de693e4'
  getUrl(url, updateRoutes)
}
const apiUrl = 'https://api.at.govt.nz'
const api_key = '34893bb6-1d38-4403-923b-f3892de693e4'

class Api {
  constructor(options){
    this.apiUrl = apiUrl
    this.api_key = api_key
    this.prefix = ''
    if (!options){
      return
    }
    const {token} = options
    this.token = token
  }
  getJsonHeaders(){
    return {
      'Accept': 'application/json'
    }
  }
  postJsonHeaders(){
    return {
      'Accept': 'application/json'
    , 'Content-Type': 'application/json'
    }
  }
  setToken(token){
    this.token = token
  }
  _buildQueryString(data){
    return '?' + Object.keys(data).map(d=>d+'='+encodeURIComponent(data[d]))
  }
  _fetchData(url){
    return fetch(url, {
      headers: this._getJsonHeaders()
    }).then(resp=>{
      if (resp.ok){
        return resp.json()
      }
      console.log('Status:', resp.status)
      resp.text().then(text=>console.error('Api error', text))
      return new Promise(()=>{})
    })
  }
}

class AtApi extends Api {
  constructor(options){
    super(options)
    this.prefix = '/v1'
  }
  getVehicleLocations(){
    const url = this.apiUrl + this.prefix + '/public/realtime/vehicleLocations' + this._buildQueryString({api_key})
    return this._fetchData(url)
  }
  getRoutes(){
    const url = this.apiUrl + this.prefix + '/gtfs/routes' + this._buildQueryString({api_key})
    return this._fetchData(url)
  }
}

module.exports = {
  AtApi
}
