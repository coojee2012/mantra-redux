/**
 * Created by LinYong on 2016/3/17.
 */
import {combineReducers} from 'redux';
import {
  CUSTOMER_EDIT,
  CUSTOMER_CREATE,
  CUSTOMER_SAVING,
  CUSTOMER_SAVE_DONE,
  CUSTOMER_SAVE_ERROR,
  CUSTOMER_SAVE_RESET
} from '../actions/actionTypes.js';
import {CustomerInfo} from '../configs/const';

function customerInfo(state = CustomerInfo, action) {
  switch (action.type) {
    case CUSTOMER_EDIT:
      return Object.assign({}, state, action.data);
    case CUSTOMER_CREATE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function saveStatus(state = 0, action) {
  switch (action.type) {
    case CUSTOMER_SAVING:
      return 1;
    case  CUSTOMER_SAVE_DONE:
      return 2;
    case CUSTOMER_SAVE_ERROR:
      return -1;
    case CUSTOMER_SAVE_RESET:
      return 0;
    default:
      return state;
  }
}

function createOrEdit(state = 0, action) {
  switch (action.type) {
    case CUSTOMER_EDIT:
      return 1;
    default:
      return state;
  }
}


export default combineReducers({
  customerInfo,
  saveStatus,
  createOrEdit
});
