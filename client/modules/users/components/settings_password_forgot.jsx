import React from 'react'
import Helmet from 'react-helmet'
import Error from '../../core/components/error.jsx'

/**
 * @class component ForgotPassword
 * @classdesc A form to fill in e-mail to send reset password link to.
 */
export default class ForgotPassword extends React.Component{
  constructor(props){
    super(props)
    this.sendReset = this.sendReset.bing(this)
  }

  sendReset(e){
    e.preventDefault()

    let email = e.target.email.value

    const {resetPasswordEmail} = this.props
    resetPasswordEmail(email)
    e.target.reset()
  }

  render(){
    return <form method="post" onSubmit={this.sendReset} className="row">
      <Helmet
        title="Forgot password"
      />
      <h2 className="center-align">Reset password</h2>
      <Error error={this.props.error} success={this.props.success} />
      <div className="input-field col s12 m10">
        <i className="material-icons prefix">mail</i>
        <input type="email" name="email" className="validate" />
        <label htmlFor="email">Your e-mail</label>
      </div>
      <div className="input-field col s12 m2">
        <input type="submit" value="submit" className="btn waves-effect waves-light" />
      </div>
    </form>
  }
}
