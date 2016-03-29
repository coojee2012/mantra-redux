import createFns from './methodFuncs/createTicket';
export default function ({Collections, Meteor}) {
  Meteor.methods({
    'ticket.create'(key) {
      return createFns.test({Collections, Meteor},key);
    }
  });
}
