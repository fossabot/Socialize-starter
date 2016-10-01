import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import UserProfile from '../components/profile.jsx';

export const composer = ({ context, params, clearErrors }, onData) => {
  const { Meteor } = context();

  let user = params.username;

  if (!user) {
    user = Meteor.userId();
  }

  if (Meteor.subscribe('profile.for', user).ready()) {
    const profile = Meteor.profiles.findOne({ $or: [ { userId: user }, { username: user } ] });

    if (Meteor.userId() !== profile.userId) {
      if (
        Meteor.subscribe('user.get', profile.userId).ready() &&
        Meteor.subscribe('friends').ready() &&
        Meteor.subscribe('friends.requests').ready() &&
        Meteor.subscribe('friends.requests.outgoing').ready()
      ) {
        const profileUser = Meteor.users.findOne({ _id: profile.userId });
        const currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
        const currentFriends = Meteor.friends.find().fetch();
        const currentRequests = Meteor.requests.find().fetch();

        onData(null, { profile, profileUser, currentUser, currentFriends, currentRequests });
      }
    } else {
      onData(null, { profile });
    }
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserProfile);
