import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'
import Error from '../../core/components/error.jsx'

/**
 * @class component UserChangeUsername
 * @classdesc Allows user to change username
 */
export default class UserChangeUsernane extends React.Component{
  /**
   * Changes currently logged in user's username
   * @access private
   * @param {event} e Submit event from form
   */
  changeUsername(e){
    e.preventDefault()
    let username = e.target.username.value
    const {changeUsername} = this.props
    changeUsername(username)
  }
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render(){
    return (
      <form method="post" className="row" ref="usernameForm" onSubmit={this.changeUsername.bind(this)}>
        <fieldset>
          <legend>Change Username</legend>
          <Error error={this.props.error} success={this.props.success} />
          <div className="input-field col s12">
            <input type="text" className="validate" name="username" defaultValue={this.props.currentUsername}></input>
            <label htmlFor="username" className="active">Username</label>
            <input type="submit" value="Change" className="btn waves-effect"></input>
          </div>
        </fieldset>
      </form>)
  }
}
