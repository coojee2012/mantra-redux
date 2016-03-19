/**
 * Created by linyong on 16/3/17.
 */
import { createStore } from 'redux';
import { combineReducers } from 'redux';
export default class {
  constructor() {
    this.reducers = {};
    this._isStored = false;
    this.store = null;
  }

  getRootReducers() {
    return combineReducers(this.reducers);
  }

  getReducers() {

  }

  setReducer(k, v) {
    this.reducers[k] = v;
  }

  Store() {
    if (!this._isStored) {
      this.store = createStore(this.getRootReducers());
      this._isStored = true;
      return this.store;
    } else {
      return this.store;
    }
  }

}
