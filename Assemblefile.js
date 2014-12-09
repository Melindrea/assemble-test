'use strict';

var assemble = require('assemble'),
config = require('./config.js'),
buildDir = config.pkg.config.dist,
system = config.site.assemble.system,
content = config.site.assemble.content;

// Load system
assemble.layouts(system.root + '/' + system.layouts + '/**.hbs');
assemble.helpers(system.root + '/' + system.helpers + '/**.js');
assemble.partials(system.root + '/' + system.partials + '/**.hbs');

assemble.option(config.site.assemble.options);

assemble.task('default', function() {
  assemble.src(content.root + '/**.md')
    .pipe(assemble.dest(buildDir));
});
