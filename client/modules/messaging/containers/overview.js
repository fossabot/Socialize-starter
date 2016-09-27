import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import UserConversationOverview from '../components/overview.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, MessagesSubs } = context();
  if (MessagesSubs.subscribe('conversations').ready()) {
    const conversations = Meteor.conversations.find().fetch();

    onData(null, { conversations });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserConversationOverview);
