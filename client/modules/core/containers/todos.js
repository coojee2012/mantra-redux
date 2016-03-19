/**
 * Created by linyong on 16/3/18.
 */
import Todo from '../components/todos.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = (props, onData) => {

  onData(new Error('Oops'));
  setInterval(() => {
    let xname = name + new Date();
    onData(null, {name: xname});
  }, 100);
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Todo);
