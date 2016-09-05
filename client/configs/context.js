import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

// Redux
import {createStore} from 'redux';

const UserSubs = new SubsManager()
const ProfileSubs = new SubsManager()
const MessagesSubs = new SubsManager()

export default function ({reducer}) {
  return {
    Meteor,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker,
    Store: createStore(reducer),
    /* SUBS */
    UserSubs,
    ProfileSubs,
    MessagesSubs
  };
}
