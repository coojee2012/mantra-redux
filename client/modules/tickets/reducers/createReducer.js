/**
 * Created by LinYong on 2016/3/17.
 */
import { combineReducers } from 'redux';
import {TICKET_CREATE,TICKET_SAVING,TICKET_SAVE_DONE,TICKET_INFO,TICKET_CREATE_ERROR} from '../actions/actionTypes.js';
import {TicketInfo} from '../configs/const';

function ticketInfo(state = TicketInfo, action) {
  switch (action.type) {
    case TICKET_INFO:
      return Object.assign({}, state, action.old);
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
    default:
      return state;
  }
}

function create(state = TicketInfo, action) {
  switch (action.type) {
    case TICKET_CREATE:
      return Object.assign({}, state, action.doc);
    default:
      return state;
  }
}


export default combineReducers({
  ticketInfo,
  saveStatus,
  create
});
