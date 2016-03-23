import searchFns from './methodFuncs/searchCustomer';
export default function ({Collections, Meteor}) {
  Meteor.methods({
    'customer.search'(key) {
      return searchFns.test({Collections, Meteor},key);
    }
  });
}
