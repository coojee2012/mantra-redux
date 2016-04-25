/**
 * Created by LinYong on 2016/3/22.
 */
import ReduxActions from './reduxActions';
import {TicketInfo} from '../configs/const';
export default {
  createTicket(context, data) {
    const {Meteor, Store} = context;
    const dispatch = Store.dispatch;
    dispatch(ReduxActions.createTicketSaving());
    return (callback) => {
      Meteor.call('ticket.create', data, (err, result) => {
        console.log('ticket.create:', err, result);
        if (err) {
          dispatch(ReduxActions.createTicketError(err));
        } else {
          dispatch(ReduxActions.createTicket(result));
          dispatch(ReduxActions.createTicketSaved());
          callback(err, result);
        }
      });

    };
  },
  initCustomer({Meteor, dispatch}, cid){
    dispatch(ReduxActions.initCustomerDoing());
    Meteor.call('customer.detail', cid, (err, result) => {
      console.log('customer.detail:', err, result);
      if (err) {
        dispatch(ReduxActions.initCustomerError());
      } else {
        dispatch(ReduxActions.initCustomer(result));
        dispatch(ReduxActions.initCustomerDone());
      }
    });
  },
  initTicket({Meteor, dispatch}, ticket){
    dispatch(ReduxActions.initTicket(ticket));
  },
  initSelectOptions({Meteor, dispatch}){
    return (callback) => {
      Meteor.call('ticket.configs', (err, result) => {
        console.log('ticket.configs:', err, result);
        if (err) {

        } else {
          dispatch(ReduxActions.initSelectOptions(result));
        }
        callback(err, result);
      });
    }
  },
  editCustomer({Meteor, dispatch}, data){
    dispatch(ReduxActions.editCustomerDoing());
    return (callback) => {
      Meteor.call('ticket.customer.edit', data, (err, result) => {
        console.log('ticket.customer.edit:', err, result);
        if (err) {
          dispatch(ReduxActions.editCustomerError());
        } else {
          dispatch(ReduxActions.editCustomer(result));
          dispatch(ReduxActions.editCustomerDone());
          callback(err, result);
        }
      });
    }
  }
};
