/**
 * Created by lil on 2016/3/3.
 */

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {WorkBenchContactMapper} from '../../lib/collections'
export default function () {
  Meteor.methods({
    'visitor.contact'(username){
      check(username,String);
      let record = WorkBenchContactMapper.findOne({username:username},{sort:{createTime:-1},limit:1});
      if(record){
        return record
      }else{
        return {};
      }
    }
  });
}
