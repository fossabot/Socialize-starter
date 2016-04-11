import {Meteor} from 'meteor/meteor'

export default function(){
  Meteor.methods({
    /**
     * Updates user's avatar
     * @function call updateAvatar
     * @param {string} avatar
     * @returns {boolean}
     */
    updateAvatar:function(avatar){
      check(avatar, String)
      let profile = Meteor.profiles.findOne({userId: Meteor.userId()}).update({$set: {avatar: avatar}})
      if(profile === undefined){
        return true
      } else {
        return false
      }
    },
    /**
     * Updates user's biography
     * @function call updateBiography
     * @param {string} bio
     * @returns {boolean}
     */
    updateBiography:function(bio){
      check(bio, String)
      let profile = Meteor.profiles.findOne({userId: Meteor.userId()}).update({$set: {biography: bio}})
      //console.log(profile);
      if(profile === undefined){
        return true
      } else {
        return false
      }

      //profile.set('biography', bio)
      //let save = profile.save()
      //console.log(save);
    },
    /**
     * Updates user's name
     * @function call updateName
     * @param {object} names object containing the given and family name {given: "firstname", family: "surname"}
     * @returns {boolean}
     */
    updateName:function(names){
      check(names, {
        given: String,
        family: String
      })
      let profile = Meteor.profiles.findOne({userId: Meteor.userId()}, {fields: {userId: 1, givenName: 1, familyName: 1}})

      let result = profile.update({$set: {givenName: names.given, familyName: names.family}})

      console.log(result)
      if(result){
        return true
      } else {
        return false
      }
    }
  })
}
