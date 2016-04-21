/**
 * Created by LinYong on 2016/3/22.
 */
import customerReduxActions from './reduxActions';
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
      setTimeout(() => {
        dispatch(customerReduxActions.setSearchKey(key));
      }, 1000);
    };
  },
  resetSaveStatus({Meteor, dispatch}){
    return()=>{
      dispatch(customerReduxActions.resetCustomerSaveStatus());
    }
  },
  searchCustomers({Meteor, dispatch}, key) {
    return () => {
      Meteor.call('customer.search', key, (err, result) => {
        console.log('customer.search:', err, result);
        dispatch(customerReduxActions.setSearchKey(key));
        dispatch(customerReduxActions.search(result));
      });
    };
  },
  addCustomer({Meteor, dispatch}, data) {
    return (callback) => {
      dispatch(customerReduxActions.createCustomerSaving());
      Meteor.call('customer.create', data, (err, result) => {
        if (err) {
          dispatch(customerReduxActions.saveCustomerError());
        } else {
          dispatch(customerReduxActions.createCustomerNew(result));
          dispatch(customerReduxActions.createCustomerSaved());

        }
        callback(err, result);
      });
    };
  }
};
