/**
 * Created by LinYong on 2016/3/29.
 */
import actions from './actions';
import reducers from './reducers';
import methodStubs from './configs/method_stubs';
export default {
  actions,
  reducers,
  load(context) {
    methodStubs(context);
  }
};
