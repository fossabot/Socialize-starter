import React from 'react';
import { Link } from 'react-router';

export default class DashboardFriends extends React.Component {
  render() {
    const { user } = this.props;
    if (user) {
      // friends requests
      if (user.numRequests() > 0) {
        let msg;
        if (user.numRequests() > 1) {
          msg = user.numRequests() + ' new friend requests';
        } else {
          msg = user.numRequests() + ' new friend request';
        }
        return (<div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo waves-effect waves-block waves-light">
            <Link to={'user/friends'}>
              <div className="card-image">
                <i className="material-icons white-text">person_add</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">{msg}</p>
              </div>
            </Link>
          </div>
        </div>);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

DashboardFriends.propTypes = {
  user: React.PropTypes.object.isRequired,
};
