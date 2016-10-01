import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

export default class UserFeed extends React.Component {
  constructor(props) {
    super(props);

    this.likingDisplay = this.likingDisplay.bind(this);
    this.extendLimit = this.extendLimit.bind(this);
  }

  componentWillUnmount() {
    const { resetLimit } = this.props;
    resetLimit();
  }

  liking(post) {
    const { likePost, unlikePost, currentUser } = this.props;

    if (post.isLikedBy(currentUser)) {
      unlikePost(post._id);
    } else {
      likePost(post._id);
    }
  }

  likingDisplay(post) {
    if ( this.props.currentUser ) {
      return (<span className="link" onClick={this.liking.bind(this, post)}>
        {post.likeCount()} <i className="material-icons">favorite</i>
      </span>);
    } else {
      return null;
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
              {this.likingDisplay(post)}
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
  extendLimit() {
    const { increaseLimit } = this.props;
    increaseLimit();
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

UserFeed.propTypes = {
  currentUser: React.PropTypes.oneOfType([ React.PropTypes.object, React.PropTypes.bool ]),
  increaseLimit: React.PropTypes.func.isRequired,
  likePost: React.PropTypes.func.isRequired,
  posts: React.PropTypes.array,
  resetLimit: React.PropTypes.func.isRequired,
  unlikePost: React.PropTypes.func.isRequired,
};
