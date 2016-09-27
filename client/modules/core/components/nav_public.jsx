import React from 'react';
import { Link } from 'react-router';

export default class NavPublic extends React.Component {
  componentDidMount() {
    // activate the menu
    $('.button-collapse').sideNav({ menuWidth: 300, closeOnClick: true });
  }

  render() {
    return (
      <header className="navbar-fixed">
        <nav role="navigation">
          <div className="container">
            <div className="nav-wrapper">
              <Link to={'/'} className="brand-logo left">Socialize starter</Link>
              <Link to={'#'} data-activates="nav-mobile" className="button-collapse right"><i className="material-icons">menu</i></Link>
              <ul className="right hide-on-med-and-down">
                <li><Link to={'/register'}>Register</Link></li>
                <li><Link to={'/login'}><i className="material-icons right">lock_open</i>Sign in</Link></li>
              </ul>
              <ul className="side-nav" id="nav-mobile">
                <li><Link to={'/register'}>Register</Link></li>
                <li><Link to={'/login'}>Sign in</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
