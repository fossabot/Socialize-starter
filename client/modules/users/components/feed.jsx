import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

export default class UserFeed extends React.Component {
  constructor(props) {
    super(props);

    this.likingDisplay = this.likingDisplay.bind(this);
    this.extendLimit = this.extendLimit.bind(this);
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
    return (<span className="link" onClick={this.liking.bind(this, post)}>
      {post.likeCount()} <i className="material-icons">favorite</i>
    </span>);
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
    const { posts, postsLimit, totalPosts } = this.props;
    if (posts !== undefined && posts !== null) {
      if (totalPosts > postsLimit) {
        addToLimit = (<div className="align-center">
          <a className="btn waves-effect waves-light col s12 float-none" onClick={this.extendLimit}>Show more</a>
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
  currentUser: React.PropTypes.oneOfType([ React.PropTypes.object, React.PropTypes.bool ]).isRequired,
  /* eslint-disable react/no-unused-prop-types */
  feedUser: React.PropTypes.oneOfType([ React.PropTypes.object, React.PropTypes.bool ]).isRequired,
  /* eslint-enable react/no-unused-prop-types */
  increaseLimit: React.PropTypes.func.isRequired,
  likePost: React.PropTypes.func.isRequired,
  posts: React.PropTypes.array,
  postsLimit: React.PropTypes.number.isRequired,
  totalPosts: React.PropTypes.number.isRequired,
  unlikePost: React.PropTypes.func.isRequired,
};

UserFeed.defaultProps = {
  feedUser: false,
};
