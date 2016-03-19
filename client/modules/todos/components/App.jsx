import React,{ Component, PropTypes} from 'react';
import AddTodo from './AddToDo.jsx';
import TodoList from './TodoList.jsx';
import Footer from './Footer.jsx';
export  default class App extends Component {
  render() {
// Injected by connect() call
    console.log("TODO APP props:", this.props);
    const { dispatch, visibleTodos, visibilityFilter,actions} = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={text => actions.addTodo(text)}/>
        <TodoList
          todos={visibleTodos}
          onTodoClick={index => actions.completeTodo(index)}/>
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter => actions.setVisibilityFilter(nextFilter)}/>
      </div>
    );
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}
