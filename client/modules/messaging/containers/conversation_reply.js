import Component from '../components/conversation_reply.jsx'
import {useDeps, composeWithTracker, composeAll} from 'mantra-core'

export const composer = ({context, conversationId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context()

  if(conversationId){
    if(Meteor.subscribe("conversation", conversationId).ready()){
      let conversation = Meteor.conversations.findOne({_id: conversationId})

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
        console.log("Access denied!")
        Materialize.toast("Access denied!", 3000)
        //unsubscribe
        handleConv.stop()
        handleMsg.stop()
        //redirect back
        FlowRouter.go("pm-overview")
      }
    }
  }

  return clearErrors
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
