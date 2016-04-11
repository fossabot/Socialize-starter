import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/conversation_participants.jsx'

export const composer = ({context, conversationId, clearErrors}, onData) => {
  const {Meteor, Collections} = context()
  if(Meteor.subscribe("conversation", conversationId).ready()){
    const conversation = Meteor.conversations.findOne({_id: conversationId})

    onData(null, {conversation})
  } else {
    onData()
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
