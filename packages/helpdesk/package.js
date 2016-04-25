Package.describe({
    name: "helpdesk",
    version: '0.0.1',
    summary: 'helpdesk utility',
    git: ''
});

Npm.depends({
    //moment: "2.10.6"
});


Package.onUse(function (api) {
    api.versionsFrom('1.3.1');
    api.use('ecmascript');
    api.use("modules");
    api.use("http");
    api.use('unicall:unicall-oauth');
    api.use('service-configuration', "server");

    api.mainModule("server/server.js", "server");
    api.mainModule("client/client.js", "client");
    //api.addFiles("testModule.js");
    //api.export("bothLog");
});

Package.onTest(function () {

});


