/**
 * Created by Junwei on 15/11/13.
 */

UnicallOauth._redirectUriUnicall = function (host,config) {
    var rootUrl = Meteor.absoluteUrl();
    var parsedRootUrl = UnicallOauth._parseUrl(rootUrl);
    return OAuth._redirectUri('unicall', config , null,{rootUrl:host + parsedRootUrl[5]});
};

//解析url 不使用npm.url 兼容客户端使用
UnicallOauth._parseUrl = function(url){
    var reURLInformation = new RegExp([
        '^(https?:)//', // protocol
        '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
        '(/[^?#]*)', // pathname
        '(\\?[^#]*|)', // search
        '(#.*|)$' // hash
    ].join(''));
    return reURLInformation.exec(url);
};


//accounts-unicall 类似
Accounts.oauth.registerService('unicall');

if (Meteor.isClient) {
    Meteor.loginWithUnicall = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        UnicallOauth.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        // not sure whether the github api can be used from the browser,
        // thus not sure if we should be sending access tokens; but we do it
        // for all other oauth2 providers, and it may come in handy.
        forLoggedInUser: ['services.unicall'],
        forOtherUsers: ['services.unicall.username']
    });
}

Meteor.startup(function(){
    Accounts.config({loginExpirationInDays: 1});  //默认1小时token过期
});