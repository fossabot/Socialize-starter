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
  clearErrors({LocalState}) {
    LocalState.set('CREATE_USER_ERROR', null)
    LocalState.set('LOGIN_ERROR', null)
    LocalState.set('ACCOUNTS_ERROR_PASSWORD_UPDATE', null)
    LocalState.set('ACCOUNTS_SUCCESS_PASSWORD_UPDATE', null)
    return LocalState.set('SAVING_ERROR', null)
  }
}
