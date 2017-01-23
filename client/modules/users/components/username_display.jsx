import React from 'react';
import { Link } from 'react-router';

// TODO display premium and admin graphics if applicable to user
class UsernameDisplay extends React.Component {
  render() {
    let avatar = null;
    if ( this.props.avatar ) {
      if (this.props.profile.avatar) {
        avatar = (<img src={this.props.profile.avatar} alt={this.props.user.username} className="circle" />);
      } else {
        avatar = (<i className="material-icons circle">account_circle</i>);
      }
    }

    return (
      <Link to={'/users/' + this.props.user.username}>
        {avatar}{this.props.user.username}
      </Link>
    );
  }
}

UsernameDisplay.propTypes = {
  avatar: React.PropTypes.bool,
  profile: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
};

UsernameDisplay.defaultProps = {
  avatar: false,
};

export default UsernameDisplay;
