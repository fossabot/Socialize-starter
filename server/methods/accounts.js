import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

export default function(){
  Meteor.methods({
    /**
     * Change username for current logged in user
     * @param {string} newUsername
     */
    accountChangeUsername:function(newUsername){
      check(newUsername, String)
      return Accounts.setUsername(Meteor.userId(), newUsername)
    },
    /**
     * Associate a new e-mail with the user
     * @param {string} newEmail
     */
    accountAddEmail:function(newEmail){
      check(newEmail, String)
      return Accounts.addEmail(Meteor.userId(), newEmail)
    },
    /**
     * Remove the given e-mail from the user
     * @param {string} email
     */
    accountRemoveEmail:function(email){
      check(email, String)
      return Accounts.removeEmail(Meteor.userId(), email)
    },
    /**
     * Sends a verification e-mail to the given e-mail
     * @param {string} email
     */
    accountVerifyEmailSend:function(email){
      check(email, String)
      return Accounts.sendVerificationEmail(Meteor.userId(), email)
    },
    /**
     * Send a reset password link to the given email.
     * @param {string} email
     */
    accountSendResetPassword:function(email){
      check(email, String)
      let user = Accounts.findUserByEmail(email)

      user = user._id

      check(user, String)

      if(user !== null){
        return Accounts.sendResetPasswordEmail(user, email)
      } else {
        return false
      }
    }
  })
}
