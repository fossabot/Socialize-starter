import {Meteor} from 'meteor/meteor'

export default function(){
  Meteor.methods({
    countMessages:function(conversationId){
      check(conversationId, String)
      return Meteor.messages.find({conversationId: conversationId}, {fields: {conversationId: 1}}).count()
    }
  })
}
