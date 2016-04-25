/**
 * Created by LinYong on 2015/11/25.
 */
Package.describe({
	name: "unicall:lib",
	version: '0.0.1',
	summary: 'Unicall Lib',
	git: ''
});

Package.onUse(function (api) {
	api.versionsFrom('1.3.1');
	api.use('ecmascript');

	api.addFiles("lib/core.js");
	api.addFiles("lib/tools.js");
	// EXPORT
	api.export('Unicall');
});

Package.onTest(function () {

});

