/**
 * Created by linyong on 16/3/17.
 */
import actions from './actions';
import todoApp from './reducers/reducers';
import loadReducer from '../../configs/ReduxState';

export default {
  actions,
  load(context) {
    context.ReduxState.setReducer('aa',todoApp);
  }
};
