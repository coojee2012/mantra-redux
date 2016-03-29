/**
 * Created by LinYong on 2016/3/22.
 */
import customerReduxActions from './reduxActions';
export default {
  search({Meteor,dispatch}, key) {
    return () => {
      console.log('In loginc action :', key);
      setTimeout(() => {
        dispatch(customerReduxActions.search(key));
      }, 1000);
    };
  },
  setSearchKey({Meteor,dispatch}, key) {
    return () => {
      console.log('In loginc action setSearchKey:', key, Meteor);
      setTimeout(() => {
        dispatch(customerReduxActions.setSearchKey(key));
      }, 1000);
    };
  },
  searchCustomers({Meteor,dispatch}, key) {
    return () => {
      Meteor.call('customer.search', key, (err, result) => {
        console.log('customer.search:', err, result);
        dispatch(customerReduxActions.search(result));
      });
    };
  },
  addCustomer({Meteor,dispatch}, key) {
    return () => {
      Meteor.call('customer.search', key, (err, result) => {
        console.log('customer.search:', err, result);
        dispatch(customerReduxActions.createCustomerNew(result));
      });
    };
  }
};
