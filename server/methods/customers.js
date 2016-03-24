/**
 * Created by LinYong on 2016/3/24.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  console.log('init customer method');
  Meteor.methods({
    'customer.search'(key) {
      check(key, String);
      console.log('init customer method:', key);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [{
            id:new Date().getTime()+'',
            name: 'test1',
            contact: key + 'contact1'
          }, {
            id:new Date().getTime()+'',
            name: 'test2',
            contact: key + 'contact2'
          }
          ];
          resolve(data);
        }, 1000);
      });
    }
  });
}
