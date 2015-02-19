'use strict';

// Connected to globbing patterns
function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

var assemble = require('assemble'),
extname = require('gulp-extname'),
config = require('./config.js'),
buildDir = config.pkg.config.dist,
system = config.site.assemble.system,
content = config.site.assemble.content,

// [fix] - Replace once the globbing pattern works
// helpers = system.helpers + '/{,*/}helper-**.js',
path = require('path'),
glob = require('glob'),
helperFiles = glob.sync(system.root + '/' + system.helpers + '/{,*/}helper-**.js'),
helpers = helperFiles.reduce(function (acc, fp) {
    return extend(acc, require(path.resolve(fp)));
}, {});

// Load system
assemble.layouts(system.root + '/' + system.layouts + '/**.hbs');
assemble.helpers(helpers);
assemble.partials(system.root + '/' + system.partials + '/**.hbs');

assemble.option(config.site.assemble.options);
assemble.option('site', config.site.site);
assemble.option('env', config.env);
assemble.option('media', config.media);

assemble.task('pages', function () {
    assemble.src(content.root + '/pages/**.md')
        .pipe(extname())
        .pipe(assemble.dest(buildDir));
});

assemble.task('assets', function () {
    assemble.src('assets/**', {layout: null})
        .pipe(assemble.dest(buildDir));
});

// [todo] - Task to concat/etc JS (including bower/node components)
// [todo] - Task to compile SCSS files
// http://pleeease.io/workflow/

assemble.task('default', ['pages', 'assets']);
