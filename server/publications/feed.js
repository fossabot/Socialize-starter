import {Meteor} from 'meteor/meteor'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {check} from 'meteor/check'

export default function(){
  let publicationOptionsSchema = new SimpleSchema({
    limit:{
      type: Number,
      optional: true
    },
    skip:{
      type: Number,
      optional: true
    },
    sort:{
      type: Number,
      optional: true
    }
  })

  /**
   * Feed for the current user
   * @function publication feed
   * @param {object} options
   * @returns {pointer}
   */
  Meteor.publish('feed', function(options) {
    options = options || {}

    check(options, publicationOptionsSchema)

    let friendMap

    if(!this.userId){
      return this.ready()
    }

    friendMap = Meteor.friends.find({userId:this.userId}, {fields:{friendId:true}}).map(function(friend){
      return friend.friendId;
    })

    friendMap.push(this.userId)

    //only allow the limit, skip and sort options
    options = _.pick(options, "limit", "skip", "sort")

    Meteor.publishWithRelations({
      handle: this,
      collection: Meteor.posts,
      filter: {$or:[{userId:{$in:friendMap}}, {posterId:{$in:friendMap}}]},
      options:options,
      mappings: [{
        key: 'userId',
        collection: Meteor.users,
        options:{fields:{username:true}}
      }, {
        reverse: true,
        key: 'linkedObjectId',
        collection: Meteor.comments,
        options:{sort:{date:-1}, limit:3},
        mappings: [{
          key: 'userId',
          collection: Meteor.users,
          options:{fields:{username:true}}
        }]
      }]
    })
  })

  /**
   * Post for a particular user
   * @function publication posts
   * @param {string} userId
   * @param {object} options
   * @returns {pointer}
   */
  Meteor.publish('posts', function(userId, options) {
    check(userId, String)

    options = options || {}

    check(options, publicationOptionsSchema)

    let friendMap

    if(!userId){
      return this.ready()
    }

    friendMap = Meteor.friends.find({posterId: userId}, {fields:{friendId:true}}).map(function(friend){
      return friend.friendId;
    })

    friendMap.push(userId)

    //only allow the limit, skip and sort options
    options = _.pick(options, "limit", "skip", "sort")

    Meteor.publishWithRelations({
      handle: this,
      collection: Meteor.posts,
      filter: {$or:[{userId: userId}, {posterId: userId}]},
      options:options,
      mappings: [{
        key: 'userId',
        collection: Meteor.users,
        options:{fields:{username:true}}
      }, {
        reverse: true,
        key: 'linkedObjectId',
        collection: Meteor.comments,
        options:{sort:{date:-1}, limit:3},
        mappings: [{
          key: 'userId',
          collection: Meteor.users,
          options:{fields:{username:true}}
        }]
      }]
    })
  })
}
