const fetch = require("node-fetch");

const apiUrl = "https://api.at.govt.nz";
const api_key = "34893bb6-1d38-4403-923b-f3892de693e4";
const apiKey = "5d264a1a67674cc9b17c450c96316da4";

class Api {
  constructor(options) {
    this.apiUrl = apiUrl;
    this.api_key = api_key;
    this.prefix = "";
    this.headers = {
      "Ocp-Apim-Subscription-Key": apiKey,
    };
    if (!options) {
      return;
    }
    const { token } = options;
    this.token = token;
  }
  _getJsonHeaders() {
    return {
      Accept: "application/json",
    };
  }
  _postJsonHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
  setToken(token) {
    this.token = token;
  }
  _buildQueryString(data) {
    return (
      "?" + Object.keys(data).map((d) => d + "=" + encodeURIComponent(data[d]))
    );
  }
  _fetchData(url) {
    return fetch(url, {
      headers: {
        ...this._getJsonHeaders(),
        ...this.headers,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      console.log("Status:", resp.status);
      resp.text().then((text) => console.error("Api error", text));
      return new Promise(() => {});
    });
  }
}

class AtApi extends Api {
  constructor(options) {
    super(options);
    this.prefix = "/v2";
  }
  getVehicleLocations() {
    const url = this.apiUrl + this.prefix + "/public/realtime/vehiclelocations";
    console.log(url);
    return this._fetchData(url);
  }
  getRoutes() {
    const url = this.apiUrl + this.prefix + "/gtfs/routes";
    console.log(url);
    return this._fetchData(url);
  }
}

module.exports = {
  AtApi,
};
