import {test} from './methodFuncs/CustomerMethods';
export default function ({Collections, Meteor}) {
  Meteor.methods({
    'customer.search'(key) {
      return test({Collections, Meteor},key);
    }
  });
}
