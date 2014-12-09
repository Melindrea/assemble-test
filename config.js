var npmInfo = require('./package.json'),
YAML = require('yamljs'),
argv = require('yargs').argv,
dataDir = argv.dataDir || 'data',
siteConfig =  YAML.load(dataDir + '/site.yaml');

// Based on http://blog.codehatcher.com/node-js-alternate-config-file
module.exports = function () {
  console.log("Node Env Variable: " + process.env.NODE_ENV);

  // istanbul ignore next: don't look at the env variables
  switch (process.env.NODE_ENV) {
    case null:
    case undefined:
    case "local":
      return {
        env: 'local', //should be env/prod
        site: siteConfig,
        dataDir: dataDir
      };
    case "dev":
    case "development":
      return {
        env: 'dev', //should be env/prod
        site: siteConfig,
        dataDir: dataDir
      };
    case "test":
    case "testing":
      return {
        env: 'test', //should be env/prod, can be changed to prod when we are comfy with prod environ
        site: siteConfig,
        dataDir: dataDir
      };
    case "prod":
    case "production":
      return {
        env: 'prod', //should be env/prod, can be changed to prod when we are comfy with prod environ
        site: siteConfig,
        dataDir: dataDir
      };
    default:
      throw new Error("Environment Not Recognized");
  }
}();
