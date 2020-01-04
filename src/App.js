import React, { Component } from "react";
import GoogleMap from "google-map-react";
import Sidebar from "react-sidebar";
import _ from "lodash";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./Header";
import Marker from "./Marker";
import UserMarker from "./UserMarker";
import SidebarContent from "./SidebarContent";

import apiSync from "./utils/apiSync";
import getCurrentLocation from "./utils/currentLocation";

const aucklandCentre = [-36.8630231, 174.8654693];

export default class BusView extends Component {
  state = {
    centre: aucklandCentre,
    zoom: 11,
    buses: [],
    sidebarOpen: true,
    sidebarDocked: true,
    activeRoutes: {},
    visibleRoutes: {},
    searchValue: "",
    bounds: null,
  };
  constructor(props) {
    super(props);
    this.defaultState = {
      centre: this.state.centre,
      zoom: this.state.zoom,
    };
  }
  componentWillMount() {
    getCurrentLocation()
      .then(({ latitude: lat, longitude: lng }) => {
        this.setState({
          userLoc: { lat, lng },
          centre: { lat, lng },
          zoom: 14,
        });
      })
      .catch(err => {
        console.error("Error getting current location", err);
      });
    this._downloadData();
    this._mql = window.matchMedia(`(min-width: 800px)`);
    this._mql.addListener(this._mediaQueryChanged);
    this.setState({
      sidebarDocked: this._mql.matches,
      sidebarOpen: !!this._mql.matches,
    });
  }
  _downloadData() {
    apiSync
      .getData()
      .then(({ buses }) => {
        this.setState({ buses, prevBuses: buses });
      })
      .catch(err => {
        console.error("Error getting data:", err);
      });
    setInterval(() => {
      apiSync
        .updateData()
        .then(({ buses }) => {
          this.setState({ buses, prevBuses: buses });
        })
        .catch(err => {
          console.error("Error updating data", err);
        });
    }, 30 * 1000);
  }
  _mediaQueryChanged = () => {
    this.setState({
      sidebarDocked: this._mql.matches,
      sidebarOpen: !!this._mql.matches,
    });
  };
  componentWillUnmount() {
    this._mql.removeListener(this._mediaQueryChanged);
  }
  _setRouteActive = (routeId, active) => {
    const activeRoutes = { ...this.state.activeRoutes };
    activeRoutes[routeId] = active;
    this.setState({ activeRoutes });
  };

  _getUniqRoutes(buses) {
    return _.uniqBy(
      buses.map(b => b.route),
      "route_short_name"
    )
      .filter(r => r)
      .sort((a, b) => {
        if (a.route_short_name.length < b.route_short_name.length) {
          return -1;
        }
        if (a.route_short_name.length > b.route_short_name.length) {
          return 1;
        }
        if (a.route_short_name < b.route_short_name) {
          return -1;
        }
        if (a.route_short_name > b.route_short_name) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
  }
  _setSidebarOpen = sidebarOpen => {
    this.setState({ sidebarOpen });
    if (!sidebarOpen) {
      document.activeElement.blur();
    }
  };
  render() {
    const regex = new RegExp(this.state.searchValue, "i");
    const bounds = this.state.bounds;
    const bp = bounds && {
      lat: (bounds.ne.lat - bounds.se.lat) / 10,
      lng: (bounds.ne.lng - bounds.nw.lng) / 10,
    };
    const buses = this.state.buses.filter(
      b =>
        (!this.state.searchValue || regex.test(b.text)) &&
        (!bounds ||
          (b.lat < bounds.ne.lat + bp.lat &&
            b.lat > bounds.se.lat - bp.lat &&
            b.lng > bounds.nw.lng - bp.lng &&
            b.lng < bounds.ne.lng + bp.lng))
    );
    const routes = this._getUniqRoutes(buses);
    return (
      <MuiThemeProvider>
        <Sidebar
          sidebar={
            <SidebarContent
              routes={routes}
              setRouteActive={this._setRouteActive}
              searchValue={this.state.searchValue}
              setSearchValue={searchValue => this.setState({ searchValue })}
            />
          }
          open={this.state.sidebarOpen}
          onSetOpen={this._setSidebarOpen}
          docked={this.state.sidebarDocked}
          transitions={false}
        >
          <Header
            setMenu={this._setSidebarOpen}
            menuButtonHidden={this.state.sidebarDocked}
          />
          <div>
            <GoogleMap
              defaultCenter={this.defaultState.centre}
              defaultZoom={this.defaultState.zoom}
              onChange={({ center: centre, zoom, bounds }) =>
                this.setState({ centre, zoom, bounds })
              }
              center={this.state.centre}
              zoom={this.state.zoom}
              style={{ minHeight: "400px" }}
              bootstrapURLKeys={{
                key: "AIzaSyBkSlPom4tp0ypqQpZela8ct4VIjh2OoN8",
              }}
              options={{}}
            >
              {this.state.userLoc && <UserMarker {...this.state.userLoc} />}
              {buses.map((b, i) => (
                <Marker
                  lat={b.lat}
                  lng={b.lng}
                  route={b.route}
                  bus={b}
                  key={i}
                  active={!!this.state.activeRoutes[b.routeId]}
                />
              ))}
            </GoogleMap>
          </div>
        </Sidebar>
      </MuiThemeProvider>
    );
  }
}
