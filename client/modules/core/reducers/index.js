/**
 * Created by LinYong on 2016/3/22.
 */
import coreReducer from './coreReducer';
import { combineReducers } from 'redux';
export default {
  core: combineReducers({
    coreReducer
  })
};
