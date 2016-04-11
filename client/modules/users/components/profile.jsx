import React from 'react'

import UserFeed from '../containers/feed.js'
import UserNewConversation from '../../messaging/containers/conversation.js'

export default class UserProfile extends React.Component{
  constructor(){
    super()

    this.addActions.bind(this)
  }

  showAvatar(){
    //show user avatar
    if(false){
      return (<img className="profile-picture responsive-img" src="/images/avatars/{this.props.profile.avatar}" />)
    } else {
      return (<i className="material-icons profile-picture">account_circle</i>)
    }
  }

  //requests friendship
  requestFriendship(e){
    e.preventDefault()
    this.props.profileUser.requestFriendship()
  }

  unfriend(e){
    e.preventDefault()
    this.props.profileUser.unfriend()
  }

  block(e){
    e.preventDefault()
    this.props.profileUser.block()
  }

  unBlockUser(e){
    e.preventDefault()
    this.props.profileUser.unblock()
  }

  reportUser(e){
    //TODO
    e.preventDefault()
  }

  acceptFriendshipRequest(e){
    e.preventDefault()
    this.props.profileUser.acceptFriendshipRequest()
  }

  denyFriendshipRequest(e){
    e.preventDefault()
    this.props.profileUser.denyFriendshipRequest()
  }

  cancelFriendshipRequest(e){
    e.preventDefault()
    this.props.profileUser.cancelFriendshipRequest()
  }

  //figure out which button to show
  friendshipOption(){
    let currentUser = this.props.currentUser
    let profileUser = this.props.profileUser

    //if friend request pending show cancel request button
    //TODO wait if PR #18 accepted https://github.com/copleykj/socialize-friendships/pull/18
    //else include this function into the server file
    /*
    if(currentUser.hasRequested(profileUser)){
      return <a href="#!" onClick={this.cancelFriendshipRequest} className="btn waves-effect">Cancel friendship request</a>
    }*/
    if(profileUser.hasRequestFrom(currentUser)){
      return <a href="#!" onClick={this.cancelFriendshipRequest.bind(this)} className="btn waves-effect">Cancel friendship request</a>
    }

    //if friendship request from this user show accept or deny button
    if(currentUser.hasRequestFrom(profileUser)){
      return <span><a href="#!" onClick={this.acceptFriendshipRequest.bind(this)} className="btn waves-effect">Accept friendship request</a><a href="#!" onClick={this.denyFriendshipRequest.bind(this)} className="btn waves-effect">Deny friendship</a></span>
    }

    //if friends show unfriend button
    if(currentUser.isFriendsWith(profileUser)){
      return <a href="#!" onClick={this.unfriend.bind(this)} className="btn waves-effect">Unfriend</a>
    } else {
      return <a href="#!" onClick={this.requestFriendship.bind(this)} className="btn waves-effect">Add to friends</a>
    }
  }

  //figure which button to show
  blockOption(){
    let currentUser = this.props.currentUser
    let profileUser = this.props.profileUser

    //if friends don't display anything
    if(! currentUser.isFriendsWith(profileUser)){
      //has user been blocked by the current user?
      if(false){
        //show unblock button
        return <a href="#!" onClick={this.unblock.bind(this)} className="btn waves-effect">Unblock</a>
      } else {
        //show block button
        return <a href="#!" onClick={this.block.bind(this)} className="btn waves-effect">Block</a>
      }
    }
  }

  addActions(){
    //no actions if user not logged in
    if(Meteor.userId()){
      //not the same user
      if(Meteor.userId() !== this.props.profile.userId){
        return (<div className="card-action">
          <a href="#newConversation" className="btn waves-effect modal-trigger">Send a message</a>
          <UserNewConversation recipients={[this.props.profile]} />
          {this.friendshipOption()}
          {this.blockOption()}
          <a onClick={this.reportUser.bind(this)} className="btn waves-effect">Report</a>

        </div>)
      }
    }
  }

  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render(){
    return (<div className="profile-header-bg">
      <section className="card-panel">
          <span className="profile-picture-box">{this.showAvatar()}</span>
          <h1 className="profile-username">{this.props.profile.username}</h1>
          <hr />
          {this.addActions()}
      </section>
      <section className="row">
        <div className="col s12 m10 l9">
          <div className="card-panel">
            <h4>Stream</h4>
            <UserFeed userId={this.props.profile.userId} />
          </div>
        </div>
        <div className="col s12 m2 l3">
          <div className="card-panel">
            <h5>{this.props.profile.givenName} {this.props.profile.familyName}</h5>
            <p>{this.props.profile.biography}</p>
          </div>
        </div>
      </section>
    </div>)
  }
}
