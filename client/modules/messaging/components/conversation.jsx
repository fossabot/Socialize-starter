import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import sanitizeHtml from 'sanitize-html';

import ConversationParticipants from '../containers/conversation_participants.js';
import ConversationMessages from '../containers/conversation_messages.js';
import ConversationReply from '../containers/conversation_reply.js';

/**
 * @class component UserConversation
 * @classdesc Component to display a full user conversation.
 */
export default class UserConversation extends React.Component {
  constructor(props) {
    super(props);

    this.showOlder = this.showOlder.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      viewing: null,
      typing: null,
    };
  }

  componentWillUnmount() {
    const {resetLimit} = this.props;
    resetLimit();
  }

  showOlder(e) {
    e.preventDefault();
    const { increaseLimit } = this.props;
    increaseLimit(10);
  }

  getMessages() {
    const { messages } = this.props;
    return messages.map((msg) => {
      const user = msg.user();

      return (<div key={msg._id} className="row">
        <div className="col s10"><strong>{user.username}:</strong> {msg.body}</div>
        <div className="col s2">{moment(msg.date).fromNow()}</div>
      </div>);
    });
  }

  sendMessage(e) {
    e.preventDefault();
    // get message
    let msg = $('#messageToSend').val();

    // sanitize
    msg = sanitizeHtml(msg);

    // send the message
    const send = this.props.conversation.sendMessage;
    send(msg);

    // increase the limit so the current conversation stays on the screen
    const { increaseLimit } = this.props;
    increaseLimit(1);

    // reset the text field
    $('#messageToSend').val('');

    // update the total message count
    // TODO: figure a better way that is not too taxing on the servers
    // to count messages whenever any user adds a message
    // currently this is not very accurate if the user doesn't post much and the other post a lot
    Meteor.call('pm.conversation.count', this.props.conversationId, (error, result) => {
      if (error) {
        // console.log(error);
      }
      if (result) {
        this.setState({
          msgTotal: result,
        });
      }
    });
  }

  render() {
    let showOlder;

    if (this.props.totalMessages > this.props.msgLimit) {
      showOlder = <a className="center-align" href="#!" onClick={this.showOlder}>Show older messages.</a>;
    }

    return (<div>
      <Helmet
        title="Conversation"
      />
      <div className="row">
        <div className="col s12 m10 l10">
          <div className="card-panel chatWindow">
            {showOlder}
            <ConversationMessages conversationId={this.props.conversationId} msgLimit={this.props.msgLimit} />
          </div>
        </div>
        <div className="chatParticipants col hide-on-small-only m2 l2">
          <ConversationParticipants conversationId={this.props.conversationId} />
        </div>
      </div>

      <ConversationReply conversationId={this.props.conversationId} />
    </div>);
  }
}

UserConversation.propTypes = {
  conversation: React.PropTypes.object,
  conversationId: React.PropTypes.string,
  increaseLimit: React.PropTypes.func.isRequired,
  messages: React.PropTypes.array,
  msgLimit: React.PropTypes.number,
  resetLimit: React.PropTypes.func.isRequired,
  totalMessages: React.PropTypes.number,
};
