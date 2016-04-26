/**
 * Created by LinYong on 2016/3/29.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {getTicketConfig} from 'meteor/helpdesk'
import {getTicketDomain} from 'meteor/helpdesk'
import {createTicket} from 'meteor/helpdesk';
import {getAllAgentGroups} from 'meteor/helpdesk';
import {getAllAgent} from 'meteor/helpdesk';
import {getAllAgentInGroup} from 'meteor/helpdesk';


let tenantId = 'this';
let priorityDict = {}
priorityDict[20] = "低";
priorityDict[40] = "中";
priorityDict[60] = "高";
priorityDict[80] = "紧急";
priorityDict[100] = "非常紧急";
priorityDict[-99999] = "默认";
let stateDict = {}
stateDict["Opened"] = "处理中";
stateDict["Pending"] = "等待回复";
stateDict["Resolved"] = "已解决";
stateDict["Closed"] = "已关闭";
stateDict["-99999"] = "默认";
let getPriorityDisplay = function (key) {
  if (priorityDict[key]) {
    return priorityDict[key];
  } else {
    return priorityDict[-99999];
  }
}
let getStateDisplay = function (key) {
  if (stateDict[key]) {
    return stateDict[key];
  } else {
    return stateDict[-99999];
  }
}

export default function () {
  Unicall.fn.logger.debug('init tickets method');
  Meteor.methods({

    'ticket.configs'(agentInfo){
      let ticketDomain = getTicketConfig(agentInfo);
      let groups = getAllAgentGroups(agentInfo);
      let allAgent = getAllAgent(agentInfo);
      let agentData = [];
      let groupData = [];
      let ticketStates = [];
      let priorities = [];
      let types = [];
      for (let agent of allAgent) {
        let tmp = {
          key: agent.name,
          value: agent.username
        }
        agentData.push(tmp);
      }
      for (let group of groups) {
        let tmp = {
          key: group.name,
          value: group.id
        }
        groupData.push(tmp);
      }
      groupData.unshift({key: '--', value: ''});
      for (var ticketState of ticketDomain.ticketState) {
        var tmp = {
          key: getStateDisplay(ticketState.agentDisplay),
          value: ticketState.agentDisplay
        }
        ticketStates.push(tmp);
      }
      for (let priority of ticketDomain.priority) {
        let tmp = {
          key: getPriorityDisplay(priority),
          value: priority,
        }
        priorities.push(tmp);
      }
      priorities.pop();//去掉优先级100
      for (let type of ticketDomain.type) {
        let tmp = {
          key: type,
          value: type
        }
        types.push(tmp);
      }
      return {
        ticketState: ticketStates,
        priority: priorities,
        type: types,
        agents: agentData,
        groups: groupData,
      };
    },
    'ticket.create'(ticketObj, agentInfo){
      Unicall.fn.logger.debug('Method -> [ticket.create] :', ticketObj,agentInfo);
      check(ticketObj, Object);
      return new Promise((resolve, reject) => {
        try {
          let res = createTicket(ticketObj, agentInfo);
          Unicall.fn.logger.debug('Method -> [ticket.create] Success:', res);
          resolve(res);
        } catch (ex) {
          Unicall.fn.logger.error('Method -> [ticket.create] Error:', ex);
          reject(ex);
        }
      });

    },
    'ticket.domain'(){
      return new Promise((resolve, reject) => {
        try {
          let res = getTicketDomain();
          resolve(res);
        } catch (ex) {
          Unicall.fn.logger.error('Method -> [ticket.domain] Error:', ex);
          reject(ex);
        }
      });

    },
    'ticket.getAllAgentGroups'(){
      return new Promise((resolve, reject) => {
        try {
          let res = getAllAgentGroups();
          resolve(res);
        } catch (ex) {
          Unicall.fn.logger.error('Method -> [ticket.getAllAgentGroups] Error:', ex);
          reject(ex);
        }
      });
    },
    'ticket.getAllAgent'(){
      return new Promise((resolve, reject) => {
        try {
          let res = getAllAgent();
          resolve(res);
        } catch (ex) {
          Unicall.fn.logger.error('Method -> [ticket.getAllAgent] Error:', ex);
          reject(ex);
        }
      });

    },
    'ticket.getAllAgentInGroup'(groupId){
      check(groupId, String);
      return new Promise((resolve, reject) => {
        try {
          let res = getAllAgentInGroup();
          resolve(res);
        } catch (ex) {
          Unicall.fn.logger.error('Method -> [ticket.getAllAgentInGroup] Error:', ex);
          reject(ex);
        }
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
