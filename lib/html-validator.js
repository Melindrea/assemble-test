var fs = require( 'fs' ),
    html5Lint = require( 'html5-lint' ),
    config = require('../config.js'), dir = config.pkg.config.dist,
    walk = require('walk'), walker, data = [];

    walker = walk.walk(dir);

    walker.on('file', function (root, fileStats, next) {
        var fileName = root + '/' + fileStats.name;
        fs.readFile(fileName, 'utf-8', function (err, html) {
            if (err) {
                throw err;
            }
            html5Lint(html, function (err, results) {
                var messages = [];
                results.messages.forEach(function (msg) {
                    messages.push({type: msg.type, message: msg.message});
                });

                if (messages.length > 0) {
                    data.push({name: fileName, messages: messages});
                }
              next();
            });
        });
      });

    walker.on('end', function () {
        var dataLength = data.length, object, messageLength, message, type;
        for (var i = 0; i < dataLength; i++) {
            if (i > 0) {
                console.log('-----');
            }
            object = data[i];
            console.log('HTML5 Lint [File]: %s', object.name.bold);
            console.log('====');

            messageLength = object.messages.length;
            for (var j = 0; j < messageLength; j++) {
                message = object.messages[j];
                if (message.type === 'error') {
                    type = message.type.error;
                } else {
                    type = message.type.warning;
                }
                console.log('HTML5 Lint [%s]: %s', type, message.message)
            }
        }

        if (dataLength > 0) {
            process.exit(1);
        }
  });
