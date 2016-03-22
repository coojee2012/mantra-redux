import { CUSTOMER_SEARCH,CUSTOMER_SEARCH_KEY} from './actionTypes';
export default {
  search(key) {
    console.log('In redux action fn:',key);
    return {type: CUSTOMER_SEARCH, key};
  },
  setSearchKey(key) {
    return {type: CUSTOMER_SEARCH_KEY, key};
  }
};
