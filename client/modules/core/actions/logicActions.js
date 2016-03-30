/**
 * Created by linyong on 16/3/19.
 */
import ReduxActions from './reduxActions';
export default {
  getRoomId(context, key) {
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
  },
  setRoomId(context, roomId) {
    return () => {
      const {Meteor,Store} = context;
      const dispatch = Store.dispatch;
      dispatch(ReduxActions.setRoomId(roomId));
    };
  }
};
