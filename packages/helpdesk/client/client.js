/**
 * Created by Administrator on 3/1/2016.
 */
var suggestContacts;
var getContactDetail;
var getTicketDomain;
var getTicketConfig;
var getAllAgentGroups;
var getAllAgent;
var getAllAgentInGroup;

var updateContact;
var createContact;
var createTicket;

var getUserToken;
var config = Meteor.settings.public.helpdesk;
let apiRoot = null;
var username = "agent1@unicall.cc";
var password = "agent1"
var host = "https://math.yunkefu.cc";
var jwtHost = "https://math.yunkefu.cc";
var path = "/oauth2/authorize";
var debugToken = null;
const jwtError = {"type": "GetJWTError", "title": "get jwt error", "status": 400, "detail": "get jwt error"};
const unknownAPIError = {message: 'unknow api error'};
if (Meteor.settings.public.debug) {
  apiRoot = config.protocal + config.host + (config.port ? ":" + config.port : "");
  getUserToken = getDebugToken;
  Meteor.call("getSimulatedToken", (err, res)=> {
    debugToken = res
  });

  suggestContacts = suggestContacts1;
  getContactDetail = getContactDetail1;
  getTicketConfig = getTicketConfig1;
  getTicketDomain = getTicketDomain1;
  getAllAgentGroups = getAllAgentGroups1;
  getAllAgent = getAllAgent1;
  getAllAgentInGroup = getAllAgentInGroup1;

  updateContact = updateContact1;
  createContact = createContact1;
  createTicket = createTicket1;
} else {
  getUserToken = getClientToken;

  suggestContacts = suggestContacts2;
  getContactDetail = getContactDetail2;
  getTicketDomain = getTicketDomain2;
  getTicketConfig = getTicketConfig3;
  getAllAgentGroups = getAllAgentGroups2;
  getAllAgent = getAllAgent2;
  getAllAgentInGroup = getAllAgentInGroup2;

  updateContact = updateContact2;
  createContact = createContact2;
  createTicket = createTicket2;
}

function getClientToken() {
  //Meteor.wrapAync(
  //  UnicallPlugin.get('Agent.info',{token:true},(result)=>{
  //    if(result){
  //      tokenLogin(result.group,result.token);
  //    }
  //  })
  //);
}
function getDebugToken(cb) {
  return debugToken;
}
function analyzeError(err) {
  if (err) {
    let res = {};
    try {
      let errObj = JSON.parse(err.reason);
      if (errObj.type) {
        res.helpdeskError = errObj;
      } else {
        res.serverError = errObj;
      }
    } catch (E) {
      res.serverError = "unknown error:" + JSON.stringify(err);
    }
    return res;
  } else {
    return null;
  }
}
function suggestContacts1(key, page, cb) {
  if (page) {
    Meteor.call("customer.search.page", key, page, (err, res)=> {
      cb(analyzeError(err), res);
    })
  } else {
    Meteor.call("customer.search", key, (err, res)=> {
      cb(analyzeError(err), res);
    })
  }
}
function getContactDetail1(id, cb) {
  Meteor.call("customer.detail", id, (err, res)=> {
    cb(analyzeError(err), res);
  })
}
function getTicketDomain1(cb) {
  Meteor.call("ticket.domain", (err, res)=> {
    cb(analyzeError(err), res);
  });
}
function getTicketConfig1(cb) {
  Meteor.call("ticket.configs", (err, res)=> {
    cb(analyzeError(err), res);
  });
}
function getAllAgentGroups1(cb) {
  Meteor.call("ticket.getAllAgentGroups", (err, res)=> {
    cb(analyzeError(err), res);
  })
}
function getAllAgent1(cb) {
  Meteor.call("ticket.getAllAgent", (err, res)=> {
    cb(analyzeError(err), res);
  })
}
function getAllAgentInGroup1(groupId, cb) {
  Meteor.call("ticket.getAllAgentInGroup", groupId, (err, res)=> {
    cb(analyzeError(err), res);
  })
}

