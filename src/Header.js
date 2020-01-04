import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu from "material-ui/svg-icons/navigation/menu";
import IconButton from "material-ui/IconButton";
import "./Header.css";

export default class Header extends Component {
  static propTypes = {
    setMenu: PropTypes.func.isRequired,
    menuButtonHidden: PropTypes.bool,
  };
  _openMenu = () => {
    this.props.setMenu(true);
  };
  render() {
    return (
      <header className="Header">
        <h1>Live Auckland Buses</h1>
        {!this.props.menuButtonHidden && (
          <div className="button">
            <IconButton>
              <Menu style={{}} color={"white"} onTouchTap={this._openMenu} />
            </IconButton>
          </div>
        )}
      </header>
    );
  }
}
