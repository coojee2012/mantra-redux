/**
 * Created by linyong on 16/4/14.
 */
const Logger = (msg)=> {
  if (window && window.console) {
    window.console.log(msg);
  } else {

  }
}
export default Logger
