import {Meteor} from 'meteor/meteor'

export default {
  verify(email){
    Meteor.call("accountVerifyEmailSend", email, function(error, result){
      if(error){
        console.log(error)
      }
    })
  }
}

