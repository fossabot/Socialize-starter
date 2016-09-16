import React from 'react'
import {Link} from 'react-router'
import Error from '../../core/components/error.jsx'
import Helmet from 'react-helmet'

/**
 * @class component UserRegister
 * @classdesc User registration form.
 */
class UserRegister extends React.Component{
  /**
   * Registers a new user in the system.
   * @access private
   * @param {event} e Submit event from form
   */
  register(e){
    e.preventDefault()
    //get the data
    let username = e.target.username.value
    let email = e.target.email.value
    let password = e.target.password.value
    let password2 = e.target.password2.value

    const {create} = this.props

    create(username, email, password, password2)
  }
  /**
   * Render the registration form.
   * @access private
   */
  render(){
    return (
      <div className="row">
        <Helmet
          title="Register"
        />
        <div className="col s12 m8 offset-m2 l4 offset-l4 center-align">
          <h1>Register</h1>
          <Error error={this.props.error} />
          <form onSubmit={this.register.bind(this)}>
            <div className="input-field col s12 left-align">
              <input className="validate" type="text" id="username" name="username" required />
              <label htmlFor="username">Your username</label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="email" name="email" required />
              <label htmlFor="email">Your e-mail</label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="password" name="password" required />
              <label htmlFor="password">Your password</label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="password" name="password2" required />
              <label htmlFor="password2">Repeat your password</label>
            </div>
            <div className="expanded button-group">
              <Link to={"login"} className="waves-effect waves-teal btn-flat">Login</Link>
              <input type="submit" value="Create account" className="btn waves-effect"></input>
            </div>
          </form>
        </div>
      </div>)
  }
}

export default UserRegister
