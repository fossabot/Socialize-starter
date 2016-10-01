import React from 'react';
import { Materialize } from 'meteor/poetic:materialize-scss';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserChangeBio
 * @classdesc Change user biography
 */
export default class UserChangeBio extends React.Component {
  constructor(props) {
    super(props);
    $('#userBio').trigger('autoresize');
    Materialize.updateTextFields();
  }

  componentDidUpdate() {
    $('#userBio').trigger('autoresize');
    Materialize.updateTextFields();
  }

  /**
   * Changes currently logged in user's biography
   * @access private
   * @param {event} e Submit event from form
   */
  changeBio(e) {
    e.preventDefault();
    const bio = e.target.userBio.value;

    const { bioUpdate } = this.props;
    bioUpdate(bio);
  }

  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    return (
      <form method="post" className="row" ref="bioForm" onSubmit={this.changeBio.bind(this)}>
        <fieldset>
          <legend>Biography</legend>
          <Error error={this.props.error} success={this.props.success} />
          <div className="input-field col s12">
            <textarea
              id="userBio"
              name="userBio"
              className="materialize-textarea"
              defaultValue={this.props.profile.biography}
            />
            <label htmlFor="userBio" className="active">A little bit about yourself</label>
            <input type="submit" value="Change" className="btn waves-effect" />
          </div>
        </fieldset>
      </form>);
  }
}

UserChangeBio.propTypes = {
  bioUpdate: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
  profile: React.PropTypes.object.isRequired,
  success: React.PropTypes.string,
};