function updateContact1(data, cb) {
  Meteor.call("customer.update", data, null, (err, res)=> {
    cb(analyzeError(err), res);
  })
}
function createContact1(data, username, cb) {
  Meteor.call("customer.create", data, null, username, (err, res)=> {
    cb(analyzeError(err), res);
  })
}
function createTicket1(data, cb) {
  Meteor.call("ticket.create", data, null, (err, res)=> {
    cb(analyzeError(err), res);
  })
}


function composeHeader(token) {
  let header = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/json, text/javascript, */*; q=0.01"
  }
  return header;
}
function composeAPIRoot() {
  return window.location.protocol + "//" + window.location.host;
}
function suggestContacts2(key, page, cb) {
  let apiRoot = composeAPIRoot();
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      let url = apiRoot + config.api.suggestContacts;
      let term = key;
      let error = null;
      let res = null;
      try {
        res = HTTP.get(
          url,
          {
            "headers": composeHeader(result.token),
            "query": "term=" + encodeURIComponent(term)
          }, (err, res)=> {
            //console.log("suggest contacts result" + JSON.stringify(res));
            if (res.statusCode >= 200 && res.statusCode < 300) {
              let tmp = res.data;
              let datas = [];
              for (let data of tmp) {
                let contact = data.mobile ? data.mobile : data.telephone ? data.telephone : data.email ? data.email : "";
                datas.push({
                  "id": data.id,
                  "name": data.name,
                  "contact": contact
                });
              }
              cb(err, {
                page: 1,
                totalPage: 10,
                list: datas
              });
            } else {
              cb(analyzeError(unknownAPIError), null);
            }
          }
        );
      } catch (e) {
        let errStr = e.message.substring(e.message.indexOf("{"));
        console.log("suggestContacts error:" + errStr);
        error = JSON.parse(errStr);
        cb(analyzeError(error));
      }
    } else {
      //get jwt error
      cb({"type": "GetJWTError", "title": "get jwt error", "status": 400, "detail": "get jwt error."});
    }
  });
}
function getContactDetail2(id, cb) {
  let apiRoot = composeAPIRoot();
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      let url = apiRoot + config.api.getContactDetail + "/" + id;
      let error = null;
      let res = null;
      try {
        res = HTTP.get(
          url,
          {
            "headers": composeHeader(result.token),
          }, (err, res)=> {
            //console.log("getContactDetail result" + JSON.stringify(res));
            if (res.statusCode >= 200 && res.statusCode < 300) {
              cb(err, res.data);
            } else {
              cb(analyzeError(unknownAPIError), null);
            }
          }
        );
      } catch (e) {
        let errStr = e.message.substring(e.message.indexOf("{"));
        console.log("getContactDetail error:" + errStr);
        cb(analyzeError(error));
      }
    } else {
      //get jwt error
      cb(analyzeError(jwtError));
    }
  });

}

//临时修改,从后台取数据.
function getTicketConfig3(cb) {
  UnicallPlugin.get('Agent.info', {token: true},(result)=>{
    Meteor.call("ticket.configs", result,(err, res)=> {
      cb(analyzeError(err), res);
    });
  })
}

function getTicketConfig2(cb) {
  getTicketDomain2(cb);
}
function getTicketDomain2(cb) {
  let apiRoot = composeAPIRoot();
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      let url = apiRoot + config.api.getTicketConfig;
      let error = null;
      let res = null;
      try {
        res = HTTP.get(
          url,
          {
            "headers": composeHeader(result.token)
          }, (err, res)=> {
            //console.log("getTicketDomain result" + JSON.stringify(res));
            if (res.statusCode >= 200 && res.statusCode < 300) {
              cb(err, res.data);
            } else {
              cb(analyzeError(unknownAPIError), null);
            }
          }
        );
      } catch (e) {
        let errStr = e.message.substring(e.message.indexOf("{"));
        console.log("getTicketDomain error:" + errStr);
        error = JSON.parse(errStr);
        cb(analyzeError(error));
      }
    } else {
      //get jwt error
      cb(analyzeError(jwtError));
    }
  });
}
function getAllAgentGroups2(cb) {
  let apiRoot = composeAPIRoot();
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      let url = apiRoot + config.api.getAllAgentGroups;
      let error = null;
      let res = null;
      try {
        res = HTTP.get(
          url,
          {
            "headers": composeHeader(result.token)
          }, (err, res)=> {
            //console.log("getAllAgentGroups result" + JSON.stringify(res));
            if (res.statusCode >= 200 && res.statusCode < 300) {
              cb(err, res.data);
            } else {
              cb(analyzeError(unknownAPIError), null);
            }
          }
        );
      } catch (e) {
        let errStr = e.message.substring(e.message.indexOf("{"));
        console.log("getAllAgentGroups error:" + errStr);
        error = JSON.parse(errStr);
        cb(analyzeError(error));
      }
    } else {
      //get jwt error
      cb(analyzeError(jwtError));
    }
  });

}
function getAllAgent2(cb) {
  let apiRoot = composeAPIRoot();
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      let url = apiRoot + config.api.getAllAgent;
      let error = null;
      let res = null;
      try {
        res = HTTP.get(
          url,
          {
            "headers": composeHeader(result.token)
          }, (err, res)=> {
            //console.log("getAllAgent result" + JSON.stringify(res));
            if (res.statusCode >= 200 && res.statusCode < 300) {
              cb(err, res.data);
            } else {
              cb(analyzeError(unknownAPIError), null);
            }
          }
        );
      } catch (e) {
        let errStr = e.message.substring(e.message.indexOf("{"));
        console.log("getAllAgent error:" + errStr);
        error = JSON.parse(errStr);
        cb(analyzeError(error));
      }
    } else {
      //get jwt error
      cb(analyzeError(jwtError));
    }
  });
}
function getAllAgentInGroup2(groupId, cb) {
  let apiRoot = composeAPIRoot();
  let error = null;
  let res = null;
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
      if (result) {
        let url = apiRoot + config.api.getAllAgentInGroup + "/" + groupId + "/members";
        try {
          res = HTTP.get(
            url,
            {
              "headers": composeHeader(result.token)
            }, (err, res)=> {
              //console.log("getAllAgentInGroup result" + JSON.stringify(res));
              if (res.statusCode >= 200 && res.statusCode < 300) {
                cb(err, res.data);
              } else {
                cb(err);
              }
            }
          );
        } catch (e) {
          let errStr = e.message.substring(e.message.indexOf("{"));
          console.log("getAllAgentInGroup error:" + errStr);
          error = JSON.parse(errStr);
          cb(analyzeError(error));
        }
      } else {
        //get jwt error
        cb(analyzeError(jwtError));
      }
    }
  );
}

function updateContact2(data, cb) {
  //console.log("updateContact2:", data);
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      Meteor.call("customer.update", data, result, (err, res)=> {
        cb(analyzeError(err), res);
      })
    } else {
      //get jwt error
      cb(analyzeError(jwtError));
    }
  });
}
function createContact2(data, username, cb) {
  //console.log("createContact2:", data);
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      Meteor.call("customer.create", data, result, username, (err, res)=> {
        cb(analyzeError(err), res);
      })
    } else {
      //get jwt error
      cb(analyzeError(jwtError));
    }
  });
}
function createTicket2(data, cb) {
  //console.log("createTicket2:", data);
  UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
    if (result) {
      Meteor.call("ticket.create", data, result, (err, res)=> {
        cb(analyzeError(err), res);
      })
    } else {
      //get jwt error
      cb(analyzeError(jwtError));
    }
  });
}

var priorityDict = {}
priorityDict[20] = "低";
priorityDict[40] = "中";
priorityDict[60] = "高";
priorityDict[80] = "紧急";
priorityDict[100] = "非常紧急";
priorityDict[-99999] = "默认";
var stateDict = {}
stateDict["Opened"] = "处理中";
stateDict["Pending"] = "等待回复";
stateDict["Resolved"] = "已解决";
stateDict["Closed"] = "已关闭";
stateDict["-99999"] = "默认";
function getPriorityDisplay(key) {
  if (priorityDict[key]) {
    return priorityDict[key];
  } else {
    return priorityDict[-99999];
  }
}
function getStateDisplay(key) {
  if (stateDict[key]) {
    return stateDict[key];
  } else {
    return stateDict[-99999];
  }
}

export {suggestContacts,getContactDetail,getTicketDomain,getTicketConfig,getAllAgentGroups,getAllAgent,getAllAgentInGroup,
  updateContact,createContact,createTicket};
