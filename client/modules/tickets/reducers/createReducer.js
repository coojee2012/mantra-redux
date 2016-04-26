/**
 * Created by LinYong on 2016/3/17.
 */
import {combineReducers} from 'redux';
import {
  TICKET_CREATE,
  TICKET_SAVING,
  TICKET_SAVE_DONE,
  TICKET_SAVE_RESET,
  TICKET_INFO,
  TICKET_INIT,
  TICKET_STORE,
  TICKET_CREATE_ERROR,
  TICKET_INIT_SELECT_OPTIONS
} from '../actions/actionTypes.js';
import {
  TICKET_EDITTING_CUSTOMER,
  TICKET_EDIT_CUSTOMER_DONE,
  TICKET_EDIT_CUSTOMER_ERROR,
  TICKET_EDIT_CUSTOMER,
  TICKET_INIT_CUSTOMER,
  TICKET_STORE_CUSTOMER,
  TICKET_INIT_CUSTOMER_DOING,
  TICKET_INIT_CUSTOMER_DONE,
  TICKET_INIT_CUSTOMER_ERROR,
  TICKET_EDIT_CUSTOMER_RESET
} from '../actions/actionTypes.js';
import {TicketInfo, CustomerInfo} from '../configs/const';

function ticketInfo(state = TicketInfo, action) {
  switch (action.type) {
    case TICKET_INFO:
      return Object.assign({}, state, action.data);
    case TICKET_INIT:
      return Object.assign({}, state, action.data);
    case TICKET_STORE:
      return Object.assign({}, state, action.data);
    case TICKET_CREATE:
      return Object.assign({}, state, action.doc);
    default:
      return state;
  }
}

function selectOptions(state = {}, action) {
  switch (action.type) {
    case TICKET_INIT_SELECT_OPTIONS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function customerInfo(state = CustomerInfo, action) {
  switch (action.type) {
    case TICKET_INIT_CUSTOMER:
      return Object.assign({}, state, action.data);
    case TICKET_EDIT_CUSTOMER:
      return Object.assign({}, state, action.data);
    case TICKET_STORE_CUSTOMER:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function initCustomerStatus(state = 0, action) {
  switch (action.type) {
    case TICKET_INIT_CUSTOMER_DOING:
      return 1;
    case TICKET_INIT_CUSTOMER_DONE:
      return 2;
    case TICKET_INIT_CUSTOMER_ERROR:
      return -1;
    default:
      return state;
  }
}

function editCustomerStatus(state = 0, action) {
  switch (action.type) {
    case TICKET_EDITTING_CUSTOMER:
      return 1;
    case  TICKET_EDIT_CUSTOMER_DONE:
      return 2;
    case  TICKET_EDIT_CUSTOMER_ERROR:
      return -1;
    case TICKET_EDIT_CUSTOMER_RESET:
      return 0;
    default:
      return state;
  }
}

function saveStatus(state = 0, action) {
  switch (action.type) {
    case TICKET_SAVING:
      return 1;
    case  TICKET_SAVE_DONE:
      return 2;
    case  TICKET_CREATE_ERROR:
      return -1;
    case TICKET_SAVE_RESET:
      return 0;
    default:
      return state;
  }
}


export default combineReducers({
  ticketInfo,
  customerInfo,
  saveStatus,
  editCustomerStatus,
  initCustomerStatus,
  selectOptions
});
