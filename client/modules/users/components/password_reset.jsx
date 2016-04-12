import React from 'react'
import {Accounts} from 'meteor/accounts-base'
import {Materialize} from 'meteor/poetic:materialize-scss'
/**
 * @class component SetPassword
 * @classdesc Component where users can reset their password.
 */
export default class SetPassword extends React.Component{
  setPassword(e){
    e.preventDefault()

    let pass1 = e.target.pass1.value
    let pass2 = e.target.pass2.value

    if(pass1 === pass2){
      if(this.props.token){
        Accounts.resetPassword(this.props.token, pass1, function(){
           Materialize.toast("Passwords set!", 5000)
           FlowRouter.go('/')
        })
      }
      // for future actions like enrollment

      FlowRouter.go('/')
    } else {
      Materialize.toast("Passwords don't match!", 5000)
      e.target.reset()
    }
  }
  render(){
    return <form method="post" onSubmit={this.setPassword.bind(this)}>
      <div className="input-field">
        <input type="password" name="pass1" className="validate" />
        <label htmlFor="pass1">New password</label>
      </div>
      <div className="input-field">
        <input type="password" name="pass2" className="validate" />
        <label htmlFor="pass2">Repeat password</label>
      </div>
      <div className="input-field right-align">
        <input type="submit" className="btn waves-effect waves-light" />
      </div>
    </form>
  }
}
