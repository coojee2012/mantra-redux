/**
 * Created by linyong on 16/4/14.
 */
const Logger = (...args)=> {
  if (window && window.console) {
    window.console.log(...args);
  } else {

  }
}
export default Logger
