/**
 * As per Mantra specs here we define what all of the files on the client side will have in common.
 */
import * as Collections from '/lib/collections'
import {Meteor} from 'meteor/meteor'
import {FlowRouter} from 'meteor/kadira:flow-router-ssr'
import {ReactiveDict} from 'meteor/reactive-dict'
import {Tracker} from 'meteor/tracker'

export default function(){
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker
  }
}
