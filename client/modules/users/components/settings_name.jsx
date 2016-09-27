import React from 'react';
import { Materialize } from 'meteor/poetic:materialize-scss';
import Error from '../../core/components/error.jsx';

export default class UserChangeName extends React.Component {
  /**
   * Functions that run every time the component updates
   * @access private
   */
  componentDidUpdate() {
    Materialize.updateTextFields();
  }

  /**
   * Changes currently logged in user's name
   * @access private
   * @param {event} e Submit event from form
   */
  changeName(e) {
    e.preventDefault();
    const given = e.target.given.value;
    const family = e.target.family.value;

    const { nameUpdate } = this.props;
    nameUpdate(given, family);
  }

  /**
   * Content to be displayed
   * @access private
   * @returns {jsx}
   */
  render() {
    let { givenName, familyName } = this.props.profile;

    return (
      <form method="post" className="row section" ref="usernameForm" onSubmit={this.changeName.bind(this)}>
        <fieldset>
          <legend>Real name</legend>
            <Error error={this.props.error} success={this.props.success} />
            <div className="input-field col s12 m6">
              <input type="text" name="given" className="validate" defaultValue={givenName} />
              <label htmlFor="given" className="active">Given Name</label>
            </div>
            <div className="input-field col s12 m6">
              <input type="text" name="family" className="validate" defaultValue={familyName} />
              <label htmlFor="family" className="active">Family Name</label>
            </div>
          <input type="submit" value="Change" className="btn waves-effect" />
        </fieldset>
      </form>);
  }
}
