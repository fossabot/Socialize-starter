import React from 'react';
import { Link } from 'react-router';
/**
 * @class component ConversationParticipants
 * @classdesc Lists conversation participants
 * TODO Show status ("typing", etc.) by each user
 */
export default class ConversationParticipants extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const participants = this.props.conversation.participants().map((participant) => {
      // get username and avatar
      return (<li className="collection-item avatar" key={participant._id}>
        <Link to={'/users' + participant.user().username}>
          <i className="material-icons circle">person</i>
          <span className="title">{participant.user().username}</span>
        </Link>
      </li>);
    });

    return <div className="collection">{participants}</div>;
  }
}

ConversationParticipants.propTypes = {
  conversation: React.PropTypes.object.isRequired,
};
