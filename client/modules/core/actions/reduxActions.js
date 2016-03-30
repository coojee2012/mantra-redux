/**
 * Created by LinYong on 2016/3/30.
 */
import {CORE_GET_ROOM_ID,CORE_SET_ROOM_ID} from '../actions/actionTypes.js';
export default {
  getRoomId(){
    return {type: CORE_GET_ROOM_ID};
  },
  setRoomId(id){
    return {type: CORE_SET_ROOM_ID,id};
  }
};
