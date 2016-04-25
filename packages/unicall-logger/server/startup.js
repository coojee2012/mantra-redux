/**
 * Created by LinYong on 2015/12/1.
 */
if (Meteor.isServer) {
	let log4js = Npm.require("log4js");
	let env = process.env.NODE_ENV || "dev";
	log4js.configure({
		"appenders": [
			{type: 'console'},
			{
				"type": "file",
				"absolute": true,
				"filename": "./web.log",
				"maxLogSize": 20480,
				"backups": 10,
				"category": "helpDeskPlugin"
			}
		]
	});
	let level = {
		"dev": "DEBUG",
		"test": "DEBUG",
		"stage": "DEBUG",
		"prod": "WARN"
	}
	/**
	 * logger.trace('Entering cheese testing');
	 *logger.debug('Got cheese.');
	 *logger.info('Cheese is Gouda.');
	 *logger.warn('Cheese is quite smelly.');
	 *logger.error('Cheese is too ripe!');
	 *logger.fatal('Cheese was breeding ground for listeria.');
	 */
	Unicall.fn.logger = log4js.getLogger('helpDeskPlugin');
	Unicall.fn.logger.setLevel(level[env]);

}
