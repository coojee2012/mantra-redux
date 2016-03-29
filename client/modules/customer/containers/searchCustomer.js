/**
 * Created by LinYong on 2016/3/22.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reduxActionCreators from '../actions/reduxActions';
import logicActionCreators from '../actions/logicActions';
import searchCustomerApp from '../components/searchCustomer.jsx';
import Loading from '../components/loading.jsx';
import ErrorUI from '../components/error.jsx';

function select(state) {
  console.log('state:', state);
  return {
    visibleLists: state['customer']['searchReducer'].customerLists,
    searchKey: state['customer']['searchReducer'].setSearchKey
  };
}
function mapDispatchToProps(dispatch) {
  return {
    reduxActions: bindActionCreators(reduxActionCreators, dispatch),
    logicActions: bindActionCreators(logicActionCreators, dispatch)
  };
}

export const onPropsChange = ({context}, onData) => {
  const {Store} = context();
  //console.log('todo container store:', Store);
  onData(null, {
    searchKey: '',
    visibleLists: []
  });
  return Store.subscribe(() => {
    const state = Store.getState();
    onData(null, {
      visibleLists: state['customer']['searchReducer'].customerLists,
      searchKey: state['customer']['searchReducer'].setSearchKey
    });
  });
};

export const depsMapper = (context, actions) => {
  console.log('注入的action函数:', actions);
  return {
    ...actions.customerLogicActions,
    context: () => context
  };
}


// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
//export const App connect(select,mapDispatchToProps)(App);
export default composeAll(
  compose(onPropsChange,Loading,ErrorUI),
  useDeps(depsMapper)
)(searchCustomerApp);
