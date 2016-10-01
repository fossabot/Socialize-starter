import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import UserFeed from '../containers/feed.js';
import NewFeedPost from '../containers/feed_new_post.js';
// NOTE This was creating a very strange behavior where
// it would redirect user to a conversation (right after component mounted)
// import UserNewConversation from '../../messaging/components/conversation.jsx'

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.addActions = this.addActions.bind(this);
    this.showAvatar = this.showAvatar.bind(this);
  }

  showAvatar() {
    // show user avatar
    if (this.props.profile.avatarUrl) {
      return (<img
        className="profile-picture responsive-img"
        src="/images/avatars/{this.props.profile.avatarUrl}"
        alt={'Avatar for ' + this.props.profile.username}
      />);
    } else {
      return (<i className="material-icons profile-picture">account_circle</i>);
    }
  }

  // requests friendship
  requestFriendship(e) {
    e.preventDefault();
    this.props.profileUser.requestFriendship();
  }

  unfriend(e) {
    e.preventDefault();
    this.props.profileUser.unfriend();
  }

  block(e) {
    e.preventDefault();
    this.props.profileUser.block();
  }

  unBlockUser(e) {
    e.preventDefault();
    this.props.profileUser.unblock();
  }

  reportUser(e) {
    // TODO
    e.preventDefault();
  }

  acceptFriendshipRequest(e) {
    e.preventDefault();
    this.props.profileUser.acceptFriendshipRequest();
  }

  denyFriendshipRequest(e) {
    e.preventDefault();
    this.props.profileUser.denyFriendshipRequest();
  }

  cancelFriendshipRequest(e) {
    e.preventDefault();
    this.props.profileUser.cancelFriendshipRequest();
  }

  // figure out which button to show
  friendshipOption() {
    const currentUser = this.props.currentUser;
    const profileUser = this.props.profileUser;

    // if friend request pending show cancel request button
    if (profileUser.hasRequestFrom(currentUser)) {
      return (<button
        onClick={this.cancelFriendshipRequest.bind(this)}
        className="btn waves-effect"
      >
        Cancel friendship request
      </button>);
    }

    // if friendship request from this user show accept or deny button
    if (currentUser.hasRequestFrom(profileUser)) {
      return (<span>
        <button
          onClick={this.acceptFriendshipRequest.bind(this)}
          className="btn waves-effect"
        >
          Accept friendship request
        </button>
        <button
          onClick={this.denyFriendshipRequest.bind(this)}
          className="btn waves-effect"
        >
          Deny friendship
        </button>
      </span>);
    }

    // if friends show unfriend button
    if (currentUser.isFriendsWith(profileUser)) {
      return <button onClick={this.unfriend.bind(this)} className="btn waves-effect">Unfriend</button>;
    } else {
      return <button onClick={this.requestFriendship.bind(this)} className="btn waves-effect">Add to friends</button>;
    }
  }

  // figure which button to show
  blockOption() {
    const currentUser = this.props.currentUser;
    const profileUser = this.props.profileUser;

    // if friends don't display anything
    if (!currentUser.isFriendsWith(profileUser)) {
      // has user been blocked by the current user?
      if (currentUser.blocksUser(profileUser)) {
        // show unblock button
        return <button onClick={this.unblock.bind(this)} className="btn waves-effect">Unblock</button>;
      } else {
        // show block button
        return <button onClick={this.block.bind(this)} className="btn waves-effect">Block</button>;
      }
    }
  }

  addActions() {
    // no actions if user not logged in
    if (Meteor.userId()) {
      // not the same user
      if (Meteor.userId() !== this.props.profile.userId) {
        return (<div className="card-action">
          {this.friendshipOption()}
          {this.blockOption()}
          <button onClick={this.reportUser.bind(this)} className="btn waves-effect">Report</button>
        </div>);
      }
    }
  }

  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    const { profile } = this.props;
    let newPost = null;
    if (profile.userId === Meteor.userId()) {
      newPost = <NewFeedPost />;
    }

    return (<div className="profile-header-bg">
      <Helmet
        title={profile.username}
      />
      <section className="card-panel">
        <span className="profile-picture-box">{this.showAvatar()}</span>
        <h1 className="profile-username">{profile.username}</h1>
        <hr />
        {this.addActions()}
      </section>
      <section className="row">
        <div className="col s12 m10 l9">
          <div className="card-panel">
            <h4>Stream</h4>
            {newPost}
            <UserFeed userId={profile.userId} />
          </div>
        </div>
        <div className="col s12 m2 l3">
          <div className="card-panel">
            <h5>{profile.givenName} {profile.familyName}</h5>
            <p>{profile.biography}</p>
            <p>Joined on {moment(profile.createdAt).format('LL')}</p>
          </div>
        </div>
      </section>
    </div>);
  }
}

UserProfile.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  profile: React.PropTypes.object.isRequired,
  profileUser: React.PropTypes.object.isRequired,
};
