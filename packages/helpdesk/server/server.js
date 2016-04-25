/**
 * Created by Administrator on 3/1/2016.
 */
import {mockHelpdeskLogin} from "./mock.js"
import {getMockToken} from "./mock.js"

export function mock() {
  if (Meteor.settings.debug) {
    mockHelpdeskLogin();
  }
}
let apiRoot = Meteor.settings.helpdesk.protocal + Meteor.settings.helpdesk.host + (Meteor.settings.helpdesk.port ? ":" + Meteor.settings.helpdesk.port : "");
let userToken = "";

function setUserToken(token) {
  userToken = token;
}
function getUserToken() {
  if (!Meteor.settings.debug) {
    //userToken = getMockToken();
    userToken = UnicallOauth.getAccessTokenFromDb(Meteor.userId());
  } else {
    userToken = getMockToken();
  }
  return userToken;
}
function composeHeader(agentInfo) {
  let header = {
    "Authorization": agentInfo ? "Bearer " + agentInfo.token : getUserToken(),
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/json, text/javascript, */*; q=0.01"
  }
  return header;
}
Meteor.methods(
  {
    'getSimulatedToken'(){
      if (Meteor.settings.public.debug) {
        return getMockToken();
      }
    }
  }
);
Meteor.startup(()=> {
    if (Meteor.settings.public.debug) {
      console.log("simulate oauth login");
      mockHelpdeskLogin();
      console.log("simulation token:" + getMockToken());
    }
  }
);
function gotAPIError(name, e) {
  let errStr = e.message.substring(e.message.indexOf("{"));
  let errObj = {};
  if (errStr && errStr.length > 0) {
    console.log(name + " error:" + errStr);
    try {
      error = JSON.parse(errStr);
      throw new Meteor.Error(name + " error:", errStr);
    } catch (e) {
      errObj.internalServerError = true;
      errObj.error = e;
    }
  }
  throw new Meteor.Error(name + " error:", JSON.stringify(error));
}
export function suggestContacts(key, page) {
  let url = apiRoot + Meteor.settings.helpdesk.api.suggestContacts;
  let term = key;
  let error = null;
  let res = null;
  try {
    res = HTTP.get(
      url,
      {
        "headers": composeHeader(),
        "query": "term=" + encodeURIComponent(term)
      }
    );
  } catch (e) {
    gotAPIError("suggestContact", e);
  }
  //console.log("suggest contacts result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function getContactDetail(id) {
  let url = apiRoot + Meteor.settings.helpdesk.api.getContactDetail + "/" + id;
  let error = null;
  let res = null;
  try {
    res = HTTP.get(
      url,
      {
        "headers": composeHeader()
      }
    );
  } catch (e) {
    gotAPIError("getContactDetail", e);
  }
  //console.log("getContactDetail result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function getTicketDomain() {
  let url = apiRoot + Meteor.settings.helpdesk.api.getTicketConfig;
  let error = null;
  let res = null;
  try {
    res = HTTP.get(
      url,
      {
        "headers": composeHeader()
      }
    );
  } catch (e) {
    gotAPIError("getTicketDomain", e);
  }

  //console.log("getTicketDomain result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function getTicketConfig(agentInfo) {
  let url = apiRoot + Meteor.settings.helpdesk.api.getTicketConfig;
  if (agentInfo) {
    url = Meteor.settings.helpdesk.protocal + agentInfo.group + Meteor.settings.helpdesk.api.getTicketConfig;
  }
  let error = null;
  let res = null;
  try {
    res = HTTP.get(
      url,
      {
        "headers": composeHeader(agentInfo)
      }
    );
  } catch (e) {
    gotAPIError("getTicketConfig", e);
  }

  //console.log("getTicketConfig result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function getAllAgentGroups(agentInfo) {
  let url = apiRoot + Meteor.settings.helpdesk.api.getAllAgentGroups;
  if (agentInfo) {
    url = Meteor.settings.helpdesk.protocal + agentInfo.group + Meteor.settings.helpdesk.api.getAllAgentGroups;
  }
  let error = null;
  let res = null;
  try {
    res = HTTP.get(
      url,
      {
        "headers": composeHeader(agentInfo)
      }
    );
  } catch (e) {
    gotAPIError("getAllAgentGroups", e);
  }

  //console.log("getAllAgentGroups result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function getAllAgent(agentInfo) {
  let url = apiRoot + Meteor.settings.helpdesk.api.getAllAgent;
  if (agentInfo) {
    url = Meteor.settings.helpdesk.protocal + agentInfo.group + Meteor.settings.helpdesk.api.getAllAgent;
  }
  let error = null;
  let res = null;
  try {
    res = HTTP.get(
      url,
      {
        "headers": composeHeader(agentInfo)
      }
    );
  } catch (e) {
    gotAPIError("getAllAgent", e);
  }

  //console.log("getAllAgent result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function getAllAgentInGroup(groupId) {
  let url = apiRoot + Meteor.settings.helpdesk.api.getAllAgentInGroup + "/" + groupId + "/members";
  let error = null;
  let res = null;
  try {
    res = HTTP.get(
      url,
      {
        "headers": composeHeader()
      }
    );
  } catch (e) {
    gotAPIError("getAllAgentInGroup", e);
  }

  //console.log("getAllAgentInGroup result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}

export function createContact(data, agentInfo) {
  let url = apiRoot + Meteor.settings.helpdesk.api.createContact;
  if (agentInfo) {
    url = Meteor.settings.helpdesk.protocal + agentInfo.group + Meteor.settings.helpdesk.api.createContact;
  }
  let error = null;
  let res = null;
  try {
    res = HTTP.post(
      url,
      {
        "headers": composeHeader(agentInfo),
        "data": data
      }
    );
  } catch (e) {
    gotAPIError("createContact", e);
  }
  //console.log("createContact result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function updateContact(data, agentInfo) {
  let url = apiRoot + Meteor.settings.helpdesk.api.updateContact + "/" + data.id;
  if (agentInfo) {
    url = Meteor.settings.helpdesk.protocal + agentInfo.group + Meteor.settings.helpdesk.api.updateContact + "/" + data.id;
  }
  let error = null;
  let res = null;

  //console.log("server customer update", url, composeHeader(agentInfo), data);
  try {
    res = HTTP.put(
      url,
      {
        "headers": composeHeader(agentInfo),
        "data": data
      }
    );
  } catch (e) {
    gotAPIError("updateContact", e);
  }
  //console.log("updateContact result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  } else {
    return null;
  }
}
export function createTicket(data, agentInfo) {
  let url = apiRoot + Meteor.settings.helpdesk.api.createTicket;
  if (agentInfo) {
    url = Meteor.settings.helpdesk.protocal + agentInfo.group + Meteor.settings.helpdesk.api.createTicket;
  }
  let error = null;
  let res = null;
  try {
    res = HTTP.post(
      url,
      {
        "headers": composeHeader(agentInfo),
        "data": data
      }
    );
  } catch (e) {
    gotAPIError("createTicket", e);
  }
  //console.log("createTicket result" + JSON.stringify(res));
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res;
  } else {
    return null;
  }
}
