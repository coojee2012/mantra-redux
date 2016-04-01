/**
 * Created by LinYong on 2016/3/11.
 */
import Main_Layout from '../components/main_layout.jsx';
import Loading from '../components/loading.jsx';
import Error from '../components/error.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

const onPropsChange = (props, onData) => {
  const {context} = props;
  const {Store} = context();
  onData(null, Store.getState().core);
  //TODO filter
  return Store.subscribe(() => {
    const allState = Store.getState();
    console.log('onPropsChange sub core container :', allState);
    onData(null, Store.getState().core);
  });
}
export const depsMapper = (context, actions) => {
  console.log('All Actions:',actions);
  return {
    ...actions.coreLogicActions,
    context: () => context
  };
}

export default composeAll(
  composeWithTracker(onPropsChange,Loading,Error),
  useDeps(depsMapper)
)(Main_Layout);
