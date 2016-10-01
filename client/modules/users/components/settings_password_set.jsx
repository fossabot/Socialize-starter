import React from 'react';
import Helmet from 'react-helmet';
import { Materialize } from 'meteor/poetic:materialize-scss';
import Error from '../../core/components/error.jsx';
/**
 * @class component SetPassword
 * @classdesc Component where users can reset their password.
 */
export default class SetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.setPassword = this.setPassword.bind(this);
  }

  setPassword(e) {
    e.preventDefault();

    const pass1 = e.target.pass1.value;
    const pass2 = e.target.pass2.value;

    if (pass1 === pass2) {
      let { token } = this.props;
      if (token) {
        /**
         * TODO figure out why "3D" is added after "=" in url token creation
         * so that we don't have to doctor the token
         */
        if (token[0] === '3' && token[1] === 'D') {
          token = token.substr(2);
        }

        const { resetPassword } = this.props;

        resetPassword(token, pass1);
      }
      // TODO for future actions like enrollment
    } else {
      Materialize.toast('Passwords don\'t match!', 5000);
      e.target.reset();
    }
  }
  render() {
    return (<form method="post" onSubmit={this.setPassword}>
      <Helmet
        title="Set your password"
      />
      <Error error={this.props.error} />
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
    </form>);
  }
}

SetPassword.propTypes = {
  error: React.PropTypes.string,
  resetPassword: React.PropTypes.func.isRequired,
  token: React.PropTypes.string.isRequired,
};
