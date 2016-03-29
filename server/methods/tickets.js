/**
 * Created by LinYong on 2016/3/29.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  console.log('init tickets method');
  Meteor.methods({
    'ticket.create'(key) {
      check(key, String);
      console.log('In tickets method ticket.create:', key);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = {
            id:new Date().getTime()+'',
            subject: "主题",
            type: "1",
            ticketState: "1",
            priority: "1",
            groups: "11",
            agents: "1",
            description: "1",
            contactId: "12313123"
          };
          resolve(data);
        }, 3000);
      });
    }
  });
}
