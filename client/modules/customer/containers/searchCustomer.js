/**
 * Created by LinYong on 2016/3/22.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reduxActionCreators from '../actions/reduxActions';
import logicActionCreators from '../actions/logicActions';
import searchCustomerApp from '../components/searchCustomer.jsx';

function select(state) {
  console.log('state:', state);
  return {
    visibleLists: state['customer'].lists,
    searchKey: state['customer'].searchKey
  };
}
function mapDispatchToProps(dispatch) {
  return {
    reduxActions: bindActionCreators(reduxActionCreators, dispatch),
    logicActions: bindActionCreators(logicActionCreators, dispatch)
  };
}

export const composer = ({context}, onData) => {
  const {Store} = context();
  console.log('todo container store:', Store);
  onData(null, {
    searchKey: '',
    lists: []
  });
  return Store.subscribe(() => {
    const allState = Store.getState();
    console.log('sub todos container :', allState);
    onData(null, allState);
  });
};

export const depsMapper = (context, actions) => {
  console.log('注入action函数:', actions);
  return {
    context: () => context
  };
}


// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
//export const App connect(select,mapDispatchToProps)(App);
export default composeAll(
  compose(composer),
  useDeps(depsMapper)
)(connect(select, mapDispatchToProps)(searchCustomerApp));
