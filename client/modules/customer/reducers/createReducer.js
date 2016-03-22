/**
 * Created by LinYong on 2016/3/17.
 */
import { combineReducers } from 'redux';
import { CUSTOMER_CREATE ,CUSTOMER_EDIT} from '../actions/actionTypes.js';


function addCustomer(state = {}, action) {
  switch (action.type) {
    case CUSTOMER_CREATE:
      return
      Object.assign({}, state, {
        completed: true
      });
    default:
      return state;
  }
}

function editCustomer(state = {}, action) {
  switch (action.type) {
    case CUSTOMER_EDIT:
      return
      Object.assign({}, state, {
        completed: true
      });
    default:
      return state;
  }
}


export default combineReducers({
  editCustomer,
  addCustomer
});
