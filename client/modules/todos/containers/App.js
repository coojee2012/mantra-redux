/**
 * Created by LinYong on 2016/3/17.
 */
import { useDeps, compose, composeAll } from 'mantra-core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { VisibilityFilters } from '../configs/const';
import actionCreators from '../actions/actionFns';
import App from '../components/App.jsx';


function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  console.log('state:', state);
  return {
    visibleTodos: selectTodos(state.aa.todos, state.aa.visibilityFilter),
    visibilityFilter: state.aa.visibilityFilter
  }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}


export const composer = ({context}, onData) => {
  const {Meteor, Collections,ReduxState} = context();
  const store = ReduxState.Store();
  console.log('todo container store:', store);
  onData(null, {
    visibilityFilter: 'SHOW_ALL',
    todos: []
  });
  return store.subscribe(() => {

    const allState = store.getState();
    console.log('sub todos container :', allState);
    onData(null, allState);
  });
};

export const depsMapper = (context, actions) => {
  console.log('注入action函数:', actions);
  return {
    //...actions.todosActions,
    context: () => context
  };
}


// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
//export const App connect(select,mapDispatchToProps)(App);
export default composeAll(
  compose(composer),
  useDeps(depsMapper)
)(connect(select, mapDispatchToProps)(App));
