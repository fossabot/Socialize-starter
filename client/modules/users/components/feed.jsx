import React from 'react'
import moment from 'moment'
import NewFeedPost from '../components/feed_new_post.jsx'

class UserFeed extends React.Component{
/*
  propTypes:{
    userId: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool])
  }
*/

  postForm(){
    if(this.props.userId === Meteor.userId()){
      return <NewFeedPost />
    }
  }

  /**
   * List individual post
   * @access private
   */
  listPost(){
    let {posts} = this.props
    if(posts !== undefined && posts !== null){
      if(posts.length > 0){
        return posts.map((post)=>{
          return <div key={post._id} className="row card-panel hoverable">
            <div className="col s2 center-align">
              <a href={FlowRouter.path("profile-public", {username: post.poster().username})} >
                <i className="material-icons">account_circle</i><br />
                {post.poster().username}
              </a>
            </div>
            <div className="col s7">{post.body}</div>
            <div className="col s3">{moment(post.date).fromNow()}</div>
          </div>
        })
      } else {
        return <div>No entries in the feed.</div>
      }
    }
  }

  /**
   * Show additional posts
   * @access private
   */
  extendLimit(e){
    let current = LocalState.get('USER_FEED_POST_LIMIT')
    LocalState.set('USER_FEED_POST_LIMIT', current + 10)
  }

  render(){
    let addToLimit
    let {posts} = this.props
    if(posts !== undefined && posts !== null){
      if(posts.length > 10){
        addToLimit = <div className="align-center">
          <a className="btn waves-effect waves-light" onClick={this.extendLimit}>Show more</a>
        </div>
      }
    }

    return <div>
      {this.postForm()}
      {this.listPost()}
      {addToLimit}
    </div>
  }
}

export default UserFeed
