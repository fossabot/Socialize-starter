import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import {createHref} from 'react-router'

export default function(){
  Accounts.urls.resetPassword = function(token){
    //return Meteor.absoluteUrl('reset-password?token='+token)
    return createHref('user/reset-password', {token: token})
  }

  Accounts.urls.verifyEmail = function(token){
     //return Meteor.absoluteUrl('user/verify-email?token='+token)
     return createHref('user/verify-email', {token: token})
  }

  Accounts.urls.enrollAccount = function(token){
    return createHref('user/enroll', {token: token})
  }

  Meteor.startup(function(){
    //process.env.MAIL_URL = Meteor.settings.mailUrl

    /**
     * Accounts e-mail templates
     */
    Accounts.emailTemplates.siteName = "Socialize-starter"
    Accounts.emailTemplates.from = "Socialize-starter no-reply <no-reply@socialize.net>"

    // Account enrollment
    Accounts.emailTemplates.enrollAccount = {
      subject(user){
         return "Welcome to Socialize-starter, " + user.username
      },
      text(user, url){
        return "Hello!\n\n"
          + "You have been selected to participate in building a better future!"
          + " To activate your account, simply click the link below:\n\n"
          + url
      }
    }

    // Reset password
    Accounts.emailTemplates.resetPassword = {
      subject(user){
        return "Socialize-starter reset password"
      },
      text(user, url){
        return 'Hello ' + user.username + "!\n\n"
        + "We have recieved a request to reset your password for your account."
        + "Please follow the link bellow to reset your password:\n\n"
        + url
      }
    }

    // Verifying email
    Accounts.emailTemplates.verifyEmail = {
      subject(user){
        return "Socialize-starter e-mail verification"
      },
      text(user, url){
        return 'Hello ' + user.username + "!\n\n"
        + "Please verify your e-mail address by clicking on the link bellow:\n\n"
        + url
      }
    }
  })
}

