var fs = require( 'fs' ),
    html5Lint = require( 'html5-lint' ),
    config = require('../config.js');

    // console.log(config);

    // For each .html file in the 'build' folder, run html5Lint, gathering/printing the messages
    // If there's been at least one error message, exit
fs.readFile(config.pkg.config.dist + '/index.html', 'utf8', function( err, html ) {
  if ( err )
    throw err;

  html5Lint( html, function( err, results ) {
    results.messages.forEach( function( msg ) {
      var type = msg.type, // error or warning
          message = msg.message;

      console.log('HTML5 Lint [%s]: %s', type, message );
    });

    if (results.messages.length > 0) {
      process.exit(1);
    }
  });
});

