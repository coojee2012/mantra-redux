/**
 * Created by LinYong on 2016/3/22.
 */
import ReduxActions from './reduxActions';
export default {
  createTicket(context, key) {

    return () => {
      const {Meteor,Store} = context;
      const dispatch = Store.dispatch;
      dispatch(ReduxActions.createTicketSaving());
      Meteor.call('ticket.create', key, (err, result) => {
        console.log('ticket.create:', err, result);
        if (err) {
          dispatch(ReduxActions.createTicketError(err));
        } else {
          dispatch(ReduxActions.createTicket(result));
          dispatch(ReduxActions.createTicketSaved());
        }
      });
    };
  }
};
