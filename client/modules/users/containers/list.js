import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import UserList from '../components/list.jsx';

export const composer = ({ context, location }, onData) => {
  const { Meteor, UserSubs } = context();
  let page = 1;
  if (typeof location.query.page !== 'undefined') {
    page = Number(location.query.page);
  }
  const limit = 10;

  if (UserSubs.subscribe('users.list', page, limit).ready()) {
    const skip = (page - 1) * limit;
    // This will get 10 users without the current user
    const users = Meteor.users.find({ _id: { $nin: [Meteor.userId()] } }, { fields: { username: 1, createdAt: 1 }, limit, skip }).fetch();

    Meteor.call('users.count', (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result) {
        const totalUsers = result;
        onData(null, { users, totalUsers, page, limit });
      }
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserList);
