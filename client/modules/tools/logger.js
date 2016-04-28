/**
 * Created by linyong on 16/4/14.
 */
import moment from 'moment';
const Logger = (...args)=> {
  if (Meteor.settings.public.debug && window && window.console) {
    window.console.log(moment().format('HH:mm:ss.SSS'),...args);
  } else {

  }
}
export default Logger
