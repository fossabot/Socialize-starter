import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserConversation from '../components/conversation.jsx';

export const composer = ({context, conversationId}, onData) => {
  const {Meteor, MessagesSubs} = context()

  if(conversationId){
    MessagesSubs.subscribe("conversation", conversationId)
    if(MessagesSubs.ready()){
      const conversation = Meteor.conversations.findOne({_id: conversationId})

      //confirm that user can view the conversation
      let access = false

      conversation._participants.forEach((p) => {
        if(p === Meteor.userId()){
          access = true
        }
      })

      if(access){
        onData(null, {conversation})
      } else {
        // unauthorized access
        //FlowRouter.go("pmOverview")
      }
    }
  } else {
    //FlowRouter.go("pmOverview")
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserConversation);
