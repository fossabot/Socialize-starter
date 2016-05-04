import React from 'react'
/**
 * @class component ConversationParticipants
 * @classdesc Lists conversation participants
 * TODO Show status ("typing", etc.) by each user
 */
export default class ConversationParticipants extends React.Component{
  constructor(){
    super()
    this.getParticipants = this.getParticipants.bind(this)
  }
  
  getParticipants(){
    return this.props.conversation.participants().map((participant)=>{
      // get username and avatar
      return <li className="collection-item avatar" key={participant}>
        <a href={FlowRouter.path("profilePublic", {username: participant.user().username})}>
          <i className="material-icons circle">person</i>
          <span className="title">{participant.user().username}</span>
        </a>
      </li>
    })
  }

  render(){
    return <div className="collection">{this.getParticipants()}</div>
  }
}

ConversationParticipants.propTypes = {
  conversationId: React.PropTypes.string
}
