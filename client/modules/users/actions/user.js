import {browserHistory} from 'react-router'
import {Accounts} from 'meteor/accounts-base'

export default {
  create({Meteor, LocalState}, username, email, password, password2){
    if (!email){
      return LocalState.set('CREATE_USER_ERROR', 'Email is required.')
    }

    if (!password){
      return LocalState.set('CREATE_USER_ERROR', 'Password is required.')
    }

    if(password !== password2){
      return LocalState.set('CREATE_USER_ERROR', 'Password does not macht.')
    }

    Accounts.createUser({email: email, username: username, password: password}, function(error){
      /* TODO: figure out why we are getting "Content is required" error here even though the user gets created successfully*/
      if(error){
        console.log(error)
        return LocalState.set('CREATE_USER_ERROR', error.reason)
      } else {
        browserHistory.push('dashboard')
      }
    })
  },
  login({Meteor, LocalState}, email, password){
    if(!email){
      return LocalState.set('LOGIN_ERROR', 'Email is required.');
    }
    if(!password){
      return LocalState.set('LOGIN_ERROR', 'Password is required.');
    }

    Meteor.loginWithPassword(email, password, function(error){
      if(error !== undefined){
        console.log(error)
        LocalState.set('LOGIN_ERROR', error.reason)
      } else {
        browserHistory.push('dashboard')
      }
    })
  },
  passwordUpdate({LocalState}, oldPassword, newPassword){
    Accounts.changePassword(oldPassword, newPassword, function(error){
      if(error){
        LocalState.set('ACCOUNTS_ERROR_PASSWORD_UPDATE', error.reason)
      } else {
        LocalState.set('ACCOUNTS_SUCCESS_PASSWORD_UPDATE', 'Password changed successfully!')
      }
    })
  },
  betaSignUp({Meteor, LocalState}, name, username, email, reason){
    Meteor.call("app.beta.email.unique", email, function(error, result){
      if(error){
        LocalState.set('ACCOUNTS_ERROR_BETA_SIGNUP', error.reason)
      }
      if(result){
        Meteor.call("app.beta.username.unique", username, function(error, result){
          if(error){
            LocalState.set('ACCOUNTS_ERROR_BETA_SIGNUP', error.reason)
          }
          if(result){
            Meteor.call('app.beta.signup', name, username, email, reason, (error, result)=>{
              if(error){
                LocalState.set('ACCOUNTS_ERROR_BETA_SIGNUP', error.reason)
              }
              if(result){
                LocalState.set('ACCOUNTS_SUCCESS_BETA_SIGNUP', result)
              }
            })
          } else {
            LocalState.set('ACCOUNTS_ERROR_BETA_SIGNUP', "This username has already been reserved.")
          }
        })
      } else {
        LocalState.set('ACCOUNTS_ERROR_BETA_SIGNUP', "This email has already been registered.")
      }
    })
  },
  resetPassword({LocalState}, token, password){
    Accounts.resetPassword(token, password, function(error){
      if(error){
        LocalState.set('ACCOUNTS_ERROR_RESET_PASSWORD', error.reason)
      } else {
        browserHistory.push('dashboard')
      }
    })
  },
  resetPasswordEmail({Meteor, LocalState}, email){
    Meteor.call("accounts.password.reset.email.send", email, (error, result)=>{
      if(error){
        LocalState.set('ACCOUNTS_ERROR_RESET_PASSWORD', error.reason)
      }
      if(result){
        LocalState.set('ACCOUNTS_SUCCESS_RESET_PASSWORD', 'E-mail was send')
        browserHistory.push('/')
      }
    })
  },
  verifyEmail({LocalState}, token){
    Accounts.verifyEmail(token, function(error){
      if (error){
        LocalState.set('ACCOUNTS_ERROR_EMAIL_VERIFYCATION', error.reason)
      } else {
        LocalState.set('ACCOUNTS_SUCCESS_EMAIL_VERIFYCATION', true)
      }
    })
  },
  clearErrors({LocalState}) {
    LocalState.set('CREATE_USER_ERROR', null)
    LocalState.set('LOGIN_ERROR', null)
    LocalState.set('ACCOUNTS_ERROR_PASSWORD_UPDATE', null)
    LocalState.set('ACCOUNTS_SUCCESS_PASSWORD_UPDATE', null)
    LocalState.set('ACCOUNTS_ERROR_BETA_SIGNUP', null)
    LocalState.set('ACCOUNTS_SUCCESS_BETA_SIGNUP', null)
    LocalState.set('ACCOUNTS_ERROR_RESET_PASSWORD', null)
    LocalState.set('ACCOUNTS_SUCCESS_RESET_PASSWORD', null)
    LocalState.set('ACCOUNTS_ERROR_EMAIL_VERIFYCATION', null)
    LocalState.set('ACCOUNTS_SUCCESS_EMAIL_VERIFYCATION', null)
    return LocalState.set('SAVING_ERROR', null)
  }
}
