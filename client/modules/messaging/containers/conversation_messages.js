import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ConversationMessages from '../components/conversation_messages.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, MessagesSubs} = context();

  if (!msgLimit) {
    msgLimit = 10;
  }

  if (conversationId) {
    MessagesSubs.subscribe('messages.for', conversationId, {limit: msgLimit, skip: 0});
    MessagesSubs.subscribe('conversation', conversationId);

    if (MessagesSubs.ready()) {
      let messages = Meteor.messages.find({conversationId: conversationId}, {sort: {date: 1}}).fetch();
      let conversation = Meteor.conversations.findOne({_id: conversationId});

      // confirm that user can view the conversation
      let access = false;

      conversation._participants.forEach((p) => {
        if (p === Meteor.userId()) {
          access = true;
        }
      });

      if (access) {
        onData(null, {messages});
      } else {
        // unsubscribe
        MessagesSubs.stop();
        // redirect back
        // FlowRouter.go("pmOverview")
      }
    }
  } else {
    // FlowRouter.go("pmOverview")
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ConversationMessages);
