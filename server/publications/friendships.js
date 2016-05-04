import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export default function(){
  // Setup a schema so we can check the arguments to ensure application security
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
   * Publish friend records with their related user records.
   * @function publication friends
   * @param {object} options
   */
  Meteor.publish("friends", function(options){
    if(!this.userId){
      return this.ready();
    }

    options = options || {}

    check(options, publicationOptionsSchema)

    this.relations({
      handle: this,
      collection: Meteor.friends,
      filter: {userId:this.userId, friendId:{$ne:this.userId}},
      options:options,
      mappings: [{
        foreign_key: 'friendId',
        collection: Meteor.users,
        options:{fields:{username:true, status:true}}
      }]
    })
    this.ready()
  })

  /**
   * Publish all friend requests to the current users.
   * @function publication friends.requests
   * @param {object} options
   */
  Meteor.publish('friends.requests', function(options){
    if(!this.userId){
      return this.ready()
    }

    options = options || {}

    check(options, publicationOptionsSchema)

    this.relations({
      handle: this,
      collection: Meteor.requests,
      filter: {userId:this.userId, denied:{$exists:false}, ignored:{$exists:false}},
      options:options,
      mappings: [{
        foreign_key: 'requesterId',
        collection: Meteor.users,
        options:{fields:{username:true}}
      }]
    })
    this.ready()
  })

  /**
   * Ignored friend requests to the current user.
   * @function publication friends.requests.ignored
   * @param {object} options
   */
  Meteor.publish('friends.requests.ignored', function(options){
    if(!this.userId){
      return this.ready()
    }

    options = options || {}

    check(options, publicationOptionsSchema)

    this.relations({
      handle: this,
      collection: Meteor.requests,
      filter: {userId:this.userId, denied:{$exists:false}, ignored:{$exists:true}},
      options:options,
      mappings: [{
        foreign_key: 'requesterId',
        collection: Meteor.users,
        options:{fields:{username:true}}
      }]
    })
    this.ready()
  })

  /**
   * Friend requests from the current user to other users.
   * @function publication friends.requests.outgoing
   * @param {object} options
   */
  Meteor.publish('friends.requests.outgoing', function(options){
   if(!this.userId){
      return this.ready()
   }

   options = options || {}

   check(options, publicationOptionsSchema)

   this.relations({
     handle: this,
     collection: Meteor.requests,
     filter: {requesterId:this.userId, denied:{$exists:false}},
     options:options,
     mappings: [{
       foreign_key: 'requesterId',
       collection: Meteor.users,
       options:{fields:{username:true}}
     }]
   })
   this.ready()
  })
}
