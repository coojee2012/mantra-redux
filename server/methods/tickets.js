/**
 * Created by LinYong on 2016/3/29.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  console.log('init tickets method');
  Meteor.methods({
    'ticket.create'(data) {
      check(data, Object);
      console.log('In tickets method ticket.create:', data);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          data.id = new Date().getTime() + ''
          resolve(data);
        }, 1000);
      });
    },
    'ticket.customer.init'(cid) {
      check(cid, String);
      console.log('In tickets method ticket.customer.init:', cid);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = {
            id: cid,
            name: '测试初始化',
            username: '测试' + new Date().getTime(),
            email: "11366846@qq.com",
            mobile: "15308098290",
            address: "北京北京",
            telephone: "01087654321",
            memo: "初始化备注:" + new Date().getTime()
          };
          resolve(data);
        }, 1000);
      });
    },
    'ticket.select.init'() {
      console.log('In tickets method ticket.select.init!');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = {
            'type': [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}, {
              value: 5,
              key: 5
            }],
            'ticketState': [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}, {
              value: 5,
              key: 5
            }],
            'priority': [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}, {
              value: 5,
              key: 5
            }],
            'groups': [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}, {
              value: 5,
              key: 5
            }],
            'agents': [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}, {
              value: 5,
              key: 5
            }]
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
          data.name = '修改姓名';
          data.memo = '修改备注:' + new Date().getTime();
          resolve(data);
        }, 1000);
      });
    }
  });
}
