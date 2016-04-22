import {
  CUSTOMER_SEARCH,
  CUSTOMER_SEARCH_KEY,
  CUSTOMER_CREATE,
  CUSTOMER_SAVING,
  CUSTOMER_SAVE_DONE,
  CUSTOMER_EDIT,
  CUSTOMER_SAVE_ERROR,
  CUSTOMER_SAVE_RESET,
  CUSTOMER_SEARCH_AUTO_DONE
} from './actionTypes';
export default {
  search(key) {
    console.log('In redux action fn:', key);
    return {type: CUSTOMER_SEARCH, key};
  },
  setSearchKey(key) {
    return {type: CUSTOMER_SEARCH_KEY, key};
  },
  setAutoSearchDone() {
    return {type: CUSTOMER_SEARCH_AUTO_DONE};
  },
  createCustomerSaving(){
    return {type: CUSTOMER_SAVING};
  },
  createCustomerSaved(){
    return {type: CUSTOMER_SAVE_DONE};
  },
  resetCustomerSaveStatus(){
    return {type: CUSTOMER_SAVE_RESET};
  },
  saveCustomerError(){
    return {type: CUSTOMER_SAVE_ERROR};
  },
  createCustomerNew(data){
    return {type: CUSTOMER_CREATE, data};
  },
  editCustomer(data){
    return {type: CUSTOMER_EDIT, data};
  }
};
