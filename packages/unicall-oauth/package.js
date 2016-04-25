/**
 * Created by Junwei on 15/12/2.
 */
Package.describe({
  name: 'unicall:unicall-oauth',
  version: '1.0.0',
  summary: 'unicall OAuth',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use(['webapp'], 'server');
  api.use('accounts-base', 'server');
  api.use('oauth2', 'server');
  api.use('oauth', 'server');
  api.use('accounts-oauth', 'server');
  api.use('http', ['server']);
  //api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration',  'server');
  api.export('UnicallOauth');
  //api.addFiles('lib/core.js', 'server');
  api.addFiles('unicall_server.js', 'server');
  api.addFiles('unicall_common.js', 'server');

});

Npm.depends({
  "node-jose":"0.6.0",
  "jws":"3.1.1"
});
