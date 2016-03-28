import { CUSTOMER_SEARCH,CUSTOMER_SEARCH_KEY,CUSTOMER_CREATE,CUSTOMER_SAVING,CUSTOMER_SAVE_DONE,CUSTOMER_EDIT} from './actionTypes';
export default {
  search(key) {
    console.log('In redux action fn:',key);
    return {type: CUSTOMER_SEARCH, key};
  },
  setSearchKey(key) {
    return {type: CUSTOMER_SEARCH_KEY, key};
  },
  createCustomerSaving(key){
    return {type: CUSTOMER_SAVING, key};
  },
  createCustomerSaved(key){
    return {type: CUSTOMER_SAVE_DONE, key};
  },
  createCustomerNew(key){
    return {type: CUSTOMER_CREATE, key};
  },
  editCustomer(key){
    return {type: CUSTOMER_EDIT, key};
  }
};
