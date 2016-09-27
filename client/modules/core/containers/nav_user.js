import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import NavUser from '../components/nav_user.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  const user = Meteor.user();
  onData(null, { user });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NavUser);
