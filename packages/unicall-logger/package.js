/**
 * Created by LinYong on 2015/11/30.
 */



Package.describe({
	name: "unicall:logger",
	version: '0.0.1',
	summary: 'Unicall Logger',
	git: ''
});

Npm.depends({
	"log4js": "0.6.29"
});


Package.onUse(function (api) {
	api.versionsFrom('1.3.1');
	api.use('ecmascript');
	api.use("unicall:lib");



	api.addFiles('server/startup.js', 'server');
});

Package.onTest(function () {

});


