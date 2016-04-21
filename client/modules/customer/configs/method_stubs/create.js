/**
 * Created by linyong on 16/4/21.
 */
import {create} from './methodFuncs/CustomerMethods';
export default function ({Collections, Meteor}) {
  Meteor.methods({
    'customer.create'(values) {
      return create({Collections, Meteor},values);
    }
  });
}
