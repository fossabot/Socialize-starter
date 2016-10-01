import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

// import feed
import NewFeedPost from '../containers/feed_new_post.js';
import UserFeed from '../containers/feed.js';
import DashboardFriends from '../containers/dashboard_friends.js';

export default class UserDashboard extends React.Component {
  render() {
    return (<div>
      <Helmet title="Dashboard" />

      <section className="row">
        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo lighten-1 waves-effect waves-block waves-light">
            <Link to={'user/groups'}>
              <div className="card-image">
                <i className="material-icons white-text">group</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Groups</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo lighten-1 waves-effect waves-block waves-light">
            <Link to={'blogs'}>
              <div className="card-image">
                <i className="material-icons white-text">art_track</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Blogs</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo lighten-1 waves-effect waves-block waves-light">
            <Link to={'forums'}>
              <div className="card-image">
                <i className="material-icons white-text">forum</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Forums</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo lighten-1 waves-effect waves-block waves-light">
            <Link to={'pm'}>
              <div className="card-image">
                <i className="material-icons white-text">mail</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Messages</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo lighten-1 waves-effect waves-block waves-light">
            <Link to={'user/settings'}>
              <div className="card-image">
                <i className="material-icons white-text">settings</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Settings</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo lighten-1 waves-effect waves-block waves-light">
            <Link to={'logout'}>
              <div className="card-image">
                <i className="material-icons white-text">exit_to_app</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Logout</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <h5>What is new</h5>
      <section className="row">
        <DashboardFriends />
      </section>
      <hr />
      <NewFeedPost />
      <UserFeed userId={false} />
    </div>);
  }
}
