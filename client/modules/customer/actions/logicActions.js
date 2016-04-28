/**
 * Created by LinYong on 2016/3/22.
 */
import customerReduxActions from './reduxActions';
import {createContact}   from 'meteor/helpdesk';
import {Logger} from '../../tools';
export default {
  search({dispatch}, key) {
    return () => {
        dispatch(customerReduxActions.search(key));
    };
  },
  setSearchKey({dispatch}, key) {
    return () => {
      dispatch(customerReduxActions.setSearchKey(key));
    };
  },
  resetSaveStatus({dispatch}){
    return ()=> {
      dispatch(customerReduxActions.resetCustomerSaveStatus());
    }
  },
  searchCustomers({Meteor, dispatch}, key, isAuto = false) {
    return () => {
      Meteor.call('customer.search', key, (err, result) => {
        Logger('customer.search:', err, result);
        dispatch(customerReduxActions.setSearchKey(key));
        dispatch(customerReduxActions.search(result));
        if (isAuto) {
          dispatch(customerReduxActions.setAutoSearchDone());
        }
      });
    };
  },
  addCustomer({dispatch}, data, username) {
    return (callback) => {
      dispatch(customerReduxActions.createCustomerSaving());
      createContact(data, username, (e, r)=> {
        Logger('customer.create:', e, r);
        if (e) {
          dispatch(customerReduxActions.saveCustomerError());
        } else {
          dispatch(customerReduxActions.createCustomerNew(r));
          dispatch(customerReduxActions.createCustomerSaved());
        }
        callback(e, r);
      });
    };
  }
};
