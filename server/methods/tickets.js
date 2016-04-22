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
    },
    'ticket.customer.init'(cid) {
      check(cid, String);
      console.log('In tickets method ticket.create:', cid);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = {
            id: cid,
            name: '测试初始化',
            username: '测试'+new Date().getTime(),
            email: "11366846@qq.com",
            mobile: "15308098290",
            address: "北京北京",
            telephone: "01087654321",
            memo: "初始化备注:"+new Date().getTime()
          };
          resolve(data);
        }, 1000);
      });
    },
    'ticket.customer.edit'(data) {
      check(data, Object);
      console.log('In tickets method ticket.edit:', data);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          data.name='修改姓名';
          data.memo='修改备注:'+new Date().getTime();
          resolve(data);
        }, 1000);
      });
    }
  });
}
