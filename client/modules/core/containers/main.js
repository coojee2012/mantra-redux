/**
 * Created by LinYong on 2016/3/11.
 */
import Main from '../components/main.jsx';
import Loading from '../components/loading.jsx';
import Error from '../components/error.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';




const onPropsChange = (props, onData) => {
  console.log('探测props的改变:',props);
  //onData(new Error());
  const handle = setInterval(() => {
    let xname = props.name +' '+ new Date();
    onData(null, {name: xname});
  }, 3000);
  const cleanup = () => clearInterval(handle);
  return cleanup;
};

export default composeAll(
  composeWithTracker(onPropsChange,Loading,Error),
  useDeps()
)(Main);
