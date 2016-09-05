import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Navigation from '../components/navigation.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  const user = Meteor.user()
  onData(null, {user})
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Navigation);