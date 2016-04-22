import {TICKET_CREATE, TICKET_INFO, TICKET_SAVING, TICKET_SAVE_DONE, TICKET_CREATE_ERROR} from './actionTypes';
import {
  TICKET_EDITTING_CUSTOMER,
  TICKET_EDIT_CUSTOMER_DONE,
  TICKET_EDIT_CUSTOMER_ERROR,
  TICKET_EDIT_CUSTOMER,
  TICKET_INIT_CUSTOMER,
  TICKET_INIT_CUSTOMER_DOING,
  TICKET_INIT_CUSTOMER_DONE,
  TICKET_INIT_CUSTOMER_ERROR,
  TICKET_EDIT_CUSTOMER_RESET
} from './actionTypes.js';
export default {
  createTicketSaving(){
    return {type: TICKET_SAVING};
  },
  createTicketSaved(){
    return {type: TICKET_SAVE_DONE};
  },
  createTicket(doc){
    return {type: TICKET_CREATE, doc};
  },
  createTicketError(error){
    return {type: TICKET_CREATE_ERROR, error};
  },
  initCustomer(data){
    return {type: TICKET_INIT_CUSTOMER, data};
  },
  initCustomerDoing(){
    return {type: TICKET_INIT_CUSTOMER_DOING};
  },
  initCustomerDone(){
    return {type: TICKET_INIT_CUSTOMER_DONE};
  },
  initCustomerError(){
    return {type: TICKET_INIT_CUSTOMER_ERROR};
  },
  editCustomer(data){
    return {type: TICKET_EDIT_CUSTOMER, data};
  },
  editCustomerDoing(){
    return {type: TICKET_EDITTING_CUSTOMER};
  },
  editCustomerDone(){
    return {type: TICKET_EDIT_CUSTOMER_DONE};
  },
  editCustomerError(){
    return {type: TICKET_EDIT_CUSTOMER_ERROR};
  },
  editCustomerStatusReset(){
    return {type: TICKET_EDIT_CUSTOMER_RESET};
  }
};
