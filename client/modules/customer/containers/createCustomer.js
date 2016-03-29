/**
 * Created by LinYong on 2016/3/28.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reduxActionCreators from '../actions/reduxActions';
import logicActionCreators from '../actions/logicActions';
import createCustomerApp from '../components/createCustomer.jsx';
import Loading from '../components/loading.jsx';
import ErrorUI from '../components/error.jsx';

const mapStateToProps = (state) => {
  console.log('create customer container state:', state);
  return {
    customerInfo: state.customer.createReducer.customerInfo,
    saveStatus: state.customer.createReducer.saveStatus,
    createOrEdit:state.customer.createReducer.createOrEdit
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    reduxActions: bindActionCreators(reduxActionCreators, dispatch),
    logicActions: bindActionCreators(logicActionCreators, dispatch)
  };
}
const onPropsChange = (props, onData) => {
  const {context} = props;
  const {Store} = context();
  //console.log('create customer container store:', props,Store);
  onData(null, Store.getState().customer);
  return Store.subscribe(() => {
    const allState = Store.getState();
    //console.log('onPropsChange sub customer container :', allState);
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
  compose(onPropsChange, Loading, ErrorUI),
  useDeps(depsMapper)
)(createCustomerApp);
