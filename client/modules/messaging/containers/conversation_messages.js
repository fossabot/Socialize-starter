import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/conversation_messages.jsx'

export const composer = ({context, conversationId, msgLimit, clearErrors}, onData) => {
  const {Meteor, Collections, FlowRouter, LocalState} = context()

  if(!msgLimit){
    msgLimit = 10
  }

  if(conversationId){
    const handleConv = Meteor.subscribe("messages.for", conversationId, {limit: msgLimit, skip: 0})
    const handleMsg = Meteor.subscribe("conversation", conversationId)

    if(handleConv.ready() && handleMsg.ready()){
      let messages = Meteor.messages.find({conversationId: conversationId}, {sort: {date: 1}}).fetch()
      let conversation = Meteor.conversations.findOne({_id: conversationId})

      //confirm that user can view the conversation
      let access = false

      conversation._participants.forEach((p) => {
        if(p === Meteor.userId()){
          access = true
        }
      })

      if(access){
        onData(null, {messages})
      } else {
        console.log("Access denied!")
        //Materialize.toast("Access denied!", 3000)
        //unsubscribe
        handleConv.stop()
        handleMsg.stop()
        //redirect back
        FlowRouter.go("pm-overview")
      }
    } else {
      onData()
    }
  } else {
    console.log("No conversation id specified.")
    FlowRouter.go("pm-overview")
  }

  return clearErrors
}

export const depsMapper = (context, actions) => ({
  clearErrors: actions.messaging.clearErrors,
  context: () => context
})

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component)
