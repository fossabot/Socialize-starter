import React from 'react';
import { Materialize } from 'meteor/poetic:materialize-scss';

export default class Error extends React.Component {
  render() {
    if (this.props.success) {
      Materialize.toast(this.props.success, 4000);
      return null;
    }

    if (this.props.error) {
      return <div className="col s12 red darken-2"><p className="white-text">{this.props.error}</p></div>;
    } else {
      return null;
    }
  }
}

Error.propTypes = {
  error: React.PropTypes.string,
  success: React.PropTypes.string,
};
