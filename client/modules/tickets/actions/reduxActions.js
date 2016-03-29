import { TICKET_CREATE, TICKET_INFO,TICKET_SAVING,TICKET_SAVE_DONE,TICKET_CREATE_ERROR} from './actionTypes';
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
  }
};
