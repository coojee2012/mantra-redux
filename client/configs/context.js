import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
//import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
// Redux
//import ReduxState from './ReduxState';
import {createStore} from 'redux';

export default function ({reducer}) {
  return {
    Meteor,
   // FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Store: createStore(reducer),
   //ReduxState: new ReduxState(),
    Tracker
  };
}
