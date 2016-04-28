/**
 * Created by LinYong on 2016/3/11.
 */
import Main_Layout from '../components/main_layout.jsx';
import {Error, Loading} from '../../UI';
import {useDeps, compose, composeAll} from 'mantra-core';

const onPropsChange = (props, onData) => {
  const {context} = props;
  const {Store} = context();
  onData(null, Store.getState().core);
  //TODO filter
  return Store.subscribe(() => {
    const allState = Store.getState();
    onData(null, allState.core);
  });
}
export const depsMapper = (context, actions) => {
  return {
    ...actions.coreLogicActions,
    context: () => context
  };
}

export default composeAll(
  compose(onPropsChange,Loading,Error),
  useDeps(depsMapper)
)(Main_Layout);
