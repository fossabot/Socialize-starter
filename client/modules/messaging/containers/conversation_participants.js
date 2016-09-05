import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ConversationParticipants from '../components/conversation_participants.jsx';

export const composer = ({context, conversationId}, onData) => {
  const {Meteor, MessagesSubs} = context()
  if(MessagesSubs.subscribe("conversation", conversationId).ready()){
    const conversation = Meteor.conversations.findOne({_id: conversationId})

    onData(null, {conversation})
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ConversationParticipants);
