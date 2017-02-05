export default function getCurrentLocation(){
  return new Promise((y, n)=>{
    if (!("geolocation" in window.navigator)) {
      return y(null)
    }
    window.navigator.geolocation.getCurrentPosition(({coords})=>y(coords))
  })
}
