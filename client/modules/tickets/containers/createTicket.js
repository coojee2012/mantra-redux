/**
 * Created by LinYong on 2016/3/28.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import CreateTicket from '../components/createTicket.jsx';
import {Error, Loading} from '../../UI';
import {Logger} from '../../tools';

const onPropsChange = (props, onData) => {
  const {context} = props;
  const {Store} = context();
  onData(null, Store.getState().ticket);
  return Store.subscribe(() => {
    const allState = Store.getState();
    onData(null, Store.getState().ticket);
  });
}
export const depsMapper = (context, actions) => {
  return {
    LogicActions:actions.ticketLogicActions,
    context: () => context
  };
}
export default composeAll(
  compose(onPropsChange, Loading, Error),
  useDeps(depsMapper)
)(CreateTicket);

