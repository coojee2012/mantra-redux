
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER} from './actionTypes';
export default {
  addTodo(text) {
    return {type: ADD_TODO, text};
  },
  completeTodo(index) {
    return {type: COMPLETE_TODO, index};
  },
  setVisibilityFilter(filter) {
    return {type: SET_VISIBILITY_FILTER, filter};
  }

};
