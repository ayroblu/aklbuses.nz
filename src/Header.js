import React, { Component } from 'react'
import Menu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import './Header.css'

export default class Header extends Component {
  static propTypes = {
    openMenu: React.PropTypes.func.isRequired
  }
  _openMenu = ()=>{
    this.props.openMenu()
  }
  render(){
    return (
      <header className='Header'>
        <h1>Live Auckland Buses</h1>
        <div className='button'>
          <IconButton>
            <Menu style={{}} color={'white'} onTouchTap={this._openMenu} />
          </IconButton>
        </div>
      </header>
    )
  }
}
