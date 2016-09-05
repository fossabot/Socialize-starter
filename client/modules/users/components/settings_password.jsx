import React from 'react'
import Error from '../../core/components/error.jsx'
import {Materialize} from 'meteor/poetic:materialize-scss'

/**
 * @class component UserChangePassword
 * @classdesc Changes user password
 */
class UserChangePassword extends React.Component{
  /**
   * Changes user password
   * @access private
   * @param {event} Submit event from form.
   * @returns {null}
   */
  changePassword(event){
    event.preventDefault()

    let oldPassword = event.target.old.value
    let newPassword = event.target.new.value
    let newPasswordConfirm = event.target.repeat.value

    const {changePassword} = this.props

    if(newPassword === newPasswordConfirm){
      if(newPassword.length > 3 && oldPassword.length > 3){
        changePassword(oldPassword, newPassword)
      } else {
        // TODO: Display as error
        Materialize.toast('Password must be at least 4 characters long.', 5000)  
      }
    } else {
      // TODO: Display as error
      Materialize.toast('New password does not match!', 5000)
    }

    this.refs.passwordForm.reset()
  }
  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render(){
    return (
      <form method="post" className="row" ref="passwordForm" onSubmit={this.changePassword.bind(this)}>
        <fieldset>
          <legend>Change password</legend>
            <Error error={this.props.error} success={this.props.success} />
            <div className="input-field col s12">
              <input className="validate" type="password" name="old"></input>
              <label htmlFor="old">Current password</label>
            </div>
            <div className="input-field col s12">
              <input className="validate" type="password" name="new"></input>
              <label htmlFor="new">New password</label>
            </div>
            <div className="input-field col s12">
              <input className="validate" type="password" name="repeat"></input>
              <label htmlFor="repeat">Repeat new password</label>
            </div>
            <input className="btn waves-effect" value="Submit" type="submit"></input>
        </fieldset>
      </form>)
  }
}

export default UserChangePassword
