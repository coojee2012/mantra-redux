/**
 * Created by LinYong on 2016/3/24.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {suggestContacts} from 'meteor/helpdesk'
import {getContactDetail} from 'meteor/helpdesk';
import {createContact} from 'meteor/helpdesk';
import {updateContact} from 'meteor/helpdesk';
import {WorkBenchContactMapper} from '../../lib/collections'

export default function () {
  Meteor.methods({
    'customer.search'(key) {
      check(key, String);
      Unicall.fn.logger.debug('Method -> customer.search key:', key);
      return new Promise((resolve, reject) => {
        try {
          let tmp = suggestContacts(key);
          //Unicall.fn.logger.debug('Method -> customer.search suggestContacts return :', tmp);
          let datas = [];
          for (let data of tmp) {
            let contact = data.mobile ? data.mobile : data.telephone ? data.telephone : data.email ? data.email : "";
            datas.push({
              "id": data.id,
              "name": data.name,
              "contact": contact
            });
          }
          /*return {
           page:1,
           totalPage:10,
           list:datas
           };*/
          //Unicall.fn.logger.debug('Method -> customer.search datas:', datas);
          resolve(datas);
        } catch (ex) {
          Unicall.fn.logger.error('Method -> customer.search error:', ex);
          reject([]);
        }
      });
    },
    'customer.create'(data, agentInfo, workbenchUsername) {
      Unicall.fn.logger.debug('Method -> customer.create:', data, agentInfo, workbenchUsername);
      check(data, Object);

      return new Promise((resolve, reject) => {
        try {
          let res = createContact(data, agentInfo);
          Unicall.fn.logger.debug('Method -> customer.create createContact result:', res);
          WorkBenchContactMapper.insert({
            username: workbenchUsername,
            contactId: res.id,
            name: res.name,
            contactNumber: res.cellphone ? res.cellphone : res.phone,
            createTime: new Date()
          });
          resolve(res);
        }catch(ex){
          Unicall.fn.logger.error('Method -> customer.create error:', ex);
          reject(ex);
        }
      });
    },
    'customer.detail'(id){
      Unicall.fn.logger.debug('Method -> [customer.detail] :', id);
      check(id, String);
      return new Promise((resolve, reject) => {
        try{
          let res = getContactDetail(id);
          resolve(res);
        }catch(ex){
          Unicall.fn.logger.error('Method -> [customer.detail] Error:', ex);
          reject(ex);
        }
      });

    },
    'customer.update'(contactObj, agentInfo){
      check(contactObj, Object);
      return new Promise((resolve, reject) => {
        try{
          let res = updateContact(contactObj, agentInfo);
          resolve(res);
        }catch(ex){
          Unicall.fn.logger.error('Method -> [customer.detail] Error:', ex);
          reject(ex);
        }
      });
    }
  });
}
