/**
 * Created by linyong on 16/3/19.
 */
import ReduxActions from './reduxActions';
import {Logger} from '../../tools';
export default {
  setRoomId({dispatch}, roomId) {
      dispatch(ReduxActions.setRoomId(roomId));
  },
  saveState({Store}, roomId){
    const states = Store.getState();
    Logger('切换房间,保存状态:', states);
    states.core.coreReducer.roomId = roomId;
    const statesJsonStr = JSON.stringify(states);
    localStorage.setItem(roomId, statesJsonStr);
  }
};
