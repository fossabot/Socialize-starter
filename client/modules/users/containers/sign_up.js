import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import SignUp from '../components/sign_up.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('LOGIN_ERROR');
  onData(null, { error });

  return clearErrors();
};

export const depsMapper = (context, actions) => ({
  create: actions.user.create,
  clearErrors: actions.user.clearErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SignUp);
