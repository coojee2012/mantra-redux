/**
 * Created by LinYong on 2016/3/28.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import createCustomer from '../components/createCustomer.jsx';
import {Error, Loading} from '../../UI';
import {Logger} from '../../tools';


const onPropsChange = (props, onData) => {
  const {context} = props;
  const {Store} = context();
  Logger({msg:'create customer container store:', props,Store});
  onData(null, Store.getState().customer);
  return Store.subscribe(() => {
    const allState = Store.getState();
    Logger({msg:'onPropsChange sub create customer container :', allState});
    onData(null, allState.customer);
  });
}
export const depsMapper = (context, actions) => {
  return {
    ...actions.customerLogicActions,
    context: () => context
  };
}
export default composeAll(
  compose(onPropsChange, Loading, Error),
  useDeps(depsMapper)
)(createCustomer);
