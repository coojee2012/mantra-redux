/**
 * Created by Junwei on 15/11/13.
 */

UnicallOauth = {};

//可参考facebook,github登陆包

UnicallOauth.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'unicall'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();

  var scope = (options && options.requestPermissions) || ['user:email'];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginStyle = OAuth._loginStyle('unicall', config, options);
  var host = window.location.protocol + "//" + window.location.host;

  var loginUrl =
    host + '/oauth2/authorize' +
    '?client_id=' + config.clientId +
    '&response_type=code' +
    '&redirect_uri=' + UnicallOauth._redirectUriUnicall(host, config) + //OAuth._redirectUri('linkdesk', config , null, {rootUrl:host + '/settings/channel'}) +
    '&ref = ' + host +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);
  if(options.method == "logout"){
    loginUrl += '&auth_type=sign_out';
  }
  OAuth.launchLogin({
    loginService: "unicall",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 900, height: 450}
  });
};

var Ap = AccountsClient.prototype;
var org_makeClientLoggedOut = Ap.makeClientLoggedOut;
//如果token过期,重新登陆.
Ap.makeClientLoggedOut = function () {
  org_makeClientLoggedOut.apply(this, arguments);
  console.log('蓝屏BUG:retry login.');
  Tracker.autorun(function (c) {
    if (Accounts.loginServicesConfigured()) {
      c.stop();
      Meteor.loginWithUnicall({
        loginStyle: "redirect",
        method: "logout",
      }, function (err) {
        console.log(err);
      });
    }
  });
};
