import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import DashboardFriends from '../components/dashboard_friends.jsx';

export const composer = ({context}, onData) => {
  if(Meteor.subscribe('friends.requests').ready()) {
    const user = Meteor.user()
    const friendRequests = Meteor.requests.find({userId: user._id}).fetch()
    onData(null, {friendRequests, user})
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DashboardFriends);
