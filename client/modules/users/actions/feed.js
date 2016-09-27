import sanitizeHtml from 'sanitize-html';

export default {
  add({ Meteor, LocalState }, text) {
    // sanitize input
    text = sanitizeHtml(text);

    // call server
    // don't forget to pass back any errors
    // Meteor.call()
    // LocalState.set('FEED_ADD_ERROR', Meteor.user().feed().addPost(text))
    Meteor.call('feed.add', text);
  },
  like({ Meteor, LocalState }, postId) {
    Meteor.call('feed.post.like', postId);
  },
  unlike({ Meteor, LocalState }, postId) {
    Meteor.call('feed.post.unlike', postId);
  },
  clearErrors({ LocalState }) {
    return LocalState.set('FEED_ERROR_POST', null);
  },
};
