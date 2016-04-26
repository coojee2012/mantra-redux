/**
 * Created by LinYong on 2016/3/22.
 */
import ReduxActions from './reduxActions';
import {TicketInfo} from '../configs/const';
import {createTicket as createTicketAPI} from 'meteor/helpdesk'
export default {
  createTicket(context, data) {
    const {Meteor, Store} = context;
    const dispatch = Store.dispatch;
    dispatch(ReduxActions.createTicketSaving());


    /*return new Promise((resolve,reject) => {
     const ticketObj = {
     "requester": data.contactId,
     "assignee": data.agents,
     "description":data.description,
     "group": data.groups,
     "subject": data.subject,
     "type": data.type,
     "state": data.ticketState,
     "priority": data.priority,
     "source": localStorage.getItem("source"),
     "attachments": []
     };
     createTicketAPI(ticketObj, (err, res)=> {
     if(err){
     try{
     const error = err.serverError.errors.shift();
     reject({[error.field]:error.message});
     }catch (e){
     reject(['保存失败']);
     }
     }else{
     resolve('success');
     }
     });
     });*/

    return (callback) => {
      const ticketObj = {
        "requester": data.contactId,
        "assignee": data.agents,
        "description": data.description,
        "group": data.groups,
        "subject": data.subject,
        "type": data.type,
        "state": data.ticketState,
        "priority": data.priority,
        "source": localStorage.getItem("source"),
        "attachments": []
      };
      createTicketAPI(ticketObj, (err, res)=> {
        console.log('ticket.create:', err, res);
        if (err) {
          dispatch(ReduxActions.createTicketError(err));
        } else {
          //dispatch(ReduxActions.createTicket(res));
          dispatch(ReduxActions.createTicketSaved());
          callback(err, res);
        }
      });
    };
  },
  resetSaveStatus({Meteor, dispatch}){

    dispatch(ReduxActions.resetSaveStatus());

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
  storeTicket({Meteor, dispatch}, ticket){
    dispatch(ReduxActions.storeTicket(ticket));
  },
  storeCustomer({Meteor, dispatch}, customer){
    dispatch(ReduxActions.storeCustomer(customer));
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
