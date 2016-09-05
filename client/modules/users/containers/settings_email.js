import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SettingsEmail from '../components/settings_email.jsx';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, LocalState} = context()
  let error = LocalState.get('ACCOUNTS_ERROR_EMAIL')
  let success = LocalState.get('ACCOUNTS_SUCCESS_EMAIL')
  
  if(Meteor.user()){
    const emails = Meteor.user().emails
    onData(null, {emails, error, success})
    return clearErrors()
  }
};

export const depsMapper = (context, actions) => ({
  verify: actions.settings.emailVerify,
  addEmail: actions.settings.emailAdd,
  removeEmail: actions.settings.emailRemove,
  context: () => context,
  clearErrors: actions.settings.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsEmail);
