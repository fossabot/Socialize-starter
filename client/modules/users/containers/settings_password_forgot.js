import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import SettingsPasswordForgot from '../components/settings_password_forgot.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('ACCOUNTS_ERROR_RESET_PASSWORD');
  const success = LocalState.get('ACCOUNTS_SUCCESS_RESET_PASSWORD');

  onData(null, { error, success });
  return clearErrors();
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  resetPasswordEmail: actions.users.resetPasswordEmail,
  clearErrors: actions.users.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsPasswordForgot);
