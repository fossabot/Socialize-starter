import React from 'react'
import {Accounts} from 'meteor/accounts-base'

export default class EmailVerify extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return Accounts.verifyEmail(this.props.token, function(error){
      if(error){
        console.log(error)
        return <div>
          <h3>There was an error!</h3>
          <p>{error.reason}</p>
        </div>
      } else {
        FlowRouter.go('user-settings')
      }
    })
  }
}
