import React from 'react';

export default class FeedNewPost extends React.Component {
  addPost(e) {
    e.preventDefault();

    // get the value
    const body = e.target.postText.value;

    // add post
    const { addPost } = this.props;
    addPost(body);

    // reset the form
    e.target.reset();
  }

  render() {
    let error;
    if (this.props.error) {
      error = <div className="col s12 red darken-2"><p className="white-text flow-text">{this.props.error}</p></div>;
    }

    if (Meteor.userId()) {
      return (<form id="postForm" method="post" className="row card-panel hoverable" onSubmit={this.addPost.bind(this)}>
        <div className="input-field col s10">
          <input type="text" className="validate" name="postText" />
          <label htmlFor="postText">New post</label>
        </div>
        <div className="input-field col s2">
          <input type="submit" className="btn" name="postSubmit" value="Post" />
        </div>
        {error}
      </form>);
    }
  }
}

FeedNewPost.propTypes = {
  addPost: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
};
