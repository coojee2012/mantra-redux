/**
 * Created by Administrator on 3/2/2016.
 */
var authCode = null;
var authToken = null;
var refreshToken = null;
var expireAt = new Date();
var username="agent1@unicall.cc";
var password="agent1"
var host="http://math.quickdesk.cn";
var jwtHost="http://math.quickdesk.cn";
var path="/oauth2/authorize";
var clientId = Meteor.settings.oauth2.client_id;
var service = Meteor.settings.oauth2.service;
var client_secret = Meteor.settings.oauth2.client_secret;
export function mockHelpdeskLogin(){
  authCode = login();
  //temporarily change the config
  var config = ServiceConfiguration.configurations.findOne({service: 'unicall'});
  ServiceConfiguration.configurations.upsert(
    { service: 'unicall' },
    {
      $set: {
        clientId: 'quickdesk.cn',
        secret: 'linkdesk',
        loginStyle: "redirect"
      }
    }
  );
  let tmp  = UnicallOauth.getAccessToken(authCode, jwtHost,"code");
  console.log("UnicallOauth getAccessToken result:"+JSON.stringify(tmp));
  //restore the config in database
  ServiceConfiguration.configurations.upsert(
    { service: 'unicall' },
    {
      $set: {
        clientId: config.clientId,
        secret: config.secret,
        loginStyle: config.loginStyle
      }
    }
  );
  authToken = tmp.token_type+" "+tmp.access_token;
  expireAt = new Date();
  expireAt.setMilliseconds(expireAt.getMilliseconds()+tmp.expires_in*1000);
}
export function getMockToken(){
  if(!authToken){
    console.log("require new auth token.");
    mockHelpdeskLogin();
    console.log("jwt token found:"+authToken);
    return authToken;
  }else if(new Date().getTime()>=expireAt.getTime()){
    refreshToken();
  }else {
    return authToken;
  }
}



function refreshToken(){

}
function login(){
  var res = null;
  try{
    res = HTTP.post(host + path,
      {
        headers:{
          "Content-Type":'application/x-www-form-urlencoded'
        },
        params:{
          auth_type:'sign_out',
          response_type:'code',
          redirect_uri:jwtHost,
          ref:jwtHost,
          client_id: clientId
        },
        content:'username=agent1@unicall.cc&password=agent1'
      }
    );
  }catch(e){
    console.log("mock login error:"+JSON.stringify(e));
  }
  if(res!=null){
    console.log("mock login:"+JSON.stringify(res));
    let params = getQueryParams(res.headers.location);
    code = params['code'];
    return code;
  }
  return null;
}

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');
  var params = {};
  var tmp = qs.slice(qs.indexOf('?')+1).split('&');
  for(let str of tmp){
    let pair = str.split('=');
    params[pair[0]] = pair[1];
  }
  return params;
}
