Package.describe({
  name: 'unicall:unicall-oauth-mock',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: '模拟oauth中心,上线需要去掉',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('service-configuration','server');
  api.use(['webapp'], 'server');

  api.addFiles('unicall-oauth-mock.js','server');
});
