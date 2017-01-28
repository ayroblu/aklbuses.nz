import { apiUrl } from './config'
import _ from 'lodash'

class Api {
  constructor(options){
    this.apiUrl = apiUrl
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
  handleUnauthed(res){
    if (res.status === 401) {
      //this.navigateTo('login', {reset: true})
      //db.cleanDb()
      return new Promise(()=>{})
    } else {
      return res
    }
  }
  _buildQueryString(data){
    return '?' + Object.keys(data).map(d=>d+'='+encodeURIComponent(data[d]))
  }
  _handleStatus(response){
    const status = response.status
    const ok = response.ok
    if (status >= 500) {
      console.error('Sorry, server had a problem, status code:', status)
      return new Promise(()=>{})
    }
    const promise = Promise.resolve(response.json())
    if (!ok){
      return promise.then(r=>{
        const message = (r && r.message) || 'No answer from server'
        console.error('Sorry, you made a bad request, status code:', status, message)
      })
    } else {
      return promise
    }
  }
}

export class MainApi extends Api{
  getCategories(){
    return fetch(this.apiUrl + this.prefix + '/categories', {
      headers: this.getJsonHeaders()
    })
  }
  getProducts(){
    const options = {type: 1}
    return fetch(this.apiUrl + this.prefix + '/categories' + this._buildQueryString(options), {
      headers: this.getJsonHeaders()
    })
  }
  getServices(){
    const options = {type: 2}
    return fetch(this.apiUrl + this.prefix + '/categories' + this._buildQueryString(options), {
      headers: this.getJsonHeaders()
    })
  }
  getColors(){
    return fetch(this.apiUrl + this.prefix + '/colors', {
      headers: this.getJsonHeaders()
    })
  }
  getCountries(){
    return fetch(this.apiUrl + this.prefix + '/countries', {
      headers: this.getJsonHeaders()
    })
  }
}

export class ItemsApi extends Api{
  constructor(options){
    super(options)
    this.prefix += '/items'
  }
  getItems(){
    return fetch(this.apiUrl + this.prefix, {
      headers: this.getJsonHeaders()
    })
  }
  getItem(itemId){
    return fetch(this.apiUrl + this.prefix + '/' + itemId, {
      headers: this.getJsonHeaders()
    })
  }
}
export class AlbumsApi extends Api{
  constructor(options){
    super(options)
    this.prefix += '/items'
  }
  getAlbums(){
    return fetch(this.apiUrl + this.prefix, {
      headers: this.getJsonHeaders()
    })
  }
  getAlbum(albumId){
    return fetch(this.apiUrl + this.prefix + '/' + albumId, {
      headers: this.getJsonHeaders()
    })
  }
}
export class VendorsApi extends Api{
  constructor(options){
    super(options)
    this.prefix += '/vendors'
  }
  getVendors(){
    return fetch(this.apiUrl + this.prefix, {
      headers: this.getJsonHeaders()
    })
  }
  getVendor(vendorId){
    return fetch(this.apiUrl + this.prefix + '/' + vendorId, {
      headers: this.getJsonHeaders()
    })
  }
}
