import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserList from '../components/list.jsx';

export const composer = ({context, page}, onData) => {
  const {Meteor, UserSubs} = context()
  // TODO: Make sure that page prop is properly recieved
  let limit = 10
  let pg = Number(page)

  if(UserSubs.subscribe("users.list", pg, 10).ready()){
    let skip = (pg - 1) * limit
    const users =  Meteor.users.find({_id: {$nin: [Meteor.userId()]}}, {fields: {username: 1, createdAt: 1}, limit: limit, skip: skip})

    Meteor.call("users.count", (error, result)=>{
      if(error){
        console.log(error)
        //onData()
      }
      if(result){
        const totalUsers = result
        onData(null, {users, totalUsers, page})
      }
    })
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserList);
