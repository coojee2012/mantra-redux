Package.describe({
  name: 'unicall:unicall-token-login',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('accounts-base');
  api.use('accounts-password');
  api.use('mizzao:partitioner');
  api.use("modules");
  api.mainModule('token-login-server.js', 'server');
  api.mainModule('token-login-client.js', 'client');
});

Package.onTest(function(api) {
});
