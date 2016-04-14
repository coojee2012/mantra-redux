/**
 * Created by linyong on 16/4/14.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import createCustomerApp from '../components/customerForm.jsx';
import {Error, Loading} from '../../UI';
import {Logger} from '../../tools';
const onPropsChange = (props, onData) => {
  const {context} = props;
  const {Store} = context();
  Logger({msg:'edit customer container store:', props,Store});
  onData(null, Store.getState().customer);
  return Store.subscribe(() => {
    const allState = Store.getState();
    Logger({msg:'onPropsChange sub edit customer container :', allState});
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
)(createCustomerApp);
