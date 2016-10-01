import React from 'react';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserEmail
 * @classdesc Shows e-mails associated with the account and allows to add more or delete them.
 */
export default class UserEmail extends React.Component {
  constructor() {
    super();

    this.verification.bind(this);
  }
  /**
   * Prepares the list of e-mails for display
   * @access private
   * @returns {jsx}
   */
  getEmails(emails) {
    if (Meteor.user() !== undefined) {
      return emails.map((email) => {
        let verified = null;
        if (email.verified) {
          verified = (<i className="material-icons green-text">check</i>);
        } else {
          verified = (<div className="chip red darken-1">
            <span className="link" onClick={this.verification.bind(this, email.address)}>not verified</span>
          </div>);
        }
        return (<li key={email.address} className="collection-item">
          {email.address} {verified}
          <div className="secondary-content">
            <span className="link" onClick={this.removeEmail.bind(this, email.address)}>
              <i id={email.address} className="material-icons">delete</i>
            </span>
          </div>
        </li>);
      });
    } else {
      // TODO add Loader here
      return <div>Loading...</div>;
    }
  }

  /**
   * Removes the particular e-mail that was clicked
   * @access private
   */
  removeEmail(email) {
    const { removeEmail } = this.props;
    removeEmail(email);
  }

  /**
   * Adds the inputed e-mail to the list and creates a Materialize toast with the result
   * @access private
   * @param {event} e Submit event from form
   */
  addEmail(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const { addEmail, verify, emails } = this.props;

    let exists = false;
    for (let i = 0; i < emails.length; i++) {
      if (emails[i].address === email) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      addEmail(email);
      verify(email);
    }

    e.target.reset();
  }

  /**
   * @access private
   */
  verification(email) {
    const { verify } = this.props;
    verify(email);
  }

  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    return (
      <form method="post" className="row" ref="emailForm" onSubmit={this.addEmail.bind(this)}>
        <fieldset>
          <legend>E-mails</legend>
          <Error error={this.props.error} success={this.props.success} />
          <ul className="collection with-header col s12">
            <li className="collection-header">E-mails associated with your account</li>
            {this.getEmails(this.props.emails)}
          </ul>
          <div className="input-field col s12">
            <input type="email" className="validate" required name="email" />
            <label htmlFor="email">Add e-mail</label>
          </div>
          <input type="submit" className="btn waves-effect waves-light" value="Add" />
        </fieldset>
      </form>);
  }
}

UserEmail.propTypes = {
  addEmail: React.PropTypes.func.isRequired,
  emails: React.PropTypes.array.isRequired,
  error: React.PropTypes.string,
  removeEmail: React.PropTypes.func.isRequired,
  success: React.PropTypes.string,
  verify: React.PropTypes.func.isRequired,
};
