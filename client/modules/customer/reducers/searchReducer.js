/**
 * Created by LinYong on 2016/3/17.
 */
import { combineReducers } from 'redux';
import { CUSTOMER_SEARCH ,CUSTOMER_SEARCH_KEY} from '../actions/actionTypes.js';


function setSearchKey(state = '', action) {
  switch (action.type) {
    case CUSTOMER_SEARCH_KEY:
      return action.key;
    default:
      return state;
  }
}

function customerLists(state = [], action) {
  console.log('In reducer:',action);
  switch (action.type) {
    case CUSTOMER_SEARCH:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state;
  }
}


export default combineReducers({
  setSearchKey,
  customerLists
});
