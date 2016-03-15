Meteor.startup(function(){
  process.env.MAIL_URL = Meteor.settings.mailUrl
})

/**
 * URLs for links send in emails
 * This should mirror your router settings
 */
Accounts.urls.resetPassword = function(token){
  return Meteor.absoluteUrl('user/reset-password/$token={token}')
}

Accounts.urls.verifyEmail = function(token){
   return Meteor.absoluteUrl('user/verify-email/$token={token}')
}

Accounts.urls.enrollAccount = function(token){
  return Meteor.absoluteUrl('/user/enroll/$token={token}')
}

/**
 * Accounts e-mail templates
 */
Accounts.emailTemplates.siteName = "Socialize-starter"
Accounts.emailTemplates.from = "Socialize no-reply <no-reply@socialize.net>"

// Account enrollment
Accounts.emailTemplates.enrollAccount = {
  subject(user){
     return "Welcome to Socialize-starter, " + user.username
  },
  text(user, url){
    return "You have been selected to participate in building a better future!"
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
    return 'Hello {user}!' + "\n\n"
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
    return 'Hello {user}!' + "\n\n"
    + "Please verify your e-mail address by clicking on the link bellow:\n\n"
    + url
  }
}
