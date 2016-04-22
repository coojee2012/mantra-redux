/**
 * Created by LinYong on 2016/3/17.
 */
import {combineReducers} from 'redux';
import {CUSTOMER_SEARCH, CUSTOMER_SEARCH_KEY, CUSTOMER_SEARCH_AUTO_DONE} from '../actions/actionTypes.js';


function setSearchKey(state = '', action) {
  switch (action.type) {
    case CUSTOMER_SEARCH_KEY:
      return action.key;
    default:
      return state;
  }
}

function autoSearchStatus(state = 0, action) {
  switch (action.type) {
    case CUSTOMER_SEARCH_AUTO_DONE:
      return 1;
    default:
      return state;
  }
}

function customerLists(state = [], action) {
  console.log('In reducer:', action);
  switch (action.type) {
    case CUSTOMER_SEARCH:
      return [
        ...action.key
      ]
    default:
      return state;
  }
}


export default combineReducers({
  setSearchKey,
  autoSearchStatus,
  customerLists
});
