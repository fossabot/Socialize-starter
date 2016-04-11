import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/settings_email.jsx'

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context()
  const emails = Meteor.user().emails
  onData(null, {emails})
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
