import React from 'react';
import moment from 'moment';
import NewFeedPost from '../components/feed_new_post.jsx';
import { Link } from 'react-router';

class UserFeed extends React.Component {
/*
  propTypes:{
    userId: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool])
  }
*/

  liking(post) {
    const { likePost, unlikePost } = this.props;

    if (post.isLikedBy(Meteor.user())) {
      unlikePost(post._id);
    } else {
      likePost(post._id);
    }
  }

  /**
   * List individual post
   * @access private
   */
  listPost() {
    const { posts } = this.props;
    if (posts !== undefined && posts !== null) {
      if (posts.length > 0) {
        return posts.map((post) => {
          return (<div key={post._id} className="row card-panel hoverable">
            <div className="col s2 center-align">
              <Link to={'users/' + post.poster().username} >
                <i className="material-icons">account_circle</i><br />
                {post.poster().username}
              </Link>
            </div>
            <div className="col s7">{post.body}</div>
            <div className="col s3">
              {moment(post.date).fromNow()}<br />
              <span className="link" onClick={this.liking.bind(this, post)}>{post.likeCount()} <i className="material-icons">favorite</i></span>
            </div>
          </div>);
        });
      } else {
        return <div>No entries in the feed.</div>;
      }
    }
  }

  /**
   * Show additional posts
   * @access private
   */
  extendLimit(e) {
    const current = LocalState.get('USER_FEED_POST_LIMIT');
    LocalState.set('USER_FEED_POST_LIMIT', current + 10);
  }

  render() {
    let addToLimit;
    const { posts } = this.props;
    if (posts !== undefined && posts !== null) {
      if (posts.length > 10) {
        addToLimit = (<div className="align-center">
          <a className="btn waves-effect waves-light" onClick={this.extendLimit}>Show more</a>
        </div>);
      }
    }

    return (<div>
      {this.listPost()}
      {addToLimit}
    </div>);
  }
}

export default UserFeed;
