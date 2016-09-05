import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export default function(){
  Meteor.methods({
    'pm.conversation.count'(conversationId){
      check(conversationId, String)
      return Meteor.messages.find({conversationId: conversationId}, {fields: {conversationId: 1}}).count()
    }
  })
}
