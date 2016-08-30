export default {
  emailVerify({Meteor, LocalState}, email){
    Meteor.call("accounts.email.verify.send", email, function(error, result){
      if(error){
        LocalState.set('ACCOUNTS_ERROR_EMAIL', error.reason)
      }
    })
  },
  emailAdd({Meteor, LocalState}, email){
    // TODO: Add more rigorous e-mail checking
    if(email.length > 6){
      Meteor.call("accounts.email.add", email, (error, result)=>{
        if(error){
          LocalState.set('ACCOUNTS_ERROR_EMAIL', error.reason)
        }
        if(result === false){
          LocalState.set('ACCOUNTS_ERROR_EMAIL', email + " is already associated with another account.")
        } else {
          LocalState.set('ACCOUNTS_SUCCESS_EMAIL', 'E-mail has been added.')
          this.emailVerify(email)
        }
      })
    } else {
      LocalState.set('ACCOUNTS_ERROR_EMAIL', "That is not a valid e-mail address!")
    }
  },
  emailRemove({Meteor, LocalState}, email){
    Meteor.call("accounts.email.remove", email, function(error, result){
      if(error || result === false){
        LocalState.set('ACCOUNTS_ERROR_EMAIL', error.reason)
      }
      // no need for success message as the e-mail will disapear from the listing on success
    })
  },
  usernameUpdate({Meteor, LocalState}, username){
    Meteor.call("accounts.username", username, function(error, result){
      if(error){
        LocalState.set('ACCOUNTS_ERROR_USERNAME_UPDATE', error.reason)
      }
      if(result === false){
        LocalState.set('ACCOUNTS_ERROR_USERNAME_UPDATE', 'This username already exists.')
      } else {
        LocalState.set('ACCOUNTS_SUCCESS_USERNAME_UPDATE', 'Username updated.')
      }
    })
  },
  bioUpdate({Meteor, LocalState}, text){
    Meteor.call("profile.biography.update", text, (error, result)=>{
      if(error){
        LocalState.set('ACCOUNTS_ERROR_BIO_UPDATE', error.reason)
      }
      if(result){
        LocalState.set('ACCOUNTS_SUCCESS_BIO_UPDATE', 'Biography updated.')
      }
    })
  },
  nameUpdate({Meteor, LocalState}, givenName, familyName){
    Meteor.call("profile.name.update", {given: givenName, family: familyName}, function(error, result){
      if(error){
        LocalState.set('ACCOUNTS_ERROR_NAME_UPDATE', error.reason)
      }
      if(result){
        LocalState.set('ACCOUNTS_SUCCESS_NAME_UPDATE', 'Name updated.')
      }
    })
  },
  clearErrors({LocalState}) {
    LocalState.set('ACCOUNTS_ERROR_EMAIL', null)
    LocalState.set('ACCOUNTS_ERROR_USERNAME_UPDATE', null)
    LocalState.set('ACCOUNTS_ERROR_BIO_UPDATE', null)
    LocalState.set('ACCOUNTS_SUCCESS_EMAIL', null)
    LocalState.set('ACCOUNTS_SUCCESS_USERNAME_UPDATE', null)
    LocalState.set('ACCOUNTS_SUCCESS_BIO_UPDATE', null)
    LocalState.set('ACCOUNTS_SUCCESS_NAME_UPDATE', null)
    return LocalState.set('ACCOUNTS_ERROR_NAME_UPDATE', null)
  }
}
