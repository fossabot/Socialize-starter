import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SettingsPasswordSet from '../components/settings_password_set.jsx';

export const composer = ({context, clearErrors}, onData) => {
  //const {} = context();

  onData(null, {});
  return clearErrors()
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  clearErrors: actions.settings.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsPasswordSet);
