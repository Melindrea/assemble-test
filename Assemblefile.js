'use strict';

var assemble = require('assemble'),
config = require('./config.js'),
build = config.site.assemble.build,
system = config.site.assemble.system,
content = config.site.assemble.content,
data = config.dataDir;

// Load system
assemble.layouts(system.root + '/' + system.layouts + '/**.hbs');
assemble.helpers(system.root + '/' + system.helpers + '/**.js');
assemble.partials(system.root + '/' + system.partials + '/**.hbs');

assemble.option({layout: 'master'});

assemble.task('default', function() {
  assemble.src(content.root + '/**.md')
    .pipe(assemble.dest(build.root));
});
