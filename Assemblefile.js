'use strict';

var assemble = require('assemble'),
config = require('./config.js'),
buildDir = config.pkg.config.dist,
system = config.site.assemble.system,
content = config.site.assemble.content;

// Load system
assemble.layouts(system.root + '/' + system.layouts + '/**.hbs');
// assemble.helpers(system.helpers + '/{,*/}helper-**.js');
// assemble.helpers('lib/helpers/helper-*.js');
// var helpers = require('./lib/helpers/helper-test');
// assemble.helpers(helpers);
assemble.helper('test', require('./lib/helpers/helper-test'));
assemble.partials(system.root + '/' + system.partials + '/**.hbs');

assemble.option(config.site.assemble.options);

assemble.task('default', function() {
  assemble.src(content.root + '/_pages/**.hbs')
    .pipe(assemble.dest(buildDir));
});
