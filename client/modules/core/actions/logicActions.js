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
    let clonedObj = {_id:roomId,states};
    //此处对states的修改直接会影响到Store的state数据,所以,不建议修改sates的数据
    //Object.assign(clonedObj, states);
    //Logger('切换房间,保存状态:', clonedObj);
    //clonedObj.core.coreReducer.roomId = roomId;
    const statesJsonStr = JSON.stringify(clonedObj);
    localStorage.setItem(roomId, statesJsonStr);
  }
};
