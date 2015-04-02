'use strict';

var chalk = require('chalk');

// Based on http://blog.codehatcher.com/node-js-alternate-config-file
module.exports = (function () {
    var pkg = require('./package.json'),
    YAML = require('yamljs'),
    argv = require('yargs').argv,
    dataDir = argv.dataDir || 'data',
    siteConfig =  YAML.load(dataDir + '/site.yaml'),
    mediaConfig =  YAML.load(dataDir + '/media.yaml'),
    error = chalk.bold.red,
    warning = chalk.yellow,
    info = chalk.cyan,
    debug = chalk.blue,
    success = chalk.bold;

    switch (process.env.NODE_ENV) {
        case null:
        case undefined:
        case 'local':
            return {
                env: 'local',
                site: siteConfig,
                media: mediaConfig,
                dataDir: dataDir,
                pkg: pkg,
                error: error,
                warning: warning,
                info: info,
                debug: debug,
                success: success
            };
        case 'dev':
        case 'development':
            return {
                env: 'dev',
                site: siteConfig,
                dataDir: dataDir,
                pkg: pkg,
                error: error,
                warning: warning,
                info: info,
                debug: debug
            };
        case 'test':
        case 'testing':
            return {
                env: 'test',
                site: siteConfig,
                dataDir: dataDir,
                pkg: pkg,
                error: error,
                warning: warning,
                info: info,
                debug: debug
            };
        case 'prod':
        case 'production':
            return {
                env: 'prod',
                site: siteConfig,
                dataDir: dataDir,
                pkg: pkg,
                error: error,
                warning: warning,
                info: info,
                debug: debug
            };
        default:
            throw new Error('Environment Not Recognized');
    }
}());
