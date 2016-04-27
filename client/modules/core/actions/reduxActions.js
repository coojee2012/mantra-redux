/**
 * Created by LinYong on 2016/3/30.
 */
import {CORE_SET_ROOM_ID} from '../actions/actionTypes.js';
export default {
  setRoomId(roomId){
    return {type: CORE_SET_ROOM_ID,roomId};
  }
};
