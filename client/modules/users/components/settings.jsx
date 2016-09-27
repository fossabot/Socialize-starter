import React from 'react';
import Helmet from 'react-helmet';

import UserChangeUsernane from '../containers/settings_username.js';
import UserChangeName from '../containers/settings_name.js';
import UserChangeBio from '../containers/settings_bio.js';
import UserEmail from '../containers/settings_email.js';
import UserChangePassword from '../containers/settings_password.js';

/**
 * @class component UserSettings
 * @classdesc Shows full settings page.
 */
class UserSettings extends React.Component {
  changeAvatar() { /* not yet ready
    if(Package['storyteller:profiles-react-materialize']){
      return(<UserChangeAvatar />)
    }*/
  }
  /**
   * Renders the components for full settings page.
   * @access private
   */
  render() {
    return (<div className="container">
    <Helmet
      title="Your settings"
    />
    <div className="row">
      <h1>Settings</h1>
      <div className="col s12">
        {this.changeAvatar()}
        <UserChangeUsernane />
        <UserChangeName />
        <UserChangeBio />
        <UserEmail />
        <UserChangePassword />
      </div>
    </div>
    </div>);
  }
}

export default UserSettings;
