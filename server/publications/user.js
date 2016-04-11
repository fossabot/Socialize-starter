import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export default function(){
  /**
   * Looks up user details by username or id.
   * @param {string} userIdOrUsername User id or username
   * @returns {pointer} MongoDB pointer to the user
   */
  Meteor.publish("getUser", function(userIdOrUsername){
    check(userIdOrUsername, String)
    return Meteor.users.find({$or:[{_id:userIdOrUsername}, {username:userIdOrUsername}]}, {fields: {username: 1, createdAt: 1}})
  })
}
