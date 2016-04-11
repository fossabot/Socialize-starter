import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export default function(){
  /**
   * DB Schema for Profile
   */
  Profile.appendSchema({
    "biography": {
      type: String,
      optional: true
    },
    "avatar": {
      type: String,
      optional: true
    },
    "givenName": {
      type: String,
      optional: true
    },
    "familyName": {
      type: String,
      optional: true
    }
  })

  Meteor.publish("profileFor", function(userIdOrUsername){
    check(userIdOrUsername, String)
    return Profile.collection.find({$or:[{userId:userIdOrUsername}, {username:userIdOrUsername}]})
  })
}
