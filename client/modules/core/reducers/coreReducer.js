/**
 * Created by LinYong on 2016/3/17.
 */
import { combineReducers } from 'redux';
import {CORE_GET_ROOM_ID,CORE_SET_ROOM_ID} from '../actions/actionTypes.js';
function roomId(state = {roomId:''}, action) {

  switch (action.type) {
    case CORE_SET_ROOM_ID:
      return Object.assign({}, state, {roomId:action.roomId});
    default:
      return state;
  }
}
export default combineReducers({
  roomId
});
