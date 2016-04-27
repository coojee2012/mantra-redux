/**
 * Created by LinYong on 2016/3/22.
 */
import customerReduxActions from './reduxActions';
import {createContact}   from 'meteor/helpdesk';
export default {
  search({Meteor, dispatch}, key) {
    return () => {
      console.log('In loginc action :', key);
      setTimeout(() => {
        dispatch(customerReduxActions.search(key));
      }, 1000);
    };
  },
  setSearchKey({Meteor, dispatch}, key) {
    return () => {
      console.log('In loginc action setSearchKey:', key, Meteor);
        dispatch(customerReduxActions.setSearchKey(key));
    };
  },
  resetSaveStatus({Meteor, dispatch}){
    return()=>{
      dispatch(customerReduxActions.resetCustomerSaveStatus());
    }
  },
  searchCustomers({Meteor, dispatch}, key,isAuto=false) {
    return () => {
      Meteor.call('customer.search', key,(err, result) => {
        console.log('customer.search:', err, result);
        dispatch(customerReduxActions.setSearchKey(key));
        dispatch(customerReduxActions.search(result));
        if(isAuto){
          dispatch(customerReduxActions.setAutoSearchDone());
        }

      });
    };
  },
  addCustomer({Meteor, dispatch}, data,username) {
    return (callback) => {
      dispatch(customerReduxActions.createCustomerSaving());
     /* Meteor.call('customer.create', data, (err, result) => {
        if (err) {
          dispatch(customerReduxActions.saveCustomerError());
        } else {
          dispatch(customerReduxActions.createCustomerNew(result));
          dispatch(customerReduxActions.createCustomerSaved());

        }
        callback(err, result);
      });*/

      createContact(data, username, (e, r)=> {
        if (e) {
          dispatch(customerReduxActions.saveCustomerError());
        } else {
          dispatch(customerReduxActions.createCustomerNew(result));
          dispatch(customerReduxActions.createCustomerSaved());
        }
        callback(e, r);
      });

    };
  }
};
