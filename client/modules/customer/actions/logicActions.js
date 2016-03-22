/**
 * Created by LinYong on 2016/3/22.
 */
import customerReduxActions from './reduxActions';
export default {
  search(key) {
    return (dispatch) => {
      console.log('In loginc action :',key);
      setTimeout(() => {
        dispatch(customerReduxActions.search(key));
      }, 1000);
    };
  }
};
