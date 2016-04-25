/**
 * Created by Junwei on 15/11/13.
 */
UnicallOauth = {};

OAuth.registerService('unicall', 2, null, function (query) {
    var protocol = query.headers['x-forwarded-proto'] ? query.headers['x-forwarded-proto'].split(",")[0] : "http";
    var host = protocol + "://" + query.headers['host'];     //解决多租户子域名不一样
    var data = getAccessToken(query.code,host,'code');
    var access_token = data.access_token;
    var refresh_token = data.refresh_token;
    var profile = getProfile(access_token,host);
    var tenantId = query.headers['host'];
    return {
        serviceData: {
            id: data.login+"."+tenantId,  //oauth 必须存在字段.
            uuid:profile.id,
            name: profile.name,
            username:profile.username,
            access_token: OAuth.sealSecret(access_token),
            refresh_token: OAuth.sealSecret(refresh_token),
            expiresAt: (+new Date) + (1000 * data.expires_in),
            roles: profile.roles,
            tenant_id: tenantId
        },
        options: {profile: {login: data.login, name:profile.name, tenant_id: tenantId}}
    };
});

var userAgent = "Meteor";
if (Meteor.release)
    userAgent += "/" + Meteor.release;

//获取token
var getAccessToken = function (token,host,type) {
    var config = ServiceConfiguration.configurations.findOne({service: 'unicall'});
    if (!config)
        throw new ServiceConfiguration.ConfigError();
    var response;
    //协议
    var getAssertionAsync = Meteor.wrapAsync(getAssertion);
    var client_assertion = getAssertionAsync(host,config);
    var params = {
        client_assertion_type:'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion:client_assertion
    };
    if(type == 'code'){
        params.grant_type = "authorization_code";
        params.code = token;
    }else if(type == 'refresh'){
        params.grant_type = "refresh_token";
        params.refresh_token = token;
    }
    try {
        response = HTTP.post(
            host + "/oauth2/access_token", {
                headers: {
                    Accept: 'application/json',
                    "User-Agent": userAgent
                },
                params: params
            });
    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Unicall. " + err.message),
            {response: err.response});
    }
    if (response.data.error) { // if the http response was a json object with an error attribute
        throw new Error("Failed to complete OAuth handshake with Unicall. " + response.data.error);
    } else {
        return response.data;
    }
};
UnicallOauth.getAccessToken = getAccessToken;

//获取jws签名
var getAssertion = function(host,config,callback){
    var options = {compact:true,fields:{alg:'HS256',own:'yunkefu'}};
    var payload = {
        "iss": config.clientId,
        "aud": UnicallOauth._redirectUriUnicall(host, config),
        "exp": Math.floor(new Date().getTime()/1000) + 500
    };
    var jose = Npm.require('node-jose');
    jose.JWS.createSign(options,Meteor.settings.JWK)
        .final(JSON.stringify(payload))
        .then(function(code){
            Unicall.fn.logger.debug("======JWS Sign=====",code);
            callback(null,code);
        });
};

//获取信息
var getProfile = function(access_token,host){
    var api = host+ "/api/profile";
    try {
        var response = new authApi().get(api,access_token);
    } catch (err) {
        throw _.extend(new Error("获取profile出错:" + err.message),
            {response: err.response});
    }
    if(response.statusCode !== 200){
        throw new Error("获取profile不正确:" + response.data.errorMessage);
    }else{
        Unicall.fn.logger.debug("======Profile=====",response.data);
        return response.data;
    }
};

UnicallOauth.retrieveCredential = function (credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

//override Oauth方法
Package['oauth'].OAuth._checkRedirectUrlOrigin = function (redirectUrl) {
    var appHost = Meteor.absoluteUrl();
    var rHost = UnicallOauth._parseUrl(redirectUrl)[2];
    var aHost = UnicallOauth._parseUrl(appHost)[2];
    return rHost.indexOf(aHost) === -1;
};

var jws = Npm.require('jws');
var decodePayload = function(token){
    var decode = jws.decode(token);
    return JSON.parse(decode.payload);
};

//刷新token
var refreshAccessToken = function(userId,token,host){
    host = 'http://' + host;
    var data = getAccessToken(token,host,'refresh');
    Meteor.users.update({_id:userId},{$set:{
      "services.unicall.access_token":OAuth.sealSecret(data.access_token),
      "services.unicall.refresh_token":OAuth.sealSecret(data.refresh_token),
      "services.unicall.expiresAt":(+new Date) + (1000 * data.expires_in)
    }});
    return data.access_token;
};

var getAccessTokenFromDb = function(userId){
    var service = Meteor.users.findOne({_id:userId},{fields:{services:1}}).services.unicall;
    var now = Math.round(new Date().getTime()/1000);
    var payload = decodePayload(service.access_token);
    //是否过期
    if(payload.exp <= now){
        payload = decodePayload(service.refresh_token);
        if(payload.exp <= now){
            throw new Meteor.Error("refresh-token-expire","refresh_token已过期，请重新认证。")
        }else{
            //刷新token
            var access_token = refreshAccessToken(userId,service.refresh_token,service.tenant_id);
            return access_token;
        }
    }else{
        return service.access_token;
    }
};

//开放给前台的查询方法
Meteor.methods({
    authApiGet:function(api){
      console.log("oauth login:",this.userId);
        if(!this.userId){
            throw new Meteor.Error("not-logged-in","需要登陆.")
        }
        var access_token = getAccessTokenFromDb(this.userId);
        return new authApi().get(api,access_token);
    },
    authApiPost:function(api,data){
        if(!this.userId){
            throw new Meteor.Error("not-logged-in","需要登陆.")
        }
        var access_token = getAccessTokenFromDb(this.userId);
        return new authApi().post(api,data,access_token);
    },
    authApiToken:function(){
        if(!this.userId){
            throw new Meteor.Error("not-logged-in","需要登陆.")
        }
        return getAccessTokenFromDb(this.userId);
    }
});

