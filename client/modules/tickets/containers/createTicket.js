/**
 * Created by LinYong on 2016/3/28.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import { bindActionCreators } from 'redux';
import reduxActionCreators from '../actions/reduxActions';
import logicActionCreators from '../actions/logicActions';
import CreateTicketApp from '../components/createTicket.jsx';
import Loading from '../components/loading.jsx';
import ErrorUI from '../components/error.jsx';

const onPropsChange = (props, onData) => {
  const {context} = props;
  const {Store} = context();
  console.log('create ticket container onPropsChange store:', props,Store);
  onData(null, Store.getState().ticket);
  return Store.subscribe(() => {
    const allState = Store.getState();
    console.log('onPropsChange sub ticket container :', allState);
    onData(null, Store.getState().ticket);
  });
}
export const depsMapper = (context, actions) => {
  console.log('All Actions:',actions);
  return {
    LogicActions:actions.ticketLogicActions,
    context: () => context
  };
}
export default composeAll(
  compose(onPropsChange, Loading, ErrorUI),
  useDeps(depsMapper)
)(CreateTicketApp);

