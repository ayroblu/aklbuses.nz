import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import ActionSearch from "material-ui/svg-icons/action/search";
import "./SidebarContent.css";

export default class SidebarContent extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    setRouteActive: PropTypes.func,
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func,
  };
  render() {
    const routes = this.props.routes;
    return (
      <div className="SidebarContent">
        <div className="Title">List of Routes</div>
        <div style={{ verticalAlign: "top" }}>
          <ActionSearch style={{ marginTop: "14px", marginLeft: "5px" }} />
          <TextField
            hintText="Search routes"
            value={this.props.searchValue}
            onChange={(e, v) => this.props.setSearchValue(v)}
            className="SearchText"
            style={{ width: "80%", verticalAlign: "top" }}
          />
        </div>
        {routes.map((r, i) => (
          <div
            key={`toggle-${i}`}
            className={"RouteItem" + (r.visible ? " On" : "")}
            onMouseOver={() => this.props.setRouteActive(r.route_id, true)}
            onMouseOut={() => this.props.setRouteActive(r.route_id, false)}
          >
            {r.route_short_name}
          </div>
        ))}
      </div>
    );
  }
}
