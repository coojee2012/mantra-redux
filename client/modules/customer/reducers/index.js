/**
 * Created by LinYong on 2016/3/22.
 */
import createReducer from './createReducer';
import editReducer from './editReducer';
import searchReducer from './searchReducer';
import { combineReducers } from 'redux';
export default {
  customer: combineReducers({
    createReducer,
    editReducer,
    searchReducer
  })
};
