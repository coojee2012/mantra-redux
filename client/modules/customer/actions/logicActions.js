/**
 * Created by LinYong on 2016/3/22.
 */
import customerReduxActions from './reduxActions';
export default {
  search(key) {
    return (dispatch) => {
      console.log('In loginc action :', key);
      setTimeout(() => {
        dispatch(customerReduxActions.search(key));
      }, 1000);
    };
  },
  setSearchKey(context, key) {
    return (dispatch) => {
      const {Meteor} = context();
      console.log('In loginc action setSearchKey:', key, Meteor);
      setTimeout(() => {
        dispatch(customerReduxActions.setSearchKey(key));
      }, 1000);
    };
  },
  searchCustomers(context, key) {
    return (dispatch) => {
      const {Meteor} = context();
      Meteor.call('customer.search',key, (err, result) => {
        console.log('customer.search:',err,result);
        dispatch(customerReduxActions.search(result));
      });
    };
  }
};
