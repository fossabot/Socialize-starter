import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import UserNewConversation from '../components/conversation_new.jsx';

export const composer = ({ context, recipients, clearErrors }, onData) => {
  const { Meteor, LocalState } = context();

  /**
   * TODO move user search sub fully here?
   */
  if (LocalState.get('CONVERSATION_USER_SEARCH')) {
    if (Meteor.subscribe('searchForUsers', LocalState.get('CONVERSATION_USER_SEARCH')).ready()) {
      const userSearchResults = Meteor.users.find({}).fetch();
      onData(null, { userSearchResults, recipients });
    }
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserNewConversation);
