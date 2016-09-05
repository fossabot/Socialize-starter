import React from 'react';
import {Link} from 'react-router'

export default class NavUser extends React.Component{
  componentDidMount(){
    //activate the menu
    $(".button-collapse").sideNav({menuWidth: 300, closeOnClick: true})
    $(".dropdown-button").dropdown()
  }

  showAvatar(){
    //show user avatar
    if(false){
      //TODO show small version of user avatar
      return (<img className="circle responsive-img" src="/images/avatars/{this.props.userAvatar}" />)
    } else {
      return (<i className="material-icons">account_circle</i>)
    }
  }

  render(){
    return (<header className="navbar-fixed">
      <nav role="navigation">
        <div className="nav-wrapper container">
          <ul className="left">
            <li><Link to={"#"} data-activates="slide-out" className="button-collapse show-on-large"><i className="material-icons">menu</i></Link></li>
            <li><Link to={"/dashboard"} id="pageName" className="brand-logo">Socialize starter</Link></li>
          </ul>
          <ul className="right">
            <li className="hide-on-small-only"><Link to={"/dashboard"} className="waves-effect"><i className="material-icons">dashboard</i></Link></li>
            <li className="hide-on-med-and-down"><Link to={"/pm"} className="waves-effect"><i className="material-icons">mail</i></Link></li>
            <li><a title="Options" className="dropdown-button waves-effect" data-activates="user-dropdown" href="#!">{this.showAvatar()}</a></li>
          </ul>
          <ul id="user-dropdown" className="dropdown-content">
            <li><Link className="waves-effect" to={"/user"}>Profile</Link></li>
            <li><Link className="waves-effect" to={"/user/settings"}>Settings</Link></li>
            <li><Link className="waves-effect" to={"/logout"}>Logout</Link></li>
          </ul>
        </div>
        <ul id="slide-out" className="side-nav">
          <li><Link to={"/dashboard"}>Dashboard</Link></li>
          <li><Link to={"/pm"}>Messages</Link></li>
          <li><Link to={"/user/settings"}>Settings</Link></li>
          <li><Link to={"/logout"}>Logout</Link></li>
        </ul>
      </nav>
  </header>)
  }
}
